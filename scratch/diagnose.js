const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3001;

// Read index.html and inject diagnostic snippet
let html = fs.readFileSync('index.html', 'utf8');

const diagSnippet = `
<script>
window.addEventListener('load', () => {
    setTimeout(() => {
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const issues = [];

        document.querySelectorAll('*').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > winW + 1 || el.scrollWidth > winW + 1) {
                issues.push({
                    tag: el.tagName,
                    id: el.id,
                    className: el.className,
                    rectRight: Math.round(rect.right),
                    scrollWidth: el.scrollWidth,
                    offsetWidth: el.offsetWidth,
                    text: (el.innerText || '').slice(0, 40).replace(/\\n/g, ' ')
                });
            }
        });

        fetch('/api/diag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                docW, winW, winH,
                heroHeight: document.querySelector('.hero-section')?.offsetHeight,
                navbarHeight: document.querySelector('.navbar')?.offsetHeight,
                bottomNavHeight: document.querySelector('.mobile-bottom-nav')?.offsetHeight,
                issues: issues.slice(0, 30)
            })
        });
    }, 500);
});
</script>
`;

html = html.replace('</body>', diagSnippet + '</body>');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/diag') {
        let body = '';
        req.on('data', c => body += c);
        req.on('end', () => {
            console.log('--- DIAGNOSTIC RESULT ---');
            console.log(JSON.stringify(JSON.parse(body), null, 2));
            res.writeHead(200);
            res.end('ok');
            setTimeout(() => {
                server.close();
                process.exit(0);
            }, 500);
        });
        return;
    }

    let safePath = path.normalize(decodeURI(req.url.split('?')[0])).replace(/^(\.\.[\/\\])+/, '');
    if (safePath === '/' || safePath === '\\') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(html);
        return;
    }

    const filePath = path.join(__dirname, safePath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const types = {
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.svg': 'image/svg+xml'
        };
        res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.writeHead(404);
        res.end('not found');
    }
});

server.listen(PORT, () => {
    console.log('Diagnostic server running on port', PORT);
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
        '--headless=new',
        '--disable-gpu',
        '--window-size=375,812',
        '--screenshot=' + path.resolve('mobile_diagnose.png'),
        'http://localhost:' + PORT
    ]);
    chrome.on('error', err => console.error('Chrome spawn error:', err));
});

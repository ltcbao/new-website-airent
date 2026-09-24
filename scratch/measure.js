const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9555',
    '--disable-gpu',
    'http://localhost:3000'
]);

setTimeout(async () => {
    try {
        const res = await fetch('http://127.0.0.1:9555/json');
        const tabs = await res.json();
        const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost')) || tabs.find(t => t.type === 'page');
        const wsUrl = pageTab.webSocketDebuggerUrl;

        const ws = new WebSocket(wsUrl);
        let step = 0;

        ws.onopen = () => {
            // Step 1: Set device metrics override for compact iPhone SE (375 x 667)
            ws.send(JSON.stringify({
                id: 1,
                method: 'Emulation.setDeviceMetricsOverride',
                params: {
                    width: 375,
                    height: 667,
                    deviceScaleFactor: 2,
                    mobile: true
                }
            }));
        };

        ws.onmessage = async (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id === 1) {
                // Step 2: Evaluate layout measurements
                const evalCode = `
                (() => {
                    const results = {
                        innerWidth: window.innerWidth,
                        innerHeight: window.innerHeight,
                        docScrollWidth: document.documentElement.scrollWidth,
                        bodyScrollWidth: document.body.scrollWidth,
                        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth || document.body.scrollWidth > window.innerWidth
                    };

                    const over = [];
                    document.querySelectorAll('*').forEach(el => {
                        const r = el.getBoundingClientRect();
                        if (r.right > window.innerWidth + 1 || el.scrollWidth > window.innerWidth + 1) {
                            over.push({
                                tag: el.tagName,
                                id: el.id,
                                className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 40) : '',
                                right: Math.round(r.right),
                                width: Math.round(r.width),
                                scrollWidth: el.scrollWidth
                            });
                        }
                    });
                    results.overflowCount = over.length;
                    results.overflowElements = over.slice(0, 10);
                    return results;
                })()
                `;

                ws.send(JSON.stringify({
                    id: 2,
                    method: 'Runtime.evaluate',
                    params: { expression: evalCode, returnByValue: true }
                }));
            } else if (msg.id === 2) {
                console.log('--- MOBILE EMULATION METRICS (390x844) ---');
                console.log(JSON.stringify(msg.result.result.value, null, 2));

                // Step 3: Capture screenshot
                ws.send(JSON.stringify({
                    id: 3,
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                }));
            } else if (msg.id === 3) {
                const base64Data = msg.result.data;
                fs.writeFileSync(path.resolve('mobile_emulation_375.png'), Buffer.from(base64Data, 'base64'));
                console.log('Saved mobile_emulation_375.png successfully!');
                ws.close();
                chromeProc.kill();
                process.exit(0);
            }
        };
    } catch (e) {
        console.error('Error:', e);
        chromeProc.kill();
        process.exit(1);
    }
}, 2000);

# Vạn Phát 86 - Nền Tảng Cho Thuê Thiết Bị Công Nghệ Cao Cấp

Website cho thuê điện thoại và thiết bị công nghệ hiện đại, mượt mà, được xây dựng hoàn toàn bằng **HTML5, CSS3 thuần (Vanilla CSS) và JavaScript (ES6+)**, cá nhân hoá toàn diện cho thương hiệu **Vạn Phát 86**.

---

## 🌟 Điểm Nổi Bật Về Giao Diện & Tính Năng

1. **Thẩm Mỹ Đẳng Cấp (Flagship Dark Luxury & Modern Tech)**:
   - Nhận diện thương hiệu riêng **Vạn Phát 86**.
   - Tông màu chủ đạo: Xanh Hoàng Gia (`#1a49ba`), Cam Đặc Trưng (`#F5661A`), Xanh Ngọc Lục Bảo (`#10b981`), và nền Đen Graphite sang trọng.
   - Hiệu ứng đổ bóng mờ ảo (Glow), kính mờ (Glassmorphism), bo góc mềm mại chuẩn Apple.
2. **Trải Nghiệm Mượt Mà (Smooth Micro-interactions)**:
   - Header cố định bám đỉnh (Sticky Navigation) tự đổi màu và bóng đổ khi cuộn trang.
   - Thanh tìm kiếm thông minh trực tiếp với dropdown tự động hoàn thành (Live Search Autocomplete).
   - Chuyển đổi linh hoạt giữa chế độ tính phí **Theo Ngày** và **Theo Tháng**.
   - Bộ chọn dung lượng bộ nhớ (128GB, 256GB, 512GB, 1TB) tự động cập nhật giá ngay trên từng thẻ sản phẩm.
3. **Bộ Công Cụ Dự Toán Giá Thuê Thông Minh (Interactive Rental Calculator)**:
   - Kéo thanh trượt chọn thời hạn thuê từ 30 ngày đến 480 ngày.
   - Tự động tính toán chi phí mỗi ngày, chi phí mỗi tháng, tiền cọc (0đ), và làm nổi bật **Đặc quyền tặng luôn máy**.
   - Nút "Đặt Thuê Theo Gói Này" tự động truyền thông tin vào form xác nhận đơn hàng của Vạn Phát 86.
4. **Quy Trình 5 Bước & Khuyến Mãi Thực Tế**:
   - Sử dụng bộ icon trực quan (`icons/order.png`, `approve.png`, `payment.png`, `delivery.png`, `return.png`).
   - Hình ảnh khuyến mại thực tế (`promotions/promotion-*.jpg`).
5. **Hệ Thống Hộp Thoại (Modals) & Thông Báo Toast**:
   - Modal Đặt Thuê Nhanh với tóm tắt gói cước và cam kết 0đ cọc tại Vạn Phát 86.
   - Modal Chi Tiết Máy kèm thông số kỹ thuật đầy đủ.
   - Modal Đăng Nhập Thành Viên với mã OTP demo (6868) và nút điền nhanh tài khoản dùng thử.
   - Modal Đăng Ký Đối Tác Kinh Doanh cùng Vạn Phát 86.
   - Nút liên hệ nhanh Hotline, Zalo OA, Messenger và Lên đầu trang.

---

## 📁 Cấu Trúc Dự Án Dễ Dàng Mở Rộng

```text
AirenWeb/
├── index.html              # Cấu trúc HTML5 ngữ nghĩa, tối ưu SEO thương hiệu Vạn Phát 86
├── server.js               # Node.js server cục bộ siêu nhẹ
├── package.json            # Cấu hình khởi chạy với npm start
│
├── css/
│   ├── variables.css       # Design System Tokens: Màu sắc, phông chữ, bo góc, bóng đổ
│   ├── style.css           # Bố cục cơ sở, thanh điều hướng, chân trang, responsive
│   └── components.css      # Toàn bộ linh kiện UI: Hero, Thẻ sản phẩm, Calculator, Modal...
│
├── js/
│   ├── data.js             # DỮ LIỆU ĐỘC LẬP: Sản phẩm, danh mục, khuyến mãi, FAQ, đánh giá
│   ├── calculator.js       # Module tính toán chi phí thuê và công thức ưu đãi
│   ├── modal.js            # Quản trị đóng/mở popup và thông báo toast
│   └── main.js             # Kết nối dữ liệu, render động, sự kiện tìm kiếm & bộ lọc
│
├── categories/             # Ảnh 4 danh mục nổi bật (iPhone 17, 16, 15, dòng khác)
├── icons/                  # Bộ icon quy trình thuê máy
├── images/                 # Ảnh banner siêu phẩm chất lượng cao (Vạn Phát 86)
├── phones/                 # Ảnh minh họa các dòng thiết bị
└── promotions/             # Ảnh các chương trình ưu đãi thực tế
```

---

## 🛠️ Hướng Dẫn Mở Rộng & Tùy Biến

### 1. Thêm máy mới hoặc cập nhật giá thuê
Mở file [`js/data.js`](file:///g:/OLD/Working/AirenWeb/js/data.js) và thêm vào mảng `products`:
```javascript
{
    id: "ip-17-pro",
    name: "iPhone 17 Pro",
    model: "iphone-17",
    condition: "Hàng mới 100% Nguyên Seal",
    isNew: true,
    badge: "SẮP RA MẮT",
    badgeType: "hot",
    thumbnail: "phones/ip17p.png",
    countryVariant: "VN/A Chính Hãng",
    defaultCapacity: "256GB",
    capacities: ["256GB", "512GB"],
    capacityPricing: {
        "256GB": { daily: 55000, monthly: 1650000, deposit: 0 }
    },
    features: ["Chip Apple A19 Pro", "Thiết kế hợp kim mới", "Camera nâng cấp"]
}
```
*Giao diện danh sách sản phẩm, bộ lọc và công cụ tính giá sẽ tự động cập nhật ngay lập tức mà không cần sửa code HTML!*

### 2. Đổi màu thương hiệu hoặc phông chữ
Mở file [`css/variables.css`](file:///g:/OLD/Working/AirenWeb/css/variables.css) và điều chỉnh mã màu:
```css
:root {
    --accent: #F5661A;         /* Màu cam chủ đạo */
    --primary: #1a49ba;        /* Màu xanh hoàng gia */
}
```

---

## 🚀 Cách Chạy Dự Án

### Cách 1: Sử dụng máy chủ Node.js (Khuyên dùng)
Chạy lệnh trong terminal:
```bash
npm start
```
Truy cập: `http://localhost:3000`

### Cách 2: Mở trực tiếp
Nhấp đúp chuột trực tiếp vào file [`index.html`](file:///g:/OLD/Working/AirenWeb/index.html) trong thư mục dự án để mở trên bất kỳ trình duyệt nào (Chrome, Edge, Safari, Firefox).

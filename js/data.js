/**
 * VẠN PHÁT 86 - DATA STORE
 * Dễ dàng mở rộng, thêm mới sản phẩm, danh mục, câu hỏi FAQ hoặc chương trình khuyến mãi
 */

const VANPHAT86_DATA = {
    // Thông tin chung của thương hiệu Vạn Phát 86
    brand: {
        name: "Vạn Phát 86",
        tagline: "Nền Tảng Cho Thuê Thiết Bị Công Nghệ Cao Cấp - Số 1 Việt Nam",
        slogan: "Hãy để công nghệ sẵn sàng cho bạn sử dụng, cuộc sống càng thêm tuyệt vời!",
        hotline: "SĐT",
        hotlineDisplay: "SĐT",
        hotlineTel: "tel:SĐT",
        zalo: "https://zalo.me",
        messenger: "https://m.me/vanphat86",
        email: "Email",
        addressHcm: "Địa chỉ",
        addressHn: "Địa chỉ"
    },

    // 4 Danh mục nhóm điện thoại nổi bật trên trang chủ
    categories: [
        {
            id: "cat-1",
            tag: "iPhone 17",
            title: "Các sản phẩm mới nhất dòng iPhone 17",
            desc: "Trải nghiệm siêu phẩm công nghệ tương lai với hiệu năng đỉnh cao",
            image: "categories/category-1.png",
            filterKey: "iphone-17",
            badge: "Sắp ra mắt"
        },
        {
            id: "cat-2",
            tag: "iPhone 16",
            title: "Các dòng iPhone 16 Series cao cấp",
            desc: "Nút Camera Control, Apple Intelligence & Chip A18 Pro mạnh mẽ",
            image: "categories/category-2.png",
            filterKey: "iphone-16",
            badge: "Cực hot"
        },
        {
            id: "cat-3",
            tag: "iPhone 15",
            title: "iPhone 15 Series - Sang xịn, tối ưu",
            desc: "Thiết kế Titan bền bỉ, Dynamic Island, cổng Type-C tiện lợi",
            image: "categories/category-3.png",
            filterKey: "iphone-15",
            badge: "Bán chạy"
        },
        {
            id: "cat-4",
            tag: "iPhone Khác & Tablet",
            title: "Các dòng iPhone 14, 13, iPad Pro",
            desc: "Giá thuê siêu tiết kiệm từ 18.000đ/ngày, đầy đủ dòng máy zin keng",
            image: "categories/category-4.png",
            filterKey: "other",
            badge: "Tiết kiệm"
        }
    ],

    // Danh sách sản phẩm cho thuê tại Vạn Phát 86
    products: [
        {
            id: "ip-16-prm",
            name: "iPhone 16 Pro Max",
            model: "iphone-16",
            series: "iPhone 16 Series",
            condition: "Hàng mới 100% Nguyên Seal",
            isNew: true,
            badge: "TẶNG MÁY",
            badgeType: "hot",
            thumbnail: "images/iphone_16_pro_max.jpg",
            gallery: [
                "images/iphone_16_pro_max.jpg",
                "categories/category-2.png",
                "images/hero_flagship_banner.jpg"
            ],
            countryVariant: "VN/A Chính Hãng",
            defaultCapacity: "256GB",
            capacities: ["256GB", "512GB", "1TB"],
            capacityPricing: {
                "256GB": { daily: 49500, monthly: 1485000, deposit: 0 },
                "512GB": { daily: 57000, monthly: 1710000, deposit: 0 },
                "1TB": { daily: 66000, monthly: 1980000, deposit: 0 }
            },
            colors: ["Titan Sa Mạc", "Titan Tự Nhiên", "Titan Trắng", "Titan Đen"],
            features: [
                "Chip Apple A18 Pro 3nm siêu tốc",
                "Màn hình OLED 6.9-inch 120Hz ProMotion",
                "Camera 48MP Zoom quang học 5X",
                "Nút điều khiển Camera Control mới",
                "Bảo hiểm rơi vỡ 90% chi phí"
            ],
            durations: ["90 ngày", "180 ngày", "300 ngày", "390 ngày", "480 ngày"],
            specialNote: "Sau khi hoàn thành kỳ hạn thuê, khách hàng ĐƯỢC TẶNG LUÔN MÁY sở hữu vĩnh viễn!"
        },
        {
            id: "ip-16-pro",
            name: "iPhone 16 Pro",
            model: "iphone-16",
            series: "iPhone 16 Series",
            condition: "Hàng mới 100% Nguyên Seal",
            isNew: true,
            badge: "0Đ CỌC",
            badgeType: "featured",
            thumbnail: "categories/category-2.png",
            gallery: [
                "categories/category-2.png",
                "images/iphone_16_pro_max.jpg"
            ],
            countryVariant: "VN/A Chính Hãng",
            defaultCapacity: "128GB",
            capacities: ["128GB", "256GB", "512GB"],
            capacityPricing: {
                "128GB": { daily: 41000, monthly: 1230000, deposit: 0 },
                "256GB": { daily: 46000, monthly: 1380000, deposit: 0 },
                "512GB": { daily: 53000, monthly: 1590000, deposit: 0 }
            },
            colors: ["Titan Sa Mạc", "Titan Tự Nhiên", "Titan Đen", "Titan Trắng"],
            features: [
                "Chip Apple A18 Pro",
                "Màn hình OLED 6.3-inch 120Hz",
                "Camera 48MP Quad-Pixel Zoom 5X",
                "Khung viền Titanium cấp độ 5",
                "Pin trâu cả ngày làm việc"
            ],
            durations: ["90 ngày", "180 ngày", "300 ngày", "390 ngày", "480 ngày"],
            specialNote: "Tặng trọn bộ phụ kiện sạc nhanh 20W + Ốp lưng bảo vệ chính hãng."
        },
        {
            id: "ip-16-std",
            name: "iPhone 16 Plus / Standard",
            model: "iphone-16",
            series: "iPhone 16 Series",
            condition: "Hàng mới 100% Nguyên Seal",
            isNew: true,
            badge: "GIÁ TỐT",
            badgeType: "sale",
            thumbnail: "categories/category-2.png",
            gallery: ["categories/category-2.png"],
            countryVariant: "VN/A Chính Hãng",
            defaultCapacity: "128GB",
            capacities: ["128GB", "256GB"],
            capacityPricing: {
                "128GB": { daily: 32000, monthly: 960000, deposit: 0 },
                "256GB": { daily: 37000, monthly: 1110000, deposit: 0 }
            },
            colors: ["Xanh Mòng Két (Teal)", "Xanh Lưu Ly (Ultramarine)", "Hồng (Pink)", "Đen", "Trắng"],
            features: [
                "Chip Apple A18 tiến trình 3nm",
                "Camera kép 48MP Fusion sắc nét",
                "Nút Tác Vụ (Action Button) tiện lợi",
                "Thời lượng pin ấn tượng đến 27h"
            ],
            durations: ["90 ngày", "180 ngày", "300 ngày", "390 ngày"],
            specialNote: "Duyệt hồ sơ nhanh chỉ với CCCD gắn chip qua eKYC."
        },
        {
            id: "ip-15-prm",
            name: "iPhone 15 Pro Max",
            model: "iphone-15",
            series: "iPhone 15 Series",
            condition: "Like New 99% / Nguyên Seal",
            isNew: false,
            badge: "QUỐC DÂN",
            badgeType: "hot",
            thumbnail: "images/iphone_15_pro.jpg",
            gallery: [
                "images/iphone_15_pro.jpg",
                "categories/category-3.png"
            ],
            countryVariant: "VN/A Chính Hãng",
            defaultCapacity: "256GB",
            capacities: ["256GB", "512GB", "1TB"],
            capacityPricing: {
                "256GB": { daily: 39000, monthly: 1170000, deposit: 0 },
                "512GB": { daily: 44000, monthly: 1320000, deposit: 0 },
                "1TB": { daily: 51000, monthly: 1530000, deposit: 0 }
            },
            colors: ["Titan Tự Nhiên", "Titan Xanh", "Titan Trắng", "Titan Đen"],
            features: [
                "Chip A17 Pro chơi game mượt mà",
                "Khung viền Titanium nhẹ và đầm tay",
                "Cổng kết nối USB-C chuẩn 3.0 tốc độ cao",
                "Camera tiềm vọng Zoom 5X"
            ],
            durations: ["90 ngày", "180 ngày", "300 ngày", "390 ngày", "480 ngày"],
            specialNote: "Lựa chọn số 1 của anh em reviewer và các nhà sáng tạo nội dung."
        },
        {
            id: "ip-15-pro",
            name: "iPhone 15 Pro",
            model: "iphone-15",
            series: "iPhone 15 Series",
            condition: "Like New 99% Chuẩn Zin",
            isNew: false,
            badge: "YÊU THÍCH",
            badgeType: "featured",
            thumbnail: "images/iphone_15_pro.jpg",
            gallery: ["images/iphone_15_pro.jpg"],
            countryVariant: "VN/A Chính Hãng",
            defaultCapacity: "128GB",
            capacities: ["128GB", "256GB"],
            capacityPricing: {
                "128GB": { daily: 31000, monthly: 930000, deposit: 0 },
                "256GB": { daily: 36000, monthly: 1080000, deposit: 0 }
            },
            colors: ["Titan Tự Nhiên", "Titan Đen", "Titan Trắng"],
            features: [
                "Kích thước nhỏ gọn 6.1-inch 120Hz",
                "Chip A17 Pro mạnh mẽ",
                "Vỏ máy Titanium cao cấp",
                "Cổng sạc Type-C tiện dụng"
            ],
            durations: ["90 ngày", "180 ngày", "300 ngày", "390 ngày"],
            specialNote: "Gói bảo hiểm toàn diện bao rơi vỡ, vào nước."
        },
        {
            id: "ip-15-std",
            name: "iPhone 15 128GB",
            model: "iphone-15",
            series: "iPhone 15 Series",
            condition: "Hàng Like New 99% / Mới",
            isNew: false,
            badge: "GIÁ RẺ",
            badgeType: "sale",
            thumbnail: "categories/category-3.png",
            gallery: ["categories/category-3.png"],
            countryVariant: "VN/A",
            defaultCapacity: "128GB",
            capacities: ["128GB", "256GB"],
            capacityPricing: {
                "128GB": { daily: 24000, monthly: 720000, deposit: 0 },
                "256GB": { daily: 29000, monthly: 870000, deposit: 0 }
            },
            colors: ["Hồng Pastel", "Xanh Mint", "Vàng Nhạt", "Đen", "Xanh Lam"],
            features: [
                "Màn hình Dynamic Island thời thượng",
                "Camera 48MP sắc nét gấp 4 lần",
                "Mặt lưng kính nhám sang trọng",
                "Cổng sạc chuẩn USB-C"
            ],
            durations: ["90 ngày", "180 ngày", "300 ngày"],
            specialNote: "Học sinh, sinh viên được ưu đãi giảm thêm 10% khi đăng ký tại Vạn Phát 86."
        },
        {
            id: "ip-14-prm",
            name: "iPhone 14 Pro Max",
            model: "iphone-14",
            series: "iPhone 14 Series",
            condition: "Like New 99% Zin Đẹp",
            isNew: false,
            badge: "TIẾT KIỆM",
            badgeType: "featured",
            thumbnail: "categories/category-4.png",
            gallery: ["categories/category-4.png"],
            countryVariant: "VN/A",
            defaultCapacity: "128GB",
            capacities: ["128GB", "256GB"],
            capacityPricing: {
                "128GB": { daily: 28000, monthly: 840000, deposit: 0 },
                "256GB": { daily: 33000, monthly: 990000, deposit: 0 }
            },
            colors: ["Tím Deep Purple", "Vàng Gold", "Đen Space Black", "Bạc Silver"],
            features: [
                "Màn hình Dynamic Island 6.7 inch",
                "Chip Apple A16 Bionic mượt mà",
                "Camera 48MP chất ảnh chân thực",
                "Thời lượng pin xuất sắc"
            ],
            durations: ["90 ngày", "180 ngày", "300 ngày"],
            specialNote: "Máy tuyển chọn đẹp keng, pin zin 88% - 100%."
        },
        {
            id: "ip-13-std",
            name: "iPhone 13 128GB",
            model: "iphone-13",
            series: "iPhone 13 Series",
            condition: "Like New 99% Chuẩn Zin",
            isNew: false,
            badge: "BÌNH DÂN",
            badgeType: "sale",
            thumbnail: "categories/category-4.png",
            gallery: ["categories/category-4.png"],
            countryVariant: "VN/A",
            defaultCapacity: "128GB",
            capacities: ["128GB", "256GB"],
            capacityPricing: {
                "128GB": { daily: 18500, monthly: 555000, deposit: 0 },
                "256GB": { daily: 22000, monthly: 660000, deposit: 0 }
            },
            colors: ["Xanh Lục Bảo", "Hồng", "Trắng Tinh Khôi", "Đen Midnight"],
            features: [
                "Chip Apple A15 Bionic bền bỉ",
                "Thiết kế vuông vắn kinh điển",
                "Thời lượng pin cải tiến vượt bậc",
                "Giá thuê siêu bình dân"
            ],
            durations: ["90 ngày", "180 ngày", "270 ngày"],
            specialNote: "Phù hợp học sinh, sinh viên, tài xế công nghệ hoặc làm máy phụ phục vụ công việc."
        }
    ],

    // 5 Bước quy trình thuê minh bạch tại Vạn Phát 86
    processSteps: [
        {
            step: 1,
            icon: "icons/order.png",
            title: "Chọn máy & Kỳ hạn",
            desc: "Lựa chọn dòng iPhone yêu thích, màu sắc, dung lượng và thời gian thuê phù hợp nhu cầu."
        },
        {
            step: 2,
            icon: "icons/approve.png",
            title: "Duyệt hồ sơ 5 phút",
            desc: "Xác thực định danh eKYC online 100%. Không giữ giấy tờ gốc, không gọi điện thẩm định người thân."
        },
        {
            step: 3,
            icon: "icons/payment.png",
            title: "Ký HĐ & Thanh toán",
            desc: "Ký hợp đồng điện tử bảo mật minh bạch và thanh toán kỳ phí thuê đầu tiên một cách tiện lợi."
        },
        {
            step: 4,
            icon: "icons/delivery.png",
            title: "Nhận máy & Đồng kiểm",
            desc: "Giao hỏa tốc 2H tại TP.HCM & Hà Nội hoặc chuyển phát toàn quốc. Mở hộp kiểm tra ưng ý mới nhận."
        },
        {
            step: 5,
            icon: "icons/return.png",
            title: "TẶNG LUÔN MÁY",
            desc: "Hoàn tất chu kỳ thuê đúng hạn, khách hàng được TẶNG LUÔN MÁY để sở hữu vĩnh viễn không mất thêm phí!"
        }
    ],

    // Khuyến mãi thực tế của Vạn Phát 86
    promotions: [
        {
            id: "promo-1",
            image: "promotions/promotion-1.jpg",
            title: "Đặc Quyền Phái Đẹp",
            discount: "15%",
            subtitle: "Dành riêng cho khách hàng nữ",
            desc: "Giảm trực tiếp 15% phí thuê kỳ đầu tiên khi đăng ký các dòng iPhone 15 & 16 Series màu Hồng / Sa mạc."
        },
        {
            id: "promo-2",
            image: "promotions/promotion-2.jpg",
            title: "Ưu Đãi Học Sinh - Sinh Viên",
            discount: "10%",
            subtitle: "Hỗ trợ học tập và sáng tạo",
            desc: "Chỉ cần xuất trình thẻ sinh viên, nhận ngay gói bảo hiểm rơi vỡ miễn phí + giảm 10% phí thuê."
        },
        {
            id: "promo-3",
            image: "promotions/promotion-3.jpg",
            title: "Lên Đời Flagship 0đ",
            discount: "0Đ CỌC",
            subtitle: "Đồng kiểm máy tại nhà",
            desc: "Trải nghiệm iPhone 16 Pro Max nguyên seal không cần bỏ số tiền lớn, duyệt hồ sơ tự động trong 5 phút."
        },
        {
            id: "promo-5",
            image: "promotions/promotion-5.jpg",
            title: "Gói Bảo Hiểm Toàn Diện VIP",
            discount: "FREE",
            subtitle: "Yên tâm 100% khi sử dụng",
            desc: "Tặng gói bảo hành 1 đổi 1 và bảo hiểm rơi vỡ màn hình lên tới 90% chi phí cho các hợp đồng từ 6 tháng."
        }
    ],

    // Đánh giá khách hàng thực tế
    testimonials: [
        {
            name: "Trần Minh Quân",
            role: "Content Creator / TikToker",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
            rating: 5,
            comment: "Mình làm sáng tạo video nên cần đổi máy liên tục để có camera tốt nhất. Nhờ Vạn Phát 86, mình vừa bóc seal con 16 Pro Max mà không phải bỏ ra 35 triệu. Thủ tục cực nhanh, sau kỳ thuê còn được giữ luôn máy!"
        },
        {
            name: "Nguyễn Hải Yến",
            role: "Nhân viên Ngân hàng (TP.HCM)",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
            rating: 5,
            comment: "Ban đầu mình lo về việc đặt cọc nhưng ở Vạn Phát 86 đúng là 0đ cọc thật! Anh shipper giao tới cho mình mở hộp cắm sim test chán chê rồi mới thanh toán kỳ đầu. Dịch vụ quá uy tín."
        },
        {
            name: "Lê Hoàng Phúc",
            role: "Sinh viên ĐH Quốc Gia",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            rating: 5,
            comment: "Gói thuê dành cho sinh viên siêu hời, mỗi ngày tính ra chưa tới 20k là có iPhone 13 xịn xò dùng mượt mà. Hỗ trợ tư vấn Zalo nhiệt tình 24/7."
        }
    ],

    // Câu hỏi thường gặp thực tế từ Vạn Phát 86
    faqs: [
        {
            q: "Có cần đặt cọc tiền khi thuê máy tại Vạn Phát 86 không?",
            a: "HOÀN TOÀN KHÔNG CẦN CỌC. Vạn Phát 86 áp dụng chính sách 0đ Tiền Cọc cho khách hàng vượt qua thẩm định eKYC tự động. Khi nhân viên giao máy tới, bạn được mở hộp kiểm tra kỹ lưỡng, hài lòng mới thanh toán kỳ đầu tiên."
        },
        {
            q: "Sau thời gian thuê tôi có được sở hữu luôn máy không?",
            a: "CÓ, ĐƯỢC TẶNG LUÔN MÁY! Với các gói thuê đủ điều kiện (từ 10 - 16 tháng), sau khi bạn hoàn tất đầy đủ các kỳ thanh toán theo hợp đồng, chiếc điện thoại sẽ thuộc quyền sở hữu vĩnh viễn của bạn mà không phải trả thêm bất kỳ chi phí nào."
        },
        {
            q: "Không cọc thì có uy tín không? Có rủi ro gì không?",
            a: "Vạn Phát 86 là nền tảng cho thuê thiết bị công nghệ chính thức, có pháp nhân rõ ràng và trụ sở tại Địa chỉ. Mọi giao dịch đều có hợp đồng điện tử pháp lý rõ ràng, khách hàng nhận máy đồng kiểm tại nhà rồi mới thanh toán, hoàn toàn an tâm 100%."
        },
        {
            q: "Máy cho thuê là máy mới hay máy cũ? Có bảo hành không?",
            a: "Vạn Phát 86 cung cấp cả 2 lựa chọn: Hàng Mới 100% Nguyên Seal (khách tự tay bóc seal) và Hàng Like New 99% zin chuẩn Apple VN/A. Tất cả thiết bị đều đi kèm chế độ bảo hành 1 đổi 1 và gói bảo hiểm hỗ trợ rơi vỡ, vào nước lên đến 90% chi phí."
        },
        {
            q: "Thủ tục thuê cần những giấy tờ gì? Sinh viên thuê được không?",
            a: "Thủ tục cực kỳ đơn giản: Chỉ cần CCCD gắn chip chính chủ và điện thoại có camera để chụp ảnh xác thực khuôn mặt (eKYC) trong 5 phút. Học sinh, sinh viên trên 18 tuổi hoàn toàn thuê được và còn được hưởng thêm mã giảm giá đặc quyền."
        },
        {
            q: "Vạn Phát 86 có giao hàng toàn quốc không? Tôi ở tỉnh xa có thuê được không?",
            a: "CÓ! Vạn Phát 86 giao hàng hỏa tốc trong 2H tại TP.HCM & Hà Nội, và hỗ trợ ship COD đồng kiểm toàn quốc qua đối tác vận chuyển hỏa tốc. Dù bạn ở bất kỳ tỉnh thành nào cũng có thể kiểm tra máy trước khi thanh toán."
        },
        {
            q: "Nếu trong quá trình sử dụng tôi làm rơi vỡ máy thì sao?",
            a: "Tất cả các máy thuê tại Vạn Phát 86 đều được tham gia Gói Bảo Hiểm Toàn Diện. Trong trường hợp không may xảy ra rơi vỡ hoặc vào nước, bảo hiểm sẽ chi trả đến 90% chi phí linh kiện chính hãng, khách hàng chỉ thanh toán phần phí hỗ trợ rất nhỏ."
        }
    ]
};

window.VANPHAT86_DATA = VANPHAT86_DATA;

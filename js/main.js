/**
 * VẠN PHÁT 86 - MAIN APPLICATION SCRIPT
 * Quản trị hiển thị sản phẩm, bộ lọc, tìm kiếm, sự kiện và hiệu ứng mượt mà
 */

document.addEventListener('DOMContentLoaded', () => {
    // Lấy nguồn dữ liệu
    const DATA = window.VANPHAT86_DATA;

    // Biến trạng thái toàn cục
    let currentPricingMode = 'monthly'; // 'daily' hoặc 'monthly'
    let currentCategoryFilter = 'all';

    // 1. Quản lý Sticky Navbar & Back-to-Top Button
    const navbar = document.getElementById('navbar');
    const floatTop = document.getElementById('floatTop');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        if (scrollPos > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (floatTop) {
            if (scrollPos > 400) {
                floatTop.classList.add('visible');
            } else {
                floatTop.classList.remove('visible');
            }
        }
    });

    if (floatTop) {
        floatTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. Render Danh Mục Nổi Bật (4 Nhóm Điện Thoại)
    function renderCategories() {
        const container = document.getElementById('categoriesGrid');
        if (!container || !DATA.categories) return;

        container.innerHTML = DATA.categories.map(cat => `
            <div class="category-card" onclick="filterByCategory('${cat.filterKey}')">
                <div class="category-header">
                    <span class="category-tag">${cat.tag}</span>
                    <h3>${cat.title}</h3>
                    <p>${cat.desc}</p>
                </div>
                <div class="category-img-wrap">
                    <img src="${cat.image}" alt="${cat.title}" loading="lazy">
                </div>
                <div class="category-footer-link">
                    <span>Xem danh sách máy</span> &rarr;
                </div>
            </div>
        `).join('');
    }

    // 3. Render Danh Sách Sản Phẩm Cho Thuê
    function renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid || !DATA.products) return;

        // Lọc theo danh mục được chọn
        let filtered = DATA.products;
        if (currentCategoryFilter !== 'all') {
            if (currentCategoryFilter === 'new-seal') {
                filtered = filtered.filter(p => p.isNew);
            } else if (currentCategoryFilter === 'like-new') {
                filtered = filtered.filter(p => !p.isNew);
            } else {
                filtered = filtered.filter(p => p.model === currentCategoryFilter);
            }
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <p style="font-size: 1.1rem; color: #64748b;">Không tìm thấy sản phẩm phù hợp. Vui lòng chọn danh mục khác.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(phone => {
            const defaultCap = phone.defaultCapacity || phone.capacities[0];
            const pricing = phone.capacityPricing[defaultCap] || Object.values(phone.capacityPricing)[0];
            const priceVal = currentPricingMode === 'daily' ? pricing.daily : pricing.monthly;
            const priceUnit = currentPricingMode === 'daily' ? '/ ngày' : '/ tháng';
            const priceFormatted = new Intl.NumberFormat('vi-VN').format(priceVal) + 'đ';

            // Tạo các nút chọn dung lượng
            const capacityPills = phone.capacities.map(cap => `
                <button type="button" class="capacity-btn ${cap === defaultCap ? 'active' : ''}" 
                        onclick="selectCardCapacity(event, '${phone.id}', '${cap}')">
                    ${cap}
                </button>
            `).join('');

            return `
                <div class="product-card" id="card-${phone.id}" data-phone-id="${phone.id}" data-selected-cap="${defaultCap}">
                    <div class="product-thumb-wrap">
                        <div class="product-badge-group">
                            <span class="badge-pill ${phone.badgeType}">${phone.badge}</span>
                        </div>
                        <span class="product-condition-tag">${phone.condition}</span>
                        <img src="${phone.thumbnail}" alt="${phone.name}" id="img-${phone.id}" loading="lazy">
                    </div>

                    <div class="product-body">
                        <h3 class="product-name">${phone.name}</h3>
                        <div class="product-country">
                            <span>🇻🇳 ${phone.countryVariant}</span>
                            <span style="color: #cbd5e1;">•</span>
                            <span style="color: #10b981;">0đ Tiền Cọc</span>
                        </div>

                        <!-- Dung lượng -->
                        <div class="capacity-selector" id="caps-${phone.id}">
                            ${capacityPills}
                        </div>

                        <!-- Danh sách tính năng nổi bật -->
                        <ul class="product-specs-list">
                            ${phone.features.slice(0, 3).map(f => `<li><span class="dot">•</span> ${f}</li>`).join('')}
                        </ul>

                        <!-- Giá thuê -->
                        <div class="product-price-box">
                            <div>
                                <div class="price-label">Giá thuê ${currentPricingMode === 'daily' ? 'theo ngày' : 'trọn gói tháng'}:</div>
                                <span class="price-amount" id="price-${phone.id}">${priceFormatted}</span>
                                <span class="price-unit" id="unit-${phone.id}">${priceUnit}</span>
                            </div>
                            <span class="deposit-pill">Tặng luôn máy</span>
                        </div>

                        <!-- Nút thao tác -->
                        <div class="product-actions">
                            <button class="btn btn-outline btn-sm" onclick="showProductDetails('${phone.id}')">
                                Chi Tiết
                            </button>
                            <button class="btn btn-accent btn-sm" onclick="quickBookPhone('${phone.id}')">
                                Thuê Ngay
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 4. Xử lý đổi dung lượng trên Card sản phẩm
    window.selectCardCapacity = function(event, phoneId, capacity) {
        event.stopPropagation();
        const phone = DATA.products.find(p => p.id === phoneId);
        if (!phone) return;

        const card = document.getElementById(`card-${phoneId}`);
        if (!card) return;

        // Cập nhật thuộc tính
        card.setAttribute('data-selected-cap', capacity);

        // Đổi class active cho các nút
        const capBtns = card.querySelectorAll('.capacity-btn');
        capBtns.forEach(btn => {
            btn.classList.toggle('active', btn.textContent.trim() === capacity);
        });

        // Cập nhật giá
        const pricing = phone.capacityPricing[capacity];
        if (pricing) {
            const priceVal = currentPricingMode === 'daily' ? pricing.daily : pricing.monthly;
            const priceFormatted = new Intl.NumberFormat('vi-VN').format(priceVal) + 'đ';
            const priceEl = document.getElementById(`price-${phoneId}`);
            if (priceEl) priceEl.textContent = priceFormatted;
        }
    };

    // 5. Thao tác mở modal từ sản phẩm
    window.quickBookPhone = function(phoneId) {
        const phone = DATA.products.find(p => p.id === phoneId);
        if (!phone) return;
        const card = document.getElementById(`card-${phoneId}`);
        const selectedCap = card ? card.getAttribute('data-selected-cap') : phone.defaultCapacity;
        if (window.modalManager) {
            window.modalManager.openBooking(phone, selectedCap);
        }
    };

    window.showProductDetails = function(phoneId) {
        const phone = DATA.products.find(p => p.id === phoneId);
        if (phone && window.modalManager) {
            window.modalManager.openDetail(phone);
        }
    };

    // 6. Chuyển đổi chế độ tính giá: Theo Ngày / Theo Tháng
    const btnPriceDaily = document.getElementById('btnPriceDaily');
    const btnPriceMonthly = document.getElementById('btnPriceMonthly');

    if (btnPriceDaily && btnPriceMonthly) {
        btnPriceDaily.addEventListener('click', () => {
            currentPricingMode = 'daily';
            btnPriceDaily.classList.add('active');
            btnPriceMonthly.classList.remove('active');
            renderProducts();
        });

        btnPriceMonthly.addEventListener('click', () => {
            currentPricingMode = 'monthly';
            btnPriceMonthly.classList.add('active');
            btnPriceDaily.classList.remove('active');
            renderProducts();
        });
    }

    // 7. Lọc theo Tab Danh Mục
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategoryFilter = tab.getAttribute('data-filter');
            renderProducts();
        });
    });

    window.filterByCategory = function(categoryKey) {
        // Cuộn tới section sản phẩm
        const target = document.getElementById('products');
        if (target) {
            const offset = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }

        // Kích hoạt tab tương ứng
        filterTabs.forEach(tab => {
            if (tab.getAttribute('data-filter') === categoryKey) {
                tab.click();
            }
        });
    };

    // 8. Tìm kiếm trực tiếp với Autocomplete Dropdown
    const searchInput = document.getElementById('navSearchInput');
    const searchDropdown = document.getElementById('searchResultsDropdown');

    if (searchInput && searchDropdown) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.trim().toLowerCase();
            if (val.length === 0) {
                searchDropdown.classList.remove('active');
                return;
            }

            const matches = DATA.products.filter(p => 
                p.name.toLowerCase().includes(val) ||
                p.model.toLowerCase().includes(val) ||
                p.condition.toLowerCase().includes(val) ||
                p.features.some(f => f.toLowerCase().includes(val))
            );

            if (matches.length > 0) {
                searchDropdown.innerHTML = matches.map(p => {
                    const priceFormatted = new Intl.NumberFormat('vi-VN').format(p.capacityPricing[p.defaultCapacity]?.monthly || 1000000) + 'đ/tháng';
                    return `
                        <div class="search-result-item" onclick="quickBookPhone('${p.id}')">
                            <img src="${p.thumbnail}" alt="${p.name}" class="search-result-thumb">
                            <div class="search-result-info">
                                <h4>${p.name} (${p.condition})</h4>
                                <p>Giá từ: ${priceFormatted} • 0đ cọc</p>
                            </div>
                        </div>
                    `;
                }).join('');
                searchDropdown.classList.add('active');
            } else {
                searchDropdown.innerHTML = `
                    <div style="padding: 16px; text-align: center; color: #64748b; font-size: 0.85rem;">
                        Không tìm thấy dòng máy phù hợp với "${val}"
                    </div>
                `;
                searchDropdown.classList.add('active');
            }
        });

        // Ẩn dropdown khi click ra ngoài
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.remove('active');
            }
        });
    }

    // 8.1 Xử lý Mobile Search Bar & Drawer Search Input
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const mobileSearchBar = document.getElementById('mobileSearchBar');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchDropdown = document.getElementById('mobileSearchResultsDropdown');
    const drawerSearchInput = document.getElementById('drawerSearchInput');

    if (mobileSearchBtn && mobileSearchBar) {
        mobileSearchBtn.addEventListener('click', () => {
            mobileSearchBar.classList.toggle('active');
            if (mobileSearchBar.classList.contains('active') && mobileSearchInput) {
                mobileSearchInput.focus();
            }
        });
    }

    function setupSearchField(inputEl, dropdownEl) {
        if (!inputEl || !dropdownEl) return;
        inputEl.addEventListener('input', (e) => {
            const val = e.target.value.trim().toLowerCase();
            if (val.length === 0) {
                dropdownEl.classList.remove('active');
                return;
            }

            const matches = DATA.products.filter(p => 
                p.name.toLowerCase().includes(val) ||
                p.model.toLowerCase().includes(val) ||
                p.condition.toLowerCase().includes(val) ||
                p.features.some(f => f.toLowerCase().includes(val))
            );

            if (matches.length > 0) {
                dropdownEl.innerHTML = matches.map(p => {
                    const priceFormatted = new Intl.NumberFormat('vi-VN').format(p.capacityPricing[p.defaultCapacity]?.monthly || 1000000) + 'đ/tháng';
                    return `
                        <div class="search-result-item" onclick="quickBookPhone('${p.id}'); document.getElementById('mobileSearchBar')?.classList.remove('active'); toggleMobileMenu(false);">
                            <img src="${p.thumbnail}" alt="${p.name}" class="search-result-thumb">
                            <div class="search-result-info">
                                <h4>${p.name} (${p.condition})</h4>
                                <p>Giá từ: ${priceFormatted} • 0đ cọc</p>
                            </div>
                        </div>
                    `;
                }).join('');
                dropdownEl.classList.add('active');
            } else {
                dropdownEl.innerHTML = `
                    <div style="padding: 14px; text-align: center; color: #64748b; font-size: 0.85rem;">
                        Không tìm thấy máy phù hợp với "${val}"
                    </div>
                `;
                dropdownEl.classList.add('active');
            }
        });
    }

    setupSearchField(mobileSearchInput, mobileSearchDropdown);
    setupSearchField(drawerSearchInput, searchDropdown);

    // 8.2 ScrollSpy cho Mobile Bottom Navigation
    const mobileBottomTabs = document.querySelectorAll('.mobile-bottom-nav .mobile-tab-item');
    const trackedSections = [
        { id: 'home', tabIndex: 0 },
        { id: 'products', tabIndex: 1 },
        { id: 'calculator', tabIndex: 2 }
    ];

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        trackedSections.forEach(sec => {
            const el = document.getElementById(sec.id);
            if (el) {
                const top = el.offsetTop - 120;
                const height = el.offsetHeight;
                if (scrollY >= top && scrollY < top + height) {
                    mobileBottomTabs.forEach(t => t.classList.remove('active'));
                    if (mobileBottomTabs[sec.tabIndex]) {
                        mobileBottomTabs[sec.tabIndex].classList.add('active');
                    }
                }
            }
        });
    });

    // 9. Render 5 Bước Quy Trình Thuê
    function renderProcess() {
        const container = document.getElementById('processGrid');
        if (!container || !DATA.processSteps) return;

        container.innerHTML = DATA.processSteps.map(step => `
            <div class="process-step-card">
                <div class="step-num-pill">${step.step}</div>
                <div class="step-icon-wrap">
                    <img src="${step.icon}" alt="${step.title}" loading="lazy">
                </div>
                <h4>${step.title}</h4>
                <p>${step.desc}</p>
            </div>
        `).join('');
    }

    // 10. Render Khuyến Mãi (Promotions)
    function renderPromotions() {
        const container = document.getElementById('promotionsGrid');
        if (!container || !DATA.promotions) return;

        container.innerHTML = DATA.promotions.map(promo => `
            <div class="promo-card" onclick="window.modalManager?.openModal('bookingModal')">
                <img src="${promo.image}" alt="${promo.title}" class="promo-bg-img" loading="lazy">
                <div class="promo-overlay"></div>
                <div class="promo-content">
                    <div class="promo-discount-badge">${promo.discount}</div>
                    <h4 class="promo-title">${promo.title}</h4>
                    <p class="promo-desc">${promo.desc}</p>
                    <button class="btn btn-accent btn-sm">Nhận Ưu Đãi</button>
                </div>
            </div>
        `).join('');
    }

    // 11. Render Đánh Giá Khách Hàng (Testimonials)
    function renderTestimonials() {
        const container = document.getElementById('testimonialsGrid');
        if (!container || !DATA.testimonials) return;

        container.innerHTML = DATA.testimonials.map(t => `
            <div class="testimonial-card">
                <div>
                    <div class="testi-stars">★★★★★</div>
                    <p class="testi-text">"${t.comment}"</p>
                </div>
                <div class="testi-user">
                    <img src="${t.avatar}" alt="${t.name}" class="testi-avatar" loading="lazy">
                    <div class="testi-meta">
                        <h4>${t.name}</h4>
                        <p>${t.role}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 12. Render & Xử Lý FAQ Accordion
    function renderFAQs() {
        const container = document.getElementById('faqAccordion');
        if (!container || !DATA.faqs) return;

        container.innerHTML = DATA.faqs.map((faq, idx) => `
            <div class="faq-item ${idx === 0 ? 'active' : ''}">
                <div class="faq-question">
                    <span>${faq.q}</span>
                    <span class="faq-chevron">▼</span>
                </div>
                <div class="faq-answer" style="${idx === 0 ? 'max-height: 200px;' : ''}">
                    <div class="faq-answer-inner">${faq.a}</div>
                </div>
            </div>
        `).join('');

        // Thêm sự kiện toggle cho từng FAQ
        container.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Đóng các câu khác
                container.querySelectorAll('.faq-item').forEach(other => {
                    other.classList.remove('active');
                    const otherAns = other.querySelector('.faq-answer');
                    if (otherAns) otherAns.style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // 13. Mobile Drawer Navigation
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileNav = document.getElementById('mobileNav');
    const mobileBackdrop = document.getElementById('mobileBackdrop');

    function toggleMobileMenu(open) {
        if (mobileNav && mobileBackdrop) {
            mobileNav.classList.toggle('open', open);
            mobileBackdrop.classList.toggle('open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        }
    }

    if (mobileToggle) mobileToggle.addEventListener('click', () => toggleMobileMenu(true));
    if (mobileClose) mobileClose.addEventListener('click', () => toggleMobileMenu(false));
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', () => toggleMobileMenu(false));

    // Đóng drawer khi nhấn link
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // 14. Smooth Scroll Cho Các Thẻ Neo (Anchor Links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = targetElement.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Khởi tạo giao diện
    renderCategories();
    renderProducts();
    renderProcess();
    renderPromotions();
    renderTestimonials();
    renderFAQs();
});
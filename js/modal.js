/**
 * VẠN PHÁT 86 - MODAL & DIALOG MANAGER
 * Xử lý mở/đóng modal Đặt Thuê Nhanh, Chi Tiết Sản Phẩm, Đăng Nhập, Đối Tác
 */

class ModalManager {
    constructor() {
        this.activeModal = null;
        this.init();
    }

    init() {
        // Lắng nghe sự kiện click đóng khi nhấn vào backdrop hoặc nút close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeAll();
            }
            if (e.target.closest('.modal-close-btn')) {
                this.closeAll();
            }
        });

        // Đóng khi nhấn phím Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAll();
            }
        });

        // Thiết lập form Đặt thuê
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('bookName')?.value || 'Quý khách';
                const phone = document.getElementById('bookPhone')?.value || '';
                this.closeAll();
                this.showToast(`✅ Đặt đơn thuê thành công! Chuyên viên Vạn Phát 86 sẽ liên hệ số ${phone} trong 5 phút để xác nhận.`);
            });
        }

        // Thiết lập form Đăng nhập
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const phone = document.getElementById('loginPhone')?.value;
                this.closeAll();
                this.showToast(`🎉 Chào mừng bạn! Đã đăng nhập số điện thoại ${phone} thành công.`);
                const authBtn = document.getElementById('navAuthBtn');
                if (authBtn) {
                    authBtn.innerHTML = '👤 Tài khoản (091...678)';
                    authBtn.classList.remove('btn-primary');
                    authBtn.classList.add('btn-outline');
                }
            });
        }

        // Nút Demo Đăng Nhập Nhanh
        const btnDemoLogin = document.getElementById('btnDemoLogin');
        if (btnDemoLogin) {
            btnDemoLogin.addEventListener('click', () => {
                const phoneInput = document.getElementById('loginPhone');
                const otpInput = document.getElementById('loginOtp');
                if (phoneInput) phoneInput.value = '0988 888 999';
                if (otpInput) otpInput.value = '6868';
                this.showToast('ℹ️ Đã tự động điền thông tin tài khoản dùng thử.');
            });
        }

        // Form Đăng Ký Đối Tác
        const partnerForm = document.getElementById('partnerForm');
        if (partnerForm) {
            partnerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.closeAll();
                this.showToast('🚀 Cảm ơn bạn! Đơn đăng ký đối tác đã được ghi nhận. Ban giám đốc Vạn Phát 86 sẽ liên hệ ngay.');
            });
        }
    }

    openModal(modalId) {
        this.closeAll();
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.activeModal = modal;
        }
    }

    closeAll() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
        this.activeModal = null;
    }

    // Mở modal Đặt thuê với thông tin máy được chọn
    openBooking(phone, capacity, duration = '300 ngày') {
        if (!phone) return;
        const selectedCap = capacity || phone.defaultCapacity || phone.capacities[0];
        const pricing = phone.capacityPricing[selectedCap] || Object.values(phone.capacityPricing)[0];

        // Điền thông tin vào tóm tắt đơn hàng trong modal
        const imgEl = document.getElementById('bookPhoneImg');
        const nameEl = document.getElementById('bookPhoneName');
        const capEl = document.getElementById('bookPhoneCap');
        const durationEl = document.getElementById('bookPhoneDuration');
        const priceEl = document.getElementById('bookPhonePrice');
        const depositEl = document.getElementById('bookPhoneDeposit');
        const perkEl = document.getElementById('bookPhonePerk');

        if (imgEl) imgEl.src = phone.thumbnail;
        if (nameEl) nameEl.textContent = phone.name;
        if (capEl) capEl.textContent = selectedCap;
        if (durationEl) durationEl.textContent = duration;
        if (priceEl) priceEl.textContent = new Intl.NumberFormat('vi-VN').format(pricing.monthly) + 'đ/tháng';
        if (depositEl) depositEl.textContent = '0đ (Miễn phí cọc)';
        if (perkEl) perkEl.textContent = phone.specialNote || 'Bao gồm bảo hiểm rơi vỡ & Tặng luôn máy sau hạn thuê';

        this.openModal('bookingModal');
    }

    // Mở modal Chi tiết sản phẩm với đầy đủ thông số
    openDetail(phone) {
        if (!phone) return;
        const titleEl = document.getElementById('detailPhoneName');
        const conditionEl = document.getElementById('detailPhoneCondition');
        const imgEl = document.getElementById('detailPhoneImg');
        const specsListEl = document.getElementById('detailPhoneSpecs');
        const noteEl = document.getElementById('detailPhoneNote');
        const btnRentEl = document.getElementById('detailBtnRent');

        if (titleEl) titleEl.textContent = phone.name;
        if (conditionEl) conditionEl.textContent = `${phone.condition} • ${phone.countryVariant}`;
        if (imgEl) imgEl.src = phone.thumbnail;
        if (noteEl) noteEl.textContent = phone.specialNote;

        if (specsListEl) {
            specsListEl.innerHTML = phone.features.map(f => `
                <li><span class="dot">•</span> ${f}</li>
            `).join('');
        }

        if (btnRentEl) {
            btnRentEl.onclick = () => {
                this.openBooking(phone, phone.defaultCapacity);
            };
        }

        this.openModal('detailModal');
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastText = document.getElementById('toastText');
        if (toast && toastText) {
            toastText.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4500);
        } else {
            alert(message);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.modalManager = new ModalManager();
});

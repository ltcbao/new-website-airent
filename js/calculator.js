/**
 * VẠN PHÁT 86 - RENTAL CALCULATOR MODULE
 * Tính toán chi phí thuê điện thoại trực quan theo ngày/tháng/kỳ hạn
 */

class RentalCalculator {
    constructor() {
        this.selectModel = document.getElementById('calcModel');
        this.rangeDuration = document.getElementById('calcDuration');
        this.durationValDisplay = document.getElementById('calcDurationVal');
        this.insuranceCheck = document.getElementById('calcInsurance');
        
        // Output elements
        this.outDailyRate = document.getElementById('calcOutDaily');
        this.outMonthlyRate = document.getElementById('calcOutMonthly');
        this.outTotalRate = document.getElementById('calcOutTotal');
        this.outDeposit = document.getElementById('calcOutDeposit');
        this.outOwnership = document.getElementById('calcOutOwnership');
        this.btnBookWithPackage = document.getElementById('btnBookCalc');

        if (this.selectModel && this.rangeDuration) {
            this.init();
        }
    }

    init() {
        // 1. Nạp danh sách máy vào dropdown
        this.populateModels();

        // 2. Lắng nghe sự kiện thay đổi
        this.selectModel.addEventListener('change', () => this.calculate());
        this.rangeDuration.addEventListener('input', (e) => {
            this.durationValDisplay.textContent = `${e.target.value} ngày`;
            this.calculate();
        });
        if (this.insuranceCheck) {
            this.insuranceCheck.addEventListener('change', () => this.calculate());
        }

        if (this.btnBookWithPackage) {
            this.btnBookWithPackage.addEventListener('click', () => {
                const selectedPhoneId = this.selectModel.value;
                const duration = parseInt(this.rangeDuration.value);
                const phone = window.VANPHAT86_DATA.products.find(p => p.id === selectedPhoneId);
                if (window.modalManager) {
                    window.modalManager.openBooking(phone, phone?.defaultCapacity, `${duration} ngày`);
                }
            });
        }

        // Tính toán ban đầu
        this.calculate();
    }

    populateModels() {
        this.selectModel.innerHTML = '';
        const data = window.VANPHAT86_DATA;
        data.products.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `${p.name} (${p.condition}) - Gốc ${p.defaultCapacity}`;
            this.selectModel.appendChild(opt);
        });
    }

    calculate() {
        const phoneId = this.selectModel.value;
        const days = parseInt(this.rangeDuration.value);
        const hasInsurance = this.insuranceCheck ? this.insuranceCheck.checked : true;

        const data = window.VANPHAT86_DATA;
        const phone = data.products.find(p => p.id === phoneId);
        if (!phone) return;

        const defaultCap = phone.defaultCapacity || phone.capacities[0];
        const basePricing = phone.capacityPricing[defaultCap] || Object.values(phone.capacityPricing)[0];

        // Công thức tính ưu đãi thời gian thuê càng dài đơn giá càng giảm
        let discountFactor = 1.0;
        if (days >= 360) {
            discountFactor = 0.82; // Giảm 18% cho kỳ hạn dài
        } else if (days >= 180) {
            discountFactor = 0.90; // Giảm 10% cho kỳ hạn 6 tháng
        } else if (days >= 90) {
            discountFactor = 0.95;
        }

        let dailyRate = Math.round(basePricing.daily * discountFactor);
        let monthlyRate = Math.round(dailyRate * 30);
        let totalCost = dailyRate * days;

        // Định dạng tiền tệ VNĐ
        const formatMoney = (amount) => {
            return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
        };

        if (this.outDailyRate) this.outDailyRate.textContent = formatMoney(dailyRate);
        if (this.outMonthlyRate) this.outMonthlyRate.textContent = formatMoney(monthlyRate);
        if (this.outTotalRate) this.outTotalRate.textContent = formatMoney(totalCost);
        if (this.outDeposit) this.outDeposit.textContent = '0đ (Miễn phí cọc)';

        // Quyền lợi tặng máy sau kỳ hạn
        if (this.outOwnership) {
            if (days >= 300) {
                this.outOwnership.innerHTML = '🎁 <strong>ĐƯỢC TẶNG LUÔN MÁY!</strong> Bạn sẽ sở hữu vĩnh viễn thiết bị này sau khi kết thúc kỳ hạn thuê tại Vạn Phát 86.';
                this.outOwnership.style.display = 'flex';
            } else {
                this.outOwnership.innerHTML = '💡 <em>Mẹo:</em> Thuê từ <strong>300 - 480 ngày</strong> để được quyền lợi TẶNG LUÔN MÁY sở hữu trọn đời!';
                this.outOwnership.style.display = 'flex';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.rentalCalculator = new RentalCalculator();
});

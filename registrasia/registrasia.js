document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы
    const form = document.querySelector('.register-container');
    const inputs = {
        fullname: document.getElementById('fullname'),
        contact: document.getElementById('contact'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirm-password'),
        terms: document.getElementById('terms')
    };
    const registerBtn = document.querySelector('.register-btn');

    // Функции валидации
    const validators = {
        fullname: value => /^[A-Za-zА-Яа-яЁё\s]{2,}$/.test(value),
        contact: value => {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const isPhone = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(value);
            return isEmail || isPhone;
        },
        password: value => value.length >= 8,
        confirmPassword: value => value === inputs.password.value
    };

    // Проверка всех полей
    function validateAllFields() {
        let allValid = true;
        
        Object.keys(inputs).forEach(key => {
            if (key === 'terms') return;
            
            const input = inputs[key];
            const inputGroup = input.parentElement;
            const value = input.value.trim();
            
            inputGroup.classList.remove('valid', 'invalid');
            
            if (value === '') {
                if (key === 'confirmPassword' && inputs.password.value === '') return;
                inputGroup.classList.add('invalid');
                allValid = false;
                return;
            }
            
            if (validators[key](value)) {
                inputGroup.classList.add('valid');
            } else {
                inputGroup.classList.add('invalid');
                allValid = false;
            }
        });
        
        return allValid;
    }

    // Обработчики событий
    function setupEventListeners() {
        // Проверка при изменении любого поля
        Object.values(inputs).forEach(input => {
            if (input.type === 'checkbox') return;
            
            input.addEventListener('input', validateAllFields);
            input.addEventListener('blur', validateAllFields);
            
            // Эффекты при наведении
            input.addEventListener('mouseenter', function() {
                if (!this.parentElement.classList.contains('valid') && 
                    !this.parentElement.classList.contains('invalid')) {
                    this.style.boxShadow = '0 0 10px rgba(170, 170, 170, 0.5)';
                }
            });
            
            input.addEventListener('mouseleave', function() {
                if (!this.parentElement.classList.contains('valid') && 
                    !this.parentElement.classList.contains('invalid')) {
                    this.style.boxShadow = '';
                }
            });
        });
        
        // Отправка формы
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const allValid = validateAllFields();
            const termsChecked = inputs.terms.checked;
            
            if (!termsChecked) {
                alert('Необходимо согласиться с условиями');
                return;
            }
            
            if (allValid) {
                alert(`Регистрация успешна!\nДобро пожаловать, ${inputs.fullname.value.trim()}!\nВаша скидка 5% на первый заказ!`);
                // form.submit();
            }
        });
    }

    // Инициализация
    setupEventListeners();
});
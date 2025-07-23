// Скрипт для FAQ
document.addEventListener('DOMContentLoaded', function() {
    // Обработка FAQ - теперь можно открывать несколько ответов одновременно
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            item.classList.toggle('active'); // Просто переключаем текущий элемент
        });
    });

    // Получаем элементы модального окна
    const modal = document.getElementById("contacts-modal");
    const btn = document.getElementById("contacts-link");
    const span = document.getElementsByClassName("close")[0];

    // При клике на "Контакты" открываем модальное окно
    btn.onclick = function(event) {
        event.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    }

    // При клике на крестик закрываем модальное окно
    span.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = '';
    }

    // При клике вне модального окна - закрываем его
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = '';
        }
    }

    // Закрытие по ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = "none";
            document.body.style.overflow = '';
        }
    });

    // Обработка мультиселекта для соцсетей
    const selectedOptions = {};
    
    window.toggleSelect = function(element) {
        const parent = element.parentElement;
        const items = parent.querySelector('.select-items');
        items.classList.toggle('show');
        element.classList.toggle('active');
        
        // Закрываем другие открытые списки
        document.querySelectorAll('.select-items').forEach(otherItems => {
            if (otherItems !== items && otherItems.classList.contains('show')) {
                otherItems.classList.remove('show');
                otherItems.previousElementSibling.classList.remove('active');
            }
        });
    }
    
    window.toggleOption = function(element, value) {
        const checkbox = element.querySelector('input');
        checkbox.checked = !checkbox.checked;
        
        if (checkbox.checked) {
            selectedOptions[value] = {
                name: element.textContent.trim(),
                icon: element.querySelector('img').src
            };
        } else {
            delete selectedOptions[value];
        }
        
        updateSelectedDisplay();
        updateHiddenInput();
    }
    
    function updateSelectedDisplay() {
        const container = document.querySelector('.selected-options');
        container.innerHTML = '';
        
        for (const [value, data] of Object.entries(selectedOptions)) {
            const tag = document.createElement('div');
            tag.className = 'selected-tag';
            tag.innerHTML = `
                <img src="${data.icon}" alt="${value}">
                ${data.name}
                <span class="remove" onclick="removeOption('${value}')">×</span>
            `;
            container.appendChild(tag);
        }
    }
    
    window.removeOption = function(value) {
        delete selectedOptions[value];
        document.getElementById(value).checked = false;
        updateSelectedDisplay();
        updateHiddenInput();
    }
    
    function updateHiddenInput() {
        document.getElementById('contact-via').value = Object.keys(selectedOptions).join(',');
    }
    
    // Закрытие списка при клике вне его
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-multiselect')) {
            document.querySelectorAll('.select-items').forEach(items => {
                items.classList.remove('show');
                items.previousElementSibling.classList.remove('active');
            });
        }
    });
});
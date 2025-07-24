// Переключение вкладок
        document.addEventListener('DOMContentLoaded', function() {
            const tabBtns = document.querySelectorAll('.tab-btn');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Удаляем активный класс у всех кнопок и вкладок
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                    
                    // Добавляем активный класс текущей кнопке
                    this.classList.add('active');
                    
                    // Показываем соответствующую вкладку
                    const tabId = this.getAttribute('data-tab') + '-tab';
                    document.getElementById(tabId).classList.add('active');
                });
            });
            
            // Обработка формы профиля
            const profileForm = document.querySelector('.edit-profile-form');
            if (profileForm) {
                profileForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Изменения профиля сохранены!');
                });
            }
        });

// Получаем элементы
const modal = document.getElementById("contacts-modal");
const btn = document.getElementById("contacts-link");
const span = document.getElementsByClassName("close")[0];

// Открываем модальное окно при клике на ссылку
btn.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
}

// Закрываем модальное окно при клике на крестик
span.onclick = function() {
    modal.style.display = "none";
}

// Закрываем модальное окно при клике вне его области
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация вкладок
    initTabs();
    
    // Показываем избранное при загрузке страницы
    displayFavorites();
});

function initTabs() {
    // Обработчик переключения вкладок
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Скрываем все вкладки
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Показываем выбранную вкладку
            document.getElementById(tabId + '-tab').classList.add('active');
            
            // Обновляем активную кнопку
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Если открыли вкладку избранного - обновляем список
            if (tabId === 'favorites') {
                displayFavorites();
            }
        });
    });
}

function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-tab');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <h3>Избранные товары</h3>
            <p style="color: #7a5c3a; font-size: 18px;">Вы пока не добавили ни одного товара в избранное</p>
        `;
        return;
    }
    
    let html = `
        <h3>Избранные товары</h3>
        <div class="favorites-grid">
    `;
    
    favorites.forEach(product => {
        html += `
            <div class="favorite-item">
                <div class="favorite-item-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="favorite-item-info">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <div class="favorite-item-price">${product.price}</div>
                    <button class="remove-favorite" data-name="${product.name}">Удалить из избранного</button>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    favoritesContainer.innerHTML = html;
    
    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll('.remove-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favorites = favorites.filter(item => item.name !== productName);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            displayFavorites();
        });
    });
}
// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Скрываем все вкладки, кроме активной
    document.querySelectorAll('.tab-content').forEach(content => {
        if (!content.classList.contains('active')) {
            content.style.display = 'none';
        }
    });
    
    // Инициализация статусов
    document.querySelectorAll('.status-select').forEach(select => {
        const status = select.value;
        select.classList.add(`status-${status}`);
    });
});

// Переключение между вкладками
document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Удаляем активный класс у всех вкладок
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => {
            c.classList.remove('active');
            c.style.display = 'none';
        });
        
        // Добавляем активный класс к выбранной вкладке
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab') + '-tab';
        const activeTab = document.getElementById(tabId);
        activeTab.classList.add('active');
        activeTab.style.display = 'block';
    });
});

function updateOrderStatus(selectElement, orderId) {
    const status = selectElement.value;
    
    // Удаляем все классы статусов
    selectElement.classList.remove('status-new', 'status-accepted', 'status-rejected', 'status-completed');
    
    // Добавляем нужный класс
    selectElement.classList.add(`status-${status}`);
    
    // Обновляем статистику
    updateStats();
    
    // Обновляем статус в модальном окне, если оно открыто для этого заказа
    const modal = document.getElementById('order-modal');
    if (modal.style.display === 'block') {
        const modalOrderId = modal.querySelector('h2').textContent.match(/#(\d+)/)[1];
        if (modalOrderId == orderId) {
            const modalStatus = document.getElementById('modal-order-status');
            modalStatus.value = status;
            updateModalOrderStatus();
        }
    }
    
    // Здесь можно добавить AJAX-запрос для сохранения статуса
    console.log(`Статус заказа ${orderId} изменен на: ${status}`);
}

// Функция обновления статуса в модальном окне
function updateModalOrderStatus() {
    const select = document.getElementById('modal-order-status');
    const status = select.value;
    
    // Обновляем стиль
    select.className = 'status-select';
    select.classList.add(`status-${status}`);
}

// Функция обновления статистики
function updateStats() {
    const newOrders = document.querySelectorAll('.status-new').length;
    document.getElementById('new-orders-count').textContent = newOrders;
}

// Поиск заказов
function searchOrders() {
    const searchTerm = document.getElementById('search-orders').value.toLowerCase();
    const rows = document.querySelectorAll('#orders-table-body tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Поиск пользователей
function searchUsers() {
    const searchTerm = document.getElementById('search-users').value.toLowerCase();
    const rows = document.querySelectorAll('#users-table-body tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Поиск при нажатии Enter
document.getElementById('search-orders').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchOrders();
});

document.getElementById('search-users').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchUsers();
});

// Функции для работы с модальными окнами
function viewUser(userId) {
    // Заполняем данные пользователя (в реальном проекте - AJAX запрос)
    document.getElementById('user-name').textContent = userId === 1 ? 'Иван Иванов' : 'Анна Петрова';
    document.getElementById('user-email').textContent = userId === 1 ? 'ivan@yandex.ru' : 'anna@gmail.com';
    document.getElementById('user-reg-date').textContent = '15.05.2025';
    
    // Показываем модальное окно
    document.getElementById('user-modal').style.display = 'block';
}

function viewOrder(orderId) {
    // Находим строку заказа в таблице
    const orderRow = document.querySelector(`#orders-table-body tr[data-order-id="${orderId}"]`);
    
    if (orderRow) {
        // Получаем текущий статус из таблицы
        const statusSelect = orderRow.querySelector('.status-select');
        const currentStatus = statusSelect.value;
        
        // Заполняем данные заказа
        document.getElementById('order-user').textContent = 
            orderId === 12347 ? 'Анна Петрова' : 
            orderId === 12346 ? 'Сергей Иванов' : 'Иван Иванов';
        
        document.getElementById('order-date').textContent = 
            orderId === 12347 ? '28.07.2025' : 
            orderId === 12346 ? '27.07.2025' : '25.07.2025';
        
        document.getElementById('order-total').textContent = 
            orderId === 12347 ? '2,500 ₽' : 
            orderId === 12346 ? '1,800 ₽' : '1,900 ₽';
        
        // Устанавливаем статус в модальном окне
        const modalStatus = document.getElementById('modal-order-status');
        modalStatus.value = currentStatus;
        updateModalOrderStatus();
        
        // Показываем модальное окно
        document.getElementById('order-modal').style.display = 'block';
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
});
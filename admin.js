// Переключение между вкладками
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Удаляем активный класс у всех вкладок
                document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Добавляем активный класс к выбранной вкладке
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab') + '-tab';
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Поиск заказов
        function searchOrders() {
            const searchTerm = document.getElementById('search-orders').value.toLowerCase();
            const rows = document.querySelectorAll('#orders-table-body tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
        
        // Поиск пользователей
        function searchUsers() {
            const searchTerm = document.getElementById('search-users').value.toLowerCase();
            const rows = document.querySelectorAll('#users-table-body tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
        
        // Поиск при нажатии Enter
        document.getElementById('search-orders').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchOrders();
            }
        });
        
        document.getElementById('search-users').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchUsers();
            }
        });
        
        // Функции для работы с модальными окнами
        function viewUser(userId) {
            // Здесь должна быть логика загрузки данных пользователя по ID
            // Для примера просто заполняем тестовыми данными
            document.getElementById('user-id').textContent = userId;
            document.getElementById('user-name').textContent = 'Иван Иванов';
            document.getElementById('user-email').textContent = 'ivan@yandex.ru';
            document.getElementById('user-phone').textContent = '+7 (978) 123-45-67';
            document.getElementById('user-address').textContent = 'Республика Крым, г. Алушта, ул. Школьная, д. 19';
            document.getElementById('user-reg-date').textContent = '15.05.2025';
            
            // Показываем модальное окно
            document.getElementById('user-modal').style.display = 'block';
        }
        
        function viewOrder(orderId) {
            // Здесь должна быть логика загрузки данных заказа по ID
            // Для примера просто заполняем тестовыми данными
            document.getElementById('order-user').textContent = 'Анна Петрова';
            document.getElementById('order-date').textContent = '25.07.2025';
            document.getElementById('order-status').textContent = 'Новый';
            document.getElementById('order-status').className = 'status-new';
            document.getElementById('order-total').textContent = '2,500 ₽';
            document.getElementById('order-address').textContent = 'г. Симферополь, ул. Киевская, д. 15, кв. 42';
            
            // Показываем модальное окно
            document.getElementById('order-modal').style.display = 'block';
        }
        
        function closeModal() {
            // Закрытие всех модальных окон
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
        
        // Закрытие модального окна при клике вне его
        window.onclick = function(event) {
            document.querySelectorAll('.modal').forEach(modal => {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            });
        }
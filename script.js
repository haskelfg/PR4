// 1. СПИСОК ТОВАРОВ (магазин кофе)
const products = [
    {id: 1, name: "Эфиопский Йргачефф", price: 850, category: "арабика", img: "images/coffee1.png", desc: "Цитрусовые нотки"},
    {id: 2, name: "Колумбия Супремо", price: 780, category: "арабика", img: "images/coffee2.png", desc: "Карамель, орехи"},
    {id: 3, name: "Кения АА", price: 920, category: "арабика", img: "images/coffee3.png", desc: "Ягодная кислинка"},
    {id: 4, name: "Вьетнамская Робуста", price: 670, category: "робуста", img: "images/coffee4.png", desc: "Плотный, горьковатый вкус"},
    {id: 5, name: "Индийская Робуста", price: 520, category: "робуста", img: "images/coffee5.png", desc: "Шоколадные нотки"}
];

// 2. КОРЗИНА (пустой массив, куда будем добавлять товары)
let cart = [];

// ============================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С КОРЗИНОЙ
// ============================================

// Функция 1: Добавить товар в корзину
function addToCart(productId) {
    // Находим товар по его ID
    let product = products.find(function(p) {
        return p.id == productId;
    });
    
    // Добавляем товар в корзину
    cart.push(product);
    
    // Обновляем отображение корзины на странице
    renderCart();
}

// Функция 2: Удалить товар из корзины
function removeFromCart(index) {
    // Удаляем товар из корзины по его номеру (индексу)
    cart.splice(index, 1);
    
    // Обновляем отображение корзины
    renderCart();
}

// Функция 3: Посчитать общую сумму
function calculateTotal() {
    let total = 0;
    
    // Проходим по всем товарам в корзине
    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price; // Добавляем цену каждого товара
    }
    
    return total; // Возвращаем общую сумму
}

// Функция 4: Очистить корзину
function clearCart() {
    // Проверяем: пустая корзина или нет
    if (cart.length == 0) {
        alert("Корзина пуста!"); // Всплывающее окно
    } else {
        cart = []; // Очищаем корзину
        renderCart(); // Обновляем отображение
    }
}

// Функция 5: Оплатить покупку
function checkout() {
    // Проверяем: пустая корзина или нет
    if (cart.length == 0) {
        alert("Корзина пуста! Добавьте товары перед оплатой."); // Сообщение об ошибке
    } else {
        // Считаем общую сумму
        let total = calculateTotal();
        
        // Показываем сообщение об успешной оплате
        alert("Покупка на сумму " + total + " руб. прошла успешно! Спасибо за заказ!");
        
        // Очищаем корзину
        cart = [];
        
        // Обновляем отображение корзины
        renderCart();
    }
}

// ============================================
// ФУНКЦИЯ ОТРИСОВКИ КОРЗИНЫ (показывает товары на странице)
// ============================================

function renderCart() {
    // Находим контейнер для списка товаров в корзине
    let itemsContainer = document.getElementById("cart-items");
    
    // Если контейнер не найден, выходим из функции
    if (!itemsContainer) return;
    
    // Проверяем: корзина пустая?
    if (cart.length == 0) {
        // Если пустая - показываем надпись
        itemsContainer.innerHTML = '<p>Корзина пуста</p>';
    } else {
        // Если не пустая - создаем HTML для каждого товара
        let html = "";
        
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            html = html + '<div>' + item.name + ' - ' + item.price + ' руб. <button onclick="removeFromCart(' + i + ')">✖</button></div>';
        }
        
        // Вставляем созданный HTML на страницу
        itemsContainer.innerHTML = html;
    }
    
    // Находим элемент для отображения общей суммы
    let totalElement = document.getElementById("cart-total");
    if (totalElement) {
        totalElement.innerHTML = calculateTotal(); // Показываем сумму
    }
    
    // Находим элемент для отображения количества товаров
    let countElement = document.getElementById("cart-count");
    if (countElement) {
        countElement.innerHTML = cart.length; // Показываем количество
    }
}

// ============================================
// ФУНКЦИЯ ФИЛЬТРАЦИИ ТОВАРОВ
// ============================================

function filterProducts(category) {
    // Находим все карточки товаров
    let allCards = document.querySelectorAll(".product-card");
    
    // Если выбрали "Все товары"
    if (category == "all") {
        // Показываем все карточки
        for (let i = 0; i < allCards.length; i++) {
            allCards[i].style.display = "block";
        }
    }
    
    // Если выбрали "Арабика"
    if (category == "арабика") {
        for (let i = 0; i < allCards.length; i++) {
            let card = allCards[i];
            let cardCategory = card.getAttribute("data-category");
            
            // Если категория товара = арабика - показываем
            if (cardCategory == "арабика") {
                card.style.display = "block";
            } 
            // Если не арабика - скрываем
            else {
                card.style.display = "none";
            }
        }
    }
    
    // Если выбрали "Робуста"
    if (category == "робуста") {
        for (let i = 0; i < allCards.length; i++) {
            let card = allCards[i];
            let cardCategory = card.getAttribute("data-category");
            
            // Если категория товара = робуста - показываем
            if (cardCategory == "робуста") {
                card.style.display = "block";
            } 
            // Если не робуста - скрываем
            else {
                card.style.display = "none";
            }
        }
    }
}

// ============================================
// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧЕК ТОВАРОВ
// ============================================

function renderProducts() {
    // Находим контейнер для товаров на странице
    let container = document.getElementById("products-container");
    
    // Если контейнер не найден, выходим
    if (!container) return;
    
    // Создаем HTML для всех товаров
    let html = "";
    
    for (let i = 0; i < products.length; i++) {
        let p = products[i];
        
        html = html + `
            <div class="product-card" data-category="${p.category}" data-id="${p.id}">
                <img src="${p.img}" width="150"><br>
                <b>${p.name}</b><br>
                ${p.price} руб.<br>
                <small>${p.desc}</small><br>
                <button onclick="addToCart(${p.id})">Добавить в корзину</button>
            </div>
        `;
    }
    
    // Вставляем все карточки на страницу
    container.innerHTML = html;
}

// ============================================
// ФУНКЦИЯ ДОБАВЛЕНИЯ КОРЗИНЫ И ФИЛЬТРА НА СТРАНИЦУ
// ============================================

function init() {
    // Проверяем: есть ли на странице контейнер для товаров?
    if (document.getElementById("products-container")) {
        
        // 1. Создаем карточки товаров
        renderProducts();
        
        // 2. Создаем блок фильтрации
        let filterHTML = `
            <div id="filter">
                <button onclick="filterProducts('all')">Все товары</button>
                <button onclick="filterProducts('арабика')">Арабика</button>
                <button onclick="filterProducts('робуста')">Робуста</button>
            </div>
        `;
        
        // 3. Создаем блок корзины
        let cartHTML = `
            <div id="cart">
                <h3>Корзина (<span id="cart-count">0</span>)</h3>
                <div id="cart-items"></div>
                <b>Итого: <span id="cart-total">0</b> руб.
                <br>
                <button onclick="clearCart()">Очистить корзину</button>
                <button onclick="checkout()">Оплатить</button>
            </div>
        `;
        
        // 4. Добавляем фильтр и корзину на страницу (в конец тега main)
        document.querySelector("main").insertAdjacentHTML("beforeend", filterHTML);
        document.querySelector("main").insertAdjacentHTML("beforeend", cartHTML);
        
        // 5. Показываем корзину (изначально пустую)
        renderCart();
    }
}

// ============================================
// ЗАПУСК: когда страница загрузится, выполнить функцию init
// ============================================

document.addEventListener("DOMContentLoaded", init);
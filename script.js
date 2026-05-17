// 1. СПИСОК ТОВАРОВ (магазин кофе)
const products = [
    {id: 1, name: "Эфиопский Йргачефф", price: 850, category: "арабика", img: "images/coffee1.png", desc: "Цитрусовые нотки"},
    {id: 2, name: "Колумбия Супремо", price: 780, category: "арабика", img: "images/coffee2.png", desc: "Карамель, орехи"},
    {id: 3, name: "Кения АА", price: 920, category: "арабика", img: "images/coffee3.png", desc: "Ягодная кислинка"},
    {id: 4, name: "Вьетнамская Робуста", price: 670, category: "робуста", img: "images/coffee4.png", desc: "Плотный, горьковатый вкус"},
    {id: 5, name: "Индийская Робуста", price: 520, category: "робуста", img: "images/coffee5.png", desc: "Шоколадные нотки"}
];

// 2. КОРЗИНА
let cart = [];

// ============================================
// LOCAL STORAGE
// ============================================

// Сохранить корзину
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Загрузить корзину
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// ============================================
// ФУНКЦИИ ДЛЯ РАБОТЫ С КОРЗИНОЙ
// ============================================

// Добавить товар
function addToCart(productId) {
    let product = products.find(function(p) {
        return p.id == productId;
    });

    cart.push(product);

    // Сохраняем корзину
    saveCartToLocalStorage();

    renderCart();
}

// Удалить товар
function removeFromCart(index) {
    cart.splice(index, 1);

    // Сохраняем корзину
    saveCartToLocalStorage();

    renderCart();
}

// Посчитать сумму
function calculateTotal() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price;
    }

    return total;
}

// Очистить корзину
function clearCart() {
    if (cart.length == 0) {
        alert("Корзина пуста!");
    } else {
        cart = [];

        // Сохраняем пустую корзину
        saveCartToLocalStorage();

        renderCart();
    }
}

// Оплата
function checkout() {
    if (cart.length == 0) {
        alert("Корзина пуста! Добавьте товары перед оплатой.");
    } else {
        let total = calculateTotal();

        alert("Покупка на сумму " + total + " руб. прошла успешно! Спасибо за заказ!");

        cart = [];

        // Сохраняем пустую корзину
        saveCartToLocalStorage();

        renderCart();
    }
}

// ============================================
// ОТРИСОВКА КОРЗИНЫ
// ============================================

function renderCart() {
    let itemsContainer = document.getElementById("cart-items");

    if (!itemsContainer) return;

    if (cart.length == 0) {
        itemsContainer.innerHTML = '<p>Корзина пуста</p>';
    } else {
        let html = "";

        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];

            html = html +
                '<div>' +
                item.name +
                ' - ' +
                item.price +
                ' руб. <button onclick="removeFromCart(' +
                i +
                ')">✖</button></div>';
        }

        itemsContainer.innerHTML = html;
    }

    let totalElement = document.getElementById("cart-total");

    if (totalElement) {
        totalElement.innerHTML = calculateTotal();
    }

    let countElement = document.getElementById("cart-count");

    if (countElement) {
        countElement.innerHTML = cart.length;
    }
}

// ============================================
// ФИЛЬТРАЦИЯ
// ============================================

function filterProducts(category) {
    let allCards = document.querySelectorAll(".product-card");

    if (category == "all") {
        for (let i = 0; i < allCards.length; i++) {
            allCards[i].style.display = "block";
        }
    }

    if (category == "арабика") {
        for (let i = 0; i < allCards.length; i++) {
            let card = allCards[i];
            let cardCategory = card.getAttribute("data-category");

            if (cardCategory == "арабика") {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    }

    if (category == "робуста") {
        for (let i = 0; i < allCards.length; i++) {
            let card = allCards[i];
            let cardCategory = card.getAttribute("data-category");

            if (cardCategory == "робуста") {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    }
}

// ============================================
// СОЗДАНИЕ КАРТОЧЕК
// ============================================

function renderProducts() {
    let container = document.getElementById("products-container");

    if (!container) return;

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

    container.innerHTML = html;
}

// ============================================
// INIT
// ============================================

function init() {
    if (document.getElementById("products-container")) {

        // Карточки товаров
        renderProducts();

        // Фильтр
        let filterHTML = `
            <div id="filter">
                <button onclick="filterProducts('all')">Все товары</button>
                <button onclick="filterProducts('арабика')">Арабика</button>
                <button onclick="filterProducts('робуста')">Робуста</button>
            </div>
        `;

        // Корзина
        let cartHTML = `
            <div id="cart">
                <h3>Корзина (<span id="cart-count">0</span>)</h3>
                <div id="cart-items"></div>
                <b>Итого: <span id="cart-total">0</span></b> руб.
                <br>
                <button onclick="clearCart()">Очистить корзину</button>
                <button onclick="checkout()">Оплатить</button>
            </div>
        `;

        document.querySelector("main").insertAdjacentHTML("beforeend", filterHTML);
        document.querySelector("main").insertAdjacentHTML("beforeend", cartHTML);

        // Загружаем корзину
        loadCartFromLocalStorage();

        // Показываем корзину
        renderCart();
    }
}

// ============================================
// ЗАПУСК
// ============================================

document.addEventListener("DOMContentLoaded", init);
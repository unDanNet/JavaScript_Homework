"use strict"

class BasketItem {
    #id
    #name
    #price
    #count

    constructor(id, name, price) {
        this.#id = id;
        this.#name = name;
        this.#price = price;
        this.#count = 1;
    }

    getId() { return this.#id; }
    getName() { return this.#name; }
    getPrice() { return this.#price; }
    getCount() { return this.#count; }

    increaseCountByOne() {
        this.#count += 1;
    }
}

const basketItems = [];

const featuredItemsEl = document.querySelector('.featuredItems');
const basketEl = document.querySelector('.basket');
const cartIconWrapEl = document.querySelector('.cartIconWrap');

cartIconWrapEl.addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

featuredItemsEl.addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }

    let featuredItem = event.target.parentElement;
    while (!featuredItem.classList.contains('featuredItem')) {
        featuredItem = featuredItem.parentElement;
    }

    let basketItem = basketItems.find(item => {
        return item.getId() === featuredItem.dataset.id;
    });

    if (basketItem) {
        basketItem.increaseCountByOne();
    } else {
        basketItem = new BasketItem(
            featuredItem.dataset.id,
            featuredItem.dataset.name,
            featuredItem.dataset.price
        )

        basketItems.push(basketItem);
    }

    changeBasketItemsAmount();
    changeBasketItemsSum();
    addItemRowInBasket(basketItem);
});

function changeBasketItemsAmount() {
    const cartItemsAmountEl = cartIconWrapEl.querySelector('span');

    let itemsCount = 0;
    for (const i of basketItems) {
        itemsCount += i.getCount();
    }

    cartItemsAmountEl.textContent = itemsCount;
}

function changeBasketItemsSum() {
    const basketTotalValueEl = document.querySelector('.basketTotalValue');

    let itemsSum = 0;
    for (const i of basketItems) {
        itemsSum += i.getPrice() * i.getCount();
    }

    basketTotalValueEl.textContent = itemsSum;
}

function addItemRowInBasket(basketItem) {
    const basketTotalEl = basketEl.querySelector('.basketTotal');

    const itemRow = basketEl.querySelector(
        `.basketRow[data-id="${basketItem.getId()}"]`
    );

    const rowHtml = `
        <div class="basketRow" data-id="${basketItem.getId()}">
            <div>${basketItem.getName()}</div>
            <div>${basketItem.getCount()}</div>
            <div>${basketItem.getPrice()}</div>
            <div>${basketItem.getPrice() * basketItem.getCount()}</div>
        </div>
    `

    if (itemRow) {
        itemRow.insertAdjacentHTML("afterend", rowHtml);
        itemRow.remove();
    } else {
        basketTotalEl.insertAdjacentHTML("beforebegin", rowHtml);
    }
}
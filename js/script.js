var addToCartButtons = document.querySelectorAll('.add-to-cart');
var cartQuantityElement = document.querySelector('.cart-quantity');
var cartItemsElement = document.querySelector('#cart-items');
var cartButton = document.querySelector('#show-cart i');
var cartPopup = document.querySelector('#cart-popup');
var clearCartButton = document.querySelector('#clear-cart');
var checkoutButton = document.querySelector('#checkout');
var cartQuantity = 0;
var cartItems = [];

document.getElementById("chatbot-icon").addEventListener("click", function() {
document.getElementById("chatbot-icon").style.display = "none";
document.getElementById("chatbot-frame").style.display = "block";
});

document.addEventListener("DOMContentLoaded", function() {
    var chatbotIcon = document.getElementById("chatbot-icon");
    var chatbotFrame = document.getElementById("chatbot-frame");

    var isOpen = false;

chatbotIcon.addEventListener("click", function(e) {
    e.stopPropagation();
    isOpen = !isOpen;
    chatbotFrame.style.display = isOpen ? "block" : "none";
    chatbotIcon.style.display = isOpen ? "none" : "block";
});

document.addEventListener("click", function(e) {
    if (isOpen && e.target !== chatbotIcon && !chatbotFrame.contains(e.target)) {
    isOpen = false;
        chatbotFrame.style.display = "none";
        chatbotIcon.style.display = "block";
     }
   });
});

addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
    cartQuantity++;
    cartQuantityElement.textContent = cartQuantity;

    var item = {
        name: button.parentNode.querySelector('.title-item').textContent,
        price: button.parentNode.querySelector('.actual-price').textContent,
        quantity: 1
    };

        cartItems.push(item);

        updateCartItems();
  });
});

function updateCartItems() {
cartItemsElement.innerHTML = '';

cartItems.forEach(function (item, index) {
  var itemElement = document.createElement('li');
  itemElement.classList.add('cart-item');

  var nameElement = document.createElement('span');
  nameElement.classList.add('item-name');
  nameElement.textContent = item.name;
  itemElement.appendChild(nameElement);

  var priceElement = document.createElement('span');
  priceElement.classList.add('item-price');
  priceElement.textContent = item.price;
  itemElement.appendChild(priceElement);

  var quantityWrapper = document.createElement('div');
  quantityWrapper.classList.add('quantity-wrapper');

  var minusButton = document.createElement('button');
  minusButton.classList.add('quantity-button', 'minus');
  minusButton.textContent = '-';
  quantityWrapper.appendChild(minusButton);

  var quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = '1';
  quantityInput.value = item.quantity;
  quantityInput.classList.add('quantity-input');
  quantityWrapper.appendChild(quantityInput);

  var plusButton = document.createElement('button');
  plusButton.classList.add('quantity-button', 'plus');
  plusButton.textContent = '+';
  quantityWrapper.appendChild(plusButton);

  itemElement.appendChild(quantityWrapper);

  var removeButton = document.createElement('button');
  removeButton.classList.add('remove-item');
  removeButton.textContent = 'Remover';
  removeButton.dataset.index = index;
  itemElement.appendChild(removeButton);

  cartItemsElement.appendChild(itemElement);
});

      
  updateQuantityButtons();
}

function updateQuantityButtons() {
  var plusButtons = document.querySelectorAll('.quantity-button.plus');
  var minusButtons = document.querySelectorAll('.quantity-button.minus');

  plusButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var input = button.parentNode.querySelector('.quantity-input');
      var itemIndex = input.closest('.cart-item').querySelector('.remove-item').dataset.index;
      cartItems[itemIndex].quantity += 1;
      input.value = cartItems[itemIndex].quantity;
      updateCartQuantity();
    });
});

  minusButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var input = button.parentNode.querySelector('.quantity-input');
      var itemIndex = input.closest('.cart-item').querySelector('.remove-item').dataset.index;
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity -= 1;
        input.value = cartItems[itemIndex].quantity;
        updateCartQuantity();
    }
  });
});

  var quantityInputs = document.querySelectorAll('.quantity-input');
  quantityInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      var quantity = parseInt(input.value);
      var itemIndex = input.closest('.cart-item').querySelector('.remove-item').dataset.index;
      cartItems[itemIndex].quantity = quantity;
      updateCartQuantity();
    });
  });
}

function updateCartQuantity() {
  var totalQuantity = 0;
  cartItems.forEach(function (item) {
    totalQuantity += item.quantity;
  });
  cartQuantity = totalQuantity;
  cartQuantityElement.textContent = cartQuantity;
}

function updateCartItemQuantity(itemIndex, quantity) {
  cartItems[itemIndex].quantity = quantity;
  updateCartQuantityElement();
}

function updateCartQuantityElement() {
  var totalQuantity = 0;
  cartItems.forEach(function (item) {
  totalQuantity += item.quantity;
  });
  cartQuantity = totalQuantity;
  cartQuantityElement.textContent = cartQuantity;
}

  cartButton.addEventListener('click', function () {
  cartPopup.style.display = 'block';
});

  window.addEventListener('click', function (event) {
    if (event.target !== cartPopup && event.target !== cartButton) {
      cartPopup.style.display = 'none';
    }
});

  cartItemsElement.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-item')) {
      var itemIndex = event.target.dataset.index;
      cartItems.splice(itemIndex, 1);
      updateCartQuantityElement();
      updateCartItems();
    }
});

  clearCartButton.addEventListener('click', function () {
    cartItems = [];
    cartQuantity = 0;
    cartQuantityElement.textContent = cartQuantity;
    updateCartItems();
});

  checkoutButton.addEventListener('click', function () {
});

  updateQuantityButtons();

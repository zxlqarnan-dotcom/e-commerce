// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(id, price, img, name) {
    let item = cart.find(i => i.id === id);
    if (item) item.quantity++;
    else cart.push({id, price, img, name, quantity: 1});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    const tbody = document.getElementById('cart-tbody');
    if (tbody) {
        tbody.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            tbody.innerHTML += `
                <tr>
                    <td><img src="${item.img}" alt="${item.name}" width="50"></td>
                    <td>${item.name}</td>
                    <td>$${item.price}</td>
                    <td>
                        <button class="btn btn-sm btn-secondary" onclick="updateQuantity('${item.id}', -1)">-</button>
                        ${item.quantity}
                        <button class="btn btn-sm btn-secondary" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </td>
                    <td>$${item.price * item.quantity}</td>
                    <td><button class="btn btn-sm btn-danger" onclick="removeItem('${item.id}')">Remove</button></td>
                </tr>
            `;
        });
        document.getElementById('cart-total').textContent = total;
    }
}

function updateQuantity(id, delta) {
    let item = cart.find(i => i.id === id);
    item.quantity += delta;
    if (item.quantity <= 0) removeItem(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Wishlist
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
function toggleWishlist(id) {
    if (wishlist.includes(id)) wishlist = wishlist.filter(i => i !== id);
    else wishlist.push(id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    document.getElementById(`wish-${id}`).classList.toggle('text-danger');
    const wishlistRow = document.getElementById('wishlist-row');
    if (wishlistRow) {
        wishlistRow.innerHTML = '';
        wishlist.forEach(id => {
            // Assume product data, add card (hardcode for simplicity)
            wishlistRow.innerHTML += `<div class="col-md-3"><div class="card"><img src="images/product-${id}.jpg" class="card-img-top"><div class="card-body"><h5>${id}</h5></div></div></div>`;
        });
    }
}

// Countdown
const countdown = setInterval(() => {
    let seconds = parseInt(document.getElementById('seconds').textContent);
    let minutes = parseInt(document.getElementById('minutes').textContent);
    let hours = parseInt(document.getElementById('hours').textContent);
    let days = parseInt(document.getElementById('days').textContent);

    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;
    }
    if (minutes < 0) {
        minutes = 59;
        hours--;
    }
    if (hours < 0) {
        hours = 23;
        days--;
    }
    if (days < 0) clearInterval(countdown);

    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
}, 1000);

// Init
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});
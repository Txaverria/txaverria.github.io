const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout");

let total = 0;
let cartItemsArray = JSON.parse(localStorage.getItem("cartItems")) || [];

// Load saved cart items from localStorage
function loadCartItems() {
	cartItemsArray.forEach((item) => {
		const cartItem = document.createElement("li");
		cartItem.textContent = `${item.name} - ₡${item.price}`;
		cartItems.appendChild(cartItem);
		total += item.price;
	});

	cartTotal.textContent = total;
}

function removeCartItem(index) {
	const removedItem = cartItemsArray.splice(index, 1)[0];
	localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));

	total -= removedItem.price;
	cartTotal.textContent = total;

	Swal.fire({
		icon: "success",
		title: "¡Producto removido con éxito!",
		showConfirmButton: false,
		timer: 1000,
	});

	updateCartUI();
}

function updateCartUI() {
	cartItems.innerHTML = "";

	cartItemsArray.forEach((item, index) => {
		const cartItem = document.createElement("li");
		cartItem.innerHTML = `<div class="">
		
		<h6 class="my-0">${item.name}</h6>
	</div>
	<div>
	<span class="precio text-body-secondary me-2">₡${item.price}</span>
	<button class="remove-item"><i class="bi bi-x"></i></button>
	</div>
	
	`;

		cartItem.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"lh-sm",
			"align-items-center",
			"cart-item"
		);

		cartItem.classList.add("cart-item");
		cartItems.appendChild(cartItem);

		const removeButton = cartItem.querySelector(".remove-item");
		removeButton.addEventListener("click", () => removeCartItem(index));
	});
}

loadCartItems();
updateCartUI();

addToCartButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const product = button.parentElement;
		const productName = product.querySelector("h2").textContent;
		const productPrice = parseFloat(
			product.querySelector("p").textContent.split("₡")[1]
		);

		const cartItem = { name: productName, price: productPrice };
		cartItemsArray.push(cartItem);

		localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));

		const newCartItem = document.createElement("li");
		newCartItem.textContent = `${productName} - $${productPrice}`;
		cartItems.appendChild(newCartItem);

		total += productPrice;
		cartTotal.textContent = total;

		Swal.fire({
			icon: "success",
			title: "¡Producto agregado con éxito!",
			showConfirmButton: false,
			timer: 1000,
		});

		updateCartUI();
	});
});

checkoutButton.addEventListener("click", () => {
	// alert(`Thank you for your purchase! Your total is ₡${total}`);
	// Clear cart items and local storage after checkout
	// cartItemsArray = [];
	// localStorage.removeItem("cartItems");
	// cartItems.innerHTML = "";
	// cartTotal.textContent = "0.00";

	// Redirect to checkout.html

	

	window.location.href = "checkout";
});

const cartItems = document.getElementById("cart-items");
const formTotal = document.getElementById("pagoTotalForm");
const cartTotal = document.getElementById("cart-total");
const cantItems = document.getElementById("cant-items");

let cartItemsArray = JSON.parse(localStorage.getItem("cartItems")) || [];

function removeCartItem(index) {
	const removedItem = cartItemsArray.splice(index, 1)[0];
	localStorage.setItem("cartItems", JSON.stringify(cartItemsArray));
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

		cartItems.appendChild(cartItem);

		// `${item.name} - ₡${item.price} `
		// <button class="remove-item">Remove</button>

		const removeButton = cartItem.querySelector(".remove-item");
		removeButton.addEventListener("click", () => removeCartItem(index));
	});

	const total = cartItemsArray.reduce((sum, item) => sum + item.price, 0);
	var totalIva = total + total * 0.13;

	cartTotal.textContent = total;
	formTotal.value = `₡${totalIva}`;
	cantItems.textContent = cartItemsArray.length;
}

updateCartUI();

(() => {
	"use strict";

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll(".needs-validation");

	// Loop over them and prevent submission
	Array.from(forms).forEach((form) => {
		form.addEventListener(
			"submit",
			async (event) => {
				var pagoTotalForm = form.querySelector("#pagoTotalForm");
				pagoTotalForm.removeAttribute("disabled");

				event.preventDefault();
				event.stopPropagation();

				if (!form.checkValidity()) {
					form.classList.add("was-validated");
					return;
				}

				form.classList.add("was-validated");

				emailjs.sendForm(
					"service_2hwr3oh",
					"template_giamtgc",
					"#checkoutForm",
					"tuimIRMnGymExu16s"
				);

				Swal.fire({
					icon: "success",
					title: "¡Gracias por su compra!",
					html: "<p class='texto-parrafo'>¡Pronto nos estaremos contactando con usted a través de su correo!</p>",
					showConfirmButton: false,
					timer: 3000,
				});

				pagoTotalForm.setAttribute("disabled", "");

				// Delay the page reload by 5 seconds
				await new Promise((resolve) => setTimeout(resolve, 3500));
				
				localStorage.removeItem("cartItems");
				window.location.href = "tienda";
			},
			false
		);
	});
})();

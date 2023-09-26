const imagenHero = document.getElementById("imagenHero");

window.addEventListener("load", function () {
	imagenHero.addEventListener("transitionend", function () {
		imagenHero.classList.remove("imagen-hero-blur");
	});
	imagenHero.classList.add("imagen-hero-normal");
});

const imageUrls = [
	"img/indeximage0.webp",
	"img/indeximage1.webp",
	"img/indeximage2.webp",
	"img/indeximage3.webp",
	"img/indeximage4.webp",
];

let counterImage = 0;

function changeImage() {
	counterImage++;

	if (counterImage >= imageUrls.length) {
		counterImage = 0;
	}

	imagenHero.style.backgroundImage = `url(${imageUrls[counterImage]})`;
}

setInterval(changeImage, 6000);

$(document).ready(function () {
	$(".logo-carousel").slick({
		slidesToShow: 5,
		autoplay: true,
		autoplaySpeed: 1300,
		arrows: false,
		dots: false,
		pauseOnHover: false,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 520,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	});
});

$(document).ready(function () {
	$("#selectDestacados").change(function () {
		var selectedValue = $(this).val();
		console.log(selectedValue);

		$(".category-content").hide();

		$("#procesadores").hide();
		$("#gpus").hide();
		$("#rams").hide();
		$("#" + selectedValue).show();
	});
});

const link = document.querySelectorAll("a");

const counters = [
	{ id: "counter1", value: 15 },
	{ id: "counter2", value: 100 },
	{ id: "counter3", value: 150 },
];

function animateCounter(targetId, targetValue) {
	let current = 0;
	const element = document.getElementById(targetId);
	const increment = targetValue / 200;
	const animation = setInterval(() => {
		current += increment;
		element.textContent = Math.round(current);
		if (current >= targetValue) {
			element.textContent = targetValue;
			clearInterval(animation);
		}
	}, 10);
}

function handleScroll() {
	for (const counter of counters) {
		const element = document.getElementById(counter.id);
		const rect = element.getBoundingClientRect();
		if (
			rect.top <= window.innerHeight &&
			rect.bottom >= 0 &&
			!element.hasAttribute("data-animated")
		) {
			animateCounter(counter.id, counter.value);
			element.setAttribute("data-animated", "true");
		}
	}
}

window.addEventListener("scroll", handleScroll);

const navTienda = document.querySelector("#navTienda");
const navPcs = document.querySelector("#navPcs");
const navPerf = document.querySelector("#navPerf");
const navOffice = document.querySelector("#navOffice");
const navFunc = document.querySelector("#navFunc");
const navContact = document.querySelector("#navContact");
const titulo = document.querySelector("#titulo");
const herop = document.querySelector("#herop");
const herobtn = document.querySelector("#herobtn");
const gamerh1PCs = document.querySelector("#gamerh1PCs");
const gamerpPCs = document.querySelector("#gamerpPCs");
const gamerbtnPCs = document.querySelector("#gamerbtnPCs");
const ofih1PCs = document.querySelector("#ofih1PCs");
const ofipPCs = document.querySelector("#ofipPCs");
const ofibtnPCs = document.querySelector("#ofibtnPCs");
const empresatituloPCs = document.querySelector("#empresatituloPCs");
const empresaparrafoPCs = document.querySelector("#empresaparrafoPCs");
const empresabtnPCs = document.querySelector("#empresabtnPCs");
const tituloArmaPC = document.querySelector("#tituloArmaPC");
const parrafoArmaPC = document.querySelector("#parrafoArmaPC");
const btnArmaPC = document.querySelector("#btnArmaPC");
const tituloMarcas = document.querySelector("#tituloMarcas");
const parrafoMarcas = document.querySelector("#parrafoMarcas");
const tituloDesta = document.querySelector("#tituloDesta");
const tipoDesta = document.querySelector("#tipoDesta");
const proceDesta = document.querySelector("#proceDesta");
const gpusDesta = document.querySelector("#gpusDesta");
const ramDesta = document.querySelector("#ramDesta");
const btnVer1 = document.querySelector("#btnVer1");
const btnVer2 = document.querySelector("#btnVer2");
const btnVer3 = document.querySelector("#btnVer3");
const btnVer4 = document.querySelector("#btnVer4");
const btnVer5 = document.querySelector("#btnVer5");
const btnVer6 = document.querySelector("#btnVer6");
const btnVer7 = document.querySelector("#btnVer7");
const testimoniales = document.querySelector("#testimoniales");
const parrafoTesti = document.querySelector("#parrafoTesti");
const anosExperiencia = document.querySelector("#anosExperiencia");
const clientesSatischechos = document.querySelector("#clientesSatischechos");
const equiposRealizados = document.querySelector("#equiposRealizados");
const quienesFAQ = document.querySelector("#quienesFAQ");
const objetivoFAQ = document.querySelector("#objetivoFAQ");
const botonFAQ = document.querySelector("#botonFAQ");
const tiendaFooter = document.querySelector("#tiendaFooter");
const contactoFooter = document.querySelector("#contactoFooter");
const rendFooter = document.querySelector("#rendFooter");
const actFooter = document.querySelector("#actFooter");
const menFooter = document.querySelector("#menFooter");
const rightsFooter = document.querySelector("#rightsFooter");
const navEmpresa = document.querySelector("#navEmpresa");

link.forEach((r) => {
	r.addEventListener("click", () => {
		const attr = r.getAttribute("language");
		navTienda.textContent = changeLanguage[attr].navTienda;
		navPcs.textContent = changeLanguage[attr].navPcs;
		navPerf.textContent = changeLanguage[attr].navPerf;
		navOffice.textContent = changeLanguage[attr].navOffice;
		navFunc.textContent = changeLanguage[attr].navFunc;
		navContact.textContent = changeLanguage[attr].navContact;
		titulo.textContent = changeLanguage[attr].titulo;
		herop.textContent = changeLanguage[attr].herop;
		herobtn.textContent = changeLanguage[attr].herobtn;
		gamerh1PCs.textContent = changeLanguage[attr].gamerh1PCs;
		gamerpPCs.textContent = changeLanguage[attr].gamerpPCs;
		gamerbtnPCs.textContent = changeLanguage[attr].gamerbtnPCs;
		ofih1PCs.textContent = changeLanguage[attr].ofih1PCs;
		ofipPCs.textContent = changeLanguage[attr].ofipPCs;
		ofibtnPCs.textContent = changeLanguage[attr].ofibtnPCs;
		empresatituloPCs.textContent = changeLanguage[attr].empresatituloPCs;
		empresaparrafoPCs.textContent = changeLanguage[attr].empresaparrafoPCs;
		empresabtnPCs.textContent = changeLanguage[attr].empresabtnPCs;
		tituloArmaPC.textContent = changeLanguage[attr].tituloArmaPC;
		parrafoArmaPC.textContent = changeLanguage[attr].parrafoArmaPC;
		btnArmaPC.textContent = changeLanguage[attr].btnArmaPC;
		tituloMarcas.textContent = changeLanguage[attr].tituloMarcas;
		parrafoMarcas.textContent = changeLanguage[attr].parrafoMarcas;
		tituloDesta.textContent = changeLanguage[attr].tipoDesta;
		proceDesta.textContent = changeLanguage[attr].proceDesta;
		gpusDesta.textContent = changeLanguage[attr].gpusDesta;
		ramDesta.textContent = changeLanguage[attr].ramDesta;
		btnVer1.textContent = changeLanguage[attr].btnVer1;
		btnVer2.textContent = changeLanguage[attr].btnVer2;
		btnVer3.textContent = changeLanguage[attr].btnVer3;
		btnVer4.textContent = changeLanguage[attr].btnVer4;
		btnVer5.textContent = changeLanguage[attr].btnVer5;
		btnVer6.textContent = changeLanguage[attr].btnVer6;
		btnVer7.textContent = changeLanguage[attr].btnVer7;
		testimoniales.textContent = changeLanguage[attr].testimoniales;
		parrafoTesti.textContent = changeLanguage[attr].parrafoTesti;
		anosExperiencia.textContent = changeLanguage[attr].anosExperiencia;
		clientesSatischechos.textContent =
			changeLanguage[attr].clientesSatischechos;
		equiposRealizados.textContent = changeLanguage[attr].equiposRealizados;
		quienesFAQ.textContent = changeLanguage[attr].quienesFAQ;
		objetivoFAQ.textContent = changeLanguage[attr].objetivoFAQ;
		botonFAQ.textContent = changeLanguage[attr].botonFAQ;
		tiendaFooter.textContent = changeLanguage[attr].tiendaFooter;
		contactoFooter.textContent = changeLanguage[attr].contactoFooter;
		rendFooter.textContent = changeLanguage[attr].rendFooter;
		actFooter.textContent = changeLanguage[attr].actFooter;
		menFooter.textContent = changeLanguage[attr].menFooter;
		rightsFooter.textContent = changeLanguage[attr].rightsFooter;
		navEmpresa.textContent = changeLanguage[attr].navEmpresa;
	});
});

let changeLanguage = {
	spanish: {
		navTienda: "TIENDA",
		navPcs: "Computadoras",
		navPerf: "Rendimiento",
		navOffice: "Oficina",
		navFunc: "FUNCIONAMIENTO",
		navContact: "CONTACTO",
		titulo: "ARMA TU COMPUTADORA",
		herop: "Piezas con un precio inigualable.",
		herobtn: "COMPRAR AHORA",
		gamerh1PCs: "Computadoras gamer",
		gamerpPCs:
			"Nuestro principal enfoque es proporcionar computadoras que corran los últimos juegos con los gráficos al máximo al mejor precio.",
		gamerbtnPCs: "Ver rendimiento gamer",
		ofih1PCs: "Computadoras de oficina",
		ofipPCs:
			"Ofrecemos equipos para trabajo o estudio con precios excelentes. Te ayudaremos a conseguir justamente lo que necesitas para no gastar innecesariamente.",
		ofibtnPCs: "Comprar",
		empresatituloPCs: "Servicios empresariales",
		empresaparrafoPCs:
			"Si necesitas una cantidad de equipos para ofimática u otra necesidad, te podemos ayudar y asesor cuanto antes. Ponte en contacto con nosotros.",
		empresabtnPCs: "Contactar",
		tituloArmaPC: "¿No sabes armar computadoras?",
		parrafoArmaPC:
			"¡Nosotros te ayudamos con nuestros profesionales para que puedas conseguir el mejor rendimiento con el mejor precio!",
		btnArmaPC: "¿Cómo funciona?",
		tituloMarcas: "Las mejores marcas",
		parrafoMarcas:
			"Ofrecemos excelentes marcas a precios competitivos para todos tus requisitos.",
		tituloDesta: "Productos destacados",
		tipoDesta: "Seleccione un tipo de producto:",
		proceDesta: "Procesadores",
		gpusDesta: "Tarjetas de Video",
		ramDesta: "RAM",
		btnVer1: "Ver",
		btnVer2: "Ver",
		btnVer3: "Ver",
		btnVer4: "Ver",
		btnVer5: "Ver",
		btnVer6: "Ver",
		btnVer7: "Ver",
		testimoniales: "Testimoniales",
		parrafoTesti:
			"¿No crees en nuestros increíbles precios? Mira lo que dicen nuestros clientes",
		anosExperiencia: "Años de experiencia",
		clientesSatischechos: "Clientes satisfechos",
		equiposRealizados: "Equipos realizados",
		quienesFAQ: "¿Quiénes somos?",
		objetivoFAQ:
			"Traemos piezas de computadora directamente de los mejores fabricantes, y las vendemos a los mejores precios.",
		botonFAQ: "Más información",
		tiendaFooter: "TIENDA",
		contactoFooter: "CONTACTO",
		rendFooter: "RENDIMIENTO",
		actFooter: "Subscríbete a nuestras actualizaciones",
		menFooter: "Te enviaremos correos si tenemos nuevas piezas, entre otros.",
		rightsFooter: "© 2023 EASYTECH, Todos los derechos reservados.",
	},

	english: {
		navTienda: "STORE",
		navPcs: "Computers",
		navPerf: "Performance",
		navOffice: "Office",
		navFunc: "FUNCTIONALITY",
		navContact: "CONTACT",
		titulo: "BUILD YOUR COMPUTER",
		herop: "Unmatched price parts.",
		herobtn: "BUY NOW",
		gamerh1PCs: "Gaming computers",
		gamerpPCs:
			"Our main focus is to provide computers that can run the latest games with maximum graphics at the best price.",
		gamerbtnPCs: "See gaming performance",
		ofih1PCs: "Office computers",
		ofipPCs:
			"We offer work or study equipment with excellent prices. We'll help you get exactly what you need without unnecessary spending.",
		ofibtnPCs: "Buy",
		empresatituloPCs: "Business services",
		empresaparrafoPCs:
			"If you need a quantity of office equipment or other needs, we can help and advise you as soon as possible. Get in touch with us.",
		empresabtnPCs: "Contact",
		tituloArmaPC: "Don't know how to assemble computers?",
		parrafoArmaPC:
			"We help you with our professionals so you can get the best performance at the best price!",
		btnArmaPC: "How does it work?",
		tituloMarcas: "The best brands",
		parrafoMarcas:
			"We offer excellent brands at competitive prices for all your requirements.",
		tituloDesta: "Featured products",
		tipoDesta: "Select a product type:",
		proceDesta: "Processors",
		gpusDesta: "Graphics Cards",
		ramDesta: "RAM",
		btnVer1: "View",
		btnVer2: "View",
		btnVer3: "View",
		btnVer4: "View",
		btnVer5: "View",
		btnVer6: "View",
		btnVer7: "View",
		testimoniales: "Testimonials",
		parrafoTesti:
			"Don't believe in our incredible prices? See what our customers say",
		anosExperiencia: "Years of experience",
		clientesSatischechos: "Satisfied customers",
		equiposRealizados: "Equipment assembled",
		quienesFAQ: "Who are we?",
		objetivoFAQ:
			"We bring computer parts directly from the best manufacturers and sell them at the best prices.",
		botonFAQ: "More information",
		tiendaFooter: "STORE",
		contactoFooter: "CONTACT",
		rendFooter: "PERFORMANCE",
		actFooter: "Subscribe to our updates",
		menFooter:
			"We'll send you emails if we have new parts, among other things.",
		rightsFooter: "© 2023 EASYTECH, All rights reserved.",
		navEmpresa: "Companies"
	},
};

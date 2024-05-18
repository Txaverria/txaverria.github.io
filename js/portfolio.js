const container = document.getElementById('container-console');
const closeButton = document.getElementById('closeButton');
const maximizeButton = document.getElementById('maximizeButton');
const hideButton = document.getElementById('hideButton');
const taskbarStart = document.getElementById('taskbarStart');
const taskbarItem = document.getElementById('taskbarItem');
const taskbarItemImg = taskbarItem.querySelector('img');

function copyText(text) {
	var textArea = document.createElement('textarea');
	textArea.value = text;
	document.body.appendChild(textArea);

	textArea.select();
	document.execCommand('copy');
	document.body.removeChild(textArea);

	Swal.fire({
		position: 'bottom-start',
		icon: 'success',
		title: '<span style="font-size: 1.2rem;">Copied to clipboard</span>',
		toast: true,
		showConfirmButton: false,
		timer: 1750,
		timerProgressBar: true,
	});
}

let maximizeImageIndex = 1;

let currentPosition = 0;

closeButton.addEventListener('click', () => {
	container.style.animation = 'shake 0.5s ease';
	setTimeout(() => {
		container.style.animation = '';
	}, 500);
});

maximizeButton.addEventListener('click', () => {
	container.classList.toggle('width75');
	container.classList.toggle('width100');

	if (maximizeImageIndex === 1) {
		maximizeButton.src =
			'https://img.icons8.com/windows/64/minimize-window.png';
		console.log(maximizeImageIndex);
		maximizeImageIndex = 2;
	} else {
		maximizeButton.src =
			'https://img.icons8.com/windows/64/maximize-button.png';
		console.log(maximizeImageIndex);
		maximizeImageIndex = 1;
	}
});

hideButton.addEventListener('click', hideWindow);

function hideWindow() {
	container.classList.add('opacity-0');
	currentPosition += 50;
	container.style.transform = `translateY(${currentPosition}px)`;
	taskbarItem.style.color = 'black';
	taskbarItem.style.background = 'rgb(222, 226, 230)';
	taskbarItemImg.style.filter = 'invert(0)';
	taskbarItemImg.src = 'https://img.icons8.com/windows/64/sort-up.png';
	taskbarItem.style.cursor = 'pointer';

	// Disable the second event listener
	taskbarItem.addEventListener('click', showWindow);
}

function showWindow() {
	taskbarItem.style.color = 'white';
	taskbarItemImg.style.filter = 'invert(1)';
	currentPosition -= 50;
	container.style.transform = `translateY(${currentPosition}px)`;
	taskbarItem.style.background = 'none';
	container.classList.remove('opacity-0');
	taskbarItemImg.src = 'https://img.icons8.com/windows/64/sort-down.png';
	taskbarItem.style.cursor = 'default';

	// Disable the second event listener
	taskbarItem.removeEventListener('click', showWindow);
}

taskbarStart.addEventListener('click', () => {
	window.location.href = '#about-me';
});

function updateTime() {
	const clockElement = document.getElementById('clock');
	const currentTime = new Date();
	let hours = currentTime.getHours();
	const minutes = currentTime.getMinutes().toString().padStart(2, '0');

	let amPm = 'AM';

	if (hours > 12) {
		hours -= 12;
		amPm = 'PM';
	}

	hours = hours.toString().padStart(2, '');

	const timeString = `${hours}:${minutes} ${amPm}`;
	clockElement.textContent = timeString;
}

// Update the time immediately and then every second
updateTime();
setInterval(updateTime, 10000);

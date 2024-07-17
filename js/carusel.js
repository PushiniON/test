let images = document.querySelectorAll('.carusel-box');
let indexImg = 0;
const ADD_CLASS = 'carusel-box-view';

images[indexImg].classList.toggle(ADD_CLASS);

function nextImg() {
	let i = 1;
	indexImg++;

	if (indexImg === images.length) {
		indexImg = 0;
		i -= images.length;
	}
	images[indexImg].classList.toggle(ADD_CLASS);
	images[indexImg - i].classList.toggle(ADD_CLASS);
}

function previousImg() {
	let i = 1;
	indexImg--;

	if (indexImg < 0) {
		indexImg = images.length - 1;
		i -= images.length;
	}
	images[indexImg].classList.toggle(ADD_CLASS);
	images[indexImg + i].classList.toggle(ADD_CLASS);
}
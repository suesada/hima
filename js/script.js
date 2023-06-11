let size = 40;
const himaMax = 16;

let cw = document.documentElement.clientWidth;
let ch = document.documentElement.clientHeight;

document.body.style.width = cw.toString() + 'px';
document.body.style.height = ch.toString() + 'px';

let canvas = document.querySelector('canvas');

canvas.setAttribute('width', cw - size);
canvas.setAttribute('height', ch - size);

canvas.style.width = cw.toString() + 'px';
canvas.style.height = ch.toString() + 'px';

let himaImg = new Image();
himaImg.src = '.\\svg\\hima.svg';

let himaPos = [];
for (let i = 0; i < himaMax; i++) {
	himaPos.push({'x': -1, 'y': -1, 'h': 0});
}

let crushHima = [];

const randomInt = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

const reflesh = () => {
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, cw, ch);

	let emptyIndex = himaPos.findIndex(hp => hp.x == -1);
	if (emptyIndex >= 0 && randomInt(0, 10) < 1) {
		himaPos[emptyIndex] = {'x': randomInt(0, cw - size), 'y': randomInt(0, ch - size), 'h': 1};
	}

	for (let i = 0; i < himaPos.length; i++) {
		if (himaPos[i].x != -1) {
			if (crushHima.indexOf(i) >= 0) {
				himaPos[i].h -= 0.1;
			}
			if (himaPos[i].h <= 0) {
				crushHima.splice(crushHima.indexOf(i));
				himaPos[i] = {'x': -1, 'y': -1, 'h': 0};
			} else {
				ctx.drawImage(himaImg, himaPos[i].x, himaPos[i].y + size * (1 - himaPos[i].h) / 2, size, size * himaPos[i].h);
			}
		}
	}

	setTimeout('reflesh()', 50);
}

himaImg.onload = () => {
	reflesh();
}

canvas.onclick = (e) => {
	let clientRect = canvas.getBoundingClientRect();

	let x = e.pageX - clientRect.left;
	let y = e.pageY - clientRect.top;

	for (let i = 0; i < himaPos.length; i++) {
		if ((x > himaPos[i].x && x < himaPos[i].x + size) && (y > himaPos[i].y && y < himaPos[i].y + size)) {
			crushHima.push(i);
		}
	}
}
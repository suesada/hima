let size = 40;
const himaMax = 12;

let cw = document.documentElement.clientWidth;
let ch = document.documentElement.clientHeight;

document.body.style.width = cw.toString() + 'px';
document.body.style.height = ch.toString() + 'px';

let canvas = document.querySelector('canvas');

canvas.setAttribute('width', cw);
canvas.setAttribute('height', ch);

canvas.style.width = cw.toString() + 'px';
canvas.style.height = ch.toString() + 'px';

let himaImg = new Image();
himaImg.src = '.\\svg\\hima.svg';

let hima = [];
for (let i = 0; i < himaMax; i++) {
	hima.push({'x': -1, 'y': -1, 'h': 0, 'f': -1});
}

const randomInt = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

const reflesh = () => {
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, cw, ch);

	let emptyIndex = hima.findIndex(hp => hp.x == -1);
	if (emptyIndex >= 0 && randomInt(0, 12) == 0) {
		hima[emptyIndex] = {'x': randomInt(0, cw - size), 'y': randomInt(0, ch - size), 'h': 1, 'f': false};
	}

	for (let i = 0; i < hima.length; i++) {
		if (hima[i].x != -1) {
			if (hima[i].f) {
				hima[i].h -= 0.1;
			}
			if (hima[i].h <= 0) {
				hima[i] = {'x': -1, 'y': -1, 'h': 0, 'f': false};
			} else {
				ctx.drawImage(himaImg, hima[i].x, hima[i].y + size * (1 - hima[i].h) / 2, size, size * hima[i].h);
			}
		}
	}

	setTimeout('reflesh()', 20);
}

himaImg.onload = () => {
	reflesh();
}

canvas.onclick = (e) => {
	let clientRect = canvas.getBoundingClientRect();

	let x = e.pageX - clientRect.left;
	let y = e.pageY - clientRect.top;

	for (let i = 0; i < hima.length; i++) {
		if ((x > hima[i].x && x < hima[i].x + size) && (y > hima[i].y && y < hima[i].y + size)) {
			hima[i].f = true;
		}
	}
}
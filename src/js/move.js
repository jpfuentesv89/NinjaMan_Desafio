var leftValue = 40,
	topValue = 40,
	rotateValue = '',
	tiempo = 0,
	puntaje = 0,
	onigiri = 0,
	lives = localStorage.getItem('lives') || 3,
	level = localStorage.getItem('level') || 1,
	sushi = 0,
	GosthLeftValue = 200,
	GosthTopValue = 200;
fantasma = 0;

function obteneRandom() {
	var randomValue = Math.random() < 0.3 ? 40 : -40;
	return randomValue;
}

setInterval(function () {
	tiempo++;
	document.getElementById('time').innerHTML = tiempo;

	GosthTopValue += obteneRandom();
	GosthLeftValue += obteneRandom();

	console.log(GosthLeftValue, GosthTopValue);

	var element = document.elementFromPoint(GosthLeftValue, GosthTopValue);

	if (
		element == null ||
		GosthLeftValue < 0 ||
		GosthLeftValue > 560 ||
		GosthTopValue < 0 ||
		GosthTopValue > 440
	) {
		GosthTopValue = 200 + obteneRandom();
		GosthLeftValue = 280 + obteneRandom();
		document.elementFromPoint(GosthLeftValue, GosthTopValue);
	}

	console.log(element);

	if (element.classList.contains('pacmaninja')) {
		fantasma++;
		alert('El fantasma te atrapo por ' + fantasma + ' vez');
		if (fantasma == 3) {
			fantasma = 0;
			lives--;
			alert('Perdiste una vida');
		}
		if (lives == 0) {
			alert('Te quedaste sin vidas, perdiste');
			localStorage.setItem('level', 1);
			localStorage.setItem('lives', 3);
			window.location.href = 'game.html';
		}
	}
	if (element.classList.contains('scaredy')) {
		element.classList.remove(...element.classList);
		element.classList.add('scaredy');
	}

	document.getElementById('scaredy').style.left = GosthLeftValue + 'px';
	document.getElementById('scaredy').style.top = GosthTopValue + 'px';
}, 1000);

function update() {
	document.getElementById('pacmaninja').style.left = leftValue + 'px';
	document.getElementById('pacmaninja').style.top = topValue + 'px';
	document.getElementById('scaredy').style.left = GosthLeftValue + 'px';
	document.getElementById('scaredy').style.top = GosthTopValue + 'px';
	document.getElementById('pacmaninja').style.transform = rotateValue;
	document.getElementById('score').innerHTML = puntaje;
	document.getElementById('time').innerHTML = tiempo;
	document.getElementById('sushi').innerHTML = sushi;
	document.getElementById('rice').innerHTML = onigiri;
	document.getElementById('lives').innerHTML = lives;
	document.getElementById('level').innerHTML = level;
}

function move(newLeftValue, newTopValue) {
	var element = document.elementFromPoint(newLeftValue, newTopValue);
	console.log(element);
	if (!element.classList.contains('muro')) {
		leftValue = newLeftValue;
		topValue = newTopValue;
	}
	if (element.classList.contains('scaredy') || element.classList.contains('pumpky')) {
		fantasma++;
		alert('El fantasma te atrapo por ' + fantasma + ' vez, ¡Ojo que Pumpky se come y es venenoso!');
		if (fantasma == 3) {
			fantasma = 0;
			lives--;
			alert('Perdiste una vida');
		}
		if (lives == 0) {
			alert('Te quedaste sin vidas, perdiste');
			localStorage.setItem('level', 1);
			localStorage.setItem('lives', 3);
			window.location.href = 'game.html';
		}
	}
	if (element.classList.contains('puntos')) {
		if (element.classList.contains('sushi')) {
			sushi++;
			if (sushi == 10) {
				alert('Ganaste Vida Extra, por comer 10 sushi');
				lives++;
			}
		}
		if (element.classList.contains('onigiri')) {
			onigiri++;
			if (onigiri == 15) {
				alert('Ganaste Vida Extra, por comer 15 Arroz');
				lives++;
			}
		}
		puntaje += parseInt(element.dataset.puntos);
		if (puntaje >= 1000) {
			alert('Ganaste, Felicidades, pasa al siguiente nivel');
			level++;
			localStorage.setItem('level', level);
			localStorage.setItem('lives', lives);
			window.location.href = 'game.html';
		}
		element.classList.remove(...element.classList);
		element.dataset.puntos.remove = element.dataset.puntos;
		element.classList.add('camino');
	}
}

document.onkeydown = function (e) {
	var newLeftValue = leftValue,
		newTopValue = topValue;
	if (e.keyCode == 37 && leftValue > 0) {
		rotateValue = 'rotateY(180deg)';
		newLeftValue = leftValue - 40;
	} else if (e.keyCode == 39 && leftValue < 560) {
		rotateValue = 'rotateY(0deg)';
		newLeftValue = leftValue + 40;
	}
	if (e.keyCode == 40 && topValue < 440) {
		rotateValue = 'rotate(90deg)';
		newTopValue = topValue + 40;
	} else if (e.keyCode == 38 && topValue > 0) {
		rotateValue = 'rotate(270deg)';
		newTopValue = topValue - 40;
	}
	move(newLeftValue, newTopValue);
	update();
};

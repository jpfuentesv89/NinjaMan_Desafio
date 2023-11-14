const clases = [
	'camino',
	'camino',
	'camino',
	'camino',
	'muro',
	'muro',
	'sushi',
	'bluey',
	'onigiri',
	'pinky',
	'pumpky',
	'red',
];

function obtenerClaseAleatoria() {
	const indiceAleatorio = Math.floor(Math.random() * clases.length);
	return clases[indiceAleatorio];
}

function generarElementosDiv() {
	const contenedor = document.getElementById('mundo');

	for (let i = 0; i < 12; i++) {
		const row = document.createElement('div');
		row.classList.add('row');
		contenedor.appendChild(row);

		for (let j = 0; j < 15; j++) {
			const div = document.createElement('div');
			if (i == 1 && j == 1) {
				div.classList.add('camino');
			} else {
				div.classList.add(obtenerClaseAleatoria());
			}

			if (div.classList.contains('sushi')) {
				div.classList.add('puntos');
				div.dataset.puntos = 10;
			} else if (div.classList.contains('onigiri')) {
				div.classList.add('puntos');
				div.dataset.puntos = 5;
			} else if (div.classList.contains('bluey')) {
				div.classList.add('puntos');
				div.dataset.puntos = 15;
			} else if (div.classList.contains('pinky')) {
				div.classList.add('puntos');
				div.dataset.puntos = 20;
			} else if (div.classList.contains('pumpky')) {
				div.classList.add('puntos');
				div.dataset.puntos = -25;
			} else if (div.classList.contains('red')) {
				div.classList.add('puntos');
				div.dataset.puntos = 30;
			}
			row.appendChild(div);
		}
	}
}

window.addEventListener('load', generarElementosDiv);

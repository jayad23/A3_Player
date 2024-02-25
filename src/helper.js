export const getRandomIndex = (arreglo, currentIndex) => {
	var numeroDecimal = Math.random();
	var indice = Math.floor(numeroDecimal * arreglo.length);
	var secondIndice = Math.floor(numeroDecimal * arreglo.length);
	return indice === currentIndex ? secondIndice : indice;
};

export const cleaningString = (inputString) => {
	const patronesAReemplazar = [
		/\(Video Oficial\)/g,
		/\(Official Music Video\)/g,
		/\(Explicit\)/g,
		/\(Official video\)/g,
		/\(Official HD Video\)/g,
		/&amp;/g,
		/\(Live on KEXP\)/g,
		/Live on KCRW/g,
		/&quot;/g,
	];

	let resultado = inputString;

	patronesAReemplazar.forEach((patron) => {
		resultado = resultado.replaceAll(patron, "");
	});

	return resultado;
};

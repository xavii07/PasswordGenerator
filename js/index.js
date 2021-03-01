/* ------------------------------ 
 VARIABLES Y OBJETOS GENERALES 
--------------------------------*/ 

	//acceder al formulario
	const app = document.querySelector("#app");
	//numero de caracteres que tiene el input
	const inputCaracteres = document.querySelector("#numero-caracteres");
	const sumar = document.querySelector("#btn-mas-uno")
	const restar = document.querySelector("#btn-menos-uno")
	const simbolo = document.querySelector("#btn-simbolos")
	const numero = document.querySelector("#btn-numeros")
	const mayuscula = document.querySelector("#btn-mayusculas")
	const botonGenerar = document.querySelector("#btn-generar")
	const passwordF = document.querySelector("#input-password")


	//configuracion para poder construir la contraseña
	const configuracion = {
		caracteres: parseInt(inputCaracteres.value),
		simbolos: true,
		numeros: true,
		mayusculas: true,
		minusculas: true
	}

	const caracteres = {
		numeros: "0 1 2 3 4 5 6 7 8 9 ",
		simbolos: ": ; . - + * / ¿ = ? ( ) & % $ # ! { } [ ] ",
		mayusculas: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z ",
		minusculas: "a b c d e f g h i j k l m n o p q r s t u v w x y z "
	}



/* ------------------------------ 
            FUNCIONES
--------------------------------*/

const btnToggle = e => {
	
	e.classList.toggle("false");
	e.childNodes[1].classList.toggle("fa-check");
	e.childNodes[1].classList.toggle("fa-times");
} 


const generarPassword = () => {

	//aqui se van a guardar todas las propiedades del objeto caracteres 
	let caracteresFinales = "";
	//contraseña generada
	let password = "";


	for (propiedad in configuracion ) {

		if (configuracion[propiedad] === true) {

			caracteresFinales += caracteres[propiedad]

		}
	}
		//console.log(caracteresFinales);

		//quita espaciado al inicio y al final de un areglo
		caracteresFinales = caracteresFinales.trim()
		//convierte string en un areglo y agrega un espacio
		caracteresFinales = caracteresFinales.split(" ")
		
		//console.log(caracteresFinales);

		
		for (i = 0; i < configuracion.caracteres; i++) {
			password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)]
		}

		passwordF.value = password;
}


	const copiarPassword = () => {

		//selecciona todo el texto
		passwordF.select()
		//copia el texto
		document.execCommand("copy")
		document.querySelector("#alerta-copiado").classList.add("active")

		setTimeout(() => {
			document.querySelector("#alerta-copiado").classList.remove("active")
		}, 2000)
	}


/* ------------------------------ 
        EVENTOS 
--------------------------------*/ 

	//Evento para evitar que la app haga un submit
	app.addEventListener("submit", e => {

		e.preventDefault()
	})

	//SUMAR número de caracteres
	sumar.addEventListener("click", () => {
		
		configuracion.caracteres++
		inputCaracteres.value = configuracion.caracteres
	
	})

	//RESTAR número de caracteres
	restar.addEventListener("click", () => {

		if (configuracion.caracteres > 1) {
			configuracion.caracteres--
			inputCaracteres.value = configuracion.caracteres
		}

	})

	//Eventos cuando presionamos los botones para cambiar los iconos
	simbolo.addEventListener("click", () => {
		
		btnToggle(simbolo);
		configuracion.simbolos =! configuracion.simbolos;
		//console.log("Simbolo: " + configuracion.simbolos);		

	})

	numero.addEventListener("click", () => {

		btnToggle(numero);
		configuracion.numeros =! configuracion.numeros;
		//console.log("Numeros: " + configuracion.numeros);		

	})

	mayuscula.addEventListener("click", () => {

		btnToggle(mayuscula);
		configuracion.mayusculas =! configuracion.mayusculas;
		//console.log("Mayusculas: " + configuracion.mayusculas);		

	})


	botonGenerar.addEventListener("click", generarPassword)

	passwordF.addEventListener("click", copiarPassword)






/* 
TAREA: Empezar preguntando cuanta gente hay en el grupo familiar.
Crear tantos inputs+labels cmo gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad
y el promedio.

Bonus: crear un boton para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs 

Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.
Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/





const $btnContinuar = document.querySelector('#btn-continuar');
const $frmIntegrantes = document.querySelector('#frm-integrantes');
const $btnCalcular = document.createElement('button');
const $btnSI = document.createElement('button');
const $btnNO = document.createElement('button');
const $resultado = document.querySelector('#resultado');
const $resultado2 = document.querySelector('#resultado2');
const $btnLimpiar = document.createElement('button');
const $contenedor = document.querySelector('.container');
let bandera = 0;
$btnLimpiar.textContent = 'Limpiar';
$btnCalcular.textContent = 'Calcular';
$btnCalcular.style = 'display:block';
$btnSI.textContent = 'Si';
$btnNO.textContent = 'No';

$btnContinuar.onclick = function(e) {
    const $cantIntegrantes = Number(document.querySelector("#cantidad-integrantes").value);
    borrar();
    agregarIntegrantes($cantIntegrantes);
    if($cantIntegrantes > 0) {
        const $preguntaSueldo = document.createElement('label');
        $preguntaSueldo.textContent = 'Ingresar sueldos';
        $frmIntegrantes.appendChild($preguntaSueldo);
        $frmIntegrantes.appendChild($btnSI);
        $frmIntegrantes.appendChild($btnNO);
    }
    e.preventDefault();
}

$btnSI.onclick = function(e){
    bandera = 1;
    const $cantIntegrantes = Number(document.querySelector("#cantidad-integrantes").value);
    agregarSueldos($cantIntegrantes);
    $frmIntegrantes.appendChild($btnCalcular);
    e.preventDefault();
}

$btnNO.onclick = function(e){
    $frmIntegrantes.appendChild($btnCalcular);
    e.preventDefault();
}

$btnCalcular.onclick = function(e){
    $resultado.textContent = calcularEdades();
    if (bandera === 1){
        $resultado2.textContent = calcularSueldos();
    } 
    this.remove();
    $contenedor.appendChild($btnLimpiar);
    bandera = 0;
    e.preventDefault();
}

$btnLimpiar.onclick = function(){
    borrar();
    $resultado.remove();
    $resultado2.remove();
    document.querySelector('#cantidad-integrantes').value = "";
    this.remove();
}

function agregarIntegrantes(numero){
    for(let i = 0; i < numero; i++) agregarEdades(i);
}

function agregarEdades(indice){
    const $label = document.createElement('label');
    const $edad = document.createElement('input');
    $edad.className = 'edad';
    $label.textContent = `Edad persona ${indice+1}`; 
    $frmIntegrantes.appendChild($label);
    $frmIntegrantes.appendChild($edad);
} 

function borrar(){
    while($frmIntegrantes.firstChild){
        $frmIntegrantes.firstChild.remove();
    }
}

function agregarSueldos(numero){
    for(let i = 0; i < numero; i++) sueldoIntegrante(i);
}

function sueldoIntegrante(indice){
    const $label = document.createElement('label');
    const $sueldo = document.createElement('input');
    const $btnQuitar = document.createElement('button');
    $btnQuitar.textContent = 'Quitar';
    $label.textContent = `Sueldo persona ${indice+1}`; 
    $sueldo.className = 'sueldo';
    $frmIntegrantes.appendChild($label);
    $frmIntegrantes.appendChild($sueldo);
    $frmIntegrantes.appendChild($btnQuitar);

    $btnQuitar.onclick = function(e){
        $label.remove();
        $sueldo.remove();
        $btnQuitar.remove();
        e.preventDefault();
    }

}

function obtenerEdades(){
    const $edades = document.querySelectorAll('.edad');
    let numEdades = [];
    for (let i = 0; i < $edades.length; i++){
        numEdades[i] = Number($edades[i].value);
    }
    return numEdades;
}

function calcularEdades(){
    const $edades = obtenerEdades();
    let suma = 0;
    let mayor = Math.max(...$edades);
    let menor = Math.min(...$edades);
    for (let i of $edades) suma += i;
    let promedio = suma/$edades.length;
    return `Mayor: ${mayor}, Menor: ${menor}, Promedio: ${promedio}`;
}

function obtenerSueldos(){
    const $sueldos = document.querySelectorAll('.sueldo');
    let valorSueldos = [];
    for(let i = 0; i < $sueldos.length; i++) valorSueldos[i] = Number($sueldos[i].value);
    return valorSueldos;
}

function calcularSueldos(){
    const sueldos = obtenerSueldos();
    let sumaAnuales = 0, sumaMensuales = 0;
    for(let i of sueldos) {
        sumaAnuales += i*12;
        sumaMensuales += i;
    }
    let sueldosAnuales = sueldos.map((i)=>i*12)
    let mayorAnual = Math.max(...sueldosAnuales);
    let menorAnual = Math.min(...sueldosAnuales);
    let promedioAnual = sumaAnuales/sueldos.length;
    let promedioMensual = sumaMensuales/sueldos.length;
    return `Sueldos(anuales) - Mayor: ${mayorAnual}, Menor: ${menorAnual}, Promedio: ${promedioAnual} PromedioMensual: ${promedioMensual}`
}







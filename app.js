// Esta aplicación, se conectará a API's de internet para que con algo parecido a:
// node app -d Barcelona Spain
// node app -d Paris Francia
// nos devuelva el clima/tiempo en esa localidad

// Ponemos la extensión .options y no .command, porqué no queremos que vaya precedida de una acción
// El command, nos serviria para poner node app listar -c ....
// Con el options, le indicamos que no necesitamos el comando (en este caso listar), sino que 
// directamente nos va a venir el indicador del parametro y el valor que le pasamos del mismo
const argv = require('yargs').options({
    direction: {
        alias: 'd',
        demand: true,
        description: 'Descripción de la ciudad y el país de dónde queremos obtener el clima.'

    }
}).argv;

// web del tiempo: https://openweathermap.org/current
// con sus API's podemos obtener acceso al tiempo de hoy, los ultimos n dias, etc.
// instalo la extensión JSONViewer en el Chrome

const color = require('colors');
const colors = require('colors/safe');
const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');


let getInfo = async(direction) => {

    try {

        let coors = await lugar.getLugarLatLng(direction);
        let temp = await clima.getClima(coors.lat, coors.lng);

        return `El clima en ` + `${coors.direccion}`.green + ` es de ` + `${temp.temperatura}`.red;

    } catch (e) {
        return `No se pudo determinar el clima en ` + `${direction}`.red;
    }

}

getInfo(argv.direction)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e));
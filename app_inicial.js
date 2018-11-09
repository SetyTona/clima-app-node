// EJEMPLO
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

const axios = require('axios');
const color = require('colors');
const colors = require('colors/safe');

let encodeURL = encodeURI(argv.direction);

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURL}&key=AIzaSyDyJPPlnIMOLp20Ef1LlTong8rYdTnaTXM`)
    .then(resp => {
        // Para ver que nos devuelve
        // console.log(resp);
        console.log(resp.data);
        console.log(resp.status);
        // VISUALIZAR TODO EL JSON DE RESPUESTA
        // esto es para poder ver todos los objetos y arreglos que hay en el JSON que nos devuelve
        // el segundo parametro no lo usaremos nunca, y en el tercero, podremos un 2 siempre
        console.log(JSON.stringify(resp.data, undefined, 2));

        // CREAR EL OBJETO location, con el primer elementro del JSON
        let location = resp.data.results[0];

        // Obtener datos concretos del JSON
        // Dirección formateada
        // Longitud y Latitud
        console.log(`Dirección ` + `${location.formatted_address}`.red);
        console.log(`Localización, latitud:` + ` ${location.geometry.location.lat}`.green);
        console.log(`Localización, latitud:` + ` ${location.geometry.location.lng}`.green);
        // console.log(`Localización, longitud: ${location.location.lng}`);

    })
    .catch(err => console.log("Error !!!!", err));

console.log(argv.direction);
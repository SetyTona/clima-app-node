const axios = require('axios');

let getLugarLatLng = async(direccion) => {

    // encodeURI >> Convierte en String Friendly una cadena
    let encodeURL = encodeURI(direccion);

    // espera que esta petición regrese, y lo que sea que regreses, lo metes en la respuesta (resp)
    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURL}&key=AIzaSyDyJPPlnIMOLp20Ef1LlTong8rYdTnaTXM`)
    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No hay resultados para la ciudad ${direccion}`);
    }

    let location = resp.data.results[0];
    let coors = location.geometry.location;

    return {
        direccion: location.formatted_address,
        lat: coors.lat,
        lng: coors.lng
    }

}

module.exports = {
    getLugarLatLng
}
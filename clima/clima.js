const axios = require('axios');

let getClima = async(lat, lng) => {

    // espera que esta petición regrese, y lo que sea que regreses, lo metes en la respuesta (resp)
    // la clave final, me la han dado en la web de www.openweathermap.org, con mi cuenta, es la: 79eed8f5c6f5be989f19c8b4265ffd43
    let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=79eed8f5c6f5be989f19c8b4265ffd43`)

    let temperatura = resp.data.main.temp;

    return {
        temperatura
    }

}

module.exports = {
    getClima
}
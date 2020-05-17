const axios = require('axios');

// Con async se transforma una funcion a promesa sin tanto lios
const getClima = async(lat, lng) => {
    console.log(lat, lng);
    // Con await esperamos que extraiga todos los datos
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&appid=588d67a0fbf11895abfd121423d24c3a&units=metric`);

    if (resp.data.main.temp === null || resp.data.main.temp === undefined) {
        throw new Error('No se ha podido obtener la temperatura');
    }

    console.log(resp.data.main.temp);

    return resp.data.main.temp;
}

module.exports = {
    getClima: getClima
}
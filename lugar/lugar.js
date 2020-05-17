const axios = require('axios');

// Async se comporta como una funcin promesa, pero sin poner lo de new promise etc
const getLugarLatLng = async(direccion) => {

    // Función encodeURI, tranforma la direcciones en direcciones leida,
    // Transforman los caracteres especiales como por ejemplo los espacios en blanco
    // para que a la hora de pasar la url no den problemas
    const encodedUrl = encodeURI(direccion);


    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ encodedUrl }`,
        headers: { 'x-rapidapi-key': '415dc4f6e5msh21cf2f5b03c3911p14f02cjsn0ff64d40fee4' }
    });

    const resp = await instance.get();

    // Comprueba si Result, que es  un array de objetos esta vacia
    // significa que le hemos pasado mal el parámetro de la url de la ciudad
    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${ direccion }`);
    }

    const data = resp.data.Results[0];
    console.log("Informacion de la data: ", data);
    const NombreDireccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        NombreDireccion,
        lat,
        lng
    }

}

module.exports = {
    getLugarLatLng: getLugarLatLng
}
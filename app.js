const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

// Definir las opciones de comando, antes utilizaba el "command", aqui
// utilizamos options, directamente en la raiz de la aplicación.

const argv = require('yargs').options({
        direccion: {
            alias: 'd',
            desc: ' Dirección de la ciudad para obtener el clima',
            demand: true
        }
    })
    .argv;

lugar.getLugarLatLng(argv.direccion)
    .then(resp => {
        console.log('Obtencion de la latitud y la longitud: ', resp.lat, resp.lng);
        clima.getClima(resp.lat, resp.lng)
            .then(resp => {
                console.log('Obtencion de la temperatura: ', resp);
                getInfo(resp)
                    .then(console.log)
                    .catch(console.log);
            })
            .catch(console.log);

    })
    .catch(console.log);

const getInfo = async(temperatura) => {

    return `El clima de ${ argv.direccion } es de ${ temperatura }`;


}
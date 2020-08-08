var express = require('express');
const bodyParser = require('body-parser')
var app = express();
var path = require('path');
var request = require('request');

//Acceso a archivo de variables de entorno
const dotenv = require('dotenv');
dotenv.config();

//Middlewears utiles para trabajar con express
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

//Sirve la pagina en el folder public para la ruta inicial
app.get('/', function (req, res)
{
    res.send("APLICACION INICIADA");
});

//Endpoint que se encarga de realizar un POST de un contacto
app.get('/postData', function (req, res)
{
    //Utiliza la libreria request de node para facilitar las peticiones HTTP
    request(
        {
            method: 'POST',
            uri: `https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal`,
            headers: [
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.CLIENT_SECRET}`
                }
            ],
            body: JSON.stringify({ grant_type: 'client_credentials', client_id: 'sa', client_secret: `${process.env.CLIENT_SECRET}`, name: '201603191' })
        }, function (error, response, body)
    {
        if (response.statusCode == 201)
        {
            //Si la peticion es exitosa, el servidor es informado
            console.log('Contacto publicado');
        } else
        {
            //Manejo de error
            console.log('Error: ' + response.statusCode);
            console.log(body);
        }
    }).pipe(res); //Retorna la respuesta del Web Service
});

app.get('/getPosted', function (req, res)
{
    //Configuracion de la peticion, al endpoint que obtiene contactos con 201603191 en el nombre y con el header de autorizacion
    let options = {
        method: 'GET',
        url: 'https://api.softwareavanzado.world/index.php?option=com_contact&webserviceVersion=1.0.0&webserviceClient=administrator&filter[search]=201603191&api=Hal',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${process.env.CLIENT_SECRET}`
        }
    }
    request(options).pipe(res); //Retorna la respuesta del Web Service

});

//Inicializa la aplicacion en el puerto 3500
const server = app.listen(3500, function ()
{
    console.log('Aplicacion inicializada');
});
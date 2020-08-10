var express = require('express');
const bodyParser = require('body-parser')
var app = express();
var path = require('path');
var request = require('request');
var fs = require('fs');

//Acceso a archivo de variables de entorno
const dotenv = require('dotenv');
dotenv.config();

//Middlewears utiles para trabajar con express
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var accessToken;

const authRequest = (req, res, next) =>
{
    if (!accessToken)
    {
        request(
            {
                method: 'POST',
                uri: `https://api.softwareavanzado.world/index.php?option=token&api=oauth2`,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                form: {
                    grant_type: 'client_credentials',
                    client_id: 'sa',
                    client_secret: process.env.CLIENT_SECRET
                }
            }, function (error, response, body)
        {
            if (response.statusCode == 200)
            {
                console.log('Acceso concedido');
                accessToken = JSON.parse(body).access_token;
                next();
            } else
            {
                //Manejo de error
                console.log('Error en autorizacion: ' + response.statusCode);
                console.log(body);
            }
        });
    }
    else
    {
        next();
    }
}

app.use(authRequest);

//Sirve la pagina en el folder public para la ruta inicial
app.get('/', function (req, res)
{
    res.send("APLICACION INICIADA");
});

//Endpoint que se encarga de realizar un POST de un contacto
app.get('/postData', function (req, res)
{
    //Utiliza la libreria request de node para facilitar las peticiones HTTP
    request({
        method: 'POST',
        uri: `https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal`,
        headers: { 'content-type': 'application/json', 'authorization': `Bearer ${accessToken}` },
        body: JSON.stringify({ name: '201603191' })
    }, function (error, response, body)
    {
        if (response.statusCode == 201)
        {
            console.log('Dato publicado');
        }
        else
        {
            console.log('Error en token: ' + response.statusCode);
            console.log(body);
        }
    }).pipe(res);
});



app.get('/getPosted', function (req, res)
{
    //Configuracion de la peticion, al endpoint que obtiene contactos con 201603191 en el nombre y con el header de autorizacion
    let options = {
        method: 'GET',
        url: 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal&filter[search]=201603191',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        }
    }
    request(options).pipe(res); //Retorna la respuesta del Web Service

});

//Inicializa la aplicacion en el puerto 3500
const server = app.listen(3500, function ()
{
    console.log('Aplicacion inicializada');
});
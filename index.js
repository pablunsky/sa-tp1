var express = require('express');
const bodyParser = require('body-parser')
var app = express();
var path = require('path');
var request = require('request');
var fs = require('fs');

//Acceso a archivo de variables de entorno
const dotenv = require('dotenv');
const { time } = require('console');
dotenv.config();

//Middlewears utiles para trabajar con express
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Definimos una variable global para almacenar token de autorizacion
var accessToken;
var timeStamp;

//Creamos una funcion que verifique si el token existe, o si necesita renovarse
const authRequest = (req, res, next) =>
{
    if (!accessToken || Date.now() > timeStamp)
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
                bodyObject = JSON.parse(body);
                accessToken = bodyObject.access_token;
                timeStamp = Date.now() + 3600000;
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
        //Continuamos con la peticion
        next();
    }
}

//Indicamos al servidor el uso del middleware
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
        //Incluimos el token de acceso como bearer en el header Authorization
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
            console.log('Error: ' + response.statusCode);
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
            //Incluimos el tocken de acceso como bearer en el header Authorization
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
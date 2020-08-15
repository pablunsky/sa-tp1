var express = require('express');
const bodyParser = require('body-parser')
var app = express();
var soap = require('soap');

var soapClient;
soap.createClient('https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap&wsdl', function (err, client)
{
    soapClient = client;
});

//Middlewares utiles para trabajar con express
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Sirve la pagina en el folder public para la ruta inicial
app.get('/', function (req, res)
{
    res.send("APLICACION INICIADA");
});

//Endpoint que se encarga de realizar un POST de un contacto
app.get('/postData', function (req, res)
{
    soapClient.setSecurity(new soap.BasicAuthSecurity('sa', 'usac'));
    soapClient.create({ name: '201603191' }, function (err, response)
    {
        res.json(response);
    });
});

app.get('/getPosted', function (req, res)
{
    soapClient.setSecurity(new soap.BasicAuthSecurity('sa', 'usac'));
    soapClient.readList({ filterSearch: '201603191' }, function (err, response)
    {
        res.json(response);
    });
});

//Inicializa la aplicacion en el puerto 3500
const server = app.listen(3500, function ()
{
    console.log('Aplicacion inicializada');
});

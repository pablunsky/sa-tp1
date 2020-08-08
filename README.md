## Pablo Andres Hernandez Rivera
## 201603191
# Software Avanzado: Tarea practica 1
El siguiente repositorio contiene la realizacion de la tarea practica 1: Un cliente web que consume una API que provee acceso y publicacion de contactos.
## Uso
Para utilizar el cliente, debe descargar el proyecto:
```
git init
git pull https://github.com/pablunsky/sa-tp1.git
```
Proceda a instalar las dependencias de node:
```
npm install
```
Para ejecutar la aplicacion, corra el siguiente comando:
```
node index.js
```
Si se dirige al navegador, en la ruta http://localhost:3500/ debera visualizar la pagina principal.
Al hacer clic en el boton "Insertar" publicara un nuevo contacto con el nombre "201603191".
![alt text](https://github.com/pablunsky/sa-tp1/docs/insert.png "Insertar")
Si se dirige a la pestana "Listar" podra ver todos los contactos agregados con el nombre "201603191".
![alt text](https://github.com/pablunsky/sa-tp1/docs/list.png "Listar")
Esto se logra con el consumo del web service disponible en https://api.softwareavanzado.world/index.php.

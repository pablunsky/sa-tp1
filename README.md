## Pablo Andres Hernandez Rivera
## 201603191
# Software Avanzado: Tarea practica 1
El siguiente repositorio contiene la realizacion de la tarea practica 1: Un cliente web que consume una API que provee acceso y publicacion de contactos.
## Requerimientos
Para poder utilizar la aplicacion, es necesario contar con:
- node.js version 12.16.2
- npm version 6.14.4
- Acceso a internet y un navegador compatible con la API fetch.
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
![alt text](/docs/insert.png "Insertar")
Si se dirige a la pestana "Listar" podra ver todos los contactos agregados con el nombre "201603191".
![alt text](/docs/list.png "Listar")
Esto se logra con el consumo del web service disponible en https://api.softwareavanzado.world/index.php.
## Conclusion
El consumo de servicios web facilita la integracion de funcionalidades en aplicaciones de terceros, gracias a la gran cantidad de herramientas existentes para esta tarea, y la documentacion que proveen los desarrolladores.
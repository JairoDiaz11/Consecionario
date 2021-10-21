const express=require('express');
const rutas=express.Router();
const controller=require('../controlador/controller');


//INDEX*********************************************************
rutas.get('/',controller.index);
////////////////////////////////////////////////


//LOGIN**********************************
rutas.post('/login',controller.login);
rutas.get('/cerrar',controller.cerrar);
//******************************* */


//ADMIM**********************************
rutas.get('/Admin',controller.nombreadmin);

rutas.post('/insertarusuarios',controller.insertarusuarios);
rutas.get('/Usuarios',controller.consultausuarios);
rutas.post('/actualizarusu',controller.actualizarusu);
rutas.post('/eliminarusu',controller.eliminarusu);

rutas.post('/insertarpersonas',controller.insertarpersonas);
rutas.get('/Personas',controller.consultapersonas);
rutas.post('/eliminarper',controller.eliminarper);

rutas.post('/insertarroles',controller.insertarroles);
rutas.get('/Rol',controller.consultaroles);
/////////////////////////////////////////


//VENDEDOR**********************************
rutas.get('/Vendedor',controller.nombrevendedor);

rutas.post('/insertarvehiculo',controller.insertarvehiculo);
rutas.get('/Rvehiculo',controller.consultamisvehiculos);
rutas.post('/eliminarveh',controller.eliminarmisvehiculos);

rutas.get('/Actdatos',controller.consultamisdatos);
rutas.post('/actualizarmisdatos',controller.actualizarmisdatos);

rutas.get('/Cambiorol',controller.cambiorol);
rutas.post('/cambiarrol',controller.cambiarrol);
/////////////////////////////////////////



//COMPRADOR**********************************
rutas.get('/Comprador',controller.nombrecomprador);

rutas.get('/Categoria',controller.cat);
rutas.post('/categoria',controller.catvehiculo);
rutas.post('/datosvendedor',controller.datosvendedor);

rutas.get('/Precio',controller.pre);
rutas.post('/precio',controller.prevehiculo);
rutas.post('/datosvendedor2',controller.datosvendedor2);

/////////////////////////////////////////












module.exports=rutas;
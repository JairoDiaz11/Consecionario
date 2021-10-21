const express=require('express');
const app=express();

const path=require('path');
const morgan=require('morgan');
const session = require('express-session');
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname,'public')));
app.set('view engie','ejs');
app.set('views',path.join(__dirname,'vista'));

app.use(session({
    secret:'123',
    resave:true,
    saveUninitialized:true

}));

app.use(express.urlencoded({extended:true}));
app.use(require('./rutas/rutas'));
app.use((err,req,res,next)=>{
    res.send({err:err.message});
});

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'),()=>{
    console.log(`En el Servidor ${app.get('port')}`);
   
})





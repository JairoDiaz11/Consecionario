const connection=require('../conexion/conexion');
const cnn=connection();
const {render}=require('ejs');
const bcryptjs=require('bcryptjs')
const controller={};


//INDEX----------------------------------------------------------------
controller.index=(req,res,next)=>{
    res.render('login')
    
}
//************************************************************ */





//LOGIN-----------------------------------------------------------------
controller.login=async(req,res,next)=>{  
    const usu =  req.body.Usuario;  
    const cla = await req.body.Clave;
    console.log(usu+cla);
    cnn.query('SELECT * FROM usuario WHERE usuario=?',[usu],async(err,results)=>{  
        if(err){
            next(new Error("Error de consulta",err)); 
    
        }
        else if(results!=0 && await(bcryptjs.compare(cla,results[0].clave))){
            usuid=results[0].usuid;
            console.log(usuid)
            
            cnn.query('SELECT * FROM usuario_rol WHERE usuid=?',[usuid],async(err,results)=>{
                rol=results[0].rolid;
                console.log(rol)
                cnn.query('SELECT * FROM datospersonales WHERE usuid=?',[usuid],async(err,results)=>{
                    datid=results[0].datid;
                    usuid=results[0].usuid;

                      req.session.Login=true; 
                      req.session.datid=results[0].datid;
                      req.session.usuid=results[0].usuid;
                      switch(rol){
                        case 1:                     
                            res.redirect('Vendedor')
                        break; 
                           
                        case 2: 
                             res.redirect('Comprador')
                        break;
               
                        case 3:
                           res.redirect('Admin')
                        break;
                    }
                }) 
            })

        }
       else {
            console.log("Datos incorrectos"); 
            res.redirect('/');
        }
    })
}

controller.cerrar=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





//ADMIN--------------------------------------------------------------------------
controller.nombreadmin=(req,res,next)=>{
    
    //console.log(usuid)
   // console.log(datid)
    cnn.query('SELECT * FROM datospersonales WHERE usuid=?',[usuid],(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('Admin',{datos:resbd});
        }
    }) 
}


controller.insertarusuarios=async(req,res,next)=>{
    const i=req.body.usuid;
    const u=req.body.usuario;
    const c=req.body.clave;

    
    const password=await bcryptjs.hash(c,8);
    
    cnn.query('INSERT INTO usuario SET?',{usuid:i,usuario:u,clave:password},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('Usuarios')   
    }
    });
}

controller.consultausuarios=(req,res,next)=>{
    cnn.query('SELECT * FROM usuario',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('Usuarios',{datos:resbd});
        }
    })
}

controller.actualizarusu=async(req,res,next)=>{
    const idx=req.body.ii;
    const usux=req.body.uu;
    const clax=req.body.cc;

    const password=await bcryptjs.hash(clax,8);

    cnn.query('UPDATE usuario SET  usuario="'+usux+'",clave="'+password+'" WHERE usuid="'+idx+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
            res.redirect('Usuarios')
        }

    })
}

controller.eliminarusu=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM usuario WHERE usuid="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('usuarios');
        }

    })
}



controller.insertarpersonas=async(req,res,next)=>{
    const id=req.body.datid;
    const ui=req.body.usuid;
    const n=req.body.datnombre;
    const a=req.body.datapellido;
    const td=req.body.datipoid;
    const cc=req.body.datnumeroid;
    const tel=req.body.datelefono;
    const co=req.body.datcorreo;

    cnn.query('INSERT INTO datospersonales SET?',{datid:id,usuid:ui,datnombre:n,datapellido:a,datipoid:td,datnumeroid:cc,datelefono:tel,datcorreo:co},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('Personas')   
    }
    });
}

controller.consultapersonas=(req,res,next)=>{
    cnn.query('SELECT * FROM datospersonales',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('Personas',{datos:resbd});
        }
    })
}

controller.eliminarper=async(req,res,next)=>{
    const d=req.body.dd

    cnn.query('DELETE  FROM datospersonales WHERE usuid="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('Personas');
        }

    })
}



controller.insertarroles=async(req,res,next)=>{
    const ri=req.body.rolid;
    const usi=req.body.usuid;


    cnn.query('INSERT INTO usuario_rol SET?',{rolid:ri,usuid:usi},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('Rol')   
    }
    });
}

controller.consultaroles=(req,res,next)=>{
    
        //console.log(usuid)
       // console.log(datid)
        cnn.query('SELECT * FROM usuario_rol',(err,resbd)=>{
            if(err){
                next(new Error(err))
                console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('Rol',{datos:resbd});
            }
        }) 
}

//////////////////////////////////////////////////////////////////////////////////////////////////





//VENDEDOR////////////////////////////////////////////////////
controller.nombrevendedor=(req,res,next)=>{
    
 
    cnn.query('SELECT * FROM datospersonales WHERE usuid=?',[usuid],(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('Vendedor',{datos:resbd});
        }
    }) 
}



controller.insertarvehiculo=async(req,res,next)=>{
    const id=req.body.vehplaca;
    const ui=req.body.datid;
    const n=req.body.catid;
    const a=req.body.vehmodelo;
    const td=req.body.vehmarca;
    const cc=req.body.color;
    const tel=req.body.vehestado;
    const co=req.body.vehprecio;

    cnn.query('INSERT INTO vehiculo SET?',{vehplaca:id,datid:ui,catid:n,vehmodelo:a,vehmarca:td,color:cc,vehestado:tel,vehprecio:co},(err,resbd)=>{
    if(err){
        next(new Error(err))
    }
    else{
    res.redirect('Rvehiculo')   
    }
    });
}

controller.consultamisvehiculos=(req,res,next)=>{
    cnn.query('SELECT * FROM vehiculo WHERE datid=?',[datid],(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('Rvehiculo',{datos:resbd});
        }
    })
}

controller.eliminarmisvehiculos=async(req,res,next)=>{
    const d=req.body.datid

    cnn.query('DELETE  FROM vehiculo WHERE datid="'+d+'"',async(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
        res.redirect('Rvehiculo');
        }

    })
}



controller.consultamisdatos=(req,res,next)=>{
    cnn.query('SELECT * FROM datospersonales WHERE datid=?',[datid],(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('Actdatos',{datos:resbd});
        }
    })
}

controller.actualizarmisdatos=async(req,res,next)=>{
    const d=req.body.dd;
    const n=req.body.nn;
    const a=req.body.aa;
    const t=req.body.tt;
    const c=req.body.cc;

    

    cnn.query('UPDATE datospersonales SET  datnombre="'+n+'",datapellido="'+a+'",datelefono="'+t+'",datcorreo="'+c+'" WHERE datid="'+d+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Actualizado")
            res.redirect('Actdatos')
        }

    })
}



controller.cambiorol=(req,res,next)=>{
    res.render('Cambiorol')
    
}

controller.cambiarrol=async(req,res,next)=>{
    const a=req.body.usuid;
    const d=req.body.rolid;

    cnn.query('UPDATE usuario_rol SET  rolid="'+d+'" WHERE usuid="'+a+'"',async(err,respbb)=>{
        if(err){
            next(new Error(err));

        }
        else{
            console.log("Cambiado")
            res.redirect('Cambiorol')
        }

    })
}
///////////////////////////////////////////////





//COMPRADOR////////////////////////////////////////////////
controller.nombrecomprador=(req,res,next)=>{
    
 
    cnn.query('SELECT * FROM datospersonales WHERE usuid=?',[usuid],(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('Comprador',{datos:resbd});
        }
    }) 
}



controller.cat=async(req,res,next)=>{
            
    res.render('Categoria');
}
controller.catvehiculo=async(req,res,next)=>{
    const ct=req.body.catid;


    cnn.query('SELECT * FROM vehiculo WHERE catid= "'+ct+'"',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('Consulta1',{datos:resbd});
        }
    })


}
controller.datosvendedor=async(req,res,next)=>{
    const di=req.body.datid;


    cnn.query('SELECT * FROM datospersonales WHERE datid= "'+di+'"',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('Datosp1',{datos:resbd});
        }
    })


}




controller.pre=async(req,res,next)=>{
            
    res.render('Precio');
}
controller.prevehiculo=async(req,res,next)=>{
        const pvi=req.body.vi;
        const pvf=req.body.vf;
    
    
        cnn.query('SELECT * FROM vehiculo WHERE vehprecio BETWEEN "'+pvi+'" AND "'+pvf+'" ',(err,resbd)=>{
            if(err){
                next(new Error(err))
                console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('Consulta2',{datos:resbd});
            }
        })
    
    
}
    
 controller.datosvendedor2=async(req,res,next)=>{
     const di=req.body.datid;
    
    
     cnn.query('SELECT * FROM datospersonales WHERE datid= "'+di+'"',(err,resbd)=>{
            if(err){
                next(new Error(err))
                console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('Datosp2',{datos:resbd});
            }
        })
    
    
}

/////////////////////////////////////////////////////


module.exports=controller;






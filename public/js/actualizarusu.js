$(document).ready(function(){
    

    $('.btnact').on('click',function(){
    
        let btn= $('.btnact').index(this);

        let id=$('.usuid').eq(btn);
        let usu=$('.usuario').eq(btn);
        let cla=$('.clave').eq(btn);

    
        let i=id.val();
        let u=usu.val();
        let c=cla.val();

    
        alert("Datos actualizados");
    
    
        $.ajax({
    
            type:"POST",
            url:'/actualizarusu',
            data:{
                ii:i,uu:u,cc:c
            }
        });
    
    
    
    
    });
    
    
    });
$(document).ready(function(){

    $('.btneli').on('click',function(){
    
        let btn= $('.btneli').index(this);
        let doc=$('.usuid').eq(btn);
    
        
    
    
        let d=doc.val();
    
    
    
        alert("Datos borrados")
    
        $.ajax({
    
            type:"POST",
            url:'/eliminarusu',
            data:{
                dd:d
            }
        });
    
    
    
    
    });
    
    
    });
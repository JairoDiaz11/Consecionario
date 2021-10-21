$(document).ready(function(){


    $('.btnact').on('click',function(){
    
        let btn= $('.btnact').index(this);

        let d=$('.datid').eq(btn);
        let n=$('.datnombre').eq(btn);
        let a=$('.datapellido').eq(btn);
        let t=$('.datelefono').eq(btn);
        let c=$('.datcorreo').eq(btn);

        let dc=d.val();
        let nc=n.val();
        let ac=a.val();
        let tc=t.val();
        let cc=c.val();

    
        alert("Datos actualizados");
    
    
        $.ajax({
    
            type:"POST",
            url:'/actualizarmisdatos',
            data:{
                dd:dc,nn:nc,aa:ac,tt:tc,cc:cc
            }
        });
    
    
    
    
    });
    
    
    });
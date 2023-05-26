$(document).ready(function(){
    $('.logout').click(function(){
        $.ajax({
            url: 'php/logout.php' , 
            method: 'POST' , 
            dataType: 'html' , 
            data: {
            }
        }).fail(function(err){
            console.log(err);
        }).done(function(res){
            console.log(res);
            location.href=res;
        });
    });
});
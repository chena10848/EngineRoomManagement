<?php header("Content-type: application/javascript");?>
<?php session_start();?>

$(document).ready(function(){

    var id = "<?php echo $_SESSION['ID']; ?>";//帳號
    var name = "<?php echo $_SESSION['Name']; ?>";//名稱
    //var group = "<?php echo $_SESSION['Group']; ?>";//群組代碼



    $('.topbar .user').attr({
        'data-id': id,
        'data-name': name,
    });
    $('.topbar .user').text(id);


});

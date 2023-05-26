$(document).ready(function(){

    var uid = $('.topbar .user').attr('data-id');

    var url = location.pathname;

    $.ajax({
        url: 'php/ViewLog.php',
        method: 'POST',
        dataType: 'html',
        data: {
            uid: uid,
            url: url
        }
    }).fail(function (err) {
        console.log(err);
    }).done(function (res) {

    });
});
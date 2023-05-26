$(document).ready(function() {


    $(document).on('click', '#login', function() {

        let account = $('#floatingInput').val();
        let password = $('#floatingPassword').val();

        if (account != "" && password != "") {
            //資料庫比對帳號密碼是否正確
            checklogin(account, password);
        } else if (account == "") {
            alert('請輸入帳號');
        } else if (password == "") {
            alert('請輸入密碼');
        }
    });

    $('#floatingPassword').keydown(function(event) {

        let account = $('#floatingInput').val();
        let password = $('#floatingPassword').val();

        if (event.which == 13) {
            //資料庫比對帳號密碼是否正確
            checklogin(account, password);
        }
    });


    function checklogin(account, password) {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'login',
                account: account,
                password: password
            }
        }).fail(function(err) {
            alert('登入失敗');
        }).done(function(res) {

            if (res['status'] == "Y") {
                //登入成功
                location.href = "index.php";
            } else {
                alert('登入失敗');
            }
        });
    }


});
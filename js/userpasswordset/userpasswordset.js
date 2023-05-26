$(document).ready(function() {



    $(document).on('click', '.chk', function() {

        let newPassword = $('.newPassword').val();
        let newPassword2 = $('.newPassword2').val();

        if (newPassword == '') {
            alert('密碼更新不能為空白');
        } else if (newPassword2 == '') {
            alert('密碼更新不能為空白');
        } else if (newPassword != newPassword2) {
            alert('填入密碼不一致，請在確認是否相同');
        } else {
            updateNewpassword(newPassword);
        }
    });

    function updateNewpassword(newPassword) {
        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'updateNewpassword',
                newPassword: newPassword
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            if (res['status'] == "Y") {
                alert('密碼更新成功');
            } else {
                alert('密碼更新失敗');
            }
            location.reload(true);
        });

    }


});
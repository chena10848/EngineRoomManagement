$(document).ready(function() {

    var userDetail = [];

    GetUserData();

    $(document).on('click', '.update', function() {
        GetUserUpdateData();
    });


    function GetUserData() {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'userData',
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log(res);
            userDetail = res;
            SetUserBasicInformation(userDetail);
        });
    }

    function SetUserBasicInformation(userDetail) {
        let userAccount = userDetail['data'][0]['us01'];
        let userName = userDetail['data'][0]['us04'];
        let userId = userDetail['data'][0]['us03'];
        let userDepartment = userDetail['data'][0]['us05'];
        let userGender = userDetail['data'][0]['us06'];
        let userBirthday = userDetail['data'][0]['us07'];
        let userEmail = userDetail['data'][0]['us08'];

        $('.account').val(userAccount);
        $('.userName').val(userName);
        $('.userId').val(userId);
        $('.department').val(userDepartment);
        $('.birthday').val(userBirthday.split(' ')[0]);
        $('.email').val(userEmail);
        $('#gender').html('');

        let genderHtml = "";
        switch (userGender) {
            case "0":
                genderHtml =
                    '<option value="0" selected>不透漏</option>' +
                    '<option value="1">男</option>' +
                    '<option value="2">女</option>';
                break;
            case "1":
                genderHtml =
                    '<option value="0">不透漏</option>' +
                    '<option value="1" selected>男</option>' +
                    '<option value="2">女</option>';
                break;
            case "2":
                genderHtml =
                    '<option value="0">不透漏</option>' +
                    '<option value="1">男</option>' +
                    '<option value="2" selected>女</option>';
                break;
        }

        $('#gender').append(genderHtml);
    }

    function GetUserUpdateData() {
        let userGender = $('#gender').val();
        let userBirthday = $('.birthday').val();
        let userEmail = $('.email').val();

        checkUserdata(userGender, userBirthday, userEmail);
    }

    function checkUserdata(userGender, userBirthday, userEmail) {




        if (userDetail['data'][0]['us06'] == userGender && userDetail['data'][0]['us07'].split(' ')[0] == userBirthday && userDetail['data'][0]['us08'] == userEmail) {
            alert('個人資料內容未更新');
        } else {
            updateUser(userGender, userBirthday, userEmail);
        }
    }

    function updateUser(userGender, userBirthday, userEmail) {
        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'updateUser',
                userGender: userGender,
                userBirthday: userBirthday,
                userEmail: userEmail
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            if (res['status'] == "Y") {
                alert('更新成功');
            } else {
                alert('更新失敗');
            }
            location.reload(true);
        });

    }

});
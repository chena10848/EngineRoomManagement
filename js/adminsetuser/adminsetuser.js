$(document).ready(function() {

    let permissions = [];
    let UserData = [];
    let getuser = '';

    Getpermissions();
    GetUserData();


    // 新增
    $(document).on('click', '.InAdd', function() {
        ProBoxInit(0);
        ProBoxInitTopermission();
    });

    //新增 - 送出
    $(document).on('click', '.NewSubmit', function() {
        let check = 'SC';
        let insertUser = [];

        let account = $('.account').val(); //帳號
        let password = $('.password').val(); //密碼
        let surePassword = $('.surePassword').val(); //確認密碼
        let employeeId = $('.employeeId').val(); //員工編號
        let name = $('.name').val(); //姓名

        let department = $('.department').val(); //群組
        let gender = $('.gender').val(); //性別
        let birthday = $('.birthday').val(); //生日
        let mail = $('.mail').val(); //E-mail
        let status = $('.status').val(); //狀態

        if (account == '') check = 'accountError';
        if (password != surePassword) check = 'passwordError';
        if (employeeId == '') check = 'employeeIdError';
        if (name == '') check = 'nameError';

        switch (check) {
            case 'accountError':
                alert('請填入帳號，不能為空');
                break;
            case 'passwordError':
                alert('填入密碼與卻密碼錯誤，請重新輸入');
                break;
            case 'employeeIdError':
                alert('請填入員工編號，不能為空');
                break;
            case 'nameError':
                alert('請填入員工姓名，不能為空');
                break;
            case 'SC':

                obj = {
                    account: account,
                    password: password,
                    employeeId: employeeId,
                    name: name,
                    department: department,
                    gender: gender,
                    birthday: birthday,
                    mail: mail,
                    status: status
                }

                insertUser.push(obj);

                insert(insertUser);
                break;
        }
    });

    //修改
    $(document).on('click', '.InEd', function() {
        getuser = $(this).data('id');

        ProBoxInit(1);
        ProBoxInEdTopermission(getuser);
        editDatainsert(getuser);
    });

    //修改 - 個人資料更新
    $(document).on('click', '.EdSubmit', function() {
        userBasicInformationupdate();
    });

    //取消
    $(document).on('click', '.Cancelt', function() {
        $('.ProBox').hide();
    });



    //ProBox 初始化
    function ProBoxInit(ch) {
        $('.ProBox input').val('');

        $('.ProBox .InCtrl button').hide();
        switch (ch) {
            case 0:
                $('.ProBox .InTitle1').html('新增使用者帳號');
                $('.ProBox .InCtrl .NewSubmit').show();
                break;

            case 1:
                $('.ProBox .InTitle1').html('修改使用者帳號');
                $('.ProBox .InCtrl .EdSubmit').show();
                break;

            default:
                break;
        }
        $('.ProBox .InCtrl .Cancelt').show();

        $('.ProBox').show();
    }

    function Getpermissions() {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'groupPermissionshead'
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log(res);
            if (res['status'] == "Y")
                permissions = res['data'];
        });
    }

    function GetUserData() {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'GetUserData'
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log(res);
            if (res['status'] == "Y") {
                UserData = res['data'];
                SetUserTable();
            }
        });

    }

    function SetUserTable() {
        $('InTable').html('');

        let TableHead = '<thead class="OrThead">' +
            '<tr>' +
            '   <th></th>' +
            '   <th style="text-align:center;"><label>使用者員編</label></th>' +
            '   <th style="text-align:center;"><label>使用者名稱</label></th>' +
            '   <th style="text-align:center;"><label>部門群組</label></th>' +
            '   <th style="text-align:center;"><label>是否啟用</label></th>' +
            '<th>' +
            '</th>' +
            '</tr>' +
            '</thead>';

        let openHtml = '';
        let TableBody = '<tbody>';
        let number = '';


        for (let i = 0; i < UserData.length; i++) {

            if (UserData[i]['us13'] == 1) {
                openHtml = '<i class="glyphicon glyphicon-ok" style="color:green;width:100%;text-align: center;margin-top: 5px;"></i>';
            } else {
                openHtml = '<i class="glyphicon glyphicon-remove" style="color:red;width:100%;text-align: center;margin-top: 5px;"></i>';
            }

            number = i + 1;

            TableBody += '<tr>' +
                '<td style="text-align:center;"><label>' + number + '</label></td>' +
                '<td style="text-align:center;"><label>' + UserData[i]['us03'] + '</label></td>' +
                '<td style="text-align:center;"><label>' + UserData[i]['us04'] + '</label></td>' +
                '<td style="text-align:center;"><label>' + UserData[i]['ps02'] + '</label></td>' +
                '<td style="text-align:center;"><label>' + openHtml + '</label></td>' +
                '<td style="text-align:center;"><button class="btn btn-primary InEd" data-id="' + UserData[i]['us03'] + '"><i class="glyphicon glyphicon-pencil"></i></button></td>' +
                '</tr>';

        }


        TableBody += '</tbody>';


        $('.InTable').append(TableHead);
        $('.InTable').append(TableBody);
    }


    //---------------------------------------------
    //          ProBox 預設內容
    //---------------------------------------------

    //新增html select預設內容
    function ProBoxInitTopermission() {

        let statusSelect =
            '<option value="1" selected>啟用</option>' +
            '<option value="0">停用</option>';
        $('.status').html('');
        $('.status').append(statusSelect);

        let genderSelect =
            '<option value="0" selected>不透漏</option>' +
            '<option value="1">男</option>' +
            '<option value="2">女</option>';
        $('.gender').html('');
        $('.gender').append(genderSelect);

        let departmentSelect = '';

        for (let i = 0; i < permissions.length; i++) {
            departmentSelect += '<option value="' + permissions[i]['ps01'] + '">' + permissions[i]['ps02'] + '</option>';
        }
        $('.department').html('');
        $('.department').append(departmentSelect);
    }

    function ProBoxInEdTopermission(user) {

        for (let i = 0; i < UserData.length; i++) {

            if (UserData[i]['us03'] == user) {
                let statusSelect = ''; //狀態
                let genderSelect = ''; //性別
                let departmentSelect = ''; //群組

                //狀態預設選項
                if (UserData[i]['us13'] == 1) {
                    statusSelect +=
                        '<option value="1" selected>啟用</option>' +
                        '<option value="0">停用</option>';
                } else {
                    statusSelect +=
                        '<option value="1">啟用</option>' +
                        '<option value="0" selected>停用</option>';
                }

                $('.status').html('');
                $('.status').append(statusSelect);

                //性別預設選項
                if (UserData[i]['us06'] == 0) {
                    genderSelect +=
                        '<option value="0" selected>不透漏</option>' +
                        '<option value="1">男</option>' +
                        '<option value="2">女</option>';
                } else if (UserData[i]['us06'] == 1) {
                    genderSelect +=
                        '<option value="0">不透漏</option>' +
                        '<option value="1" selected>男</option>' +
                        '<option value="2">女</option>';
                } else {
                    genderSelect +=
                        '<option value="0">不透漏</option>' +
                        '<option value="1">男</option>' +
                        '<option value="2" selected>女</option>';
                }
                $('.gender').html('');
                $('.gender').append(genderSelect);

                //群組預設選項
                for (let x = 0; x < permissions.length; x++) {
                    if (permissions[x]['ps01'] == UserData[i]['us05'])
                        departmentSelect += '<option value="' + permissions[x]['ps01'] + '" selected>' + permissions[x]['ps02'] + '</option>';
                    else
                        departmentSelect += '<option value="' + permissions[x]['ps01'] + '">' + permissions[x]['ps02'] + '</option>';
                }
                $('.department').html('');
                $('.department').append(departmentSelect);

            }
        }
    }

    //---------------------------------------------
    //              新增
    //---------------------------------------------    

    function insert(data) {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'insertUser',
                data: data
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log(res);
            if (res['status'] == "Y") {
                alert('新增成功 ~');
            } else {
                alert('新增失敗');
            }
            location.reload(true);
        });

    }

    //---------------------------------------------
    //              修改
    //---------------------------------------------

    function editDatainsert(user) {

        for (let i = 0; i < UserData.length; i++) {

            if (UserData[i]['us03'] == user) {

                $('.account').val(UserData[i]['us01']); //帳號
                $('.password').val("12345000000000054321"); //密碼
                $('.surePassword').val("12345000000000054321"); //確認密碼
                $('.employeeId').val(UserData[i]['us03']); //員工編號
                $('.name').val(UserData[i]['us04']); //名稱
                $('.birthday').val(UserData[i]['us07'].split(' ')[0]); //生日
                $('.mail').val(UserData[i]['us08']); //E-mail

                $('.established').val(UserData[i]['us10']); //建檔人
                $('.establishDatetime').val(UserData[i]['us09']); //建檔日期
                $('.establishChange').val(UserData[i]['us12']); //異動人
                $('.establishChangeDatetime').val(UserData[i]['us11']); //異動日期

            }
        }
    }

    //使用者個人資料更新
    function userBasicInformationupdate() {
        let check = false;
        let data = [];

        for (let i = 0; i < UserData.length; i++) {
            if (UserData[i]['us03'] == getuser) {
                let account = $('.account').val(); //帳號
                let password = $('.password').val(); //密碼
                let surepassword = $('.surePassword').val(); //密碼二次確認
                let employeeId = $('.employeeId').val(); //員編
                let name = $('.name').val(); //姓名
                let department = $('.department').val(); //部門
                let gender = $('.gender').val(); //性別
                let birthday = $('.birthday').val(); //生日
                let mail = $('.mail').val(); //E-mail
                let status = $('.status').val(); //啟用狀態

                let obj = {
                    account,
                    password,
                    employeeId,
                    name,
                    department,
                    gender,
                    birthday,
                    mail,
                    status
                }

                if (account != UserData[i]['us01']) {
                    check = true; //帳號有更新 
                    obj.account = account;
                } else obj.account = "";

                if (password != '12345000000000054321' && surepassword != '12345000000000054321' && password == surepassword) {
                    check = true; //密碼有更新
                    obj.password = password;
                } else obj.password = "";

                if (employeeId != UserData[i]['us03']) {
                    check = true; //員編有更新
                    obj.employeeId = employeeId;
                } else obj.employeeId = "";

                if (name != UserData[i]['us04']) {
                    check = true; //姓名有更新
                    obj.name = name;
                } else obj.name = "";

                if (department != UserData[i]['us05']) {
                    check = true; //部門有更新
                    obj.department = department;
                } else obj.department = "";

                if (gender != UserData[i]['us06']) {
                    check = true; //性別有更新
                    obj.gender = gender;
                } else obj.gender = "";

                if (birthday != UserData[i]['us07'].split(' ')[0]) {
                    check = true; //生日有更新
                    obj.birthday = birthday;
                } else obj.birthday = "";

                if (mail != UserData[i]['us08']) {
                    check = true; //電子郵件更新
                    obj.mail = mail;
                } else obj.mail = "";

                if (status != UserData[i]['us13']) {
                    check = true; //狀態更新
                    obj.status = status;
                } else obj.status = "";

                if (check) data.push(obj);
            }
        }

        if (check) updateApi(data);
        else alert('尚未更新使用者資料!');
    }

    function updateApi(data) {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'updateApi',
                data,
                getuser
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log(res);
            if (res['status'] == "Y") {
                alert('更新成功 ~');
            } else {
                alert('更新失敗');
            }
            location.reload(true);
        });
    }
});
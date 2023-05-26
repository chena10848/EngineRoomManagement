$(document).ready(function() {

    let groupHead = [];
    let groupBody = [];
    let group = [];

    let groupPermissionshead = [];
    let groupPermissions = [];
    let Permissions = [];

    let DepartmentUserData = [];
    let user = [];

    GetUser();
    GetGroupManager();
    GetPermissionsHeadInit();

    $(document).on('click', '.InEd', function() {
        var id = $(this).data('id');

        InEdSetDepartmentManager(id);
        groupFromshow(id);
    });


    //取消
    $('.Cancelt').click(function() {
        $('.ProBox').hide();
    });

    // 新增
    $('.InAdd').click(function() {
        ProBoxInit(0);
        Table();
        SetGroupManager();

        let select =
            '<option value="1" selected>啟用</option>' +
            '<option value="0">停用</option>';
        $('.s03').html('');
        $('.s03').append(select);

    });

    $(document).on('click', '.NewSubmit', function() {

        let number = $('.s01').val();
        let name = $('.s02').val();
        let status = $('.s03').val();
        let departmentUser = $('.s04').val();
        let submitGroup = [];

        if (number != "" && name != "") {
            if (departmentUser != 'N') {
                let check = 'SC';

                for (let i = 0; i < Permissions.length; i++) {
                    if (Permissions[i]['permissionsNumber'] == number) {
                        check = 'ERR';
                    }
                }

                if (check == 'SC') {
                    for (let i = 0; i < group.length; i++) {
                        for (let x = 0; x < group[i]['bodyArray'].length; x++) {
                            let chooseStatus = 0;
                            if ($('.' + group[i]['bodyArray'][x]['bodyNumber']).is(":checked")) {
                                chooseStatus = 1;
                            } else {
                                chooseStatus = 0;
                            }


                            let obj = {
                                bodyNumber: group[i]['bodyArray'][x]['bodyNumber'],
                                bodyStatus: chooseStatus
                            }

                            submitGroup.push(obj);
                        }
                    }

                    newSubmitgroup(number, name, status, departmentUser, submitGroup);
                } else {
                    alert("群組編號重複");
                }
            } else {
                alert("部門主管不可能填寫無");
            }
        } else {
            alert("群組編號及名稱未填入");
        }
    });

    $(document).on('click', '.EdSubmit', function() {
        let check = '';

        let number = $('.s01').val();
        let name = $('.s02').val();
        let status = $('.s03').val();
        let departmentUser = $('.s04').val();

        let editHead = [];
        let editBody = [];
        let edit = [];

        for (let i = 0; i < Permissions.length; i++) {

            if (Permissions[i]['permissionsNumber'] == number) {

                for (let x = 0; x < Permissions[i]['permissionsArray'].length; x++) {

                    let permissionStatus = '';
                    if ($("." + Permissions[i]['permissionsArray'][x]['groupNumber']).is(":checked")) {
                        permissionStatus = 1;
                    } else {
                        permissionStatus = 0;
                    }

                    if (permissionStatus != Permissions[i]['permissionsArray'][x]['groupstatus']) {

                        let obj = {
                            programNumber: Permissions[i]['permissionsArray'][x]['groupNumber'],
                            programStatus: permissionStatus
                        }

                        editBody.push(obj);
                        check = 'SC';
                    }
                }

                if (Permissions[i]['permissionsName'] != name || Permissions[i]['permissionsStatus'] != status) {

                    check = 'SC';
                }

                for (let z = 0; z < DepartmentUserData.length; z++) {

                    if (DepartmentUserData[z]['dh01'] == number) {
                        if (DepartmentUserData[z]['dh02'] != departmentUser) {
                            check = 'SC';
                        }
                    }

                }

                let obj = {
                    headName: name,
                    headStatus: status,
                    departmentUser: departmentUser
                }

                editHead.push(obj);

                let editObj = {
                    head: editHead,
                    body: editBody
                }

                edit.push(editObj);
            }
        }


        switch (check) {
            case 'SC':
                editSunmitgroup(number, edit);
                break;
            case '':
                alert('未修改群組內容');
                break;
        }
    });


    function GroupTableHeadInit() {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'groupTablehead'
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {

            if (res['status'] == "Y") {
                groupHead = res;
                GroupTableBodyInit();
            }
        });

    }

    function GroupTableBodyInit() {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'groupTablebody'
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log(res);

            if (res['status'] == "Y") {
                groupBody = res;
                GroupTableInit();
            }
        });

    }

    function GetPermissionsHeadInit() {

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
            if (res['status'] == "Y") {
                groupPermissionshead = res['data'];
                GetPermissionsInit();
            }
        });
    }

    function GetPermissionsInit() {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'groupPermissions'
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log("res", res);
            if (res['status'] == "Y") {
                groupPermissions = res['data'];
                PermissionsTidy();
            }
        });
    }

    function PermissionsTidy() {

        for (let i = 0; i < groupPermissionshead.length; i++) {

            let objHead = {
                permissionsNumber: groupPermissionshead[i]['ps01'],
                permissionsName: groupPermissionshead[i]['ps02'],
                permissionsStatus: groupPermissionshead[i]['ps03'],
                permissionsChangetime: groupPermissionshead[i]['ps04'],
                permissionsChangeuser: groupPermissionshead[i]['ps05'],
                permissionsChangeLasttime: groupPermissionshead[i]['ps06'],
                permissionsChangeLastuser: groupPermissionshead[i]['ps07'],
                permissionsArray: []
            }

            Permissions.push(objHead);
        }

        for (let i = 0; i < Permissions.length; i++) {
            for (let y = 0; y < groupPermissions.length; y++) {

                if (Permissions[i]['permissionsNumber'] == groupPermissions[y]['ps01']) {
                    let objbody = {
                        groupNumber: groupPermissions[y]['gp02'],
                        groupstatus: groupPermissions[y]['gp03']
                    }

                    Permissions[i]['permissionsArray'].push(objbody);
                }
            }
        }


        $('InTable').html('');

        let TableHead = '<thead class="OrThead">' +
            '<tr>' +
            '   <th></th>' +
            '   <th style="text-align:center;"><label>群組編號</label></th>' +
            '   <th style="text-align:center;"><label>群組名稱</label></th>' +
            '   <th style="text-align:center;"><label>是否啟用</label></th>' +
            '<th>' +
            '</th>' +
            '</tr>' +
            '</thead>';

        let openHtml = '';
        let TableBody = '<tbody>';
        let number = '';


        for (let i = 0; i < Permissions.length; i++) {

            if (Permissions[i]['permissionsStatus'] == 1) {
                openHtml = '<i class="glyphicon glyphicon-ok" style="color:green;width:100%;text-align: center;margin-top: 5px;"></i>';
            } else {
                openHtml = '<i class="glyphicon glyphicon-remove" style="color:red;width:100%;text-align: center;margin-top: 5px;"></i>';
            }

            number = i + 1;

            TableBody += '<tr>' +
                '<td style="text-align:center;"><label>' + number + '</label></td>' +
                '<td style="text-align:center;"><label>' + Permissions[i]['permissionsNumber'] + '</label></td>' +
                '<td style="text-align:center;"><label>' + Permissions[i]['permissionsName'] + '</label></td>' +
                '<td style="text-align:center;"><label>' + openHtml + '</label></td>' +
                '<td style="text-align:center;"><button class="btn btn-primary InEd" data-id="' + Permissions[i]['permissionsNumber'] + '"><i class="glyphicon glyphicon-pencil"></i></button></td>' +
                '</tr>';

        }


        TableBody += '</tbody>';


        $('.InTable').append(TableHead);
        $('.InTable').append(TableBody);

        GroupTableHeadInit();
    }

    function GroupTableInit() {

        for (let i = 0; i < groupHead['data'].length; i++) {

            let objHead = {
                headNumber: groupHead['data'][i]['ph01'],
                headName: groupHead['data'][i]['ph02'],
                bodyArray: []
            }
            group.push(objHead);
        }

        for (let i = 0; i < group.length; i++) {

            for (let y = 0; y < groupBody['data'].length; y++) {

                if (group[i]['headNumber'] == groupBody['data'][y]['ph01']) {

                    let body = {
                        bodyNumber: groupBody['data'][y]['pb01'],
                        bodyName: groupBody['data'][y]['pb02']
                    }

                    group[i]['bodyArray'].push(body);

                }
            }
        }


    }

    function groupFromshow(id) {

        ProBoxInit(1);

        Table();

        for (let i = 0; i < Permissions.length; i++) {

            if (Permissions[i]['permissionsNumber'] == id) {
                $('.s01').attr("disabled", true);
                $('.s01').val(Permissions[i]['permissionsNumber']);
                $('.s02').val(Permissions[i]['permissionsName']);
                let select = "";
                if (Permissions[i]['permissionsStatus'] == 0) {
                    select =
                        '<option value="1">啟用</option>' +
                        '<option value="0" selected>停用</option>';
                } else {
                    select =
                        '<option value="1" selected>啟用</option>' +
                        '<option value="0">停用</option>';
                }



                $('.s03').html('');
                $('.s03').append(select);
                $('.s05').val(Permissions[i]['permissionsChangeuser']);
                $('.s06').val(Permissions[i]['permissionsChangetime']);
                $('.s07').val(Permissions[i]['permissionsChangeLastuser']);
                $('.s08').val(Permissions[i]['permissionsChangeLasttime']);

                for (let x = 0; x < Permissions[i]['permissionsArray'].length; x++) {
                    if (Permissions[i]['permissionsArray'][x]['groupstatus'] == 1) {
                        $("input[class=" + Permissions[i]['permissionsArray'][x]['groupNumber'] + "]").prop("checked", true);
                    }
                }
            }
        }
    }

    function Table() {

        $('.s01').attr("disabled", false);

        $('.CHBox').html('');
        let Table = '<table class="table table-hover table-bordered InTableGroup"><thead>';

        for (let i = 0; i < group.length; i++) {

            Table +=
                '<tr>' +
                '<th colspan="3" style="border-top: 2px solid #FF7E00;font-size: 0.9em;text-align: center;font-size: 1.5em;"><label style="color:red;">權限群組名稱 : ' + group[i]['headName'] + '</label></th>' +
                '</tr>' +
                '<tr>' +
                '<th style="text-align:center;">程式代號</th>' +
                '<th style="text-align:center;">程式名稱</th>' +
                '<th style="text-align:center;">是否啟用</th>' +
                '</tr>' +
                '<tbody>';

            for (let x = 0; x < group[i]['bodyArray'].length; x++) {

                Table +=
                    '<tr>' +
                    '<td><input class="NCG head" type="text" value="' + group[i]['bodyArray'][x]['bodyNumber'] + '" style="width:100%;color:black;" disabled></td>' +
                    '<td><input class="NCG body" type="text" value="' + group[i]['bodyArray'][x]['bodyName'] + '" style="width:100%;color:black;" disabled></td>' +
                    '<td><input type="checkbox" class="' + group[i]['bodyArray'][x]['bodyNumber'] + '" style="color:black;"></td>' +
                    '</tr>';
            }


            Table += '</tbody>';
        }

        $('.CHBox').append(Table);
    }

    function GetUser() {
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
            console.log(res['data']);
            user = res['data'];
        });
    }

    function GetGroupManager() {
        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'DepartmentUserData'
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log('res : ', res);
            DepartmentUserData = res['data'];
        });
    }

    //ProBox 初始化
    function ProBoxInit(ch) {
        $('.ProBox input').val('');
        $('.ProBox .s03')[0].selectedIndex = 0;
        $('.ProBox .chs').prop('checked', false);

        $('.ProBox .InCtrl button').hide();
        switch (ch) {
            case 0:
                $('.ProBox .InTitle1').html('新增群組');
                $('.ProBox .InCtrl .NewSubmit').show();
                break;

            case 1:
                $('.ProBox .InTitle1').html('修改群組');
                $('.ProBox .InCtrl .EdSubmit').show();
                break;

            default:
                break;
        }
        $('.ProBox .InCtrl .Cancelt').show();

        $('.ProBox').show();
    }

    //------------------------------
    //          新增權限
    //------------------------------
    function newSubmitgroup(number, name, status, departmentUser, submitGroup) {
        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'newSubmitgroup',
                number: number,
                name: name,
                status: status,
                departmentUser: departmentUser,
                submitGroup: submitGroup
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            if (res['status'] == "Y") {
                alert('新增成功~');
            } else {
                alert('新增失敗');
            }
            location.reload(true);
        });
    }

    function SetGroupManager() {
        let managerUser = '<option value="N" selected>無</option>';
        for (let x = 0; x < user.length; x++) {
            managerUser +=
                '<option value="' + user[x]['us03'] + '">' + user[x]['us04'] + '</option>';

        }

        $('.s04').html('');
        $('.s04').append(managerUser);

    }
    //------------------------------
    //          更新權限
    //------------------------------
    function editSunmitgroup(number, edit) {
        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'editSunmitgroup',
                number: number,
                edit: edit
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log(res);
            if (res['status'] == "Y") {
                alert('更新成功~');
            } else {
                alert('更新失敗');
            }
            location.reload(true);
        });
    }

    function InEdSetDepartmentManager(id) {

        let managerUser = "";
        managerUser = '<option value="N">無</option>';

        //群組主管 - ?
        //使用者中找對相同主管(人)

        for (let i = 0; i < DepartmentUserData.length; i++) {

            if (id == DepartmentUserData[i]['dh01']) {
                for (let x = 0; x < user.length; x++) {
                    if (user[x]['us03'] == DepartmentUserData[i]['dh02']) {
                        managerUser += '<option value="' + user[x]['us03'] + '" selected>' + user[x]['us04'] + '</option>';
                    } else {
                        managerUser += '<option value="' + user[x]['us03'] + '">' + user[x]['us04'] + '</option>';
                    }
                }
            }

        }

        $('.s04').html('');
        $('.s04').append(managerUser);

    }
});
$(document).ready(function() {

    var record = '';
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var id = $('.user').text();

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    today = yyyy + '-' + mm + '-' + dd;

    $('.startDate').val(today);
    $(".endDate").val(today);
    $('.txtSearch').val(id);

    //搜尋
    $(document).on('click', '.search', function() {
        let userAccount = $('.txtSearch').val();
        let startDate = $('.startDate').val();
        let endDate = $('.endDate').val();

        if (userAccount == '') userAccount = '%';
        searchUser(userAccount, startDate, endDate);
    });

    //填寫理由自動加入時間

    //送出
    $(document).on('click', '.deliver', function() {

        let check = false;

        for (let i = 0; i < record['data'].length; i++) {

            let SC = $('.table').find('tbody').find('tr:eq(' + i + ')').find('.checkData').data("id");
            if (SC == 0)
                check = true;
        }

        if (check)
            checkRecord();
        else
            alert('進出機房理由已填入完畢，待主管審核');
    });

    //列印
    $(document).on('click', '.print', function() {
        //列印出特定格式 
    });


    function searchUser(userAccount, startDate, endDate) {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'checkinrecord',
                userAccount: userAccount,
                startDate: startDate,
                endDate: endDate
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            record = res;
            searchRecordtable(res);
        });

    }


    function searchRecordtable(checkinrecord) {

        let openHtml = '';
        $('.MainBox2').show();
        $('.InCtrls').html('');

        let recordTable = '<table class="table table-hover table-bordered" id="tbl"><thead>' +
            '<tr>' +
            '<th style="width:5%;text-align: center;">員工編號</th>' +
            '<th style="width:5%;text-align: center;">員工姓名</th>' +
            '<th style="width:5%;text-align: center;">是否已填寫理由</th>' +
            '<th style="width:15%;text-align: center;">進入機房時間</th>' +
            '<th style="width:15%;text-align: center;">出去機房時間</th>' +
            '<th style="width:20%;text-align: center;">進出理由</th>' +
            '<th style="width:10%;text-align: center;">填寫理由時間</th>' +
            '<th style="width:5%;text-align: center;">主管審核</th>' +
            '<th style="width:10%;text-align: center;">主管名稱</th>' +
            '<th style="width:10%;text-align: center;">主管填寫日期</th>' +
            '</tr>' +
            '<tbody>';


        for (let i = 0; i < checkinrecord['data'].length; i++) {

            if (checkinrecord['data'][i]['cr06'] == 1) {
                openHtml = '<i class="glyphicon glyphicon-ok" style="color:green;width:100%;text-align: center;margin-top: 5px;"></i>';
            } else {
                openHtml = '<i class="glyphicon glyphicon-remove" style="color:red;width:100%;text-align: center;margin-top: 5px;"></i>';
            }

            if (checkinrecord['data'][i]['cr04'] == "") {
                recordTable +=
                    '<tr>' +
                    '<td><input class="NCG wordId" type="text" value="' + checkinrecord['data'][i]['us03'] + '" style="width:100%;color:black;" disabled></td>' +
                    '<td><input class="NCG wordName" type="text" value="' + checkinrecord['data'][i]['us04'] + '" style="width:100%;color:black;" disabled></td>' +
                    '<td><i class="glyphicon glyphicon-remove checkData" style="color:red;width:100%;text-align: center;margin-top: 5px;" data-id="0"></i></td>' +
                    '<td><input class="NCG inEngine" type="text" value="' + checkinrecord['data'][i]['cr02'] + '" style="width:100%;color:black;" disabled></td>' +
                    '<td><input class="outEngine" type="datetime-local" style="width:100%;color:black;height: 25px;"></td>' +
                    '<td><input class="reason" type="text" value="" style="width:100%;color:black;"></td>' +
                    '<td><input class="NCG reasonDatetime" type="text" value="' + checkinrecord['data'][i]['cr05'] + '" style="width:100%;color:black;" disabled></td>';
            } else {
                recordTable +=
                    '<tr>' +
                    '<td><input class="NCG wordId" type="text" value="' + checkinrecord['data'][i]['us03'] + '" style="width:100%;color:black;" disabled></td>' +
                    '<td><input class="NCG wordName" type="text" value="' + checkinrecord['data'][i]['us04'] + '" style="width:100%;color:black;" disabled></td>' +
                    '<td><i class="glyphicon glyphicon-ok checkData" style="color:green;width:100%;text-align: center;margin-top: 5px;" data-id="1"></i></td>' +
                    '<td><input class="NCG inEngine" type="text" value="' + checkinrecord['data'][i]['cr02'] + '" style="width:100%;color:black;" disabled></td>' +
                    '<td><input class="NCG outEngine" type="text" value="' + checkinrecord['data'][i]['cr03'] + '" style="width:100%;color:black;height: 25px;" disabled></td>' +
                    '<td><input class="NCG reason" type="text" value="' + checkinrecord['data'][i]['cr04'] + '" style="width:100%;color:black;" disabled></td>' +
                    '<td><input class="NCG reasonDatetime" type="text" value="' + checkinrecord['data'][i]['cr05'] + '" style="width:100%;color:black;" disabled></td>';
            }

            recordTable +=
                '<td>' + openHtml + '</td>' +
                '<td><input class="NCG managerName" type="text" value="' + checkinrecord['data'][i]['cr07'] + '" style="width:100%;color:black;" disabled></td>' +
                '<td><input class="NCG managerDatetime" type="text" value="' + checkinrecord['data'][i]['cr08'] + '" style="width:100%;color:black;" disabled></td>';
        }


        recordTable += '</tbody></table>';

        let recordButton = '<div>' +
            '<div class="col-md-4 col-lg-4 col-sm-4 col-xs-12"></div>' +
            '<div class="col-md-4 col-lg-4 col-sm-4 col-xs-12">' +
            '<button class="col-md-12 btn btn-primary deliver" style="text-align:center;">' +
            '<label>送出</label>' +
            '</button>' +
            '</div>' +
            '<div class="col-md-4 col-lg-4 col-sm-4 col-xs-12"></div>' +
            '</div>';

        $('.InCtrls').append(recordTable);
        $('.InCtrls').append(recordButton);
    }

    function checkRecord() {

        let checkResult = 'SC';

        for (let i = 0; i < record['data'].length; i++) {

            let reason = $('.table').find('tbody').find('tr:eq(' + i + ')').find('.reason').val();
            let outEngine = $('.table').find('tbody').find('tr:eq(' + i + ')').find('.outEngine').val();

            if (reason == "") {
                checkResult = 'NW';
            }


            if (outEngine == "") {
                checkResult = 'ND';
            }

        }

        switch (checkResult) {
            case 'SC': //檢查無誤

                let recordData = [];


                for (let i = 0; i < record['data'].length; i++) {
                    let SC = $('.table').find('tbody').find('tr:eq(' + i + ')').find('.checkData').data("id");

                    if (SC == 0) {
                        let object = recordObject();

                        let id = $('.table').find('tbody').find('tr:eq(' + i + ')').find('.wordId').val();
                        let name = $('.table').find('tbody').find('tr:eq(' + i + ')').find('.wordName').val();
                        let inEngine = $('.table').find('tbody').find('tr:eq(' + i + ')').find('.inEngine').val();
                        let outEngine = $('.table').find('tbody').find('tr:eq(' + i + ')').find('.outEngine').val();
                        let outDatetime = outEngine.split('T')[0] + " " + outEngine.split('T')[1] + ":00";
                        let reason = $('.table').find('tbody').find('tr:eq(' + i + ')').find('.reason').val();
                        let datetime = $('.table').find('tbody').find('tr:eq(' + i + ')').find('.reasonDatetime').val();

                        object.id = id;
                        object.name = name;
                        object.inEngine = inEngine;
                        object.outEngine = outDatetime;
                        object.reason = reason;
                        object.datetime = datetime;

                        recordData.push(object);
                    }
                }

                recordUpdate(recordData);

                break;
            case 'NW': //未填入理由
                alert('有未填入進出機房理由');
                break;
            case 'ND': //未填入出機房時間
                alert('有未填入出機房時間');
                break;
        }

    }

    function recordObject() {
        return {
            id: '',
            name: '',
            inEngine: '',
            outEngine: '',
            reason: '',
            datetime: ''
        }
    }

    function recordUpdate(data) {
        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'recordUpdate',
                data: data
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log(res);
            if (res['status'] == "Y") {
                alert('更新成功~');
                location.reload(true);
            }
        });

    }

});
$(document).ready(function() {

    var record = [];

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var hh = today.getHours();
    var mi = today.getMinutes();
    var ss = today.getSeconds();

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    today = yyyy + '-' + mm + '-' + dd;
    var todayOne = yyyy + '-' + mm + '-01';

    if (hh < 10) { hh = '0' + hh; }
    if (mi < 10) { mi = '0' + mi; }
    if (ss < 10) { ss = '0' + ss; }
    var now = today + ' ' + hh + ':' + mi + ':' + ss;

    $('.startDate').val(todayOne);
    $(".endDate").val(today);

    managerReviewgroup();


    $(document).on('click', '.search', function() {
        let group = $('.group').val(); //主管選擇的群組
        let startDate = $('.startDate').val(); //開始時間
        let endDate = $('.endDate').val(); //結束時間

        SearchDepartmentUser(group, startDate, endDate);
    });

    //主管勾選後變更主管審核時間
    $(document).on('click', 'input:radio', function() {
        let chooseRadio = $(this).data("id"); //點到哪行

        today = new Date();
        dd = today.getDate();
        mm = today.getMonth() + 1; //January is 0!
        yyyy = today.getFullYear();

        hh = today.getHours();
        mi = today.getMinutes();
        ss = today.getSeconds();

        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        today = yyyy + '-' + mm + '-' + dd;

        if (hh < 10) { hh = '0' + hh; }
        if (mi < 10) { mi = '0' + mi; }
        if (ss < 10) { ss = '0' + ss; }
        now = today + ' ' + hh + ':' + mi + ':' + ss;

        if (chooseRadio == "ALL-0" || chooseRadio == "ALL-1" || chooseRadio == "ALL-2") {
            for (let i = 0; i < record.length; i++) {
                for (let x = 0; x < record[i]['record'].length; x++) {
                    $('.managerDatetime' + i + "-" + x).val(now);

                    if (chooseRadio == "ALL-0") {
                        $('#noclick-' + i + "-" + x).prop('checked', true);
                    } else if (chooseRadio == "ALL-1") {
                        $('#agree-' + i + "-" + x).prop('checked', true);
                    } else if (chooseRadio == "ALL-2") {
                        $('#noagree-' + i + "-" + x).prop('checked', true);
                    }
                }
            }
        } else {
            $('.managerDatetime' + chooseRadio).val(now);
        }
    });

    $(document).on('click', '.deliver', function() {
        console.log('送出');

        Submit();
    });

    //取得主管可簽核的部門群組
    function managerReviewgroup() {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'managerReviewgroup'
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            GroupSelectInit(res['data']);
        });
    }

    function GroupSelectInit(res) {
        let select = '';

        for (let i = 0; i < res.length; i++) {

            select += '<option value="' + res[i]['ps01'] + '">' + res[i]['ps02'] + '</option>';

        }
        $('.group').html('');
        $('.group').append(select);
    }

    //-------------------------------------------------------
    //                  搜尋
    //-------------------------------------------------------    

    function SearchDepartmentUser(group, startDate, endDate) {
        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'SearchDepartmentUser',
                group,
                startDate,
                endDate
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log(res);
            record = res['data'];
            DepartmentTableShow(res);
        });
    }

    function DepartmentTableShow(res) {


        let openHtml = '';
        let lazyCheck = '';


        $('.MainBox2').show();
        $('.InCtrls').html('');

        lazyCheck +=
            '<div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">' +
            '<div class="col-md-6 col-sm-12 col-lg-6 col-xs-12">' +
            '</div>' +
            '<div class="col-md-6 col-sm-12 col-lg-6 col-xs-12">' +
            '<div class="col-md-6 col-sm-12 col-lg-6 col-xs-12" style="text-align:right;">' +
            '<label>一鍵選擇</label>' +
            '</div>' +
            '<div class="col-md-6 col-sm-12 col-lg-6 col-xs-12">' +
            '<form>' +
            '<fieldset>' +
            '<div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">' +
            '<input type="radio" class="col-md-4" name="sort" id="noclick" value="0" data-id="ALL-0" checked>' +
            '<label class="col-md-8" for="noclick">未審核</label>' +
            '</div>' +

            '<div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">' +
            '<input type="radio" class="col-md-4" name="sort" id="agree" value="1" data-id="ALL-1">' +
            '<label class="col-md-8" for="agree">全部同意</label>' +
            '</div>' +

            '<div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">' +
            '<input type="radio" class="col-md-4" name="sort" id="noagree" value="2" data-id="ALL-2">' +
            '<label class="col-md-8" for="noagree">全部不同意</label>' +
            '</div>' +
            '</form>' +
            '</fieldset>' +
            '</div>' +
            '</div>' +
            '</div>';


        let recordTable = '<table class="table table-hover table-bordered" id="tbl"><thead>';



        for (let i = 0; i < res['data'].length; i++) {

            recordTable +=
                '<tr>' +
                '<th colspan="10" style="border-top: 2px;font-size: 0.9em;text-align: center;font-size: 1.5em;"><label style="color:black;">進出機房人員 : ' + res['data'][i]['userName'] + '</label></th>' +
                '</tr>' +
                '<tr>' +
                '<th style="width:5%;text-align: center;">員工編號</th>' +
                '<th style="width:5%;text-align: center;">員工姓名</th>' +
                '<th style="width:5%;text-align: center;">是否已填寫理由</th>' +
                '<th style="width:12%;text-align: center;">進入機房時間</th>' +
                '<th style="width:12%;text-align: center;">出去機房時間</th>' +
                '<th style="width:20%;text-align: center;">進出理由</th>' +
                '<th style="width:10%;text-align: center;">填寫理由時間</th>' +
                '<th style="width:5%;text-align: center;">主管是否審核</th>' +
                '<th style="width:15%;text-align: center;">審核</th>' +
                '<th style="width:10%;text-align: center;">主管填寫日期</th>' +
                '</tr>' +
                '<tbody>';

            for (let x = 0; x < res['data'][i]['record'].length; x++) {

                if (res['data'][i]['record'][x]['cr06'] == 1) {
                    openHtml = '<i class="glyphicon glyphicon-ok" style="color:green;width:100%;text-align: center;margin-top: 5px;"></i>';
                } else {
                    openHtml = '<i class="glyphicon glyphicon-remove" style="color:red;width:100%;text-align: center;margin-top: 5px;"></i>';
                }

                if (res['data'][i]['record'][x]['cr04'] == "") {
                    recordTable +=
                        '<tr>' +
                        '<td><input class="NCG wordId" type="text" value="' + res['data'][i]['record'][x]['cr01'] + '" style="width:100%;color:black;" disabled></td>' +
                        '<td><input class="NCG wordName" type="text" value="' + res['data'][i]['userName'] + '" style="width:100%;color:black;" disabled></td>' +
                        '<td><i class="glyphicon glyphicon-remove checkData" style="color:red;width:100%;text-align: center;margin-top: 5px;" data-id="0"></i></td>' +
                        '<td><input class="NCG inEngine" type="text" value="' + res['data'][i]['record'][x]['cr02'] + '" style="width:100%;color:black;" disabled></td>' +
                        '<td><input class="NCG outEngine" type="text" style="width:100%;color:black;height: 25px;"></td>' +
                        '<td><input class="NCG reason" type="text" value="" style="width:100%;color:black;"></td>' +
                        '<td><input class="NCG reasonDatetime" type="text" value="' + res['data'][i]['record'][x]['cr05'] + '" style="width:100%;color:black;" disabled></td>';
                } else {
                    recordTable +=
                        '<tr>' +
                        '<td><input class="NCG wordId" type="text" value="' + res['data'][i]['record'][x]['cr01'] + '" style="width:100%;color:black;" disabled></td>' +
                        '<td><input class="NCG wordName" type="text" value="' + res['data'][i]['userName'] + '" style="width:100%;color:black;" disabled></td>' +
                        '<td><i class="glyphicon glyphicon-ok checkData" style="color:green;width:100%;text-align: center;margin-top: 5px;" data-id="1"></i></td>' +
                        '<td><input class="NCG inEngine" type="text" value="' + res['data'][i]['record'][x]['cr02'] + '" style="width:100%;color:black;" disabled></td>' +
                        '<td><input class="NCG outEngine" type="text" value="' + res['data'][i]['record'][x]['cr03'] + '" style="width:100%;color:black;height: 25px;" disabled></td>' +
                        '<td><input class="NCG reason" type="text" value="' + res['data'][i]['record'][x]['cr04'] + '" style="width:100%;color:black;" disabled></td>' +
                        '<td><input class="NCG reasonDatetime" type="text" value="' + res['data'][i]['record'][x]['cr05'] + '" style="width:100%;color:black;" disabled></td>';
                }

                recordTable +=
                    '<td>' + openHtml + '</td>' +
                    '<td>' +
                    '<form>' +
                    '<fieldset>' +
                    '<div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">' +
                    '<input type="radio" class="col-md-4" name="sort-' + i + "-" + x + '" id="noclick-' + i + "-" + x + '" value="0" data-id="' + i + "-" + x + '" checked>' +
                    '<label class="col-md-8" for="noclick-' + i + "-" + x + '">未審核</label>' +
                    '</div>' +

                    '<div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">' +
                    '<input type="radio" class="col-md-4" name="sort-' + i + "-" + x + '" id="agree-' + i + "-" + x + '" value="1" data-id="' + i + "-" + x + '">' +
                    '<label class="col-md-8" for="agree-' + i + "-" + x + '">同意</label>' +
                    '</div>' +

                    '<div class="col-md-12 col-sm-12 col-lg-12 col-xs-12">' +
                    '<input type="radio" class="col-md-4" name="sort-' + i + "-" + x + '" id="noagree-' + i + "-" + x + '" value="2" data-id="' + i + "-" + x + '">' +
                    '<label class="col-md-8" for="noagree-' + i + "-" + x + '">不同意</label>' +
                    '</div>' +
                    '</form>' +
                    '</fieldset>' +

                    '</td>' +
                    '<td><input class="NCG managerDatetime' + i + "-" + x + '" type="text" value="' + res['data'][i]['record'][x]['cr08'] + '" style="width:100%;color:black;" disabled></td>';
            }
        }


        recordTable += '</tbody></table>';

        let recordButton = '<div>' +
            '<div class="col-md-4 col-lg-4 col-sm-4 col-xs-12"></div>' +
            '<div class="col-md-4 col-lg-4 col-sm-4 col-xs-12">' +
            '<button class="col-md-12 btn btn-primary deliver" style="text-align:center; margin-bottom: 1em;">' +
            '<label>送出</label>' +
            '</button>' +
            '</div>' +
            '<div class="col-md-4 col-lg-4 col-sm-4 col-xs-12"></div>' +
            '</div>';

        $('.InCtrls').append(lazyCheck);
        $('.InCtrls').append(recordTable);
        $('.InCtrls').append(recordButton);
    }

    //-------------------------------------------------------
    //                  更新
    //-------------------------------------------------------    

    function Submit() {
        let managerReview = [];

        for (let i = 0; i < record.length; i++) {
            for (let x = 0; x < record[i]['record'].length; x++) {

                let status = 0;
                let managerChangeTime = $('.managerDatetime' + i + "-" + x).val();
                if ($('#noclick-' + i + "-" + x)) {
                    status = 0;
                } else
                if ($('#agree-' + i + "-" + x)) {
                    status = 1;
                } else if ($('#noagree-' + i + "-" + x)) {
                    status = 2;
                }

                let obj = {
                    userID: record[i]['record'][x]['cr01'],
                    inEngineroom: record[i]['record'][x]['cr02'],
                    status: status,
                    managerChangeTime: managerChangeTime
                }

                managerReview.push(obj);
            }
        }

        updateReview(managerReview);
    }

    //核決更新
    function updateReview(managerReview) {
        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'updateReview',
                managerReview
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
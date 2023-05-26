$(document).ready(function() {
    // $.ChangeTab("進出機房報表列印");

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
        let startDate = $('.startDate').val();
        let endDate = $('.endDate').val();

        searchUser(startDate, endDate);
    });

    //填寫理由自動加入時間

    //列印
    $(document).on('click', '.print', function() {

        var style = '<link id="bs-css" href="css/bootstrap-cerulean.min.css" rel="stylesheet">' +
            '<script src="bower_components/jquery/jquery.min.js"></script>' +
            '<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>' +
            '<style>.col-md-1 {width:8%;  float:left;}' +
            '.col-md-2 {width:16%; float:left;}' +
            '.col-md-3 {width:25%; float:left;}' +
            '.col-md-4 {width:33%; float:left;}' +
            '.col-md-5 {width:42%; float:left;}' +
            '.col-md-6 {width:50%; float:left;}' +
            '.col-md-7 {width:58%; float:left;}' +
            '.col-md-8 {width:66%; float:left;}' +
            '.col-md-9 {width:75%; float:left;}' +
            '.col-md-10{width:83%; float:left;}' +
            '.col-md-11{width:92%; float:left;}' +
            '.col-md-12{width:100%; float:left;}' +
            '.col-md-1-5{width:20%; float:left;}' +
            '.PDCtrl{margin-top: 2%; text-align: center;}' +
            '.PrintD{ border: 1px solid blue; padding: 2px !important; margin-bottom: 1.5em;}' +
            '.OrThead{border-top: 1px solid #000000; border-bottom: 1px solid #000000; margin-bottom: 5px;font-size: 0.9em;}' +
            '.InTitle{text-align: center; font-size: 1.5em; font-family: "Courier New", Courier, monospace;}' +
            '.InTableBox5 th{text-align:center;}' +
            '.InTableBox5 td{text-align:center;}' +
            '@page{margin:0mm;}' +
            '.PBox{padding:0px !important; font-size:8px !important;}' +
            '.PBox div{padding:0px !important;}' +
            'table{margin-bottom:0px;font-size:8px !important;}' +
            '.InTableBox5{margin-bottom:0px !important;}' +
            '.thCol1{width: 20%;vertical-align: middle !important;}' +
            '.thCol2{width: 7%;vertical-align: middle !important;}</style>';
        $.PrintDIVByC('PBox', style);

    });




    function searchUser(startDate, endDate) {

        $.ajax({
            url: 'php/sqlimplement.php',
            method: 'POST',
            dataType: 'json',
            data: {
                type: 'checkinAllrecord',
                startDate: startDate,
                endDate: endDate
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            record = res;
            console.log(res);
            searchRecordtable(res);
        });

    }


    function searchRecordtable(checkinrecord) {

        let openHtml = '';
        $('.MainBox2').show();
        $('.InCtrls').html('');

        let recordTable = '<table class="table table-hover table-bordered" id="tbl"><thead>' +
            '<tr>' +
            '<th style="width:10%;text-align: center;">員工編號</th>' +
            '<th style="width:10%;text-align: center;">員工姓名</th>' +
            '<th style="width:5%;text-align: center;">是否已填寫理由</th>' +
            '<th style="width:10%;text-align: center;">進入機房時間</th>' +
            '<th style="width:10%;text-align: center;">出去機房時間</th>' +
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
                    '<td><label class="outEngine" style="width:100%;color:black;height: 25px;"></label></td>' +
                    '<td><label class="reason"style="width:100%;color:black;"></label></td>' +
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
                '<td><input class="NCG managerName" type="text" value="' + checkinrecord['data'][i]['usb04'] + '" style="width:100%;color:black;" disabled></td>' +
                '<td><input class="NCG managerDatetime" type="text" value="' + checkinrecord['data'][i]['cr08'] + '" style="width:100%;color:black;" disabled></td>';
        }


        recordTable += '</tbody></table>';

        let recordButton = '<div>' +
            '<div class="col-md-4 col-lg-4 col-sm-4 col-xs-12"></div>' +
            '<div class="col-md-4 col-lg-4 col-sm-4 col-xs-12">' +
            '<button class="col-md-12 btn btn-primary print" style="text-align:center;">' +
            '<label>列印</label>' +
            '</button>' +
            '</div>' +
            '<div class="col-md-4 col-lg-4 col-sm-4 col-xs-12"></div>' +
            '</div>';

        $('.InCtrls').append(recordTable);
        $('.InCtrls').append(recordButton);
        printTable(checkinrecord);

    }

    //列印出來的檔案Table客製
    function printTable(checkinrecord) {
        console.log(checkinrecord);

        let page = Math.ceil(checkinrecord['data'].length / 20);

        console.log(page);

        let printtable = '';
        for (let x = 0; x < page; x++) {

            printtable += '<div class="col-md-12 company" style="text-align: center;font-size: 2em; margin-top: 2em;"><label>南仁湖育樂股份有限公司</label></div>' +
                '<div class="col-md-12 title" style="text-align: center;"><label>機房人員進出管制記錄表</label></div>' +
                '<table class="table table-hover table-bordered InTable ">' +
                '<thead class="OrThead">' +
                '<tr>' +
                '<th class="titleId"><label>編  號</label></th>' +
                '<th class="titleName"><label>姓  名</label></th>' +
                '<th class="titleDatetime"><label>起 迄 時 間</label></th>' +
                '<th class="titleReason"><label>備 註 說 明</label></th>' +
                '<th class="titleManager"><label>主 管 簽 核</label></th>' +
                '</tr>' +
                '</thead>';


            printtable += '<tbody>';

            for (let i = x * 20; i < (x + 1) * 20; i++) {

                if (i >= checkinrecord['data'].length) {
                    printtable +=
                        '<tr>' +
                        '<td><label class="id"></label></td>' +
                        '<td><label class="name"></label></td>' +
                        '<td><label class="engineDatetime" style="text-align: left !important;"></label></td>' +
                        '<td><label class="reason"></label></td>' +
                        '<td><label class="manager"> </label></td></tr>';
                } else {
                    printtable +=
                        '<tr>' +
                        '<td><label class="id">' + checkinrecord['data'][i]['us03'] + '</label></td>' +
                        '<td><label class="name">' + checkinrecord['data'][i]['us04'] + '</label></td>';

                    if (checkinrecord['data'][i]['cr03'] == "0000-00-00 00:00:00") {
                        printtable += '<td><label class="engineDatetime" style="text-align: left !important;">' + checkinrecord['data'][i]['cr02'] + ' ~ ____ - __ - __ __ : __ : __ </label></td>';
                    } else {
                        printtable += '<td><label class="engineDatetime" style="text-align: left !important;">' + checkinrecord['data'][i]['cr02'] + ' ~ ' + checkinrecord['data'][i]['cr03'] + '</label></td>';
                    }

                    printtable +=
                        '<td><label class="reason"> ' + checkinrecord['data'][i]['cr04'] + ' </label></td>';

                    if (checkinrecord['data'][i]['cr06'] == '1')
                        printtable += '<td><label class="manager"> ' + checkinrecord['data'][i]['usb04'] + " " + checkinrecord['data'][i]['cr08'] + ' </label></td>';
                    else
                        printtable += '<td><label class="manager"> </label></td></tr>';
                }
            }

            printtable += "</tbody>" +
                "</table>" +
                '<P style="page-break-after:always">&nbsp;</P>';
        }


        $('.PBox').empty();
        $('.PBox').append(printtable); //報表格式
        // $('.InTable').append(table);
    }


});
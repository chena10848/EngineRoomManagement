//測試用
// jQuery.test = function() {
// 	alert('test');
// }

// jQuery.test2 = function(a) {
// 	return a+1;
// }
//$.test();

// -----------------------------------------------------------------------------
// ---------------------               Start               ---------------------
// -----------------------------------------------------------------------------


//--------------------浮點數運算，防BUG--------------------

//jjxx.numMultiply(price,mb_early) -> 非外部用法
//$.jjxx.numMultiply(price,mb_early) -> 外部用法
jQuery.jjxx = {
    /*加法函數，返回值：arg1加上arg2的精確結果*/
    numAdd: function(arg1, arg2) {
        // let ans = math.format(math.add(arg1, arg2), {precision: 14});
        // return math.bignumber(ans);
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        return (Math.round(arg1 * m) + Math.round(arg2 * m)) / m
    },
    /*減法函數, 返回值：arg1減去arg2的精確結果*/
    numSubtract: function(arg1, arg2) {
        // let ans = math.format(math.add(arg1, -arg2), {precision: 14});
        // return math.bignumber(ans);
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        //動態控制精度長度
        n = (r1 >= r2) ? r1 : r2;
        return ((Math.round(arg1 * m) - Math.round(arg2 * m)) / m).toFixed(n);
    },
    /*乘法函數 返回值：arg1乘以arg2的精確結果*/
    numMultiply: function(arg1, arg2) {
        // let ans = math.format(math.multiply(arg1, arg2), {precision: 14});
        // return math.bignumber(ans);
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {}
        try {
            m += s2.split(".")[1].length
        } catch (e) {}
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    /*除法函數, 返回值：arg1除以arg2的精確結果*/
    numDivide: function(arg1, arg2) {
        // let ans = math.format(math.divide(arg1, arg2), {precision: 14});
        // return math.bignumber(ans);
        var t1 = 0,
            t2 = 0,
            r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) {}
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) {}
        with(Math) {
            r1 = Number(arg1.toString().replace(".", ""))
            r2 = Number(arg2.toString().replace(".", ""))
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }
}

//--------------------小數點補0--------------------
jQuery.roundX = function(num, pos) {
        var size = Math.pow(10, pos);
        return Math.round(num * size) / size;
    }
    //--------------------小數點補0--------------------

jQuery.ShowAsFloat = function(num, n) {
    return parseFloat(num).toFixed(n);
}

//---------------小數點第N位(4捨5入)----------------------------
jQuery.formatFloat = function(num, pos) {
    var size = Math.pow(10, pos);
    return Math.round(num * size) / size;
}

//--------------------動作紀錄--------------------

jQuery.ActionLog = function(Ary) { //Ary -> uid,url,data,type,table

}

//--------------------左 / 右 補0--------------------

jQuery.paddingLeft = function(str, lenght) {
    if (str.length >= lenght)
        return str;
    else
        return $.paddingLeft("0" + str, lenght);
}
jQuery.paddingRight = function(str, lenght) {
    if (str.length >= lenght)
        return str;
    else
        return $.paddingRight(str + "0", lenght);
}

//--------------------數字千分位--------------------

jQuery.FormatNumber = function(n) {
    n += "";
    var arr = n.split(".");
    var re = /(\d{1,3})(?=(\d{3})+$)/g;
    return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
}


//--------------------一般DIV列印(Class)--------------------

//divname , print css style
jQuery.PrintDIVByC = function(elm, style) {
    var value = "";
    var pages = "<p style='page-break-after:always'></p>";
    var jqelm = $('.' + elm);
    // var tp = '<div class="mdD p11 col-md-12"><div class="InTitle col-md-12" style="color: crimson;">進貨單</div><div class="col-md-12"><div class="col-md-12"><div class="col-md-5">進貨單號：<span class="t01">IMP1810080001</span></div><div class="col-md-4"></div><div class="col-md-3">進貨日期：<span class="t02">2018/10/08</span></div></div><div class="col-md-12"><div class="col-md-5">廠商代號：<span class="t03">6664166 YOKO</span></div><div class="col-md-4">統一編號：<span class="t04">mark    </span></div><div class="col-md-3">採購單號：<span class="t05">PUR1810080001</span></div></div><div class="col-md-12"><div class="col-md-5">連絡人員：<span class="t06">0911222333</span></div><div class="col-md-4">連絡電話：<span class="t07">0922333444</span></div><div class="col-md-3">傳真電話：<span class="t08">021234568 </span></div></div><div class="col-md-12"><div class="col-md-9">發票地址：<span class="t09">IVDR</span></div><div class="col-md-3">製表日期：<span class="t10">2018/10/08</span></div></div><div class="col-md-12"><div class="col-md-9">工廠地址：<span class="t11">ADR</span></div><div class="col-md-3">製表人員：<span class="t12">MIS 管理員</span></div></div><div class="col-md-12"><div class="col-md-5">採購人員：<span class="t13">GTLWEB 綠色隧道</span></div><div class="col-md-4">門市代號：<span class="t14">120 北極</span></div><div class="col-md-3">歸帳月份：<span class="t15">2018/12</span></div></div></div><div class="col-md-12"><table class="table InTable T2 table-hover"> <!-- table-bordered  table-hover--><thead class="OrThead"><tr><th>項次</th><th>商品編號</th><th>商品名稱</th><th>稅別</th><th>數量</th><th>單位</th><th>單價</th><th>金額</th></tr></thead><tbody><tr><td class="n1">1</td><td class="n1">001001001</td><td class="n1">001測試用</td><td class="n1">含稅</td><td class="n6">30.00</td><td class="n1">G</td><td class="n6">60.2522</td><td class="n6">1807.5660</td></tr></tbody></table></div><div class="PEnd col-md-12"><div class="col-md-1 PEDT"><b>備註</b></div><div class="col-md-6 PED"><div class="PEDE col-md-6">課稅類別：<span class="a01">應稅</span></div><div class="PEDE col-md-6">發票日期：<span class="a02">2018/10/08</span></div><div class="PEDE col-md-6">發票聯式：<span class="a03">三聯式&amp;電子計算機發票</span></div><div class="PEDE col-md-6">發票號碼：<span class="a04">AA12345678</span></div><div class="PEDE col-md-6">備　　註：<span class="a05"></span></div></div><div class="col-md-5 PEA"><div class="PEAC col-md-6"><div class="col-md-5">未稅金額</div><div class="col-md-7"><span class="b01">1,721</span></div></div><div class="PEAC col-md-6"><div class="col-md-5">稅　　額</div><div class="col-md-7"><span class="b02">86</span></div></div><div class="PEAC col-md-6"></div><div class="PEAC col-md-6"><div class="col-md-5">合計金額</div><div class="col-md-7"><span class="b03">1,808</span></div></div>   </div></div><div class="col-md-1-5">核准：</div><div class="col-md-1-5">覆核：</div><div class="col-md-1-5">驗收：</div><div class="col-md-1-5">使用單位：</div><div class="col-md-1-5">財務：</div></div>';

    $.each(jqelm, function(index, item) {
        var html_content = document.getElementsByClassName(elm)[index].innerHTML;

        if (index == 0) {
            value = value + html_content;
            // value = '<div class="mdD p11 col-md-12">'+ value + '</div>' + html_content;
        } else {
            value = value + pages + html_content;
            // value = '<div class="mdD p11 col-md-12">'+ value + '</div>' + pages + html_content;
        }
    });

    var printPage = window.open("", "Printing...", "");
    printPage.document.open();
    printPage.document.write("<html><head>" + style + "<script>function step1(){setTimeout('step2()', 10);}function step2(){window.print();window.close()}</script></head><body onload='step2()'>");
    printPage.document.write("<pre>");
    // printPage.document.write(value);
    printPage.document.write('<div class="col-md-12">' + value + '</div>');
    printPage.document.write("</pre>");
    printPage.document.close("</body></html>");

}

jQuery.PrintDIVByC3 = function(elm, style) {
    var value = "";
    var pages = "<p style='page-break-after:always'></p>";
    var jqelm = $('.' + elm);
    // var tp = '<div class="mdD p11 col-md-12"><div class="InTitle col-md-12" style="color: crimson;">進貨單</div><div class="col-md-12"><div class="col-md-12"><div class="col-md-5">進貨單號：<span class="t01">IMP1810080001</span></div><div class="col-md-4"></div><div class="col-md-3">進貨日期：<span class="t02">2018/10/08</span></div></div><div class="col-md-12"><div class="col-md-5">廠商代號：<span class="t03">6664166 YOKO</span></div><div class="col-md-4">統一編號：<span class="t04">mark    </span></div><div class="col-md-3">採購單號：<span class="t05">PUR1810080001</span></div></div><div class="col-md-12"><div class="col-md-5">連絡人員：<span class="t06">0911222333</span></div><div class="col-md-4">連絡電話：<span class="t07">0922333444</span></div><div class="col-md-3">傳真電話：<span class="t08">021234568 </span></div></div><div class="col-md-12"><div class="col-md-9">發票地址：<span class="t09">IVDR</span></div><div class="col-md-3">製表日期：<span class="t10">2018/10/08</span></div></div><div class="col-md-12"><div class="col-md-9">工廠地址：<span class="t11">ADR</span></div><div class="col-md-3">製表人員：<span class="t12">MIS 管理員</span></div></div><div class="col-md-12"><div class="col-md-5">採購人員：<span class="t13">GTLWEB 綠色隧道</span></div><div class="col-md-4">門市代號：<span class="t14">120 北極</span></div><div class="col-md-3">歸帳月份：<span class="t15">2018/12</span></div></div></div><div class="col-md-12"><table class="table InTable T2 table-hover"> <!-- table-bordered  table-hover--><thead class="OrThead"><tr><th>項次</th><th>商品編號</th><th>商品名稱</th><th>稅別</th><th>數量</th><th>單位</th><th>單價</th><th>金額</th></tr></thead><tbody><tr><td class="n1">1</td><td class="n1">001001001</td><td class="n1">001測試用</td><td class="n1">含稅</td><td class="n6">30.00</td><td class="n1">G</td><td class="n6">60.2522</td><td class="n6">1807.5660</td></tr></tbody></table></div><div class="PEnd col-md-12"><div class="col-md-1 PEDT"><b>備註</b></div><div class="col-md-6 PED"><div class="PEDE col-md-6">課稅類別：<span class="a01">應稅</span></div><div class="PEDE col-md-6">發票日期：<span class="a02">2018/10/08</span></div><div class="PEDE col-md-6">發票聯式：<span class="a03">三聯式&amp;電子計算機發票</span></div><div class="PEDE col-md-6">發票號碼：<span class="a04">AA12345678</span></div><div class="PEDE col-md-6">備　　註：<span class="a05"></span></div></div><div class="col-md-5 PEA"><div class="PEAC col-md-6"><div class="col-md-5">未稅金額</div><div class="col-md-7"><span class="b01">1,721</span></div></div><div class="PEAC col-md-6"><div class="col-md-5">稅　　額</div><div class="col-md-7"><span class="b02">86</span></div></div><div class="PEAC col-md-6"></div><div class="PEAC col-md-6"><div class="col-md-5">合計金額</div><div class="col-md-7"><span class="b03">1,808</span></div></div>   </div></div><div class="col-md-1-5">核准：</div><div class="col-md-1-5">覆核：</div><div class="col-md-1-5">驗收：</div><div class="col-md-1-5">使用單位：</div><div class="col-md-1-5">財務：</div></div>';

    $.each(jqelm, function(index, item) {
        var html_content = document.getElementsByClassName(elm)[index].innerHTML;

        if (index == 0) {
            value = value + html_content;
            // value = '<div class="mdD p11 col-md-12">'+ value + '</div>' + html_content;
        } else {
            value = value + pages + html_content;
            // value = '<div class="mdD p11 col-md-12">'+ value + '</div>' + pages + html_content;
        }
    });

    var printPage = window.open("", "Printing...", "");
    printPage.document.open();
    printPage.document.write("<html><head>" + style + "<script>function step1(){setTimeout('step2()', 10);}function step2(){window.print();window.close()}</script></head><body onload='step2()'>");
    printPage.document.write("<div>");
    // printPage.document.write(value);
    printPage.document.write('<div class="col-md-12">' + value + '</div>');
    printPage.document.write("</div>");
    printPage.document.close("</body></html>");

}


//--------------------一般DIV列印(Class) 測試用--------------------
jQuery.PrintDIVByC2 = function(elm, style) {
    var value = "";
    var pages = "<p style='page-break-after:always'></p>";
    var jqelm = $('.' + elm);
    // var tp = '<div class="mdD p11 col-md-12"><div class="InTitle col-md-12" style="color: crimson;">進貨單</div><div class="col-md-12"><div class="col-md-12"><div class="col-md-5">進貨單號：<span class="t01">IMP1810080001</span></div><div class="col-md-4"></div><div class="col-md-3">進貨日期：<span class="t02">2018/10/08</span></div></div><div class="col-md-12"><div class="col-md-5">廠商代號：<span class="t03">6664166 YOKO</span></div><div class="col-md-4">統一編號：<span class="t04">mark    </span></div><div class="col-md-3">採購單號：<span class="t05">PUR1810080001</span></div></div><div class="col-md-12"><div class="col-md-5">連絡人員：<span class="t06">0911222333</span></div><div class="col-md-4">連絡電話：<span class="t07">0922333444</span></div><div class="col-md-3">傳真電話：<span class="t08">021234568 </span></div></div><div class="col-md-12"><div class="col-md-9">發票地址：<span class="t09">IVDR</span></div><div class="col-md-3">製表日期：<span class="t10">2018/10/08</span></div></div><div class="col-md-12"><div class="col-md-9">工廠地址：<span class="t11">ADR</span></div><div class="col-md-3">製表人員：<span class="t12">MIS 管理員</span></div></div><div class="col-md-12"><div class="col-md-5">採購人員：<span class="t13">GTLWEB 綠色隧道</span></div><div class="col-md-4">門市代號：<span class="t14">120 北極</span></div><div class="col-md-3">歸帳月份：<span class="t15">2018/12</span></div></div></div><div class="col-md-12"><table class="table InTable T2 table-hover"> <!-- table-bordered  table-hover--><thead class="OrThead"><tr><th>項次</th><th>商品編號</th><th>商品名稱</th><th>稅別</th><th>數量</th><th>單位</th><th>單價</th><th>金額</th></tr></thead><tbody><tr><td class="n1">1</td><td class="n1">001001001</td><td class="n1">001測試用</td><td class="n1">含稅</td><td class="n6">30.00</td><td class="n1">G</td><td class="n6">60.2522</td><td class="n6">1807.5660</td></tr></tbody></table></div><div class="PEnd col-md-12"><div class="col-md-1 PEDT"><b>備註</b></div><div class="col-md-6 PED"><div class="PEDE col-md-6">課稅類別：<span class="a01">應稅</span></div><div class="PEDE col-md-6">發票日期：<span class="a02">2018/10/08</span></div><div class="PEDE col-md-6">發票聯式：<span class="a03">三聯式&amp;電子計算機發票</span></div><div class="PEDE col-md-6">發票號碼：<span class="a04">AA12345678</span></div><div class="PEDE col-md-6">備　　註：<span class="a05"></span></div></div><div class="col-md-5 PEA"><div class="PEAC col-md-6"><div class="col-md-5">未稅金額</div><div class="col-md-7"><span class="b01">1,721</span></div></div><div class="PEAC col-md-6"><div class="col-md-5">稅　　額</div><div class="col-md-7"><span class="b02">86</span></div></div><div class="PEAC col-md-6"></div><div class="PEAC col-md-6"><div class="col-md-5">合計金額</div><div class="col-md-7"><span class="b03">1,808</span></div></div>   </div></div><div class="col-md-1-5">核准：</div><div class="col-md-1-5">覆核：</div><div class="col-md-1-5">驗收：</div><div class="col-md-1-5">使用單位：</div><div class="col-md-1-5">財務：</div></div>';

    $.each(jqelm, function(index, item) {
        var html_content = document.getElementsByClassName(elm)[index].innerHTML;

        if (index == 0) {
            value = value + html_content;
            // value = '<div class="mdD p11 col-md-12">'+ value + '</div>' + html_content;
        } else {
            value = value + pages + html_content;
            // value = '<div class="mdD p11 col-md-12">'+ value + '</div>' + pages + html_content;
        }
    });

    var printPage = window.open("", "Printing...", "");
    printPage.document.open();
    printPage.document.write("<html><head>" + style + "<script>function step1(){setTimeout('step2()', 10);}function step2(){window.print();window.close()}</script></head><body onload='step2()'>");
    printPage.document.write("<pre>");
    // printPage.document.write(value);
    printPage.document.write('<div class="col-md-12">' + value + '</div>');
    printPage.document.write("</pre>");
    printPage.document.close("</body></html>");

}

//--------------------操作log檔--------------------
//uid->操作者 , file -> 透過哪個php , type -> php中的type , data -> 儲存內容 , st -> 狀態(可有可無)
jQuery.SaveLog = function(uid, file, type, data, st) {
    $.ajax({
        url: 'php/SaveLog.php',
        method: 'POST',
        dataType: 'html',
        data: {
            uid: uid,
            file: file,
            type: type,
            data: data,
            st: st
        }
    }).fail(function(err) {
        console.log(err);
    }).done(function(res) {

    });
}


//--------------------下載--------------------
//txt無法使用window.location.href
jQuery.downloadF = function(url) {
    var a = window.open(url, "111", "height=0,width=0, top=100 left=50 toolbar=no,menubar=no,scrollbars=no,resizable=on,location=no,status=no");

    a.document.execCommand("SaveAs");

    a.window.close();

    a.close();
}


//-----------------計算Object 長度------------
jQuery.Objectsize = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}


//-----------------時間切割------------n=10
jQuery.TCut = function(str, n) {
    nd = n;
    if (!n) {
        nd = 10;
    }
    return str.substr(0, nd);
}


//-------------檢查為英文數字----------
jQuery.CheckEN = function(str) {
        var regExp = /^[\d|a-zA-Z]+$/;
        if (regExp.test(str))
            return true;
        else
            return false;
    }
    //-------------檢查為英數混合8-20碼----------
jQuery.CheckENCH = function(str) {
        var regExp = /^(?!.*[^a-zA-Z0-9])(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/;
        if (regExp.test(str))
            return true;
        else
            return false;
    }
    //-------------僅可輸入數字，keyup驗證，非數字移除----------
jQuery.ValidateNumberKeyup = function(e, pnumber) {
        if (!/^\d+$/.test(pnumber)) {
            $(e).val(/^\d+/.exec($(e).val()));
        }
        return false;
    }
    //-------------Tab修改----------
jQuery.ChangeTab = function(str) {
        $("title").text("POS-" + str);
    }
    //-------------外部IP取得----------
jQuery.GetInternetIP = function() {
    let Internet_IP = "";

    //同步執行
    $.ajaxSettings.async = false;

    //ipapi
    let ip1 = $.getJSON('https://ipapi.co/json/', function(data) {
        // IP_Data = JSON.stringify(data, null, 2);
        if (data.ip) {
            Internet_IP = data.ip;
        }
    });
    //設置timeout
    setTimeout(function() { ip1.abort(); }, 3000);

    //GeoIPLookup.io
    let ip2 = $.getJSON('https://json.geoiplookup.io/?callback=?', function(data) {
        if (data.ip) {
            Internet_IP = data.ip;
        }
    });
    //設置timeout
    setTimeout(function() { ip2.abort(); }, 3000);

    //ipinfo.io
    let ip3 = $.getJSON('https://ipinfo.io/json', function(data) {
        if (data.ip) {
            Internet_IP = data.ip;
        }
    });
    //設置timeout
    setTimeout(function() { ip3.abort(); }, 3000);

    //非同步執行
    $.ajaxSettings.async = true;

    return Internet_IP;
}

//--------------------發票檢查--------------------
//SNO->門市, syear->年度(西元) , pdate->期別(1~6)
jQuery.IVCheck = function(SNO, syear, pdate) {
    try {
        $.ajax({
            url: 'php/IVCheck.php',
            method: 'POST',
            dataType: 'json',
            beforeSend: function() {
                $.blockUI({ message: null });
                $('.SearchG').show();
            },
            data: {
                SNO: SNO,
                SYear: syear,
                pdate: pdate
            }
        }).fail(function(err) {
            console.log(err);
        }).done(function(res) {
            console.log(res);
            $('.CheckD').html(""); //清空

            let da = res['dt'];

            if (da[0]['status'] != 'N') {
                var LMarkStr = ""; //警告
                //MNO排序
                da.sort(function(a, b) {
                    return parseInt(a['data']["MNO"]) > parseInt(b['data']["MNO"]) ? 1 : parseInt(a["MNO"]) == parseInt(b["MNO"]) ? 0 : -1;
                });

                let show_txt = ""; //顯示內容
                let total_CCC = 0; //總開立
                let E_Mark = 0; //異常數量
                for (var i = 0; i < da.length; i++) {
                    if (i != 0) {
                        show_txt += "<br/>";
                    }
                    let sta = da[i].status; //狀態  S-正常，Q-沒交易，D異常
                    let mno = da[i]['data'].MNO; //機台
                    let cname = da[i]['data'].CNAME; //機台


                    let sta_name = ""; //狀態顯示
                    switch (sta) {
                        case "S":
                        case "D":
                            if (sta == "S") {
                                sta_name = "正常";
                            } else if (sta == "D") {
                                sta_name = "<span style='color:red;'>異常</span>";
                                LMarkStr += mno + "內容異常" + '\n';
                                E_Mark++;
                            }

                            let FIV = da[i]['data']['FIV'].tm01; //起號
                            let FIVT = $.TCut(da[i]['data']['FIV']['tm28'].date, 19); //時間
                            let LIV = da[i]['data']['LIV'].tm01; //迄號
                            let LIVT = $.TCut(da[i]['data']['LIV']['tm28'].date, 19); //時間
                            let LM = da[i]['data']['LIV'].tm17; //最後戳記-1
                            let LM2 = ""; //最後戳記-2
                            if (LM != false) {
                                LM2 = LM.substr(0, 4);
                            }
                            //狀態
                            //無標記 	-> 付款別備註 or 無標記 (2020/05修正為無標記)
                            //定時上傳   -> 定時上傳
                            //手動上傳	-> 收銀員
                            //跨日上傳   -> 跨日自動上傳
                            //結束系統	-> 結束系統
                            //手動標記	-> 人工檢查
                            if (LM == '付款別備註' || LM == '無標記' || LM2 == '定時上傳') { //手動標記->人工檢查
                                LMarkStr += mno + "最後一筆上傳異常" + '\n';

                                LM = "<span style='color:red;'id='lm" + i + "'>" + LM + "</span>";
                                sta_name = "<span style='color:red;'id='sta" + i + "'>上傳異常" + "　　　　" + "<button type='button' class='btn btn-primary btn-sm' onclick='$.IVErrorComfirm(`" + LIV + "`,`" + LIVT + "`,`" + i + "`,`" + sta + "`)'>上傳異常確認</button></span>";
                                E_Mark++;
                            }
                            let CCC = da[i]['data'].CCC; //總數量
                            total_CCC += CCC;

                            let mi_C = 0; //配號數量

                            show_txt += "機　　台：" + mno + "(" + cname + ")" + " - " + sta_name + "<br/>";
                            show_txt += "<br/>";
                            let Cashier = "";
                            $.each(da[i]['data']['Cashier'], function(n, value) {
                                Cashier += value.tm26 + " . ";
                            });
                            show_txt += "收 銀 員：" + Cashier + "<br/>";
                            show_txt += "<br/>";
                            show_txt += "交易起號：" + FIV + " 、 " + "時間：" + FIVT + "<br/>";
                            show_txt += "交易迄號：" + LIV + " 、 " + "時間：" + LIVT + " 、 " + "最後戳記：" + LM + "<br/>";
                            show_txt += "<br/>";
                            show_txt += "交易數量：" + $.FormatNumber(CCC) + "<br/>";
                            show_txt += "<br/>";
                            show_txt += "*********************************" + "<br/>";
                            $.each(da[i]['data']['mi'], function(n, value) {
                                let mi_F = value.mi07 + value.mi08; //配號起號
                                let mi_L = value.mi07 + value.mi09; //配號迄號
                                mi_C += value.mi09 - value.mi08 + 1;

                                show_txt += "配號起號：" + mi_F + " 、 " + "配號迄號：" + mi_L + "<br/>";
                            });

                            show_txt += "<br/>";
                            show_txt += "配號數量：" + $.FormatNumber(mi_C) + "<br/>";
                            show_txt += "<br/>";
                            show_txt += "*********************************" + "<br/>";

                            if (sta == "D") {
                                show_txt += "異常號碼&日期如下(約略)" + "<br/>";
                                for (var j = 0; j < da[i]['detail'].length; j++) {
                                    let txt = da[i]['detail'][j]['type'];
                                    switch (txt) {
                                        case "IV":
                                            txt = "號碼";
                                            break;
                                        case "TD":
                                            txt = "明細";
                                            break;
                                        case "CP":
                                            txt = "票券";
                                            break;
                                        default:
                                            txt = "???";
                                            break;
                                    }
                                    show_txt += "(" + (j + 1) + ") " + da[i]['detail'][j].iv + " - " + da[i]['detail'][j].day + " - " + txt + "<br/>";
                                }
                                show_txt += "*********************************" + "<br/>";
                            }


                            show_txt += "----------------------------------------------------------------" + "<br/>";
                            break;

                        case "Q":
                            let mi_C2 = 0; //配號數量
                            sta_name = "<span style='color:blue;'>沒有交易</span>";

                            show_txt += "機　　台：" + mno + "(" + cname + ")" + " - " + sta_name + "<br/>";
                            show_txt += "<br/>";
                            show_txt += "*********************************" + "<br/>";
                            $.each(da[i]['data']['mi'], function(n, value) {
                                let mi_F = value.mi07 + value.mi08; //配號起號
                                let mi_L = value.mi07 + value.mi09; //配號迄號
                                mi_C2 += value.mi09 - value.mi08 + 1;

                                show_txt += "配號起號：" + mi_F + " 、 " + "配號迄號：" + mi_L + "<br/>";
                            });

                            show_txt += "<br/>";
                            show_txt += "配號數量：" + $.FormatNumber(mi_C2) + "<br/>";
                            show_txt += "<br/>";
                            show_txt += "*********************************" + "<br/>";
                            show_txt += "----------------------------------------------------------------" + "<br/>";
                            break;
                    }



                }


                if (res['total_mi']['sp'].st == 'Y') {
                    let mi_sp1 = res['total_mi']['sp']['da'].mi07 + res['total_mi']['sp']['da'].mi08;
                    let mi_sp2 = res['total_mi']['sp']['da'].mi07 + res['total_mi']['sp']['da'].mi09;
                    let mi_sp_C = res['total_mi']['sp']['da'].mi09 - res['total_mi']['sp']['da'].mi08 + 1;

                    show_txt += "剩餘配號：" + mi_sp1 + " - " + mi_sp2 + " 、 數量：" + mi_sp_C + "<br/>";
                    show_txt += "<br/>";
                    show_txt += "----------------------------------------------------------------" + "<br/>";
                }

                show_txt += "<br/>";
                let total_mi01 = res['total_mi'].mi01;
                let total_mi02 = res['total_mi'].mi02;
                let total_mi_c = res['total_mi'].mi_CC;
                show_txt += "總配號起號：" + total_mi01 + " 、 " + "總配號迄號：" + total_mi02 + "<br/>";
                show_txt += "<br/>";
                show_txt += "總配號數量：" + $.FormatNumber(total_mi_c) + " 、 " + "交易數量：" + $.FormatNumber(total_CCC) + " 、 " + "異常數量：" + E_Mark + "<br/>";

                $('.CheckD').html(show_txt);
                $('.CheckD').show();

                if (LMarkStr != "") {
                    alert(LMarkStr);
                }
            }



        }).always(function() {
            $.unblockUI();
            $('.SearchG').hide();
        });
    } catch (ex) {
        console.log("catch");
    }

}

//--------------------發票上傳異常確認--------------------------------------------
jQuery.IVErrorComfirm = function(LIV, LIVT, i, sta2) {
    let con = confirm('如確定發票號碼無誤請按確認，否則請取消');
    if (con) {
        $.ajax({
            url: 'php/IVConfirm.php',
            method: 'POST',
            dataType: 'json',
            data: {
                LIV: LIV,
                LIVT: LIVT
            }
        }).fail(function(e) {
            console.log(e);
        }).done(function(res) {
            let sta = res['status']; //php狀態
            if (sta == 'S') {
                if (sta2 == 'S') { //資料狀態(D:資料異常 S:正常or上傳異常)
                    $('#sta' + i).html("正常");
                    $('#sta' + i).attr('style', "color:black;");
                    $('#lm' + i).html(res['tm17']);
                    $('#lm' + i).attr('style', "color:black;");
                } else if (sta2 == 'D') {
                    $('#sta' + i).html("異常");
                    $('#lm' + i).html(res['tm17']);
                    $('#lm' + i).attr('style', "color:black;");
                }
                alert("發票已確認，全部資料核對完畢後請再重新搜尋進行二次確認");
            } else if (sta == 'E') {
                alert("發生錯誤");
            }
        });
    }
}
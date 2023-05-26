<?php
    
    include('connect_Base.php');    //conn3
    
    include('filter.php');

    date_default_timezone_set('Asia/Taipei'); 
	$now = date("Ymd H:i:s");
    
    $uid = filter($_POST['uid']);
    $url = filter($_POST['url']);
    $IP = getIP();

    $sql = "INSERT INTO [Base].[dbo].[VLog](vl01,vl02,vl03,vl04) VALUES(?,?,?,?)";
    $params = array($uid,$url,$now,$IP);
    sqlsrv_query( $conn3, $sql, $params);
                        



    function getIP() {
		return isset($_SERVER["HTTP_X_FORWARDED_FOR"])?$_SERVER["HTTP_X_FORWARDED_FOR"]
		:(isset($_SERVER["HTTP_CLIENT_IP"])?$_SERVER["HTTP_CLIENT_IP"]
		:$_SERVER["REMOTE_ADDR"]);
	}

	include('connect_Close.php');//Close All Connecttion
?>
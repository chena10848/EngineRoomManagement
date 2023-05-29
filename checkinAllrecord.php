<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en" >
<head >

    <?php include("html/head.html");?>


    <!-- 銷售排序css -->
    <link href='css/checkinAllrecord/checkinAllrecord.css?v=<?php echo microtime();?>' rel='stylesheet'>
    <link href='css/checkinAllrecord/printRecord.css?v=<?php echo microtime();?>' rel='stylesheet'>

    <!-- 銷售排序js -->
    <script src='js/checkinAllrecord/checkinAllrecord.js?v=<?php echo microtime();?>'></script>

</head>

<body>

    <?php

        $exists_group = true;  

        if(isset($_SESSION['A0002']) == false) echo "<script type = 'text/javascript'> window.location.href = 'login.php'; </script>" ;
        if($_SESSION['A0002'] == 0) $exists_group = false;
        if(!$exists_group) {
            echo "<script> alert('無權限開啟此程式，請聯絡管理人員，謝謝。'); </script>" ;
            echo "<script type = 'text/javascript'> window.location.href = 'index.php'; </script>" ;
        }
    ?>

    <!-- topbar starts -->
     <?php include("html/topbar.php");?>
    <!-- topbar ends -->
    <div class="ch-container" >
        <div class="row">

            <!-- left menu starts -->
            <?php include("html/side.html");?>
            <!-- left menu ends -->



            <?php include("html/checkinAllrecord/checkinAllrecord.html");?>


            <!-- <?php include("inner/footer.html");?> -->


    </div>


</body>
</html>

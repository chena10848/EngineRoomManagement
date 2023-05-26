<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en" >
<head >

    <?php include("html/head.html");?>


    <!-- 銷售排序css -->
    <link href='css/checkinrecord/checkinrecord.css?v=<?php echo microtime();?>' rel='stylesheet'>

    <!-- 銷售排序js -->
    <script src='js/checkinrecord/checkinrecord.js?v=<?php echo microtime();?>'></script>

</head>

<body>
    <?php

    $exists_group = true;  


    if($_SESSION['A0001'] == 0) $exists_group = false;
    if(!$exists_group) {
        echo "<script> alert('無權限開啟此程式，請聯絡管理人員，謝謝。'); </script>" ;
        echo "<script type = 'text/javascript'> window.location.href = 'index.php'; </script>" ;
    }
    ?>
    <!-- topbar starts -->
     <?php include("html/topbar.php");?>
    <!-- topbar ends -->
    <div class="ch-container" data-p="<?php echo $p;?>">
        <div class="row">

            <!-- left menu starts -->
            <?php include("html/side.html");?>
            <!-- left menu ends -->



            <?php include("html/checkinrecord/checkinrecord.html");?>


            <!-- <?php include("inner/footer.html");?> -->


    </div>


</body>
</html>

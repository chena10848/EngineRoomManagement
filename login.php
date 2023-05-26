
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>南仁湖機房管制系統</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Charisma, a fully featured, responsive, HTML5, Bootstrap admin template.">
    <meta name="author" content="Muhammad Usman">
    <?php include("html/head.html");?>
    <link href='css/login/login.css?v=<?php echo microtime();?>' rel='stylesheet'>
    <script src='js/login/login.js?v=<?php echo microtime();?>'></script>
</head>
<body class="text-center">
    <main class="form-signin">
        <img class="mb-4" src="./images/logo.png" alt="" >
        <h1 class="h3 mb-3 fw-normal">機房管制系統</h1>
        
        <div class="form-floating" style="padding-top: 1px;text-align: left;">
            <label for="floatingInput">帳號</label>
            <input type="account" class="form-control" id="floatingInput" placeholder="account">
        </div>

        <div class="form-floating" style="padding-top: 10px;text-align: left;">
            <label for="floatingPassword">密碼</label>
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        </div>
       <div class="checkbox mb-3">
       </div>
       <button class="w-100 btn btn-lg btn-primary" id="login">登入</button>
        <p class="mt-5 mb-3 text-muted">© 2023  NanRenHu</p>
    </main>
</body>

</html>
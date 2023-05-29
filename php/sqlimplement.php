<?php
	require 'connectdb.php';
	session_start();
?>

<?php
    date_default_timezone_set('Asia/Taipei');
	$today = date("Y-m-d H:i:s");//當下時間
    $type = $_POST['type'];

    switch($type){
        case 'login':

            $account = $_POST['account'];
			$password = md5($_POST['password']);

			$res = array();
			try{
				
				$sql = "SELECT * FROM User WHERE us01 = :t1 AND us02 = :t2 AND us13 = '1'";
				$stmt = $pdo->prepare($sql);
				$stmt->execute(array(":t1" => $account , ":t2" => $password));
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

				
			    $res['data'] = $rows;

                if(Count($rows) > 0){

					$_SESSION['ID'] = $rows[0]['us03'];
					$_SESSION['Name'] = $rows[0]['us04'];
					$_SESSION['Group'] = $rows[0]['us05'];

					$sql = "SELECT * FROM groups WHERE gp01 = :gp01";
					$stmt = $pdo->prepare($sql);
					$stmt->execute(array(":gp01" => $rows[0]['us05'] ));
					$rowss = $stmt->fetchAll(PDO::FETCH_ASSOC);
	
					for ($i=0; $i < Count($rowss); $i++) { 
						$_SESSION[$rowss[$i]['gp02']] = $rowss[$i]['gp03'];
					}
					
                    $res['status'] = "Y";

                }else{
                    $res['status'] = "E";
                }

			}catch (Exception $e) {
				$res['status'] = "E";
			    $res['err'] = $e;
			}

			echo json_encode($res);
            break;
        case 'checkinrecord':

			$id = $_SESSION['ID'];
            $startDate = $_POST['startDate'] . ' 00:00:00';
            $endDate = $_POST['endDate'] . ' 23:59:59';

            $res = array();

            try{
				
				$sql = "SELECT * FROM Checkinrecord INNER JOIN User ON Checkinrecord.cr01 = User.us03 WHERE cr01 like :t1 AND cr02 BETWEEN :t2 AND :t3 AND us13 = '1'";
				$stmt = $pdo->prepare($sql);
				$stmt->execute(array(":t1" => $id , ":t2" => $startDate , ":t3" => $endDate));
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

				
			    $res['data'] = $rows;

			}catch (Exception $e) {
			    $res['err'] = $e;
			}

			echo json_encode($res);
            break;
		
        case 'checkinAllrecord':

            $startDate = $_POST['startDate'] . ' 00:00:00';
            $endDate = $_POST['endDate'] . ' 23:59:59';

            $res = array();

            try{
				
				$sql = "SELECT usa.us03 as us03,usa.us04 as us04,cr02,cr03,cr04,cr05,cr06,cr07,cr08,usb.us03 as usb03,usb.us04 as usb04 FROM Checkinrecord INNER JOIN User as usa ON Checkinrecord.cr01 = usa.us03 INNER JOIN User as usb ON cr07 = usb.us03 WHERE cr02 BETWEEN :t2 AND :t3 AND usa.us13 = '1'";
				$stmt = $pdo->prepare($sql);
				$stmt->execute(array(":t2" => $startDate , ":t3" => $endDate));
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

				
			    $res['data'] = $rows;

			}catch (Exception $e) {
			    $res['err'] = $e;
			}

			echo json_encode($res);
            break;

		case 'recordUpdate':
			$data = $_POST['data'];

			$res = array();

            try{
				$pdo->beginTransaction();
				$result = true;

				for ($i=0; $i < Count($data); $i++) { 

					$sql = "UPDATE Checkinrecord SET cr03=:cr03,cr04=:cr04,cr05=:cr05 WHERE cr02 = :cr02";
					$input = array(':cr03' => $data[$i]['outEngine'], ':cr04' => $data[$i]['reason'],':cr05' => $data[$i]['datetime'],':cr02' => $data[$i]['inEngine']);
	
					$stmt = $pdo->prepare($sql);
					$statement = $stmt->execute($input);
					
					if(!$statement){
						$result = false;
					}
				}


				if ($result) {
					$pdo->commit();
					$res['status'] = "Y";
				}else{
					$pdo->rollback();
				}

			}catch (Exception $e) {
			    $res['err'] = $e;
			}
			
			echo json_encode($res);


			break;
		case 'userData':
			$id = $_SESSION['ID'];

			$res = array();
			try{
				$sql = "SELECT us01,us03,us04,us05,us06,us07,us08 FROM User WHERE us03 = :t1";
				$stmt = $pdo->prepare($sql);
				$stmt->execute(array(":t1" => $id));
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

				
			    $res['data'] = $rows;

                if(Count($rows) > 0){
                    $res['status'] = "Y";

                }else{
                    $res['status'] = "E";
                }

			}catch (Exception $e) {
				$res['status'] = "E";
			    $res['err'] = $e;
			}

			echo json_encode($res);
			break;
		case 'updateUser':

			$id = $_SESSION['ID'];
			$userGender = $_POST['userGender'];
			$userBirthday = $_POST['userBirthday'] ." 00:00:00";
			$userEmail = $_POST['userEmail'];
			$result = true;

			try{
				$pdo->beginTransaction();
				$sql = "UPDATE User SET us06=:us06,us07=:us07,us08=:us08,us11=:us11,us12=:us12 WHERE us03 = :us03";
				$input = array(':us06' => $userGender, ':us07' => $userBirthday,':us08' => $userEmail,':us11' => $today,':us12' => $id,':us03' => $id);
				
				$stmt = $pdo->prepare($sql);
				$statement = $stmt->execute($input);

				if(!$statement){
					$result = false;
				}

				if ($result) {
					$pdo->commit();
					$res['status'] = "Y";
				}else{
					$pdo->rollback();
				}
			}catch (Exception $e) {
				$res['err'] = $e;
			}

			echo json_encode($res);

			break;
		case 'updateNewpassword':
			$id = $_SESSION['ID'];
			$newPassword = MD5($_POST['newPassword']);
			$result = true;

			try{
				$pdo->beginTransaction();
				$sql = "UPDATE User SET us02=:us02,us11=:us11,us12=:us12 WHERE us03 = :us03";
				$input = array(':us02' => $newPassword,':us11' => $today,':us12' => $id,':us03' => $id);
				
				$stmt = $pdo->prepare($sql);
				$statement = $stmt->execute($input);

				if(!$statement){
					$result = false;
				}

				if ($result) {
					$pdo->commit();
					$res['status'] = "Y";
				}else{
					$pdo->rollback();
				}
			}catch (Exception $e) {
				$res['err'] = $e;
			}

			echo json_encode($res);

			break;
			case 'groupTablehead':
				$res = array();
	
				try{
					$sql = "SELECT ph01,ph02 FROM Programhead";
					$stmt = $pdo->prepare($sql);
					$stmt->execute();
					$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	
					
					$res['data'] = $rows;
					$res['status'] = "Y";
	
					
				}catch (Exception $e) {
					$res['status'] = "E";
					$res['err'] = $e;
				}
	
				echo json_encode($res);
	
				break;
	
		case 'groupTablebody':
			$res = array();

			try{
				$sql = "SELECT * FROM Programjoin INNER JOIN Programhead ON Programjoin.pj01 = Programhead.ph01 INNER JOIN Programbody ON Programjoin.pj02 = Programbody.pb01";
				$stmt = $pdo->prepare($sql);
				$stmt->execute();
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

				
			    $res['data'] = $rows;
				$res['status'] = "Y";

                
			}catch (Exception $e) {
				$res['status'] = "E";
			    $res['err'] = $e;
			}

			echo json_encode($res);

			break;
		case 'groupPermissionshead':
			$res = array();

			try{
				$sql = "SELECT * FROM permissions";
				$stmt = $pdo->prepare($sql);
				$stmt->execute();
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

				
			    $res['data'] = $rows;
				$res['status'] = "Y";

                
			}catch (Exception $e) {
				$res['status'] = "E";
			    $res['err'] = $e;
			}

			echo json_encode($res);


			break;
		case 'groupPermissions':
			$res = array();

			try{
				$sql = "SELECT * FROM permissions INNER JOIN Groups ON permissions.ps01 = Groups.gp01";
				$stmt = $pdo->prepare($sql);
				$stmt->execute();
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
					
				$res['data'] = $rows;
				$res['status'] = "Y";
					
			}catch (Exception $e) {
				$res['status'] = "E";
				$res['err'] = $e;
			}
				echo json_encode($res);
					break;
		case 'newSubmitgroup':
			$number = $_POST['number'];
			$name = $_POST['name'];
			$status = $_POST['status'];
			$departmentUser = $_POST['departmentUser'];
			$submitGroup = $_POST['submitGroup'];
			$id = $_SESSION['ID'];

			$result = true;

			try {
				$pdo->beginTransaction();
			
				$sql = "INSERT INTO permissions (ps01, ps02, ps03, ps04, ps05) VALUES (:ps01, :ps02, :ps03, :ps04, :ps05)";
				$input = array(':ps01' => $number, ':ps02' => $name, ':ps03' => $status, ':ps04' => $today, ':ps05' => $id);
			
				$stmt = $pdo->prepare($sql);
				$statement = $stmt->execute($input);
			
				if (!$statement) {
					throw new Exception("Error executing permission insert query");
				}
			
				for ($i = 0; $i < count($submitGroup); $i++) {
					$sql = "INSERT INTO Groups (gp01, gp02, gp03, gp04, gp05) VALUES (:gp01, :gp02, :gp03, :gp04, :gp05)";
					$statusBool = '';
					if($submitGroup[$i]['bodyStatus'] == 0){
						$statusBool = false;
					}else{
						$statusBool = true;
					}

					$input = array(':gp01' => $number, ':gp02' => $submitGroup[$i]['bodyNumber'], ':gp03' => $statusBool, ':gp04' => $today, ':gp05' => $id);
			
					$stmt = $pdo->prepare($sql);
					$statement = $stmt->execute($input);
			
					if (!$statement) {
						throw new Exception("Error executing group insert query");
					}
				}

				$sql = "INSERT INTO departmenthead (dh01, dh02, dh03, dh04) VALUES (:dh01, :dh02, :dh03, :dh04)";
				$input = array(':dh01' => $number, ':dh02' => $departmentUser, ':dh03' => $today, ':dh04' => $id);
			
				$stmt = $pdo->prepare($sql);
				$statement = $stmt->execute($input);
			
				if (!$statement) {
					throw new Exception("Error executing departmenthead insert query");
				}

			
				$pdo->commit(); 
				$res['status'] = "Y";
			} catch (Exception $e) {
				$pdo->rollback(); 
				$res['status'] = "E";
				$res['err'] = $e->getMessage();
			}

			echo json_encode($res);

			break;
		case 'editSunmitgroup':
			$edit  = $_POST['edit'];
			$number = $_POST['number'];
			$id = $_SESSION['ID'];

			try {
				$pdo->beginTransaction();
				
				if(!empty($edit[0]['head'])){

					for ($i=0; $i < Count($edit[0]['head']); $i++) { 

						$sql = "UPDATE permissions SET ps02=:ps02,ps03=:ps03,ps06=:ps06,ps07=:ps07 WHERE ps01=:ps01";
						$input = array(':ps02' => $edit[0]['head'][$i]['headName'], ':ps03' => $edit[0]['head'][$i]['headStatus'], ':ps06' => $today, ':ps07' => $id, ':ps01' => $number);
					
						$stmt = $pdo->prepare($sql);
						$statement = $stmt->execute($input);
					
						if (!$statement) {
							throw new Exception("Error executing permission update");
						}

						$sql = "UPDATE departmenthead SET dh02=:dh02,dh05=:dh05,dh06=:dh06 WHERE dh01=:dh01";
						$input = array(':dh02' => $edit[0]['head'][$i]['departmentUser'], ':dh05' => $today, ':dh06' => $id, ':dh01' => $number);
					
						$stmt = $pdo->prepare($sql);
						$statement = $stmt->execute($input);
					
						if (!$statement) {
							throw new Exception("Error executing departmenthead update");
						}
					}
				}

				if(!empty($edit[0]['body'])){

					for ($i = 0; $i < count($edit[0]['body']); $i++) {
						$status = '';

						if($edit[0]['body'][$i]['programStatus'] == 0){
							$status = false;
						}else{
							$status = true;
						}

						$sql = "UPDATE Groups SET gp03=:gp03,gp06=:gp06,gp07=:gp07 WHERE gp01=:gp01 AND gp02=:gp02";
						$input = array(':gp03' => $status, ':gp06' => $today, ':gp07' => $id, ':gp01' => $number, ':gp02' => $edit[0]['body'][$i]['programNumber']);
				
						$stmt = $pdo->prepare($sql);
						$statement = $stmt->execute($input);
				
						if (!$statement) {
							throw new Exception("Error executing group update");
						}
					}
				}
				
				$pdo->commit(); 
				$res['status'] = "Y";
			} catch (Exception $e) {
				$pdo->rollback(); 
				$res['status'] = "E";
				$res['err'] = $e->getMessage();
			}

			echo json_encode($res);
			break;
		case 'GetUserData':

			$res = array();

			try{
				$sql = "SELECT us01,us03,us04,us05,ps02,us06,us07,us08,us09,us10,us11,us12,us13 FROM User INNER JOIN permissions ON us05 = ps01";
				$stmt = $pdo->prepare($sql);
				$stmt->execute();
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

				$res['data'] = $rows;
				$res['status'] = "Y";
					
			}catch (Exception $e) {
				$res['status'] = "E";
				$res['err'] = $e;
			}
			
			echo json_encode($res);

			break;
		case 'insertUser':
			$user = $_POST['data'];
			$id = $_SESSION['ID'];

			try {
				$pdo->beginTransaction();

				for ($i=0; $i < Count($user); $i++) { 

					if($user[$i]['birthday'] == '') $birthday = '0000-00-00';
					$status = $user[$i]['status'] == 0 ? false : true;


					$sql = "INSERT INTO user (us01, us02, us03, us04, us05, us06, us07, us08, us09, us10, us13) VALUES (:us01, :us02, :us03, :us04, :us05, :us06, :us07, :us08, :us09, :us10, :us13)";
					$input = array(':us01' => $user[$i]['account'], ':us02' => MD5($user[$i]['password']), ':us03' => $user[$i]['employeeId'], ':us04' => $user[$i]['name'], ':us05' =>$user[$i]['department'] ,':us06' => $user[$i]['gender'] ,':us07' => $birthday,':us08' => $user[$i]['mail'] ,':us09' => $today ,':us10' => $id ,':us13' => $status);
			
					$stmt = $pdo->prepare($sql);
					$statement = $stmt->execute($input);
			
					if (!$statement) {
						throw new Exception("Error executing permission insert query");
					}	
				}

				$pdo->commit(); 
				$res['status'] = "Y";
			} catch (Exception $e) {
				$pdo->rollback(); 
				$res['status'] = "E";
				$res['err'] = $e->getMessage();
			}	
			echo json_encode($res);

			break;
		case 'updateApi':
			$data = $_POST['data'];
			$user = $_POST['getuser'];
			$sqlStr = "";
			$sqlData = [];
			$id = $_SESSION['ID'];

			try {
				
				if($data[0]['account'] != "") {$sqlStr .= "us01=:us01,"; $sqlData[':us01'] = $data[0]['account'];}
				if($data[0]['password'] != "") {$sqlStr .= "us02=:us02,"; $sqlData[':us02'] = $data[0]['password'];}
				if($data[0]['employeeId'] != "") {$sqlStr .= "us03=:us03,"; $sqlData[':us03'] = $data[0]['employeeId'];}
				if($data[0]['name'] != "") {$sqlStr .= "us04=:us04,"; $sqlData[':us04'] = $data[0]['name'];}
				if($data[0]['department'] != "") {$sqlStr .= "us05=:us05,"; $sqlData[':us05'] = $data[0]['department'];}
				if($data[0]['gender'] != "") {$sqlStr .= "us06=:us06,"; $sqlData[':us06'] = $data[0]['gender'];}
				if($data[0]['birthday'] != "") {$sqlStr .= "us07=:us07,"; $sqlData[':us07'] = $data[0]['birthday'];}
				if($data[0]['mail'] != "") {$sqlStr .= "us08=:us08,"; $sqlData[':us08'] = $data[0]['mail'];}
				if($data[0]['status'] != "") {
					$sqlStr .= "us13=:us13,"; 
					if($data[0]['status'] == '0') $sqlData[':us13'] = false;
					else $sqlData[':us13'] = true;
					
				}


				$sqlData[':us03'] = $user;
				$sqlData[':us11'] = $today;
				$sqlData[':us12'] = $id;

				$pdo->beginTransaction();
				
				$sql = "UPDATE user SET " . $sqlStr . " us11=:us11,us12=:us12 WHERE us03=:us03";
				$input = $sqlData;
				$stmt = $pdo->prepare($sql);
				$statement = $stmt->execute($input);
				
				if (!$statement) {
					throw new Exception("Error executing user update");
				}

				
				$pdo->commit(); 
				$res['status'] = "Y";
			} catch (Exception $e) {
				$pdo->rollback(); 
				$res['status'] = "E";
				$res['err'] = $e->getMessage();
			}

			echo json_encode($res);
			break;
		case 'DepartmentUserData':

			$res = array();

			try{
				$sql = "SELECT * FROM departmenthead INNER JOIN user ON dh02 = us03";
				$stmt = $pdo->prepare($sql);
				$stmt->execute();
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

				$res['data'] = $rows;
				$res['status'] = "Y";
					
			}catch (Exception $e) {
				$res['status'] = "E";
				$res['err'] = $e;
			}
			
			echo json_encode($res);
			break;
		case 'managerReviewgroup':
			$id = $_SESSION['ID'];
			$res = array();

			try{
				$sql = "SELECT * FROM departmenthead INNER JOIN permissions ON dh01 = ps01 WHERE dh02 = '".$id."'";
				$stmt = $pdo->prepare($sql);
				$stmt->execute();
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

				$res['data'] = $rows;
				$res['status'] = "Y";
					
			}catch (Exception $e) {
				$res['status'] = "E";
				$res['err'] = $e;
			}
			echo json_encode($res);
			break;
		case 'SearchDepartmentUser':
			$group = $_POST['group'];
			$startDate = $_POST['startDate'];
			$endDate = $_POST['endDate'];
			$res = array();
			$result = array();
			try{
				$sql = "SELECT * FROM user WHERE us05 = '$group' and us13 = '1'";
				$stmt = $pdo->prepare($sql);
				$stmt->execute();
				$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

				for ($i=0; $i < Count($rows); $i++) { 
					$sql = "SELECT * FROM checkinrecord WHERE cr01 = '" . $rows[$i]['us03'] ."' AND cr02 Between '$startDate' AND '$endDate'";
					$stmt = $pdo->prepare($sql);
					$stmt->execute();
					$resultRows = $stmt->fetchAll(PDO::FETCH_ASSOC);

					$res[$i]['userID'] = $rows[$i]['us03'];
					$res[$i]['userName'] = $rows[$i]['us04'];
					$res[$i]['record'] = $resultRows;
				}

				$result['data'] = $res;
				$result['status'] = "Y";
					
			}catch (Exception $e) {
				$result['status'] = "E";
				$result['err'] = $e;
			}

			echo json_encode($result);

			break;
		case 'updateReview':
			$managerReview = $_POST['managerReview'];
			$id = $_SESSION['ID'];

			try {
				$pdo->beginTransaction();
				


				for ($i=0; $i < Count($managerReview); $i++) { 
					$sql = "UPDATE checkinrecord SET cr06=:cr06,cr07=:cr07,cr08=:cr08 WHERE cr01=:cr01 AND cr02=:cr02";
					$input = array(':cr06' => $managerReview[$i]['status'], ':cr07' => $id, ':cr08' => $managerReview[$i]['managerChangeTime'], ':cr01' => $managerReview[$i]['userID'], ':cr02' => $managerReview[$i]['inEngineroom']);
				
					$stmt = $pdo->prepare($sql);
					$statement = $stmt->execute($input);
				
					if (!$statement) {
						throw new Exception("Error executing permission update");
					}
				}
				
				
				$pdo->commit(); 
				$res['status'] = "Y";
			} catch (Exception $e) {
				$pdo->rollback(); 
				$res['status'] = "E";
				$res['err'] = $e->getMessage();
			}

			echo json_encode($res);


			break;
    }

?>
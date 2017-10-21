<?php
require_once("db_connect.php");
$data=new stdClass();
$request = file_get_contents('php://input');
$obj=json_decode($request,true);

$sql="insert into badminton_score(game_time,data) values(?,?)";
$sth=$db->prepare($sql);
if($sth->execute(array($obj["gametime"],json_encode($obj["data"])))){
    $data->message="success";
    echo json_encode($data);
    exit();
}else{
    $data->error="error inserting score";
    echo json_encode($data);
    exit();

}

?>
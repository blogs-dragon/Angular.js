<?php

//接受客户端提交的订单信息，保存订单，生成订单号，输出执行的结果 以json格式
header('Content-Type:application/json');
//接收客户端提交的数据
$user_name=$_REQUEST['user_name'];
$sex=$_REQUEST['sex'];
$phone=$_REQUEST['phone'];
$addr=$_REQUEST['addr'];
$did=$_REQUEST['did'];
$order_time=time()*1000;
//客户端输入的服务器端校验
if(!isset($user_name) ||!isset($sex)||!isset($phone)||!isset($addr)||!isset($did)){
    $output=[];
    $output["status"]="err";
    $output["msg"]="客户端请求的数据不足！";
    echo json_encode($output);
    return;
}else{

//执行数据库操作
$conn=mysqli_connect('127.0.0.1','root','','kaifanla');
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="INSERT INTO kf_order(user_name,sex,phone,addr,did,order_time) VALUES('$user_name','$sex','$phone','$addr','$did','$order_time')";
$result=mysqli_query($conn,$sql);
$output=[];
if($result){
    $output['status']='succ';
    $output['oid']=mysqli_insert_id($conn);
}else{
    $output['status']='error';
    $output['msg']="数据库访问失败！SQL:$sql";
}
//向客户端输出响应消息主体
$jsonString=json_encode($output);
echo $jsonString;
}
?>
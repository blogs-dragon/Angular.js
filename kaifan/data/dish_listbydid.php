<?php
//根据菜名/原料中的关键字查询菜品，以json格式
header('Content-Type:application/json');
//接收客户端提交的数据
@$did=$_REQUEST['did'];//查询关键字
if(!isset($did)){
  echo '{}';//若客户端未提交did，直接返回一个空json对象，退出当前函数
  return;
}
//一次可以向客户端返回的最大的记录数


//执行数据库操作
$conn=mysqli_connect('127.0.0.1','root','','kaifanla');
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="SELECT did,name,price,material,img_lg,detail FROM kf_dish WHERE did=$did";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);


//向客户端输出响应消息主体
$jsonString=json_encode($row);
echo $jsonString;
?>
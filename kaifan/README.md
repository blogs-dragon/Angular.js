项目:

1.项目功能:

一. 分页列出菜品.

二. 根据菜品名称/原料查询.
三. 根据编号列出某一道菜的详情.
四. 下单
五. 根据电话列出其所下的所有订单.

 main.html需要调用：
dish_listbypage.php		 分页列出菜品
dish_listbykw.php		 根据菜品名称/原料查询
  detail.html需要调用：
dish_listbydid.php		 根据编号列出某一道菜的详情
  order.html需要调用：
order_add.php			 下单
  myorder.html需要调用
order_listbyphone.php	 根据电话列出其所下的所有订单


2.MySQL中的分页查询
SELECT  *  FROM  表名   LIMIT  start, count;
  start：从哪一行开始读取记录
  count：一次最多获取的记录行数


3.MySQL中的模糊查询——LIKE+%
SELECT  *  FROM  表名   WHERE  列名  LIKE  '%关键字%'; 
  %在SQL语句中指代任意多个任意字符


4.MySQL中的跨表查询
  一个查询语句需要从多个表中读取记录
   SELECT ... FROM 表1, 表2  WHERE 表1.列名=表2.列名;

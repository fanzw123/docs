<?php
$p = $_GET['p'];

$conn = @mysql_connect('mysql420.db.sakura.ne.jp',"marukashi-center","y9newz2yn4") || die("服务器连接错误");

mysql_select_db("marukashi-center_heiwa");

$sql = "select * from phbdc_history";


$result = mysql_query($sql);	//资源句柄

//1.获取总记录数

$rowsTotal = mysql_num_rows($result);

//2.指定每页显示的记录数

$pageSize = 20;

//3.获取总页数

$pageTotal = ceil($rowsTotal / $pageSize);


//屏蔽非法页码
if($p == '' || $p < 1) $p = 1;

if(!is_numeric($p)) $p = 1;

if($p >= $pageTotal) $p = $pageTotal;

$p = (int)$p;



//4.计算偏移值

$offset = ($p - 1) * $pageSize;

$sql .=  " limit {$offset},{$pageSize}";


$result = mysql_query($sql);

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>平和不動産 | 管理者専用HOME</title>
<link rel="stylesheet" type="text/css" href="../share/css/style.css" />
<script type="text/javascript" src="../share/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="../share/js/script.js"></script>
</head>
<style type="text/css"> 
table{
border:1px solid #696867;
width:747px;
margin-top:20px;
}
th { 
border:1px solid #696867;
background: #999998; 
font-size:11px; 
padding: 6px 6px 6px 12px; 
color: #3c3b3b; 
} 

td { 
border:1px solid #696867;
background: #fff; 
font-size:11px; 
padding: 6px 6px 6px 12px; 
color: #3c3b3b; 
text-align:center;
} 
</style>
<body class="admin_index">
<div id="main">
<div id="header">
<a href="./" class="logo"><img src="../share/images/logo_admin.png" alt="" /></a>
</div>
<div id="middle">
<div id="left-column">
<h3>物件データ管理</h3>
<ul class="nav">
<li><a href="../buildreg">賃貸（建物）の登録</a></li>
<li><a href="../rentreg">賃貸（土地）の登録</a></li>
<li><a href="../list">賃貸（建物）の一覧</a></li>
<li><a href="../share/php/csvexportbuilding.php">CSVデータ書き出し</a></li>
<li><a href="../list2">賃貸（土地）の一覧</a></li>
<li><a href="../share/php/csvexportrent.php">CSVデータ書き出し</a></li>
</ul>

<h3>ニュース管理</h3>
<ul class="nav">
<li><a href="../newadd">ニュース登録</a></li>
<li><a href="../newlist">ニュース一覧</a></li>
</ul>


<h3>メルマガ登録</h3>
<ul class="nav">
<li><a href="../../public/mail/index.php?s=Index/mailcsv">CSVデータ書き出し</a></li>
</ul>
</div>

<div id="center-column">
<div class="top-bar">
<h1>管理者専用HOME</h1>
</div><br />

<p>物件情報を管理するための管理者専用サイトです。<br />
左記メニューからアクセスしてください。</p>
<table cellspacing="0"> 
<caption> </caption> 
<tr> 
<th scope="col">id</th> 
<th scope="col">page:1.建筑 2.土地</th> 
<th scope="col">action:1.新增2.更新3.删除</th> 
<th scope="col">time</th> 
</tr> 
<?php while($row = mysql_fetch_assoc($result)) {?>
<tr> 
<td class="row"><?php echo $row['id']?></td> 
<td class="row">
	<?php 
		if($row['page']==1){
			echo '建筑';
		}elseif($row['page']==2){
			echo '土地';
		}
	?>
</td> 
<td class="row">
	<?php 
		if($row['action']==1){
			echo '新規';
		}elseif($row['action']==2){
			echo '編集';
		}elseif($row['action']==3){
			echo '削除';
		}
	?>
</td> 
<td class="row"><?php echo $row['time']?>1</td> 
</tr> 
<?php }?>
<tr>
    <td colspan="4">
    <?php
   	if($pageTotal == 1){
		echo("first&nbsp;&nbsp;prev&nbsp;&nbsp;next&nbsp;&nbsp;last");
	} else {
		if($p == 1){
			echo("first&nbsp;&nbsp;prev&nbsp;&nbsp;");
			echo("<a href=\"index.php?p=".($p+1)."\">next</a>&nbsp;&nbsp;");
			echo("<a href=\"index.php?p={$pageTotal}\">last</a>");
		}
		
		if($p == $pageTotal){
			echo("<a href=\"index.php?p=1\">first</a>&nbsp;&nbsp;");
			echo("<a href=\"index.php?p=".($p-1)."\">prev</a>&nbsp;&nbsp;");
			echo("next&nbsp;&nbsp;last");
		}
		
		if($p > 1 && $p < $pageTotal){
			echo("<a href=\"index.php?p=1\">first</a>&nbsp;&nbsp;");
			echo("<a href=\"index.php?p=".($p-1)."\">prev</a>&nbsp;&nbsp;");
			echo("<a href=\"index.php?p=".($p+1)."\">next</a>&nbsp;&nbsp;");
			echo("<a href=\"index.php?p={$pageTotal}\">last</a>");
		}
	}
	?>
    </td>
  </tr>
</table> 

</div>
</div>
<div id="footer"></div>
</div>



</body>
</html>


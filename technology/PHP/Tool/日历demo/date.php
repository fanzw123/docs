<?php   
header("content-type:text/html;charset=utf-8");   
?>   
<meta http-equiv="content-type" content="text/html;charset=utf-8">   
<style>   
form{   
    margin:0px;   
    padding:0px;   
}   
td{   
    text-align:center;   
    width:80px;   
}   
</style>   
<?php   
if(!empty($_GET)){   
    $year = $_GET['year'];   
    $month = $_GET['month'];   
}   
if(empty($year)){   
    $year = date('Y');   
}   
if(empty($month)){   
    $month = date('m');   
}   
$start_weekday = date('w',mktime(0,0,0,$month,1,$year));   	//计算当月一号是星期几
//echo $start_weekday;   
$days = date('t',mktime(0,0,0,$month,1,$year));   
//echo $days;   
$week = array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');   
$i = 0;   
$k = 1;   
$j = 0;   
echo '<table border = "1">';   
echo '<tr><td colspan = 7 style = "text-align:center">'.$year.'年'.$month.'月'.'</td></tr>';   
echo '<tr>';   
for($i = 0;$i < 7;$i++){   
    echo '<td>'.$week[$i].'</td>';   
}   
echo '</tr>';   
echo '<tr>';   
for($j = 0;$j < $start_weekday;$j++){  
    echo '<td style="color:#FFFFFF">'.$j.'</td>';   
}   

while($k <= $days){   
    if($k == date('d')){   
        echo '<td style="color:red">'.$k.'</td>';   
    }else{   
        echo '<td>'.$k.'</td>';   
    }   
   
    if(($j+1) % 7 == 0){   
        echo '</tr><tr>';   
    }   
    $j++;   
    $k++;   
}   
while($j % 7 != 0){   
    echo '<td style="color:#FFFFFF">'.$jzz.'</td>';   
    $j++;   
}   
echo '</tr>';   
  
echo '<tr>';   
echo "<td><a href=?".lastYear($year,$month).">".'<<'.'</a></td>';   
echo "<td><a href=?".lastMonth($year,$month).">".'<'.'</a></td>';   
echo '<td colspan = 3 style = "text-align:center">';   
echo '<form name = "myform" method = "GET">';   
echo '<select name = year >';   
for($start_year = 1970;$start_year<2039;$start_year++){   
 echo '<option value ='. $start_year.'>'.$start_year.'</option>';   
}   
echo '</select>'.'年';   
echo '<select name = month>';   
for($start_month = 1;$start_month<=12;$start_month++){   
 echo '<option value = '.$start_month.'>'.$start_month.'</option>';   
}   
echo '</select>';   
echo '月';   
echo '<input type = "submit" name = "search" value = "查询">';   
echo '</form>';   
echo '</td>';   
echo "<td><a href=?".nextYear($year,$month).">".'>>'.'</a></td>';   
echo "<td><a href=?".nextMonth($year,$month).">".'>'.'</a></td>';   
echo '</tr>';   
echo '</table>';   
  
function lastYear($year,$month){   
 $year = $year-1;   
 return "year=$year&month=$month";   
}   
function lastMonth($year,$month){   
 if($month == 1){   
  $year = $year -1;   
  $month = 12;   
 }else{   
  $month--;   
 }   
 return "year=$year&month=$month";   
}   
function nextYear($year,$month){   
 $year = $year+1;   
 return "year=$year&month=$month";   
}   
function nextMonth($year,$month){   
 if($month == 12){   
  $year = $year +1;   
  $month = 1;   
 }else {   
  $month++;   
 }   
 return "year=$year&month=$month";   
}   
?>
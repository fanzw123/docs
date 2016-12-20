<?php
/*	判断是否为post提交
 * @$value  post提交的值
*/
function isPost($value) {
	//是post提交 ，并且post值存在，或者post值不为空
	if ($_SERVER['REQUEST_METHOD'] == 'POST' && sizeof($value) && !empty($value)) {
		return true;
	} else {
		return false;
	}

}


/*	过滤字符串中出现的html标签
 * $_date str 字符串
* return str
*/
function htmlString ($_date) {
	if (is_array($_date)) {
		foreach ($_date as $_key => $_value) {
			$_string[$_key] =  htmlString($_value);
		}
	} else if (is_object($_date)) {
		foreach ($_date as $_key => $_value) {
			$_string->$_key =  htmlString($_value);
		}
	} else {
		$_string = htmlspecialchars($_date);
	}
	return $_string;//传入的是对象，返回对象、是数组，返回数组、是字符串则返回字符串
}
//把去除了html标签的字符重新加上html标签
function unHtml($_str) {
	return htmlspecialchars_decode($_str);
}


?>
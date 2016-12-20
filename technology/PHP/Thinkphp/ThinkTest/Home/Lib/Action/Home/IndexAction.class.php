<?php
// 本类由系统自动生成，仅供测试用途
//class IndexAction extends CommonAction  //用户模式
class IndexAction extends Action {
	
	//主页
	public function index () {
		
		$this->display();
		
	}
	
	
	//1.验证码
	public function image () {
		import('oRG.Util.Image');
		Image::buildImageVerify();
	}
	
	
	
	//2.分页
	public function page () {	
		import('ORG.Util.Page');
		$Node = M('Node');
	
		$count = $Node->count();
		
		$Page = new Page($count,10);
				
		$map['id'] = array('gt','1');
		$list = $Node->where($map)->limit($Page->firstRow.','.$Page->listRows)->select();
		
		//分页跳转的时候保证查询条件
		foreach ($map as $key => $val) {
			if (!is_array($val)) {
				$Page->parameter .= "$key=" . urlencode($val) . "&";
			}
		}
	
		$Page->setConfig('header','<span style=";">条记录</span>');//设置样式
		$Page->setConfig('prev','上一页');
		$Page->setConfig('next','下一页');
		$Page->setConfig('first','首页');
		$Page->setConfig('last','尾页');
		//替换以后样式到
		$Page->setConfig('theme','共 %totalRow% %header% %nowPage%/%totalPage%  页    %first%  %upPage%  %linkPage%  %downPage%  %end% ');
		
		//$Page->setConfig('theme',' %rowsTotal% %header% %first% %upPage%&nbsp; %linkPage%  跳到%jump%页  %downPage%  %end%');
		
		$this->assign('list',$list);
		$this->assign('page',$Page->show());	//显示分页
		$this->display();
	}
	
	
	//多语言支持
	public function lang() {
		/*	注意事项
		 * 1.配置文件开启多语言支持
		 * 2.配置文件夹下建立tags.php行为文件
		 * 3.在Lang下建立语言包名
		 */
		echo L('PUBLIC_LANG');
		$this->display();
	}
	
	
	//3.文件上传
	public function upload() {			
		if (isPost($_FILES)) {
			if ($info = $this->uploadFile()) {
				dump($info);
			} 
		}
		$this->display();	
	}
	private function uploadFile() {
		import('ORG.Net.UploadFile');
		$upload = new UploadFile();
		//上传检测
		$upload->maxSize  = 3145728 ;									// 设置附件上传大小
		$upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg');		// 上传文件的(后缀)（留空为不限制），
																							// 上传文件的(类型),m（留空为不限制），
		$upload->allowTypes = array ('image/jpeg','image/pjpeg','image/png','image/x-png','image/gif');	
		//上传保存
		$upload->savePath =  'Home/Uploads/images/';			// 设置附件上传目录
		$upload->autoSub = true;												// 是否使用子目录保存上传文件
		$upload->subType = 'date';											// 子目录创建方式，默认为hash，可以设置为hash或者date日期格式的文件夹名
		
		$upload->saveRule =  'uniqid';										// 上传文件的保存规则，必须是一个无需任何参数的函数名
		$upload->autoCheck = true;											// 是否自动检查附件	
		$upload->uploadReplace  = true;									// 存在同名文件是否是覆盖
		//上传图片处理
		$upload->thumb = true;													// 开启图片文件缩略
		$upload->thumbMaxWidth = '100';								// 缩略图的最大宽度，多张图用逗号分隔
		$upload->thumbMaxHeight = '100';								// 缩略图的最大宽度，多张图用逗号分隔
		$upload->thumbPrefix = 's_';											// 缩略图的文件前缀，多张图用逗号分隔
		//$upload->thumbPath = '';										    // 缩略图的保存路径，留空的话取文件上传目录本身
		//$upload->thumbFile = ''												// 指定缩略图的文件名(用缩略图的文件前缀即可)
		//$upload->thumbRemoveOrigin = 1;								// 生成缩略图后是否删除原图
 		
 		//$upload->dateFormat = '';											// 子目录方式为date的时候指定日期格式
 		//$upload->hashLevel = '';												// 子目录保存的层次，默认为一层

 		
 		//上传成功
		return $content = $upload->upload() ?  $upload->getUploadFileInfo() :  $upload->getErrorMsg();
		//多文件上传,写入数据库时，按照上传表单名进行依次写入数据库
	}
	
	
	
	//4.AJax
	public function ajax() {	
		$this->display();
	}
	public function ajaxAdd() {
		$Seluser = M('selection_name');
 		$list = $Seluser->field('name')->limit('1,2')->select();
 		//ajaxReturn(data,info,status)	返回数据，提示，状态
		echo $this->ajaxReturn($list,'成功',1);
	}
	
	
	//5.视图
	
	
	
	/* 6.缓存
	 * 思路:如果缓存存在，读取缓存。如果缓存不存在调取数据库的数据，生成缓存文件。
	 * 
	 */
	public function cache() {

		$cache = S('list');

		if (empty($cache)) {	//如果缓存不存在
			//去数据库读取数据
			$Seluser = M('selection_name');
			$list = $Seluser->field('name')->limit('1,2')->select();	
			//创建缓存
			S('list',$list,5);			//缓存数据
			//S('list',NULL);			//清空缓存
		} else {							
			dump(S('list'));			//输出缓存
		}

		
		$this->assign('cache','cache');
		$this->display();

	}
	
	
	
	//ckeditor在线编辑器
	public function ckeditor () {
		if (isPost($_POST['send'])) {
			$str = htmlString($_POST);//写入数据库过滤html标签
			dump($str);
			echo '<br />';
			dump(unHtml($str['content']));//读出数据显示html标签	
			$this->assign('content',unHtml($str['content']));
		}
		
		$this->display();
	}
	public function editor() {
		import('ORG.Net.UploadFile');
		$upload = new UploadFile();
		//上传检测
		$upload->maxSize  = 10000000 ;									// 设置附件上传大小为10兆
		$upload->allowExts  = explode(',', 'jpg,gif,png,jpeg');		// 上传文件的(后缀)（留空为不限制），
		// 上传文件的(类型),m（留空为不限制），
		$upload->allowTypes = array ('image/jpeg','image/pjpeg','image/png','image/x-png','image/gif');
		//上传保存
		$upload->savePath =  'Home/Uploads/images/';			// 设置附件上传目录
		$upload->saveRule =  'uniqid';										// 上传文件的保存规则，必须是一个无需任何参数的函数名		
		$upload->autoCheck = true;											// 是否自动检查附件
		$upload->uploadReplace  = true;									// 存在同名文件是否是覆盖
		$upload->autoSub = true;												// 是否使用子目录保存上传文件
		$upload->subType = 'date';											// 子目录创建方式，默认为hash，可以设置为hash或者date日期格式的文件夹名
		
		if($upload->upload()) {
			$content = $upload->getUploadFileInfo();
			$_path = 'Home/Uploads/images/'.$content[0]['savename'];
			$_ckefn = $_GET['CKEditorFuncNum'];//ckeditor 图片接收
			//回调
			echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($_ckefn,\"$_path\",'图片上传成功!');</script>";
		} else {
			echo $upload->getErrorMsg();
		}
			
		
	}
	
}
# Action Log 维护体系

## 一、action log 维护 && BIportal

### 1. 上传流程

- log上传页面为 dw_index 项目里的 [uploadFile.jsp](http://bi.corp.angejia.com/uploadFile.jsp)

- 上传内容写入`pm.dw_basis_dimen_action_id_name_lkp`

```sql
use pm;
CREATE TABLE `dw_basis_dimen_action_id_name_lkp` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`action_id` varchar(50) DEFAULT NULL,
`action_name` varchar(100) DEFAULT NULL,
`action_cname` varchar(100) DEFAULT NULL,
`flag` tinyint(4) DEFAULT NULL COMMENT '0:app 1:pc 2:tw 3:ios only 4:android only',
`is_latest` tinyint(4) DEFAULT '0' COMMENT '是否在最新版本中',
`remarks` varchar(255) DEFAULT NULL COMMENT '备注',
`version` varchar(20) DEFAULT NULL,
`update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
KEY `idx_action_id` (`action_id`),
KEY `idx_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7681 DEFAULT CHARSET=utf8;
```

### 2. excel格式规定

- sheet命名规则：不是action_id 的页面，名字需要加上 `(不导入)` 例如：

- 对象编号对照表(不导入)

|	页面名称	|	行为名称 |	编号（对象+动作）	|	编号英文名称	|	编号备注	|	状态(删除为0，新增为1，修改为2)	|	系统(IOS: 3 ,android: 4)	|
|	---	|	--- |	---	|	---	|	---	| ---	| ---	|
|	房源编辑页	|	编辑房源内容页面	|	1-380000	|	UA_OWNER_EDIT	|	我是备注 | 1	| 3	|


### 3. 工作流程

- 数据依赖： http://dw.corp.angejia.com/monitor/mini/report/edit?id=1012

```
1. 产品经理将excel格式的log上传到 uploadFile.jsp http://bi.corp.angejia.com/uploadFile.jsp

2. dw_service.extract_table 配置每天同步到 hive db_sync.pm__dw_basis_dimen_action_id_name_lkp

3. minireport 同步 action log 将 db_sync.pm__dw_basis_dimen_action_id_name_lkp 转存到 dw_db.dw_basis_dimen_action_id_name_lkp

4. 开发查看log是否正常地址：http://192.168.164.115/actionlog/query
```

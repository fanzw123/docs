# hsqldb 使用（finebi 底层使用的数据库）
## 安装和启动
1、 下载安装包 https://sourceforge.net/projects/hsqldb/files/latest/download?source=files  
2、 解压后进入 lib 目录
- 创建一个数据库 java -cp hsqldb.jar org.hsqldb.Server -database.0 db/mydb -dbname.0 xdb
- 启动数据库管理工具 java -cp hsqldb.jar org.hsqldb.util.DatabaseManagerSwing
   (jdbc 的 url: jdbc:hsqldb:file:db/mydb )

> 通过管理工具使用hsql很简单，这里不做详细说明

# FineBI 使用
> 下载相应的版本 http://www.finebi.com/

## 功能列能
#### 1 备份功能
备份的定义：把备份时间点之前的所以配置（或修改）都保持下来，还原后是时间点之前的配置。  
备份文件的位置：${FINEBI}/WebReport/WEB-INF/frbak/  这个有按时间点备份的文件数据  
数据库位置： ${FINEBI}/WebReport/WEB-INF/finedb
>  数据库中保存的是元数据，报表真正的数据是保存在${FINEBI}/WebReport/WEB-INF/resources/biReport,插件保存在${FINEBI}/WebReport/WEB-INF/resources/plugins。所以真正要备份还是总站备份。

#### 2 finedb数据库管理工具（hsql数据库管理工具都可以管理）
启动方式：  
1 cd ${FINEBI}/WebReport/WEB-INF/lib (如果没有 hsqldb.jar 可自己下载放入该路径下)  
2 java -cp hsqldb.jar:fr-third-8.0.jar org.hsqldb.util.DatabaseManagerSwing  
```
fr-third-8.0.jar可以在${FINEBI}／webapps/WebReport/WEB-INF/lib找到
配置信息：
driver: "com.fr.third.org.hsqldb.jdbcDriver"
url:"emb:jdbc:hsqldb:file:${FINEBI}/WebReport/WEB-INF/finedb/db"
```
#### 3 权限问题：
技术支持远程操作给他看才承认这个是bug,已经提给了技术员了。  
结论：报表模块的权限没法设置（bug）,平台管理模块可以设置。
> 部门职位和角色之间权限的设置是union的（设置一边就可以了）

#### 4 cube 作用：
解释：比如我们数据新创建了一个业务包，这个时候我们要分析该业务包的数据就要cube 更新了。  
白皮书的解释：BI绝大多数是通过SQL直接处理数据库中的数据，并没有cube 这一中间层，虽然数量较小时有一定优势，但当数据量比较大时，因为 SQL 处理机制自身的局限性，速度明显下降，深知出现卡死状态，而面向大数据，是商业智能工具的基本能力。FineBI 采用中间 cube 的模式，巧妙的解决大数据的问题，确保性能无忧.
#### 5 查询报表的创建者
```
相关表说明：
"PUBLIC"."FR_T_BIREPORTNODE"  --报表信息
"PUBLIC"."FR_URLENTRY" --报表详情
"PUBLIC"."FR_T_USER"  -—用户详情表

查询某个报表的作者:
select * from "PUBLIC"."FR_T_BIREPORTNODE" as report left join "PUBLIC"."FR_T_USER" as user on user.id=report.userid where report.id=9
查询某个用户创建了哪些报表：
select * from "PUBLIC"."FR_T_BIREPORTNODE" as report left join "PUBLIC"."FR_T_USER" as user on user.id=report.userid where user.username='ray'
```
#### 6 报表子段反查询，子段属于哪个包的哪个表中
查询办法1：点击报表－》点击设置－》就可以查看到来自哪个表了（但是没法查看属于哪个包）  
查询办法2: 我创建的－》选择报表－》选择设置（左边就有目录结构了，表示来自哪个包和哪个目录）
> 数据配置的信息是没有保存在数据库中的，所以对业务包对所有操作没办法从数据库中读取。

#### 7 查看报表的使用率
方法一：可以直接在报表访问明显界面上直接查看（缺点不支持排序,还有不能统计uv）  
方法二：通过查询报表访问的日志数据库  
报表的使用情况保存在 ${FINEBI}/WebReport/WEB-INF/logdb 的 FR_EXERECORD 中。  
报表使用pv查看方法:  
select * from (SELECT tname,count(*) as c FROM FR_EXERECORD group by tname) as t order by t.c  
报表使用uv查看方法：  
SELECT tname,count(distinct username) FROM "FR_EXERECORD" group by tname
#### 8 cube 报错问题
cube 的错误日志保存在 ${FINEBI}/WebReport/WEB-INF/logdb 的 FR_ERRRECORD 表中。  
查看cube相关错误方法：  
SELECT * FROM "FR_ERRRECORD" where msg like '%cube%'

#### 8 报表所属主变更
情景：Alice是要离职的分析师。她要把分析转给分析师B。那么可以有两种方法  
方法一：Alice把模板申请挂出，管理员然后挂出Alice的模板到报表目录上，B分析是点进去之后，点击左上角的另存为就可以存到自己账号下面了。  
方法二：Alice直接把分析分享给B，B点开分享给我的，然后点开模板，点击左上角的另存为就可以存到自己账号下面了

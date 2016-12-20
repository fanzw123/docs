# finebi_tools
本项目的作用是将 finebi 中的 hsql 数据库导入到mysql中用于错误分析还有报表分析，比如报表访问量uv pv 创建作者等。。。
# 目录说明
- lib －－该目录包含了 hsql 和 mysql 的依赖包
- src －－ 代码位置  
```
src/HsqlTool.java －－ Hsql 处理工具（通过sql语句获取结果集)  
src/Main.java －－ 入口类  
src/MysqlTool.java －－ MysqlTool 处理工具（批量将 hsql 数据写入到mysql）  
src/ResultAdapt.java －－ 适配器（ Hsql 数据集转换为对应的 sql 导入到 mysql ）
```
- mysql_table.md  －－ 关于表的说明
- runImport.sh  －－ 该文件是批量运行脚本（需要配置jar包还有数据库信息）
- run_jar.sh  －－ 该文件是用于生成 jar 包的文件。

# 手动打包说明
- 配置 src/META-INF/MANIFEST.MF 中的 Class-Path（类存放的路径）
- 运行 run_jar.sh 进行打包（该脚本打包的生成的目录跟idea一致方便理解）

# 项目部署
- 进入 bi5（因为 FineBi 部署在 bi5 上）
- cd /home/dwadmin/app (线上项目都放在这个目录)
- git clone https://git.corp.angejia.com/dw/finebi_tools.git (项目下载到本地)
- vim  src/META-INF/MANIFEST.MF 修改 Class-Path ( lib 的路径 )
- ./run_jar.sh 生成 jar 包。(保存在 out/artifacts/finebi_tools_jar 这个目录，跟 idea 目录规则一致)
- vim runImport.sh 配置一下 jar 包路径就可以了（这个是导入脚本 bi3 远程调度的就是该脚本了 ）

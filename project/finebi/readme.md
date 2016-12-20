# finebi 报表工具

- 基本说明 https://git.corp.angejia.com/service/design/issues/154

- 安装部署 http://help.finebi.com/doc-view-3

- 导入用户需要使用FineReport简历服务器数据集
 - 服务器数据集 http://help.finebi.com/doc-view-30.html

- ldap接入 http://help.finebi.com/doc-view-138.html

- 重启finebi http://help.finebi.com/doc-view-261.html

- hadoop,hive 数据库 http://help.finebi.com/doc-view-34.html


## 安装部署

```
http://help.finebi.com/doc-view-3


破解文件（不可修改）：
/opt/FineBI/webapps/WebReport/WEB-INF/lib
目录下的
fr-bi-server-3.7.jar                                                                                               100%   10MB 861.7KB/s   00:12
fr-core-8.0.jar                                                                                                    100% 4632KB   1.1MB/s   00:04
fr-platform-8.0.jar

导入用户需要使用FineReport简历服务器数据集
服务器数据集
http://help.finebi.com/doc-view-30.html

ldap接入
http://help.finebi.com/doc-view-138.html

重启finebi
http://help.finebi.com/doc-view-261.html


登录页面修改：
可根据需要修改以下两个html文件定制成你自己的个性页面。支持javascript css和html5
用winrar打开，拖出要修改的文件，修改好后拖入复盖就行了


fr-core-8.0.jar\com\fr\web\core  deploySuccess.html 布署成功后的反馈页面

fr-core-8.0.jar\com\fr\fs\web\fs\web\login.html 为登陆页面

这是一个自动跳转的语句实例，你可替换URL为你的网址域名（IP）+端口，后面的根据实际改写，它就可自动跳转到登陆页面;当然用变量${servletURL}更好

-- 可用以下代码替换deploySucess.html里的内容实现自动跳转。也为您准备了一份修改好的deploySucess.html！  --
这是修改部署成功的，当然如果要让网站自动跳转，就要用到附件里的index.jsp了。放到root目录就要以了


<html>
>       <head>
>       >       <meta http-equiv="Content-Type" content="text/html; charset=${charset}">
>       >       <meta HTTP-EQUIV=REFRESH CONTENT="0;URL=${servletURL}?op=fs"
>       </head>
</html>

```

## fine bi 部署配置

``` sh
1. 配置环境变量
  vim ~/.bashrc
  # FINEBI 相关
  export FINEBI_HOME=/opt/FineBI
  export FINEBI_TOOLS_HOME=~/app/finebi_tools


```

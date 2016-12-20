# finebi 备份
> 为了防止系统异常挂起，我们每天定时全量备份 finebi 系统，方便故障恢复。

## 备份处理
> finebi 部署在 bi5 上，调度放在了 bi3 上，所以需要在 bi3 进行远程调用

调度脚本位置：
dwadmin@bi3:~/develop/lzz/product/finebi_bak.sh  
finebi_bak.sh 具体内容如下：
``` 
#!/bin/bash
set -e
today=`date +'%Y%m%d'`
file_name=finebi_bak.tar.gz

# FineBI_bak 该文件是我们进行 hsql 数据导入到 mysql 中就有的。
echo "开始压缩bi5中的finebi文件"
ssh -q -t dwadmin@bi5 "tar -czf /opt/${file_name} -C /opt FineBI_bak"

echo "将压缩好的文件上传到 hdfs 中"
ssh -q -t dwadmin@bi5 "bash -i hdfs dfs -put /opt/${file_name} /data/finebi/finebi_${today}.tar.gz"
```

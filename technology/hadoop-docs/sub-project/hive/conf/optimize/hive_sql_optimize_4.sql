-- 缓冲区用于序列文件的大小
set io.file.buffer.size=131072;

--- Hive 优化 Start ---

-- set mapreduce.input.fileinputformat.split.minsize=1;
-- 一个 Map 最多同时处理的文件总数大小
set mapreduce.input.fileinputformat.split.maxsize=1024000000;
-- 一个 Reduce 最多同时处理的文件总数大小
set hive.exec.reducers.bytes.per.reducer=1024000000;

-- 开启并发
set hive.exec.parallel=true;
-- 并发数
set hive.exec.parallel.thread.number=6;

-- 开启本地mr
set hive.exec.mode.local.auto=false;
-- 设置local mr的最大输入数据量,当输入数据量小于这个值的时候会采用local  mr的方式
set hive.exec.mode.local.auto.inputbytes.max=1024000000;
-- 设置local mr的最大输入文件个数,当输入文件个数小于这个值的时候会采用local mr的方式
set hive.exec.mode.local.auto.tasks.max=6;

-- 如果MapJoin中的表都是有序的,使Join操作无需扫描整个表
set hive.optimize.bucketmapjoin.sortedmerge=true;


-- 是否根据输入小表的大小，自动将 Reduce 端的 Common Join 转化为 Map Join，从而加快大表关联小表的 Join 速度。
-- 把小的表加入内存，根据sql，选择使用 common join 或者 map join
-- 当查询的表特别大的时候, 把这个关闭
set hive.auto.convert.join=true;
-- 阀值 25 M
set hive.mapjoin.smalltable.filesize=25000000;

-- 优化 join 阶段数据倾斜
set hive.optimize.skewjoin=true;
-- 这个是join 的键对应的记录条数超过这个值则会进行分拆,值根据具体数据量设置
set hive.skewjoin.key=100000;

-- 优化 groupby 阶段数据倾斜
set hive.groupby.skewindata=true;
-- 这个是group的键对应的记录条数超过这个值则会进行分拆,值根据具体数据量设置
set hive.groupby.mapaggr.checkinterval=100000;

--- Hive 优化 End ---


--- MapReduce 任务环境优化 Start ---

-- task 任务 JVM 内存设置
set mapred.child.java.opts=-Xmx4096M;


-- 运行 map 任务的 JVM 环境内存,需要根据具体环境设置, 可以指定 -XX:-UseGCOverheadLimit
set mapreduce.map.java.opts=-Xmx2048M;
-- 运行 reduce 任务的 JVM 环境内存,需要根据具体环境设置, 一般为 mapreduce.map.java.opts 2 倍
set mapreduce.reduce.java.opts=-Xmx4096M;


-- map | reduce task 任务内存上限
set mapreduce.map.memory.mb=2048;
set mapreduce.reduce.memory.mb=4096;

-- map | reduce task 最大任务上限
set mapreduce.tasktracker.map.tasks.maximum=6;
set mapreduce.tasktracker.reduce.tasks.maximum=6;


-- 小作业模式
set mapreduce.job.ubertask.enable=true;
set mapreduce.job.ubertask.maxmaps=6;
set mapreduce.job.ubertask.maxreduces=1;

-- map | reduce task 任务 cpu
set mapreduce.map.cpu.vcores=1;
set mapreduce.reduce.cpu.vcores=1;


-- map | reduce 任务推测
set mapreduce.map.speculative=true;
set mapreduce.reduce.speculative=true;

--  开启重用 JVM
set mapreduce.job.jvm.numtasks=-1;

-- map task 完成数目达到 5% 时,开始启动 reduce task
set mapreduce.job.reduce.slowstart.completedmaps=0.05;


--- MapReduce 任务环境优化 End ---


---  MapReduce Shuffle 过程优化 START ---

-- 设置 Map Buffle 环形缓冲区的容量
set mapreduce.task.io.sort.mb=256;

-- Map 排序、溢出写磁盘阶段,buffle 的阀值
set mapreduce.map.sort.spill.percent=0.8;

-- Map 合并阶段的,spile 文件时达到,启用 combine
set mapreduce.map.combine.minspills=3;

-- 开启 Map 合并阶段的压缩
set mapreduce.map.output.compress=true;
set mapreduce.map.output.compress.codec=org.apache.hadoop.io.compress.DefaultCodec;
set mapreduce.output.fileoutputformat.compress=true;
set mapreduce.output.fileoutputformat.compress.type=RECORD;
set mapreduce.output.fileoutputformat.compress.codec=org.apache.hadoop.io.compress.DefaultCodec;


-- 设置 Reduce 复制阶段的复制 Map 结果的线程数
set mapreduce.reduce.shuffle.parallelcopies=10;
-- Reduce 复制阶段,复制到 reduceTask 的堆内存上线阀值
set mapreduce.reduce.shuffle.input.buffer.percent=0.80;

-- Reduce 合并阶段的
set mapreduce.reduce.shuffle.merge.percent=0.66;
-- 内存合并文件数量设置
set mapreduce.reduce.merge.inmem.threshold=1000;
-- Reduce 阶段开始时，内存中的 map 输出大小不能大于这个比例阀值
set mapreduce.reduce.input.buffer.percent=0.0;

-- Map | Reduce 排序文件时，一次最多合并的流数
set mapreduce.task.io.sort.factor=100;

---  MapReduce Shuffle 过程优化 End ---


-- select p_dt,count(*) from dw_db.dw_sem_baidu_sd group by p_dt ;
--汇总微聊的所有内容--

--汇总微聊的所有内容--
insert overwrite table dw_db.dw_connection_wechat partition (p_dt='2016-06-07')
select a.msg_id
      ,a.from_uid
      ,a.to_uid
      ,a.content_type
      ,a.status
      ,a.account_type
      ,b.content
      ,a.created_at
      ,a.updated_at
from db_sync.angejia__user_msg a
left join db_sync.angejia__msg_ext b
  on a.msg_id = b.msg_id
where to_date(a.created_at) = '2016-06-07';

-- 缓冲区用于序列文件的大小, KB
set io.file.buffer.size=131072;

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


-- 启用洗牌预读来提高 MapReduce 洗牌处理程序的性能
set mapreduce.shuffle.manage.os.cache=true;
set mapreduce.shuffle.readahead.bytes=4194304;


-- 启用 IFILE 预读可提高合并操作的性能
set mapreduce.ifile.readahead=true;
set mapreduce.ifile.readahead.bytes=4194304;


-- 在任务完成后立刻发送检测信号
set mapreduce.tasktracker.outofband.heartbeat=true;

-- JobClient 向控制台报告状态和检查作业完成情况的时间间隔（以毫秒为单位
set jobclient.progress.monitor.poll.interval=10;

-- TaskTracker 到 JobTracker 检测信号的最小时间间隔调整到较小的值可能会在小型群集上提高 MapReduce 性能
set mapreduce.jobtracker.heartbeat.interval.min=10;

-- 立即启动 MapReduce JVM,对于需要快速周转的小作业，此值设置为 0 可提高性能；较大的值（最高 50%）可能更适合较大的作业
set mapred.reduce.slowstart.completed.maps=0;


--- MapReduce 任务环境优化 End ---


---  MapReduce Shuffle 过程优化 START ---

-- 设置 Map Buffle 环形缓冲区的容量
set mapreduce.task.io.sort.mb=256;

-- Map 排序、溢出写磁盘阶段,buffle 的阀值
set mapreduce.map.sort.spill.percent=0.8;

-- Map 合并阶段的,spile 文件时达到,启用 combine
set mapreduce.map.combine.minspills=3;


-- MapReduce 压缩 Start
-- 开启 Map 合并阶段的压缩
set mapreduce.map.output.compress=true;
-- 压缩格式, 均衡压缩: org.apache.hadoop.io.compress.SnappyCodec , 高压缩比: org.apache.hadoop.io.compress.BZip2Codec
set mapreduce.map.output.compress.codec=org.apache.hadoop.io.compress.SnappyCodec;

-- 是否压缩最终作业输出（true 或 false）
set mapreduce.output.fileoutputformat.compress=true;
-- 对于 SequenceFile 输出，应使用什么类型的压缩（NONE、RECORD 或 BLOCK）。建议使用 BLOCK
set mapreduce.output.fileoutputformat.compress.type=BLOCK;
-- 如果要压缩最终作业输出，应使用哪个编码解码器
set mapreduce.output.fileoutputformat.compress.codec=org.apache.hadoop.io.compress.SnappyCodec;
-- MapReduce 压缩 End


-- 设置 Reduce 复制阶段的复制 Map 结果的线程数
set mapreduce.reduce.shuffle.parallelcopies=10;
-- Reduce 复制阶段,复制到 reduceTask 的堆内存上限阀值
set mapreduce.reduce.shuffle.input.buffer.percent=0.80;

-- Reduce 合并阶段的堆内存上限阀值
set mapreduce.reduce.shuffle.merge.percent=0.66;
-- 内存合并文件数量设置
set mapreduce.reduce.merge.inmem.threshold=1000;
-- Reduce 阶段开始时，内存中的 map 输出大小不能大于这个比例阀值
set mapreduce.reduce.input.buffer.percent=0.0;

-- Map | Reduce 排序文件时, 一次最多合并的流数
set mapreduce.task.io.sort.factor=100;

---  MapReduce Shuffle 过程优化 End ---


--- Hive 优化 Start ---

-- set mapreduce.input.fileinputformat.split.minsize=1;
-- 一个 Map 最多同时处理的文件总数大小
set mapreduce.input.fileinputformat.split.maxsize=1024000000;
-- 一个 Reduce 最多同时处理的文件总数大小
set hive.exec.reducers.bytes.per.reducer=1024000000;

-- 开启并发
set hive.exec.parallel=true;
-- 并发数
set hive.exec.parallel.thread.number=2;

-- 开启本地mr
set hive.exec.mode.local.auto=false;
-- 设置local mr的最大输入数据量,当输入数据量小于这个值的时候会采用local  mr的方式
set hive.exec.mode.local.auto.inputbytes.max=1024000000;
-- 设置local mr的最大输入文件个数,当输入文件个数小于这个值的时候会采用local mr的方式
set hive.exec.mode.local.auto.tasks.max=6;

-- 如果MapJoin中的表都是有序的,使Join操作无需扫描整个表
set hive.optimize.bucketmapjoin.sortedmerge=true;


-- hive join 实现类型, 是否根据输入小表的大小,将 Reduce 端的 Common Join 转化为 Map Join，从而加快大表关联小表的 Join 速度,
-- 把小的表加入内存，根据 sql，选择使用 common join 或者 map join
-- 当查询的表特别大的时候, 把这个关闭
set hive.auto.convert.join=true;
-- 阀值 25 M
set hive.mapjoin.smalltable.filesize=25000000;

-- 优化 join 阶段数据倾斜
set hive.optimize.skewjoin=false;
-- 这个是join 的键对应的记录条数超过这个值则会进行分拆,值根据具体数据量设置
set hive.skewjoin.key=100000;

-- 优化 groupby 阶段数据倾斜
set hive.groupby.skewindata=false;
-- 这个是group的键对应的记录条数超过这个值则会进行分拆,值根据具体数据量设置
set hive.groupby.mapaggr.checkinterval=100000;

-- hive 输出写到表中时, 输出内容开启压缩, 压缩格式就是 mapreduce.output.fileoutputformat.compress.codec 参数指定的格式
-- hive table 当指定了表的格式, 如 ORC, 这个参数会被覆盖
set hive.exec.compress.output=true;

-- hive table 默认输出格式, 使用 ORC 格式
set hive.default.fileformat=ORC;

-- hive table 开启索引
set hive.optimize.index.filter=true;

--- Hive 优化 End ---


DROP TABLE dw_db_temp.jason_test_1;
create table dw_db_temp.jason_test_1 AS
select * from access_log.access_log_20160703;

-- select p_dt,count(*) from dw_db.dw_sem_baidu_sd group by p_dt ;

# 设计

## 一、调度类工作流程说明

``` java
StartScheduler 入口函数
|--- SchedulerConfigFactory 配置工厂
     |--- SchedulerConfig 配置类读取 -> schedul.default.yaml 配置文件
|--- CuartorOperator 根据配置, 初始化 zookeeper 连接, 并使用 curatorOperator 操作 Scheduler 在 zookeeper 中的配置
     |--- 在 zookeeper 注册 server 节点/dw_scheduler/scheduler_servers
     |--- 在 zookeeper 获取互斥锁 /dw_scheduler/locks
|--- SchdulerWorkerFactory 创建调度 worker 工厂, 用来控制调度的所有启动流程
     |--- JobExecutorPool 创建 Job 并发控制池 , 使用 java.util.concurrent 并发控制模块实现, 使用集合 executorMap<Integer, JobExecutor>
          |--- 开启线程池 ExecutorService ,具体 slotCount 数由配置决定
          |--- 对线程池中的 executorMap<Integer, JobExecutor> 执行任务队列, 设置、新增、kill 等操作
          |--- JobExecutor 具体执行单个任务的封装
               |--- 执行单个任务的流程控制: 生成信号文件、失败后的重跑处理机制, 任务执行完成后, 对执行任务队列的控制 executorMap<Integer, JobExecutor>  
               |--- ScriptJobRunner 执行任务的实体, 用户执行任务, 记录日志, 任务是否成功的状态返回
                    |--- FileSchedulerLoggerFactory log 生成规则
                        |--- FileSchedulerLogger 记录 log 实体
     |--- JobSubmitter 初始化 job 提交对象
          |--- 提交任务, 若当前任务在运行, 则设置成为重复提交, 把任务从 executorMap<Integer, JobExecutor> 队列中删除
          |--- 把 JobExecutor 封装好, 提交给 JobExecutorPool 去负责控制执行
     |--- JobDBPool 初始化 job db 池
     |--- QuartzScheduler  Scheduler 定时任务控制模块
          |---
     |--- JobMonitorFromDB 监控 job 在 db 的变化做出处理, 自动、手动
          |--- 把 db 中所有需要运行的 Job 加入到 QuartzScheduler 模块中
          |--- 把手动运行的 job 添加到执行列队中 executorJob<Integer, DWJob>
     |--- JobReRunFromDB job 重跑处理
     |--- Worker 调度流程
          |--- jobMonitorFromDB (监控 DB 的变化, 把任务提交给 QuartzScheduler, 把手动执行的任务提交给 )
          |--- submitter
          |--- jobReRunFromDB
          |--- 开启 RPC Thrift 端口(39800 由配置决定), 用于跟 monitor 通讯

```

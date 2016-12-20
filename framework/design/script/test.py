

# 获取源任务 List
sourceTaskList = getSourceTaskList()

# 格式化后,放到 wait Run Task List 中
waitRunTaskList = format(sourceTaskList)

# 正在运行的 List
runTaskList = []

# 同时运行最大任务数
maxTask = 5

# 队列循环状态,为 False 则退出循环
taskStatus = True

# 队列循环进程
while(taskStatus == True):

    # 当等待执行列队为空,退出列队
    if (len(waitRunTaskList) == 0):
        taskStatus = False

    # 把完成的任务从 runTaskList 剔除
    for (curTask in runTaskList):
        if (curTask['code'] == 0):
            runTaskList.del(runTaskList[0])

    # 1. 当前可以同时运行的任务数量
    needRunTaskNum = maxTask - len(runTaskList)
    if (curRunTaskNum > 0):
        # 2. 从 waitRunTaskList 截取 needRunTaskNum 数量的任务,到 curRunTaskList 中
        curRunTaskList = split(waitRunTaskList[0:needRunTaskNum])

        # 3. 异步运行 curRunTaskList 中所有的任务
        for (curRunTaskInfo in curRunTaskList):

            thringInfo = thring.xxxx(function)

            curTaskInfo = {
                'pid' : 1，
                'code' : 0
            }
            # 异步方法
            runTaskList.append(curTaskInfo)
    elif:
        continue

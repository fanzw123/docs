# JAVA
JAVA_HOME=/xxx

# Hadoop
export HADOOP_HOME=/xxx
export HADOOP_HOME_WARN_SUPPRESS=true
export HADOOP_PREFIX=$HADOOP_HOME
export HADOOP_MAPRED=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_YARN=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export YARN_HOME=$HADOOP_HOME
export HADOOP_CONF_DIR=$HADOOP_HOME/conf
export YARN_CONF_DIR=$HADOOP_HOME/conf

# HIVE
export HIVE_HOME=/xxx
export HIVE_CONF_DIR=$HIVE_HOME/conf

# cuda
export LD_LIBRARY_PATH=$HADOOP_HOME/lib/native:/usr/lib64:/usr/local/cuda/lib64:/usr/local/cuda/lib:$LD_LIBRARY_PATH
export PATH=/usr/local/cuda/bin:$PATH

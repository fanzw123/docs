# Spark Streaming 2.0.x + Kafka 0.10.x

- spark-streaming 实时消费 Kafka 主题下的日志

## 一、介绍

- [streaming-kafka-integration 官方文档](https://spark.apache.org/docs/latest/streaming-kafka-integration.html)

- Receiver-based Approach 接收器模式
  - 通过在 Receiver 里实现 Kafka consumer 的功能来接收消息数据
  - [Spark Streaming - Receiver 接收器模式与内存分析 1](http://www.jianshu.com/p/9e44d3fd62af)
  - [Spark Streaming - Kafka To Receiver 接收器模式分析 2](http://www.jianshu.com/p/a1526fbb2be4)

- Direct Approach (No Receivers) 直流模式
  - 不通过 Receiver 接收器来接收数据，而是周期性的主动查询 Kafka 消息 Partition 中的最新 offset 值，进而去定义在每个批处理 batch 中需要处理的消息的 offset 范围
  - Direct Approach 是直接把 Kafka 的 partition 映射成 RDD 里的 partition, 所以数据还是在 kafka 。只有在算的时候才会从 Kafka 里拿，不存在内存问题，速度也快。
  - [Spark Streaming - Direct Approach 直流模式分析 3](http://www.jianshu.com/p/b4af851286e5)


## 二、Direct Approach (No Receivers) ,  Direct Stream 直流模式

``` java

import org.apache.spark.SparkConf
import org.apache.spark.storage.StorageLevel
import org.apache.spark.streaming.Seconds
import org.apache.spark.streaming.StreamingContext

import org.apache.kafka.clients.consumer.ConsumerRecord
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.spark.streaming.kafka010._
import org.apache.spark.streaming.kafka010.LocationStrategies.PreferConsistent
import org.apache.spark.streaming.kafka010.ConsumerStrategies.Subscribe;


    /**
     * 直流模式
     */
    def runByDirectApproach() : Unit = {

        // 创建 sparkStreaming 上下文对象
        val conf = new SparkConf()
        conf.setMaster("local[2]")
        conf.setAppName("UserPortrait")
        conf.set("spark.streaming.kafka.maxRetries"  , "5")

        val ssc = new StreamingContext(conf, Seconds(this.config.get.batchDuration))

        val brokerList = "broker1:9092,broker2:9092,broker3:9092"
        val topics = Array("topic1", "topic2")
        val groupId = "userPortrait"

        val kafkaParams = Map[String, Object](
          "bootstrap.servers" -> brokerList,
          "key.deserializer" -> classOf[StringDeserializer],
          "value.deserializer" -> classOf[StringDeserializer],
          "group.id" -> groupId,
          "auto.offset.reset" -> "latest",
          "enable.auto.commit" -> (false: java.lang.Boolean)
        )

        println(kafkaParams)

        val directKafkaStream = KafkaUtils.createDirectStream[String, String](
          ssc,
          PreferConsistent,
          Subscribe[String, String](topics, kafkaParams)
        )


        directKafkaStream.foreachRDD{ (rdd, time) =>
            println(rdd + " --- " + time)

            // 循环分区
            rdd.foreachPartition { partitionIterator =>

                // 循环分区值
                partitionIterator.foreach(  consumerRecord => {

                    println("-----------------------------------------------------------------------------------------")
                    // 当前批次日志
                    val curLines = consumerRecord.value()

                    curLines.split("\n").foreach { curLine =>

                        val logInfo = this.formatLogData(curLine)

                        val logType = logInfo.getOrElse("logType", "").toString()
                        logType match {
                            case "accessLog" => {
                                this.recommendAction(logInfo)
                            }
                            case _ => println("nothing")
                        }

                    }

                })
            }
        }


        // 启动流计算环境 StreamingContext 并等待它"完成"
        ssc.start()
        // 等待作业完成
        ssc.awaitTermination()

    }



```

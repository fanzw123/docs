package angejia.streaming

import org.apache.spark._
import org.apache.spark.streaming._
import org.apache.spark.streaming.StreamingContext._
import org.apache.spark.storage._
import org.apache.spark.streaming.kafka.KafkaUtils
import org.apache.hadoop.hbase.util.Bytes
import org.apache.hadoop.hbase.client.Put
import angejia.common._

object  NewInv_conf{
     var zookeeper = "uhadoop-ociicy-master1:2181"
     var brokers = "bi4:9092"
     var recom_topic = "needRecommend"
     
}


object NewInv {
    val inventOp = new HbaseOp("DataNode01", "inventory")
    
    
    
    
    def do_reRecommend(regex:String){
       val invents = inventOp.scanByRegex(regex)

       
   
      val rs=invents.iterator().next()
      
      println("-------------------1")
      if (rs != null)
      {
        println("-------------------2")
        var rowKey = ""
        val kfk = new KfkProducer("192.168.160.41:2181", "192.168.160.42:9092")
        
        rs.raw().foreach { (x)=>{
               
               rowKey = Bytes.toString(x.getRow)
               val fam = Bytes.toString(x.getFamily)
               val tag = Bytes.toString(x.getQualifier)
               val v = Bytes.toString(x.getValue)
               println("-------------------3  "+rowKey+"  "+tag)
               if (fam.equals("dynamic") && tag.equals("P2012"))
               {
                  v.split(",").take(50).foreach { userId => kfk.send("t_needRecommend", userId)}
                  
                  
               }
            } 
          }
        
        

      }
        
  
       
    }
    
    
    def do_NewInventory(line:String){
        val pros = line.split("-")
              if(pros.size == 7)
              {
                 val put = new Put(Bytes.toBytes(line))
                 put.add("static".getBytes, "P1001".getBytes, pros(0).getBytes)
                 put.add("static".getBytes, "P1002".getBytes, pros(1).getBytes)
                 put.add("static".getBytes, "P1003".getBytes, pros(2).getBytes)
                 put.add("static".getBytes, "P1004".getBytes, pros(3).getBytes)
                 put.add("static".getBytes, "P1005".getBytes, pros(4).getBytes)
                 put.add("static".getBytes, "P1006".getBytes, pros(5).getBytes)
                 
                 //先把新房源信息加入房源表
                 NewInv.inventOp.update(put)
                 
                 
                 val regex:String = pros(0)+"-"+pros(1)+"-"+pros(2)+"-"+pros(3)+"-"+pros(4)+".*"
                 //找出跟此房源类似的房源，被推给的用户，并将这些用户重新推荐房源
                 NewInv.do_reRecommend(regex)
              }  
    }
   
}


object NewInventory {
  def main(args: Array[String]) {
    

//val topics = Set("user_events")
val zookeeper=args(0)     //"192.168.160.41:2181"
val brokers=args(1)       //"192.168.160.42:9092"
val topic = args(2)
val groupId = args(3)
val second = args(4)

val topics = Map[String, Int](topic->1)
val kafkaParams = Map[String, String](
  "metadata.broker.list" -> brokers, "serializer.class" -> "kafka.serializer.StringEncoder"
  ,"zookeeper.connect"->zookeeper, "group.id"->groupId
  ,"auto.offset.reset"->"smallest")
   
  
// Create a direct stream
//val kafkaStream = KafkaUtils.createDirectStream[String, String, StringDecoder, StringDecoder](ssc, kafkaParams, topics)
    val conf = new SparkConf().setAppName("NewInventory")
    val ssc = new StreamingContext(conf, Seconds(Integer.parseInt(second)))
   val lines = KafkaUtils.createStream(ssc, zookeeper, groupId,  topics, StorageLevel.MEMORY_AND_DISK_SER).map(_._2)
   
   //demand_regex.findAllIn()
   lines.foreachRDD(rdd => {
      rdd.foreachPartition(part => {
        part.foreach(line =>
          {
            
              NewInv.do_NewInventory(line)
              
          })
      })
    })
   
    val words = lines.flatMap(_.asInstanceOf[String].split(" "))
    //val pairs = words.map(word => (word, 1))
    //val wordCounts = pairs.reduceByKey(_ + _)
    lines.print()
    
    
    ssc.start() //这里才开始计算
    ssc.awaitTermination()
   
}
  
}
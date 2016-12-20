package angejia.streaming
import scala.collection.mutable.HashMap
import org.apache.spark._
import org.apache.spark.streaming._
import org.apache.spark.streaming.StreamingContext._
import org.apache.spark.storage._
import org.apache.spark.streaming.kafka.KafkaUtils
import org.apache.hadoop.hbase.util.Bytes
import org.apache.hadoop.hbase.client.Put
import angejia.common._
import angejia.streaming.Sale



object Sale {
    val inventOp = new HbaseOp("DataNode01", "inventory")
    
    
    def do_sale(inventoryId:String){
       //找到卖掉的房源信息
       val invents = inventOp.scanByRegex(".*"+inventoryId)

       
   
      val rs=invents.iterator().next()
      
      if (rs != null)
      {
        var rowKey = ""
        val kfk = new KfkProducer("192.168.160.41:2181", "192.168.160.42:9092")
        
        //找到此房源当时被推给哪些用户，这些用户重新推荐
        rs.raw().foreach { (x)=>{
               
               rowKey = Bytes.toString(x.getRow)
               val fam = Bytes.toString(x.getFamily)
               val tag = Bytes.toString(x.getQualifier)
               val v = Bytes.toString(x.getValue)
               if (fam.equals("dynamic") && tag.equals("P2012"))
               {
                  v.split(",").foreach { userId => kfk.send("t_needRecommend", userId)}
                  
                  
               }
            } 
          }
        
        //删除此房源
        inventOp.delete(rowKey, "", "")

      }
        
  
       
    }
    
    
    
}


object SaleEd {
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
    val conf = new SparkConf().setAppName("sale")
    val ssc = new StreamingContext(conf, Seconds(Integer.parseInt(second)))
   val lines = KafkaUtils.createStream(ssc, zookeeper, groupId,  topics, StorageLevel.MEMORY_AND_DISK_SER).map(_._2)
   
   //demand_regex.findAllIn()
   lines.foreachRDD(rdd => {
      rdd.foreachPartition(part => {
        part.foreach(line =>
          {
              Sale.do_sale(line)
           
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
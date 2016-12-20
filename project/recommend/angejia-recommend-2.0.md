# 推荐系统

## 一、介绍

### 1. 安个家推荐系统

- [基于内容的推荐 Content-based Recommendation](technology/algorithm/recommend/principle.md)

```
推荐逻辑:
1. 建立用户画像，用各个标签去描述用户特征、需求模型
2. 根据用户浏览房源单页、过滤房源、用户需求单、用户收藏房源，等等用户行为,对用户对应的标签进行加分
3. 根据用户需求(版块、小区、户型、价格)
  hbase inventory table 模糊匹配出一部分房子，
  根据用户需求,对着匹配的一部分房子,进行需求临时打分
  根据临时打的分数，推荐分数最高的房子
4. 没有匹配到房子
  选择(小区、户型、价格),分数最高取 hbase inventory table 模糊匹配出 10 套房子给用户

推荐系统 2.0 系统流程


```


``` sh
修改包之前的版本
e80810078b8ecf3d80256b117cab471b581ccc8c

import org.apache.hadoop.hbase.filter.CompareFilter
import org.apache.hadoop.hbase.filter.SubstringComparator
import org.apache.hadoop.hbase.filter.RowFilter
import org.apache.hadoop.hbase.filter.RegexStringComparator
scan 'inventoryPortrait', {
  FILTER => RowFilter.new(
    CompareFilter::CompareOp.valueOf('EQUAL'),
    RegexStringComparator.new('^(.*)(316140)$')
  )
}





import org.apache.hadoop.hbase.filter.CompareFilter
import org.apache.hadoop.hbase.filter.SubstringComparator
import org.apache.hadoop.hbase.filter.RowFilter
import org.apache.hadoop.hbase.filter.RegexStringComparator
scan 'inventoryPortrait', {
  FILTER => RowFilter.new(
    CompareFilter::CompareOp.valueOf('EQUAL'),
    RegexStringComparator.new('^1_7_68_5656_316140$')
  )
},{FILTER => SingleColumnValueFilter.new(
    Bytes.toBytes('attr'),
    Bytes.toBytes('district_id'),
    CompareFilter::CompareOp.valueOf('EQUAL'),
    Bytes.toBytes('7')
  )
}



import org.apache.hadoop.hbase.filter.CompareFilter
import org.apache.hadoop.hbase.filter.SingleColumnValueFilter
import org.apache.hadoop.hbase.filter.SubstringComparator

  scan 'inventoryPortrait', {
    FILTER =>

    SingleColumnValueFilter.new(
      Bytes.toBytes('attr'),
      Bytes.toBytes('district_id'),
      CompareFilter::CompareOp.valueOf('EQUAL'),
      Bytes.toBytes('7')
    )
  }



  scan 'inventoryPortrait', {
    FILTER =>

    SingleColumnValueFilter.new(
      Bytes.toBytes('attr'),
      Bytes.toBytes('district_id'),
      CompareFilter::CompareOp.valueOf('EQUAL'),
      Bytes.toBytes('7')
    )
  }

```

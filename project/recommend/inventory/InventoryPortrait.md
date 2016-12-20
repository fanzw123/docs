# InventoryPortrait 房源画像

``` sh

1. 通过 row-key 查询房源
import org.apache.hadoop.hbase.filter.CompareFilter
import org.apache.hadoop.hbase.filter.SubstringComparator
import org.apache.hadoop.hbase.filter.RowFilter
import org.apache.hadoop.hbase.filter.RegexStringComparator
scan 'inventoryPortrait', {FILTER => RowFilter.new(CompareFilter::CompareOp.valueOf('EQUAL'),RegexStringComparator.new('^(.*)(306218)$'))}


scan 'inventoryPortrait', {FILTER => RowFilter.new(CompareFilter::CompareOp.valueOf('EQUAL'),RegexStringComparator.new('^1_7_172_([0-9]+)_([0-9]+)$'))}

scan 'inventoryPortrait', {FILTER => RowFilter.new(CompareFilter::CompareOp.valueOf('EQUAL'),RegexStringComparator.new('^1_15_139_2991_([0-9]+)$'))}




2. 通过 列值 查询房源
import org.apache.hadoop.hbase.filter.CompareFilter
import org.apache.hadoop.hbase.filter.SingleColumnValueFilter
import org.apache.hadoop.hbase.filter.SubstringComparator

scan 'inventoryPortrait', {
  # 显示指定列数据,如果不写,则返回所有匹配出的数据
  COLUMNS => 'info:company',
  FILTER => SingleColumnValueFilter.new(
    Bytes.toBytes('info'),
    Bytes.toBytes('company'),
    CompareFilter::CompareOp.valueOf('EQUAL'),
    Bytes.toBytes('angejia')
  )
}

```

# 经纪人每天工时统计

## 思路

### 数据逻辑

* 表:angejia.log_user_switch

* 关键字段

```
switch_id＝1（该开关是工作状态开关）
action_type＝1（打开开关）
action_type＝2（关闭开关）
action_source＝'switch'（操作来源是经纪人本身）
```

### 业务逻辑

* 主体：统计经纪人当天工作状态的时间

* 需要考虑初始状态

```

打开次数＝关闭次数（根据差值正负判断初始状态是打开还是关闭）
打开次数＝关闭次数+1（初始状态一定是打开）
关闭次数＝打开次数+1（初始状态一定是关闭）
```

* 无需考虑初始状态

```

只有一次关闭
只有一次打开
没有记录
```

### 业务保证不能出现以下bug
 * 多次打开一次关闭
 * 一次打开多次关闭（数据源保证）
 
## 设计

## 代码总体思路

* 用该经纪人当天的`关闭`时间的时`次数`加和，减去，用该经纪人当天的`打开`时间的`次数`加和
* 用该经纪人当天的`关闭`时间的`时间戳`加和，减去，用该经纪人当天的`打开`时间的`时间戳`加和
* 根据次数差判断，如果次数差是奇数且小于1，则补齐到偶数
* 根据时间戳大小，判断应该补齐开始时间戳（当天0点）或者结束时间戳（当天23.59.59）
* 如果当天无打开、关闭记录则回溯最新一次操作
* 打开次数与关闭次数的差的绝对值小于等于1
* 对一个经纪人当天所有打卡记录重新排序后，row_number奇数位的action_type相等，row_number偶数位的action_type也相等

### 表设计
* dw_db_temp.ray_broker_working_hours_gather_temp（所有经纪人当天工作时长聚合表，关联broker之后的结果）

```
字段：
user_id, 经纪人id
open_times，当天开启工作按钮次数
close_times，当天关闭工作按钮次数
open_sum， 当天开始工作按钮时间戳之和
close_sum， 当天关闭工作按钮时间戳之和


```

* dw_db_temp.ray_broker_working_hours_review_temp （经纪人七天之内最后操作状态）

```

user_id,经纪人id
last_action， 最后状态id，含义同：action_type

```
* db_sync.angejia__broker （经纪人基础信息表）


```

只需要：
user_id,全部经纪人id

其他不需要：
......
```

* dw_db.dw_broker_working_hours(经纪人工作时长结果表)

```

user_id，经纪人id
working_seconds,工作时长秒数

```

## java伪代码

``` java

    /**
     *
     * @param open_times
     *            打开开关的次数
     * @param close_times
     *            关闭开关的次数
     * @param open_sum
     *            多次打开开关时间戳之和
     * @param close_sum
     *            多次关闭开关时间戳之和
     * @param close_sum
     *            处理日期yyyy-MM-dd
     * @return 秒，负数是错误的`（-1：当天打开关闭次数差大于1，-2：log记录错误，-3：当天无操作记录，并且7天内无操作记录）`
     */
    public static int evaluate(int open_times, int close_times, int open_sum, int close_sum, String deal_date) {

        // 如果开启时间和与关闭时间和的差值大于一天，数据错误。
        if (Math.abs(close_times - open_times) <= 1) {
            //如果数据有bug，则返回-2
            if(check_flag <> 1){
                if (open_times < close_times) {// 关闭次数大于打开次数：说明第一次是关闭状态,需要补全打开时间（当天0点）
                    open_sum = open_sum+今天0点时间戳;
                        return close_sum - open_sum;
                } else if (open_times > close_times) {//打开次数大于关闭次数，说明最后一次是打开状态，需要补全关闭时间（当天24点）
                    close_sum = close_sum+今天24点时间戳;
                    return close_sum - open_sum;
                } else {// 打开次数与关闭次数相等

                    if (open_times == 0) {// 如果打开关闭都是0，说明今天无操作，关联追溯表，查找最新状态
                        if(last_action == 1){
                            return 60 * 60 * 24;
                        }else if(last_action == 2){
                            return 0;
                        }else{
                            return -3;
                        }
                    } else {//如果打开或者关闭次数不是0
                        if (close_sum >= open_sum) {//如果关闭时间戳总和，大于等于打开时间戳总和，则直接相减
                            return close_sum - open_sum;
                        } else {//否则，说明今天第一次记录是关闭操作，最后一次记录是打开操作，需要补全开始时间和结束时间
                            close_sum = close_sum+今天24点时间戳;
                            open_sum = open_sum+今天0点时间戳;
                            return close_sum - open_sum;

                        }
                    }
                }
            }else{
                return -2;
            }
        }else{
            return -1;
        }

    }
```



## 增加dealdate后可在minireport执行的代码

``` sql

---经纪人工作时长计算开始---

--当天经纪人打卡信息汇总
drop table if exists dw_db_temp.ray_broker_working_hours_gather_temp;
create table dw_db_temp.ray_broker_working_hours_gather_temp
as
select
user_id,
count(case when action_type=1 then `user_id` end) as open_times,
count(case when action_type=2 then `user_id` end) as close_times,
coalesce(sum(case when action_type=1 then unix_timestamp(created_at) end),0) as open_sum,
coalesce(sum(case when action_type=2 then unix_timestamp(created_at) end),0) as close_sum
from db_sync.angejia__log_user_switch where switch_id=1 and action_type in(1,2) and action_source="switch" and created_at >= ${dealDate} and created_at < from_unixtime(unix_timestamp(),'yyyy-MM-dd')
group by user_id;


--补充无打卡记录的其他经纪人之后的聚合表
drop table if exists dw_db_temp.ray_broker_working_hours_gather_full_temp;
create table dw_db_temp.ray_broker_working_hours_gather_full_temp
as
select
a.user_id,
coalesce(open_times,0) as open_times,
coalesce(close_times,0) as close_times,
coalesce(open_sum,0) as open_sum,
coalesce(close_sum,0) as close_sum
from db_sync.angejia__broker a left outer join dw_db_temp.ray_broker_working_hours_gather_temp b
on a.user_id=b.user_id
;

--把今天记录重新排序，为找到错误日志做准备
drop table if exists dw_db_temp.ray_broker_working_hours_renumber_temp;
create table dw_db_temp.ray_broker_working_hours_renumber_temp
as
select user_id, action_type, ROW_NUMBER() over (distribute by user_id sort by id asc) as row_id
from db_sync.angejia__log_user_switch
where
switch_id=1 and action_type in(1,2) and action_source="switch"
and created_at >= ${dealDate} and created_at < from_unixtime(unix_timestamp(),'yyyy-MM-dd')
;

--找出log有错误的用户
drop table if exists dw_db_temp.ray_broker_working_hours_bad_temp;
create table dw_db_temp.ray_broker_working_hours_bad_temp
as
select distinct a.user_id, 1 as check_flag
from
  dw_db_temp.ray_broker_working_hours_renumber_temp a
left outer join
  (select * from dw_db_temp.ray_broker_working_hours_renumber_temp where row_id = 1) b
on a.user_id=b.user_id
where
  case
    when (pmod(a.row_id,2) = pmod(b.row_id,2)) and (a.action_type = b.action_type) then false
    when (pmod(a.row_id,2) <> pmod(b.row_id,2)) and (a.action_type <> b.action_type) then false
  else
    true
  end
;


--七天内有打卡记录的经纪人最后操作类型
drop table if exists dw_db_temp.ray_broker_working_hours_review_temp;
create table dw_db_temp.ray_broker_working_hours_review_temp
as
select b.user_id,b.action_type as last_action
from
(select
user_id,
max(id) as max_id
from db_sync.angejia__log_user_switch group by user_id) a
inner join
db_sync.angejia__log_user_switch b
on a.user_id=b.user_id
where a.max_id=b.id and created_at >= from_unixtime(unix_timestamp(concat(${dealDate},' 00:00:00'))-7*24*60*60,'yyyy-MM-dd') ;

--当天所有打卡记录的经纪人工作时间
drop table if exists dw_db_temp.ray_broker_working_hours_temp;
create table dw_db_temp.ray_broker_working_hours_temp
as
select
a.user_id,
(
  --如果开启时间和与关闭时间和的差值大于一天，数据错误。
  case when (abs(close_times - open_times) <= 1) then(
    --排除掉错误数据的干扰
    case when (c.check_flag is null) then(
      --关闭次数大于打开次数：说明第一次是关闭状态,需要补全打开时间（当天0点）
      case when (open_times < close_times) then(

        close_sum - (open_sum + unix_timestamp(concat(${dealDate},' 00:00:00')))

      )
      --打开次数大于关闭次数，说明最后一次是打开状态，需要补全关闭时间（当天24点）
      when (open_times > close_times) then(

          (close_sum + unix_timestamp(concat(${dealDate},' 23:59:59'))+1) - open_sum

      --打开次数与关闭次数相等
      )else(

        --如果打开关闭都是0，说明今天无操作，关联追溯表，查找最新状态
        case when(open_times = 0) then(

          case when(last_action = 1) then
            24*60*60
          when(last_action = 2) then
            0
          else
            -3
          end

        )else(
          --如果结束时间戳和大于开始时间戳和，直接相减
          case when(close_sum >= open_sum) then(

            close_sum - open_sum

          --否则，说明今天第一次记录是关闭操作，最后一次记录是打开操作，需要补全开始时间和结束时间
          )else(

            (close_sum + unix_timestamp(concat(${dealDate},' 23:59:59'))+1) - (open_sum + unix_timestamp(concat(${dealDate},' 00:00:00')))

          )end
        )end

      )end

    )else(
      -2
    )end

  )else(
    -1
  )end
) as working_hours
from dw_db_temp.ray_broker_working_hours_gather_full_temp a
left outer join
dw_db_temp.ray_broker_working_hours_review_temp b
on a.user_id=b.user_id
left outer join
dw_db_temp.ray_broker_working_hours_bad_temp c
on a.user_id=c.user_id
;

---经纪人工作时长计算结束---


```



## 测试用例

```

CREATE TABLE `log_user_switch` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `switch_id` int(10) unsigned NOT NULL DEFAULT '0',
  `action_type` tinyint(4) NOT NULL DEFAULT '0',
  `action_source` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO `log_user_switch` (`id`, `user_id`, `switch_id`, `action_type`, `action_source`, `created_at`, `updated_at`) VALUES 
#关闭次数大于打开次数：说明第一次是关闭状态,需要补全打开时间（当天0点）,期望17*3600
(NULL, '38864', '1', '2', 'switch', '2015-06-04 01:00:00', '0000-00-00 00:00:00'),
(NULL, '38864', '1', '1', 'switch', '2015-06-04 06:00:00', '0000-00-00 00:00:00'),
(NULL, '38864', '1', '2', 'switch', '2015-06-04 22:00:00', '0000-00-00 00:00:00'),
#打开次数大于关闭次数，说明最后一次是打开状态，需要补全关闭时间（当天24点）15*3600
(NULL, '38863', '1', '1', 'switch', '2015-06-04 08:00:00', '0000-00-00 00:00:00'),
(NULL, '38863', '1', '2', 'switch', '2015-06-04 13:00:00', '0000-00-00 00:00:00'),
(NULL, '38863', '1', '1', 'switch', '2015-06-04 14:00:00', '0000-00-00 00:00:00'),
#打开次数与关闭次数相等，如果打开关闭都是0，说明今天无操作，关联追溯表，查找最新状态，期望24*3600，0
(NULL, '38862', '1', '1', 'switch', '2015-06-01 08:00:00', '0000-00-00 00:00:00'),
(NULL, '38865', '1', '2', 'switch', '2015-05-31 20:00:00', '0000-00-00 00:00:00'),

#打开次数与关闭次数相等，如果打开或者关闭次数不是0
#如果关闭时间戳总和，大于等于打开时间戳总和，则直接相减，期望：15*3600
(NULL, '38861', '1', '1', 'switch', '2015-06-04 00:00:00', '0000-00-00 00:00:00'),
(NULL, '38861', '1', '2', 'switch', '2015-06-04 05:00:00', '0000-00-00 00:00:00'),
(NULL, '38861', '1', '1', 'switch', '2015-06-04 14:00:00', '0000-00-00 00:00:00'),
(NULL, '38861', '1', '2', 'switch', '2015-06-04 23:59:59', '0000-00-00 00:00:00'),

#否则，说明今天第一次记录是关闭操作，最后一次记录是打开操作，需要补全开始时间和结束时间，期望：9*3600
(NULL, '38860', '1', '2', 'switch', '2015-06-04 05:00:00', '0000-00-00 00:00:00'),
(NULL, '38860', '1', '1', 'switch', '2015-06-04 20:00:00', '0000-00-00 00:00:00'),

#连续两次关闭开关的记录，则报错，期望：-2
(NULL, '55554', '1', '1', 'switch', '2015-06-04 01:00:00', '0000-00-00 00:00:00'),
(NULL, '55554', '1', '2', 'switch', '2015-06-04 02:00:00', '0000-00-00 00:00:00'),
(NULL, '55554', '1', '2', 'switch', '2015-06-04 03:00:00', '0000-00-00 00:00:00'),

#连续两侧打开开关的记录，则报错，期望：-2
(NULL, '55513', '1', '2', 'switch', '2015-06-04 01:00:00', '0000-00-00 00:00:00'),
(NULL, '55513', '1', '1', 'switch', '2015-06-04 03:00:00', '0000-00-00 00:00:00'),
(NULL, '55513', '1', '1', 'switch', '2015-06-04 05:00:00', '0000-00-00 00:00:00'),

#如果开启时间和与关闭时间和的差值大于一天，数据错误。
(NULL, '55512', '1', '2', 'switch', '2015-06-04 01:00:00', '0000-00-00 00:00:00'),
(NULL, '55512', '1', '1', 'switch', '2015-06-04 03:00:00', '0000-00-00 00:00:00'),
(NULL, '55512', '1', '1', 'switch', '2015-06-04 04:00:00', '0000-00-00 00:00:00'),
(NULL, '55512', '1', '1', 'switch', '2015-06-04 05:00:00', '0000-00-00 00:00:00')
;

```
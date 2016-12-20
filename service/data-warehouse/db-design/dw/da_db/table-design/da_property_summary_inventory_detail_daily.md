### 表结构


```

  `inventory_id` bigint(20) DEFAULT NULL COMMENT '库存ID',
  `community_id` bigint(20) DEFAULT NULL COMMENT '小区id',
  `is_tao` char(1) DEFAULT NULL COMMENT '淘房 N不是,Y是',
  `touch_vppv` bigint(20) DEFAULT NULL COMMENT 'touch vppv',
  `wechat_public_num_vppv` bigint(20) DEFAULT NULL COMMENT 'wechat vppv',
  `pc_vppv` bigint(20) DEFAULT NULL COMMENT 'pc vpud',
  `app_vppv_ios` bigint(20) DEFAULT NULL COMMENT 'app ios vppv',
  `app_vppv_android` bigint(20) DEFAULT NULL COMMENT 'app android vppv',
  `vppv_total` bigint(20) DEFAULT NULL,
  `p_dt` date DEFAULT NULL COMMENT '数据日期',

```

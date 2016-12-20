# udf_api

## 需求
- 维护一份 api 解析维表到 mysql (dw_basis_dimension_pagename_lkp 中)，再导入到 hive table 中
  - 在表字段 match_type 加一个类型，为 3(表示 api 类型)
  - 找珍妮询问需要 统计的 URL 页面
- 看懂解析 udf 跑起来，分成 2 个 jar,把 udf 里的 2 个 java(分别是第二个和第四个) 类迁移出来，打成 2 个 jar 包
- 把内容写到监控中
  - 找 Jason 加


## api 解析资料
```

API 有 3 个路由文件

以 alpha 环境的 URL

所有 API 文档说明文档
http://git.corp.angejia.com/service/design/wikis/Mobile-API/Docs-List

经纪人用户端 api
http://git.corp.angejia.com/service/angejia/blob/alpha/app-mobi/app/Http/routes.php

用户端 api
http://git.corp.angejia.com/service/angejia/blob/alpha/app-mobi-member/app/Http/routes.php

通用 api
http://git.corp.angejia.com/service/angejia/blob/alpha/app-api/app/Http/routes.php
```

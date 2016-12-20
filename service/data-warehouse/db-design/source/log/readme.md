# uba log

- [结构图](http://www.processon.com/view/link/5549cb4ae4b0cc33deaed814) 密码 angejiadocs

## 一、数据来源


### 1、access_log 数据库

#### 说明

网站、以及 API 访问记录，来自 nginx产生的nignx_log

#### 相关表

```

按照日期来划分存放的表

access_log_20150328
access_log_20150329
access_log_20150330

access_log_model 模板表

```

### 2、uba_app_action_log 数据库

#### 说明

app 用户行为日志，来自 app 客户端

记录用户使用APP的动作内容

#### 相关表

```

按照日期来划分存放的表

uba_app_action_log_20150424
uba_app_action_log_20150425
uba_app_action_log_20150426

uba_app_action_log_model 模板表

```

### 3、uba_web_action_log 数据库

#### 说明

用户网站行为日志，来自前台网站

#### 相关表

```
按照日期来划分存放的表

uba_web_action_log_20150513
uba_web_action_log_20150514
uba_web_action_log_20150515

uba_web_action_log_model 模板表
```

### 4、uba_web_visit_log 数据库

#### 说明

用户访问行为日志，来自网站

#### 相关表

```

按照日期来划分存放的表

uba_web_visit_log_20150412
uba_web_visit_log_20150413
uba_web_visit_log_20150414

uba_web_visit_log_model 模板表

```

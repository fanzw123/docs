# UserPortraitAttenuation 用户画像分值衰减

## 一、调用

``` java
1. 指定用户衰减
  java -DAPP_NAME=UserPortraitAttenuation \
  -cp ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar com.angejia.dw.recommend.user.portrait.UserPortraitAttenuation "online" "344361"

2. 所有用户衰减
  java -DAPP_NAME=UserPortraitAttenuation \
  -cp ~/app/recommend/recommend-2.0/target/scala-2.10/recommend-2.0.jar com.angejia.dw.recommend.user.portrait.UserPortraitAttenuation "online" "" >> /data/log/recommend/UserPortraitAttenuation 2>&1  &

3. 日志监控
  cd /data/log/recommend
  tail -f UserPortraitAttenuation
```

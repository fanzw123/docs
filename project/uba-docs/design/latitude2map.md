# 经纬度获取地理位置设计说明

## 一、设计图

![image](/imgs/geturl_archi.png)

## 二、设计步骤

### 前端

	1.index.ejs:获取query string ,调用高德地图API，生成mark地图
	
	2.WEB服务器：node.js

### UDAF
``` 
geturl(lon,lat,time)
 
```  
功能：根据参数，拼接出url

	参数（String）：longtitude,latitude,time
	返回值（String）：http://host:prot?ln=

用例：

	select uid, geturl(longtitude,latitude,time)  from t group by uid; 

## 三、代码实现
### 1.index.ejs

```
  //query点坐标
        var myLngLatXYs = new  Array();
                var  aArray= a.innerHTML.split("|");
    for (var i = 0; i < aArray.length; i++) {
         var tmp=aArray[i].split(",");
          var lnglatXY = new AMap.LngLat(tmp[0],tmp[1]);
          myLngLatXYs[i]=lnglatXY;
              //myLngLatXYs[i] = new Amap.LngLat(tmp[0],tmp[1]);
            }

 function geocoder() {
            for (var i = 0; i < myLngLatXYs.length; i++) {
                console.log(myLngLatXYs[i]);
                var MGeocoder;
                //加载地理编码插件
                AMap.service([ "AMap.Geocoder" ], function() {
                    MGeocoder = new AMap.Geocoder({
                        radius : 1000,
                        extensions : "all"
                    });
                    //逆地理编码

                    MGeocoder.getAddress(myLngLatXYs[i], function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            geocoder_CallBack(result);
                        }
                    });
                });
                //加点

                var marker = new AMap.Marker(
                        {
                            map : map,
                            icon : new AMap.Icon(
                                    {
                                        image : "http://cache.amap.com/lbs/static/jsdemo001.png",
                                        size : new AMap.Size(58, 30),
                                        imageOffset : new AMap.Pixel(-32, -0)
                                    }),
                            position : myLngLatXYs[i],
                            offset : new AMap.Pixel(-5, -30)
                        });
                map.setFitView();
                marker.setMap(map);
                marker.setTitle(tmp[2]);
            }
        }
```

### 2.UDAFGetUrl
```

public class UDAFGetUrl extends UDAF {
	private UDAFGetUrl() {

	}

	static public class GetUrlEvaluator implements UDAFEvaluator {

		ArrayList<String> listData;

		public GetUrlEvaluator() {
			super();
			listData = new ArrayList<String>();
			init();
		}

		public void init() {
			listData.clear();
		}

		// String strLontitude, String strLatitude,
		// strLontitude != null && strLatitude != null &&
		public boolean iterate(String strLon, String strLat, String strTime) {
			if (strLon != null && strLat != null) {
				StringBuilder sb = new StringBuilder();

				sb.append(strLon).append(",").append(strLat).append(",")
						.append(strTime);

				listData.add(sb.toString());
			}
			return true;
		}

		// public UDAFGetUrlState terminatePartial() {
		// return state.strUrl.length() == 1 ? null : state;
		// }

		public ArrayList<String> terminatePartial() {
			return listData;
		}



		public boolean merge(ArrayList<String> o) {
			if (o != null) {
				listData.addAll(o);
			}
			return true;
		}

		public String terminate() {
			StringBuilder sb = new StringBuilder(
					"http://192.168.162.251:3000/?ln=");

			Collections.sort(listData, new Comparator<String>() {
				public int compare(String o1, String o2) {
					return o1.split(",")[2].compareTo(o2.split(",")[2]);
				}
			});

			for (int i = 0; i < listData.size(); i++) {
				if (i != listData.size() - 1) {
					sb.append(listData.get(i)).append("|");
				} else {
					sb.append(listData.get(i));
				}
			}
			return sb.toString();
		}
	}
}

```
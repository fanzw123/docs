# String 类

## 介绍

- String 属于数据引用类型
- 静态初始化
- 动态初始化


## 案例

``` java

public class Test3 {
    public static void main(String[] args) {

        //动态初始化
        String a1 = "静态初始化";

        //动态初始化
        String a2 = new String("动态初始化");


        //累加变量，性能更快
        StringBuffer st = new StringBuffer();
        st.append("123");
        st.append("456");
        st.toString();

    }
}


```

# dw_elasticsearch

- 解决: Elasticsearch 与 HBase guava 包冲突问题

## 一、 新创建一个 java maven 项目

``` java

1. 创建 一个 mvn 项目
   "com.angejia.dw.elasticsearch" % "dw_elasticsearch" % "1.0",

2. pox.xml 写入如下格式文件

3. mvn clean install 编译安装到本地项目

4. 其他项目使用
  sbt
    配置本地仓库
     "Local Maven Repository" at "file:///usr/local/maven/repository",

    增加依赖
    "com.angejia.dw.elasticsearch" % "dw_elasticsearch" % "1.0",

```


## 二. pox.xml 文件

``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.angejia.dw.elasticsearch</groupId>
  <artifactId>dw_elasticsearch</artifactId>
  <version>1.0</version>
  <packaging>jar</packaging>


  <properties>
    <elasticsearch.version>2.3.4</elasticsearch.version>
  </properties>

    <dependencies>
        <dependency>
            <groupId>org.elasticsearch</groupId>
            <artifactId>elasticsearch</artifactId>
            <version>${elasticsearch.version}</version>
        </dependency>
        <dependency>
            <groupId>org.elasticsearch.plugin</groupId>
            <artifactId>shield</artifactId>
            <version>${elasticsearch.version}</version>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>2.4.3</version>
                <configuration>
                    <createDependencyReducedPom>false</createDependencyReducedPom>
                </configuration>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                        <configuration>
                            <relocations>
                                <relocation>
                                    <pattern>com.google.guava</pattern>
                                    <shadedPattern>com.angejia.dw.elasticsearch.guava</shadedPattern>
                                </relocation>
                                <relocation>
                                    <pattern>org.joda</pattern>
                                    <shadedPattern>com.angejia.dw.elasticsearch.joda</shadedPattern>
                                </relocation>
                                <relocation>
                                    <pattern>com.google.common</pattern>
                                    <shadedPattern>com.angejia.dw.elasticsearch.common</shadedPattern>
                                </relocation>
                                <relocation>
                                    <pattern>com.google.thirdparty</pattern>
                                    <shadedPattern>com.angejia.dw.elasticsearch.thirdparty</shadedPattern>
                                </relocation>
                            </relocations>
                            <transformers>
                                <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer" />
                            </transformers>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

    <repositories>
        <repository>
            <id>elasticsearch-releases</id>
            <url>http://maven.elasticsearch.org/releases</url>
            <releases>
                <enabled>true</enabled>
                <updatePolicy>daily</updatePolicy>
            </releases>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>

</project>


```

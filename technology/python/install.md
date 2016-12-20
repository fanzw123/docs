# Python 安装下载配置

## * 安装

### 一、下载地址

- [Linux/UNIX](https://www.python.org/downloads/source/)
- [Mac OS X](https://www.python.org/downloads/mac-osx/)


#### 1、Linux/UNIX

``` python

1. 系统会默认安装 python

2. tar 包方式安装 (如果要折腾的话)
  linx 选择 (Gzipped source tarball) 自己编译

  tar -zxvf Python-version.tgz 解压

  cd Python-version 进入

  ./configure --prefix=/usr/local/Python-version  编译

  make

  make install

```


## * 管理第三方模块

### 一、 管理加载包

#### 1、包存放地址

``` python

1. 管理软件包存放的地址 (pip 和 easy_install)
  /usr/local/lib/python2.7/dist-packages

2. 第三方自定义下载的包存放地址
  /usr/local/lib/python2.7/site-packages

3. 查找 site-packages
  locate site-packages

```

#### 2、加载类包方法

- [文章](http://blog.sina.com.cn/s/blog_7de9d5d80101hlj5.html)

``` python

1.在脚本中
  import sys
  sys.path
  sys.path.append(path)

2.PYTHONPATH 环境变量
  export PYTHONPATH=$PYTHONPATH:/usr/local/lib/python2.7/site-packages

```


### 二、安装 python 管理模块工具


#### 1、easy_install 管理 python 包依赖

- easy_install 是由 PEAK(Python Enterprise Application Kit) 开发的 setuptools 包里带的一个命令，
以使用 easy_install 实际上是在调用 setuptools 来完成安装模块的工作。

``` python

1. apt-get 方式安装
  sudo apt-get install python-setuptools

  1) 操作
    安装包
    easy_install package-name（比如 easy_install pylab)

    卸载包
    easy_install -m package-name （比如easy_install -m pylab)
    easy_install -m 包名，可以卸载软件包，但是卸载后还要手动删除遗留文件。

2. tar 包安装
  https://pypi.python.org/pypi/setuptools/

```

#### 2、pip 工具

- [官方文档](http://pip-cn.readthedocs.org/en/latest/installing.html)

``` python

1.Debian 和 Ubuntu:
  sudo apt-get install python-pip

2.Fedora
  sudo yum install python-pip

3.使用
  sudo pip install pyhs2
```

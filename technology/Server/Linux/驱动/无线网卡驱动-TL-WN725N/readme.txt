1、lsusb  查看网卡设备以及其他usb设备
2、 iwconfig 						//查看网卡是否被内核加载了，如果加载了，要ifconfig ra0 up 启动网卡
3、安装gcc
4、确定内核支持make命令，如果不支持，则升级内核，yum update kernel。再重启
5、到drive目录下，用make install安装。然后拔出无线网卡，再插入
6、 iwlist 网卡名 scan 			//检测网卡查询到的地址，详细见116		
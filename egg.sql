# Host:   (Version: 5.7.26)
# Date: 2023-07-02 22:42:41
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "bill"
#

CREATE TABLE `bill` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pay_type` int(1) NOT NULL,
  `amount` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type_id` int(10) NOT NULL,
  `type_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) NOT NULL,
  `remark` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "bill"
#

REPLACE INTO `bill` VALUES (1,1,'1','1621581570000',1,'餐饮',1,'123'),(2,1,'500','1621581570000',1,'餐饮',1,'123'),(3,1,'1','1621581570000',1,'餐饮',1,'123'),(4,1,'500','1621581570000',1,'餐饮',1,'123');

#
# Structure for table "dict"
#

CREATE TABLE `dict` (
  `dictId` int(11) NOT NULL AUTO_INCREMENT,
  `dictParams` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dictQuery` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dictLabel` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dictValue` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`dictId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "dict"
#

REPLACE INTO `dict` VALUES (1,'任务状态','任务状态','进行中','0'),(2,'任务状态','任务状态','已完成','1'),(3,'任务状态','任务状态','重新指派','2');

#
# Structure for table "img"
#

CREATE TABLE `img` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `chunk` int(11) NOT NULL COMMENT '碎片索引',
  `chunks` int(11) NOT NULL COMMENT '全部碎片',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=105 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "img"
#

REPLACE INTO `img` VALUES (100,'http://134.175.103.137:18010/app/public/img/20220325/1648217713796.jpg','3.jpg',0,0),(101,'http://134.175.103.137:7001/app/public/img/20220325/1648217983174.jpg','47.jpg',0,0),(102,'http://134.175.103.137:7001/app/public/img/20220325/1648219139026.jpg','47.jpg',0,0),(103,'http://134.175.103.137:7001/app/public/img/20220326/1648230198008.jpg','u=1487384194,1439605093&fm=253&fmt=auto&app=138&f=JPEG.jpg',0,0),(104,'https://pic1.zhimg.com/50/v2-2d3d27c045fbdc34596937e82786e56a_720w.jpg?source=1940ef5c','v2-2d3d27c045fbdc34596937e82786e56a_720w.jpg',0,0);

#
# Structure for table "menu"
#

CREATE TABLE `menu` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pid` int(10) DEFAULT '0' COMMENT '父亲id',
  `title` varchar(255) NOT NULL COMMENT '显示标题',
  `url` varchar(50) DEFAULT NULL COMMENT 'url',
  `icon` varchar(50) DEFAULT NULL COMMENT '图标',
  `createtime` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT '1' COMMENT '状态 开启为 1 ，未开启为 0',
  `menuType` varchar(1) NOT NULL DEFAULT '1' COMMENT '菜单类型 1. 菜单 2. 按钮',
  `buttonRole` varchar(50) DEFAULT '' COMMENT '按钮权限',
  `orders` int(10) DEFAULT '0' COMMENT '排序',
  `deleteFlag` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='菜单表';

#
# Data for table "menu"
#

REPLACE INTO `menu` VALUES (1,0,'菜单调价','/url','/icon',NULL,1,'1','none',0,0),(2,1,'新建菜单','ddd','dd',NULL,1,'2','22',0,0),(3,2,'新建菜单','22','22',NULL,1,'1',NULL,22,0),(4,0,'菜单1','/url','icon-xxx',NULL,1,'1','',0,0),(5,4,'子菜单1','/url','icon',NULL,1,'1','1',1,0),(6,5,'子按钮1-1',NULL,NULL,NULL,1,'2',NULL,0,0),(7,0,'菜单2','/url','/icon',NULL,1,'1','',1,0),(8,7,'新建菜单','222','22',NULL,1,'1','11',22,0),(9,0,'22','22','22',NULL,1,'1',NULL,22,1),(10,0,'3213','3123','3123',NULL,1,'1','33',33,1),(11,0,'22','22','22',NULL,1,'2',NULL,22,0),(12,10,'新建菜单11','22','2211',NULL,1,'1','22',22333,1),(13,12,'新建菜单','22','222',NULL,1,'1','222',222,0);

#
# Structure for table "news"
#

CREATE TABLE `news` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `text_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '1 . 存文字 2. 图文',
  `type_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `content` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `agree` int(10) NOT NULL DEFAULT '0',
  `frontImg` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `deleteFlag` int(11) NOT NULL DEFAULT '1',
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "news"
#

REPLACE INTO `news` VALUES (17,'NBA新赛季个战队大洗牌','2',2,1,'NBA新赛季个战队大洗牌，霍华德居然和罗斯同时在一个队，对此你怎么看这个问题',0,'103',1,0),(18,'如何看待山西财经大学一学生跑步时猝死，校方通报称「已与亲属沟通」？','1',2,1,' 听到这类新闻很遗憾 ，也很无奈。 心源性猝死这事基本上99%就看“命”。 救回来，是命好。 救不回来，是常态。 我国（2018年）医院外人',0,NULL,1,1),(19,'为什么就只有希特勒成恶魔了呢？','2',1,1,'大家好，我是希特勒，当你看到这封信的时候，我已经自杀身亡了。 你们对我的一致评价我都知道，说我是反人类的大恶魔，盖棺定论，这我没什么好说的；成王败寇，我的德意志第三帝国已经被美、苏、英、法消灭',0,'104',1,1),(20,'委屈翁二','1',1,1,'111',0,NULL,1,0),(21,'22','1',1,1,'222',0,NULL,1,0),(22,'22','1',1,1,'22',0,NULL,1,0),(23,'22','2',1,1,'22',0,'',1,0),(24,'22','2',1,1,'22',0,'',1,0),(25,'eds','2',1,1,'dasd',0,'',1,0),(26,'DSD','2',1,1,'dasd',0,'',1,0);

#
# Structure for table "task"
#

CREATE TABLE `task` (
  `taskId` int(11) NOT NULL AUTO_INCREMENT,
  `taskName` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `taskPointerId` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `taskPointerToId` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `taskFinishTime` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `taskPointerTime` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `taskContent` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `status` int(1) NOT NULL DEFAULT '0',
  `deleteFlag` int(11) DEFAULT '1',
  PRIMARY KEY (`taskId`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "task"
#

REPLACE INTO `task` VALUES (34,'222','1','1','2023-07-26 00:00:00','2023-07-02 21:58:26','3123',0,0),(35,'3123','1','3','2023-07-26 00:00:00','2023-07-02 21:58:26','3123',0,0),(36,'3123','1','1','2023-07-25 00:00:00','2023-07-02 21:58:26','3123',1,0),(37,'331','1','3','2023-07-26 00:00:00','2023-07-02 21:59:21','3123',0,1),(38,'3123','1','1','2023-07-25 00:00:00','2023-07-02 22:22:32','3123',1,1),(39,'3123','1','1','2023-07-26 00:00:00','2023-07-02 22:23:47','3123',0,1);

#
# Structure for table "type"
#

CREATE TABLE `type` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `deleteFlag` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "type"
#

REPLACE INTO `type` VALUES (1,'生活',1,NULL,1),(2,'体育',2,1,1),(3,'其他',NULL,NULL,1),(14,'2',NULL,NULL,1);

#
# Structure for table "user"
#

CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `signature` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `work` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ctime` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `deleteFlag` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "user"
#

REPLACE INTO `user` VALUES (1,'zhengyongkai','123456','郑永楷','我爱他，海誓山盟','http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png','数据分析师','1644655828615',1),(3,'cai','123456','菜菜子','菜菜子并不菜','http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png','程序员','1644655828615',1);

#
# Structure for table "user_role"
#

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户菜单表';

#
# Data for table "user_role"
#


-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2022 年 05 月 27 日 08:10
-- 伺服器版本： 5.6.47-log
-- PHP 版本： 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `juejue-cost`
--

-- --------------------------------------------------------

--
-- 資料表結構 `bill`
--

CREATE TABLE `bill` (
  `id` int(10) NOT NULL,
  `pay_type` int(1) NOT NULL,
  `amount` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type_id` int(10) NOT NULL,
  `type_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) NOT NULL,
  `remark` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `bill`
--

INSERT INTO `bill` (`id`, `pay_type`, `amount`, `date`, `type_id`, `type_name`, `user_id`, `remark`) VALUES
(1, 1, '1', '1621581570000', 1, '餐饮', 1, '123'),
(2, 1, '500', '1621581570000', 1, '餐饮', 1, '123'),
(3, 1, '1', '1621581570000', 1, '餐饮', 1, '123'),
(4, 1, '500', '1621581570000', 1, '餐饮', 1, '123');

-- --------------------------------------------------------

--
-- 資料表結構 `img`
--

CREATE TABLE `img` (
  `id` int(10) NOT NULL,
  `img_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `img`
--

INSERT INTO `img` (`id`, `img_url`, `filename`) VALUES
(100, 'http://134.175.103.137:18010/app/public/img/20220325/1648217713796.jpg', '3.jpg'),
(101, 'http://134.175.103.137:7001/app/public/img/20220325/1648217983174.jpg', '47.jpg'),
(102, 'http://134.175.103.137:7001/app/public/img/20220325/1648219139026.jpg', '47.jpg'),
(103, 'http://134.175.103.137:7001/app/public/img/20220326/1648230198008.jpg', 'u=1487384194,1439605093&fm=253&fmt=auto&app=138&f=JPEG.jpg'),
(104, 'https://pic1.zhimg.com/50/v2-2d3d27c045fbdc34596937e82786e56a_720w.jpg?source=1940ef5c', 'v2-2d3d27c045fbdc34596937e82786e56a_720w.jpg');

-- --------------------------------------------------------

--
-- 資料表結構 `news`
--

CREATE TABLE `news` (
  `id` int(10) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `text_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '1 . 存文字 2. 图文',
  `type_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `content` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `agree` int(10) NOT NULL DEFAULT '0',
  `frontImg` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `deleteFlag` int(11) NOT NULL DEFAULT '1',
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `news`
--

INSERT INTO `news` (`id`, `title`, `text_type`, `type_id`, `user_id`, `content`, `agree`, `frontImg`, `deleteFlag`, `status`) VALUES
(18, '如何看待山西财经大学一学生跑步时猝死，校方通报称「已与亲属沟通」？', '1', 2, 1, ' 听到这类新闻很遗憾 ，也很无奈。 心源性猝死这事基本上99%就看“命”。 救回来，是命好。 救不回来，是常态。 我国（2018年）医院外人', 0, NULL, 1, 0),
(17, 'NBA新赛季个战队大洗牌', '2', 2, 1, 'NBA新赛季个战队大洗牌，霍华德居然和罗斯同时在一个队，对此你怎么看这个问题', 0, '103', 1, 0),
(19, '为什么就只有希特勒成恶魔了呢？', '2', 1, 1, '大家好，我是希特勒，当你看到这封信的时候，我已经自杀身亡了。 你们对我的一致评价我都知道，说我是反人类的大恶魔，盖棺定论，这我没什么好说的；成王败寇，我的德意志第三帝国已经被美、苏、英、法消灭', 0, '104', 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `type`
--

CREATE TABLE `type` (
  `id` int(10) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `deleteFlag` int(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `type`
--

INSERT INTO `type` (`id`, `name`, `type`, `user_id`, `deleteFlag`) VALUES
(1, '生活', 1, NULL, 1),
(2, '体育', 2, 1, 1),
(3, '其他', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `signature` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `work` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ctime` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `signature`, `avatar`, `work`, `ctime`) VALUES
(1, 'zhengyongkai', '123456', '郑永楷', '111', 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png', '数据分析师', '1644655828615');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `img`
--
ALTER TABLE `img`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `news`
--
ALTER TABLE `news`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `type`
--
ALTER TABLE `type`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
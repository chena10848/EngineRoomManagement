-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-07-06 03:23:44
-- 伺服器版本： 10.4.24-MariaDB
-- PHP 版本： 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `engineroom`
--

-- --------------------------------------------------------

--
-- 資料表結構 `checkinrecord`
--

CREATE TABLE `checkinrecord` (
  `cr01` varchar(10) NOT NULL,
  `cr02` datetime NOT NULL,
  `cr03` datetime DEFAULT NULL,
  `cr04` varchar(20) DEFAULT NULL,
  `cr05` datetime DEFAULT NULL,
  `cr06` bit(1) DEFAULT NULL,
  `cr07` varchar(20) DEFAULT NULL,
  `cr08` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `checkinrecord`
--

-- --------------------------------------------------------

--
-- 資料表結構 `departmenthead`
--

CREATE TABLE `departmenthead` (
  `dh01` varchar(20) NOT NULL,
  `dh02` varchar(20) NOT NULL,
  `dh03` datetime NOT NULL,
  `dh04` varchar(20) NOT NULL,
  `dh05` datetime DEFAULT NULL,
  `dh06` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `departmenthead`
--



-- --------------------------------------------------------

--
-- 資料表結構 `groups`
--

CREATE TABLE `groups` (
  `gp01` varchar(20) NOT NULL,
  `gp02` varchar(20) NOT NULL,
  `gp03` bit(1) NOT NULL,
  `gp04` datetime NOT NULL,
  `gp05` varchar(20) NOT NULL,
  `gp06` datetime DEFAULT NULL,
  `gp07` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `groups`
--


-- --------------------------------------------------------

--
-- 資料表結構 `permissions`
--

CREATE TABLE `permissions` (
  `ps01` varchar(20) NOT NULL,
  `ps02` varchar(20) NOT NULL,
  `ps03` bit(1) NOT NULL DEFAULT b'1',
  `ps04` datetime NOT NULL,
  `ps05` varchar(20) NOT NULL,
  `ps06` datetime DEFAULT NULL,
  `ps07` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `permissions`
--

INSERT INTO `permissions` (`ps01`, `ps02`, `ps03`, `ps04`, `ps05`, `ps06`, `ps07`) VALUES
('admin', '管理員', b'1', '2023-05-05 09:29:34', 'admin', '2023-05-11 16:55:27', 'itgroup'),
('Information', '資訊部', b'1', '2023-05-09 15:44:49', 'A10848', '2023-05-26 15:37:48', 'itgroup'),
('manage', '管理部', b'1', '2023-05-10 09:35:11', 'A10848', '2023-05-26 15:37:57', 'itgroup'),
('InformationManager', '資訊部主管', b'1', '2023-05-12 11:03:05', 'itgroup', '2023-05-26 15:38:08', 'itgroup');

-- --------------------------------------------------------

--
-- 資料表結構 `programbody`
--

CREATE TABLE `programbody` (
  `pb01` varchar(10) NOT NULL,
  `pb02` varchar(20) NOT NULL,
  `pb03` datetime NOT NULL,
  `pb04` varchar(20) NOT NULL,
  `pb05` datetime DEFAULT NULL,
  `pb06` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `programbody`
--

INSERT INTO `programbody` (`pb01`, `pb02`, `pb03`, `pb04`, `pb05`, `pb06`) VALUES
('A0001', '進出理由填寫', '2023-05-05 04:30:45', 'admin', NULL, NULL),
('A0002', '進出機房報表列印', '2023-05-05 04:31:17', 'admin', NULL, NULL),
('A0003', '主管審核', '2023-05-05 04:31:36', 'admin', NULL, NULL),
('B0001', '個人資料設定', '2023-05-05 04:31:47', 'admin', NULL, NULL),
('B0002', '密碼修改', '2023-05-05 04:32:03', 'admin', NULL, NULL),
('C0001', '使用者帳號設定', '2023-05-05 04:32:15', 'admin', NULL, NULL),
('C0002', '群組管理設定', '2023-05-05 04:32:30', 'admin', NULL, NULL),
('C0003', '部門主管設定', '2023-05-11 10:48:17', 'admin', NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `programhead`
--

CREATE TABLE `programhead` (
  `ph01` varchar(10) NOT NULL,
  `ph02` varchar(20) NOT NULL,
  `ph03` datetime NOT NULL,
  `ph04` varchar(20) NOT NULL,
  `ph05` datetime DEFAULT NULL,
  `ph06` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `programhead`
--

INSERT INTO `programhead` (`ph01`, `ph02`, `ph03`, `ph04`, `ph05`, `ph06`) VALUES
('1', '機房管理', '2023-05-05 04:29:44', 'admin', NULL, NULL),
('2', '使用者設定', '2023-05-05 04:30:11', 'admin', NULL, NULL),
('3', '管理員設定', '2023-05-05 04:30:17', 'admin', NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `programjoin`
--

CREATE TABLE `programjoin` (
  `pj01` varchar(10) NOT NULL,
  `pj02` varchar(10) NOT NULL,
  `pj03` datetime NOT NULL,
  `pj04` varchar(20) NOT NULL,
  `pj05` datetime DEFAULT NULL,
  `pj06` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `programjoin`
--

INSERT INTO `programjoin` (`pj01`, `pj02`, `pj03`, `pj04`, `pj05`, `pj06`) VALUES
('1', 'A0001', '2023-05-05 04:34:19', 'admin', NULL, NULL),
('1', 'A0002', '2023-05-05 04:34:29', 'admin', NULL, NULL),
('1', 'A0003', '2023-05-05 04:34:37', 'admin', NULL, NULL),
('2', 'B0001', '2023-05-05 04:34:45', 'admin', NULL, NULL),
('2', 'B0002', '2023-05-05 04:34:56', 'admin', NULL, NULL),
('3', 'C0001', '2023-05-05 04:35:03', 'admin', NULL, NULL),
('3', 'C0002', '2023-05-05 04:35:13', 'admin', NULL, NULL),
('3', 'C0003', '2023-05-11 10:47:47', 'admin', NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `us01` varchar(20) NOT NULL,
  `us02` varchar(32) NOT NULL,
  `us03` varchar(10) NOT NULL,
  `us04` varchar(40) NOT NULL,
  `us05` varchar(40) NOT NULL,
  `us06` varchar(10) DEFAULT NULL,
  `us07` datetime DEFAULT NULL,
  `us08` varchar(256) DEFAULT NULL,
  `us09` datetime NOT NULL,
  `us10` varchar(20) NOT NULL,
  `us11` datetime DEFAULT NULL,
  `us12` varchar(20) DEFAULT NULL,
  `us13` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`us01`, `us02`, `us03`, `us04`, `us05`, `us06`, `us07`, `us08`, `us09`, `us10`, `us11`, `us12`, `us13`) VALUES
('admin', '21232f297a57a5a743894a0e4a801fc3', 'itgroup', '管理員', 'admin', '0', '2023-04-20 00:00:00', '', '2023-04-20 00:00:00', 'admin', '2023-05-29 16:38:51', 'itgroup', b'1');

-- --------------------------------------------------------

--
-- 資料表結構 `userpermissions`
--

CREATE TABLE `userpermissions` (
  `up01` varchar(20) NOT NULL,
  `up02` varchar(20) NOT NULL,
  `up03` datetime NOT NULL,
  `up04` varchar(20) NOT NULL,
  `up05` datetime DEFAULT NULL,
  `up06` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `userpermissions`
--

INSERT INTO `userpermissions` (`up01`, `up02`, `up03`, `up04`, `up05`, `up06`) VALUES
('admin', 'admin', '2023-05-05 09:08:00', 'admin', NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `userspecial`
--

CREATE TABLE `userspecial` (
  `us01` varchar(20) NOT NULL,
  `us02` varchar(20) NOT NULL,
  `us03` datetime NOT NULL,
  `us04` varchar(20) NOT NULL,
  `us05` datetime NOT NULL,
  `us06` varchar(20) NOT NULL,
  `us07` datetime DEFAULT NULL,
  `us08` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `departmenthead`
--
ALTER TABLE `departmenthead`
  ADD PRIMARY KEY (`dh01`);

--
-- 資料表索引 `programjoin`
--
ALTER TABLE `programjoin`
  ADD PRIMARY KEY (`pj01`,`pj02`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`us01`);

--
-- 資料表索引 `userpermissions`
--
ALTER TABLE `userpermissions`
  ADD PRIMARY KEY (`up01`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 29, 2023 at 08:29 AM
-- Server version: 8.0.34-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbportal`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_user`
--

CREATE TABLE `t_user` (
  `tusrNama` varchar(255) NOT NULL DEFAULT '',
  `tusrPassword` varchar(255) DEFAULT NULL,
  `tusrThakrId` smallint NOT NULL DEFAULT '0',
  `tusrProfil` varchar(40) DEFAULT NULL,
  `tusrPasswordOld` varchar(255) DEFAULT NULL,
  `tusrPertanyaan` varchar(255) DEFAULT NULL,
  `tusrJawaban` varchar(255) DEFAULT NULL,
  `tusrSignature` varchar(255) DEFAULT NULL,
  `tusrAvatar` varchar(100) DEFAULT NULL,
  `tusrEmail` varchar(50) DEFAULT NULL,
  `tusrIsTampilBiodata` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `tusrNoTelp` varchar(50) DEFAULT NULL,
  `tusrRefIndex` varchar(20) DEFAULT NULL,
  `tusrUntId` int UNSIGNED DEFAULT NULL,
  `tusrIsAgree` tinyint UNSIGNED DEFAULT '0',
  `tusrAgreementDate` datetime DEFAULT NULL,
  `tusrLastAccess` datetime DEFAULT NULL,
  `tusrIsOnline` tinyint(1) DEFAULT '0',
  `tusrProdiKode` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `t_user`
--

INSERT INTO `t_user` (`tusrNama`, `tusrPassword`, `tusrThakrId`, `tusrProfil`, `tusrPasswordOld`, `tusrPertanyaan`, `tusrJawaban`, `tusrSignature`, `tusrAvatar`, `tusrEmail`, `tusrIsTampilBiodata`, `tusrNoTelp`, `tusrRefIndex`, `tusrUntId`, `tusrIsAgree`, `tusrAgreementDate`, `tusrLastAccess`, `tusrIsOnline`, `tusrProdiKode`) VALUES
('1611512014', 'enomarozi12301', 1, 'ENO MAROZI', 'enomarozi1230', NULL, NULL, NULL, NULL, 'marozi_eno@yahoo.com', 0, '082288400386', '1611512014', 1011015, 1, '2017-01-01 07:33:16', '2022-09-06 06:07:39', 0, 421);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`tusrNama`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

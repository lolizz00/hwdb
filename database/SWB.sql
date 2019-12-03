-- MariaDB dump 10.17  Distrib 10.4.8-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: SWB
-- ------------------------------------------------------
-- Server version	10.4.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Devices`
--

DROP TABLE IF EXISTS `Devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Devices` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Type ID` int(11) DEFAULT NULL,
  `Serial Code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Devices_Types_ID_fk` (`Type ID`),
  CONSTRAINT `Devices_Types_ID_fk` FOREIGN KEY (`Type ID`) REFERENCES `Types` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devices`
--

LOCK TABLES `Devices` WRITE;
/*!40000 ALTER TABLE `Devices` DISABLE KEYS */;
INSERT INTO `Devices` VALUES (0,NULL,'Неизвестное устройство'),(52,45,'111'),(53,45,'222'),(54,45,'333');
/*!40000 ALTER TABLE `Devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Places`
--

DROP TABLE IF EXISTS `Places`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Places` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Places_Name_uindex` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Places`
--

LOCK TABLES `Places` WRITE;
/*!40000 ALTER TABLE `Places` DISABLE KEYS */;
INSERT INTO `Places` VALUES (18,'БУУУУЙ'),(17,'ДУУУУУЙ'),(0,'Неизвестное место'),(4,'Склад'),(3,'Склад хуяд'),(16,'ХУУУУЙ');
/*!40000 ALTER TABLE `Places` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Places History`
--

DROP TABLE IF EXISTS `Places History`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Places History` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Device ID` int(11) DEFAULT NULL,
  `Place ID` int(11) DEFAULT NULL,
  `Time` date NOT NULL,
  `User ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Places History_Devices_ID_fk` (`Device ID`),
  KEY `Places History_Places_ID_fk` (`Place ID`),
  KEY `Places History_Users_ID_fk` (`User ID`),
  CONSTRAINT `Places History_Devices_ID_fk` FOREIGN KEY (`Device ID`) REFERENCES `Devices` (`ID`),
  CONSTRAINT `Places History_Places_ID_fk` FOREIGN KEY (`Place ID`) REFERENCES `Places` (`ID`),
  CONSTRAINT `Places History_Users_ID_fk` FOREIGN KEY (`User ID`) REFERENCES `Users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Places History`
--

LOCK TABLES `Places History` WRITE;
/*!40000 ALTER TABLE `Places History` DISABLE KEYS */;
INSERT INTO `Places History` VALUES (35,52,17,'2019-12-03',143),(36,52,17,'2019-12-03',143),(37,52,17,'2019-12-03',143),(38,53,4,'2019-12-03',152),(39,53,4,'2019-12-03',152),(40,53,4,'2019-12-03',152),(41,54,3,'2019-12-03',61),(42,54,3,'2019-12-03',61),(43,54,3,'2019-12-03',61);
/*!40000 ALTER TABLE `Places History` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Revisions`
--

DROP TABLE IF EXISTS `Revisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Revisions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Revisions_Name_uindex` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Revisions`
--

LOCK TABLES `Revisions` WRITE;
/*!40000 ALTER TABLE `Revisions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Revisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Revisions For Types`
--

DROP TABLE IF EXISTS `Revisions For Types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Revisions For Types` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Revision ID` int(11) DEFAULT NULL,
  `Type ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Revisions For Types`
--

LOCK TABLES `Revisions For Types` WRITE;
/*!40000 ALTER TABLE `Revisions For Types` DISABLE KEYS */;
/*!40000 ALTER TABLE `Revisions For Types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Revisions History`
--

DROP TABLE IF EXISTS `Revisions History`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Revisions History` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Revision ID` int(11) NOT NULL,
  `Device ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Revisions History`
--

LOCK TABLES `Revisions History` WRITE;
/*!40000 ALTER TABLE `Revisions History` DISABLE KEYS */;
/*!40000 ALTER TABLE `Revisions History` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tests`
--

DROP TABLE IF EXISTS `Tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tests` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(5000) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Test_Name_uindex` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tests`
--

LOCK TABLES `Tests` WRITE;
/*!40000 ALTER TABLE `Tests` DISABLE KEYS */;
INSERT INTO `Tests` VALUES (0,'Неизвестный тест','-'),(1,'Базовая проверка','<p><strong>ааааааа</strong></p>\n'),(2,'Проверка Электроники','<p><strong>Позвать Роберта</strong></p>\n'),(18,'Какой то тест','<p><strong>Какое то описание</strong></p>\n'),(25,'Тест','<p><strong>А может и не ест ядей</strong></p>\n'),(33,'Тест с html описанием','<ol>\n	<li>1</li>\n	<li>2</li>\n	<li>3</li>\n	<li>3</li>\n</ol>\n\n<blockquote>\n<p>11111</p>\n</blockquote>\n\n<p>&THORN;&egrave;</p>\n\n<p>&nbsp;</p>\n\n<p><s>аааааа</s></p>\n'),(35,'Второй тест с описанием','<p><strong>123</strong></p>\n\n<p><em><strong>321</strong></em></p>\n\n<blockquote>\n<p><em><strong>123</strong></em></p>\n</blockquote>\n\n<ul>\n	<li>1</li>\n	<li>2</li>\n	<li>3</li>\n</ul>\n'),(36,'Тест с картинкой','<p><img alt=\"\" src=\"https://cdn.pixabay.com/photo/2017/11/02/12/05/lama-2910939_1280.jpg\" style=\"height:214px; width:330px\" /></p>\n');
/*!40000 ALTER TABLE `Tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tests For Types`
--

DROP TABLE IF EXISTS `Tests For Types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tests For Types` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Type ID` int(11) NOT NULL,
  `Test ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Tests For Types_Tests_ID_fk` (`Test ID`),
  KEY `Tests For Types_pk` (`Type ID`),
  KEY `Tests For Types_pk_2` (`Type ID`),
  CONSTRAINT `Tests For Types_Tests_ID_fk` FOREIGN KEY (`Test ID`) REFERENCES `Tests` (`ID`),
  CONSTRAINT `Tests For Types_Types_ID_fk` FOREIGN KEY (`Type ID`) REFERENCES `Types` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tests For Types`
--

LOCK TABLES `Tests For Types` WRITE;
/*!40000 ALTER TABLE `Tests For Types` DISABLE KEYS */;
INSERT INTO `Tests For Types` VALUES (31,45,1),(32,45,18),(33,45,2),(34,45,25);
/*!40000 ALTER TABLE `Tests For Types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tests History`
--

DROP TABLE IF EXISTS `Tests History`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tests History` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Device ID` int(11) DEFAULT NULL,
  `Test ID` int(11) DEFAULT NULL,
  `Time` date NOT NULL,
  `Result` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `User ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Tests History_Devices_ID_fk` (`Device ID`),
  KEY `Tests History_Test_ID_fk` (`Test ID`),
  KEY `Tests History_Users_ID_fk` (`User ID`),
  CONSTRAINT `Tests History_Devices_ID_fk` FOREIGN KEY (`Device ID`) REFERENCES `Devices` (`ID`),
  CONSTRAINT `Tests History_Test_ID_fk` FOREIGN KEY (`Test ID`) REFERENCES `Tests` (`ID`),
  CONSTRAINT `Tests History_Users_ID_fk` FOREIGN KEY (`User ID`) REFERENCES `Users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tests History`
--

LOCK TABLES `Tests History` WRITE;
/*!40000 ALTER TABLE `Tests History` DISABLE KEYS */;
INSERT INTO `Tests History` VALUES (78,52,1,'2019-12-03','ОК',143),(79,52,1,'2019-12-02','ОК',143),(80,52,1,'2019-12-01','ОК',143),(81,53,2,'2019-12-03','Частично',61),(82,53,2,'2019-12-02','Частично',61),(83,53,2,'2019-12-01','Частично',61),(84,54,25,'2019-12-03','+-',152),(85,54,25,'2019-12-02','+-',152),(86,54,25,'2019-12-01','+-',152);
/*!40000 ALTER TABLE `Tests History` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Types`
--

DROP TABLE IF EXISTS `Types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Types` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Types`
--

LOCK TABLES `Types` WRITE;
/*!40000 ALTER TABLE `Types` DISABLE KEYS */;
INSERT INTO `Types` VALUES (32,'777'),(44,'jjj'),(1,'RSR'),(45,'SWB'),(8,'SWB_PEX'),(31,'SWB_PX'),(11,'TEST1'),(38,'Какой то тип'),(0,'Неизвестный тип'),(10,'Хуй');
/*!40000 ALTER TABLE `Types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Full Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (61,'root','24f863cab19f8600b622ce1391431b4c','Тимофей Волков'),(143,'alex','098f6bcd4621d373cade4e832627b4f6','Александра Курочкина'),(152,'testt','1a1dc91c907325c69271ddf0c944bc72','Тестировщик');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-03 21:52:20

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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devices`
--

LOCK TABLES `Devices` WRITE;
/*!40000 ALTER TABLE `Devices` DISABLE KEYS */;
INSERT INTO `Devices` VALUES (0,NULL,'Неизвестное устройство');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Places`
--

LOCK TABLES `Places` WRITE;
/*!40000 ALTER TABLE `Places` DISABLE KEYS */;
INSERT INTO `Places` VALUES (0,'Неизвестное место'),(3,'Склад'),(4,'Склад 2');
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
  `Time` datetime NOT NULL,
  `User ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Places History_Devices_ID_fk` (`Device ID`),
  KEY `Places History_Places_ID_fk` (`Place ID`),
  KEY `Places History_Users_ID_fk` (`User ID`),
  CONSTRAINT `Places History_Devices_ID_fk` FOREIGN KEY (`Device ID`) REFERENCES `Devices` (`ID`),
  CONSTRAINT `Places History_Places_ID_fk` FOREIGN KEY (`Place ID`) REFERENCES `Places` (`ID`),
  CONSTRAINT `Places History_Users_ID_fk` FOREIGN KEY (`User ID`) REFERENCES `Users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Places History`
--

LOCK TABLES `Places History` WRITE;
/*!40000 ALTER TABLE `Places History` DISABLE KEYS */;
INSERT INTO `Places History` VALUES (24,NULL,NULL,'2019-11-15 21:11:10',61);
/*!40000 ALTER TABLE `Places History` ENABLE KEYS */;
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
  `Description` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Test_Name_uindex` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tests`
--

LOCK TABLES `Tests` WRITE;
/*!40000 ALTER TABLE `Tests` DISABLE KEYS */;
INSERT INTO `Tests` VALUES (0,'Неизвестный тест','-'),(1,'Базовая проверка','null'),(2,'Проверка Электроники','Позвать Роберта'),(14,'Грабли','Привет');
/*!40000 ALTER TABLE `Tests` ENABLE KEYS */;
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
  `Time` datetime NOT NULL,
  `Result` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `User ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Tests History_Devices_ID_fk` (`Device ID`),
  KEY `Tests History_Test_ID_fk` (`Test ID`),
  KEY `Tests History_Users_ID_fk` (`User ID`),
  CONSTRAINT `Tests History_Devices_ID_fk` FOREIGN KEY (`Device ID`) REFERENCES `Devices` (`ID`),
  CONSTRAINT `Tests History_Test_ID_fk` FOREIGN KEY (`Test ID`) REFERENCES `Tests` (`ID`),
  CONSTRAINT `Tests History_Users_ID_fk` FOREIGN KEY (`User ID`) REFERENCES `Users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tests History`
--

LOCK TABLES `Tests History` WRITE;
/*!40000 ALTER TABLE `Tests History` DISABLE KEYS */;
INSERT INTO `Tests History` VALUES (31,NULL,NULL,'2019-11-26 12:12:12','OK',61),(32,NULL,NULL,'2019-11-26 12:12:12','OK',61),(33,NULL,NULL,'2019-11-26 12:12:12','OK',61),(34,NULL,NULL,'2019-11-26 12:12:12','OK',61),(35,NULL,NULL,'2019-11-26 12:12:12','OK',61),(36,NULL,NULL,'2019-11-26 12:12:12','OK',61),(37,NULL,NULL,'2019-11-26 12:12:12','OK',61);
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Types`
--

LOCK TABLES `Types` WRITE;
/*!40000 ALTER TABLE `Types` DISABLE KEYS */;
INSERT INTO `Types` VALUES (32,'777'),(9,'RSR'),(8,'SWB_PEX'),(31,'SWB_PX'),(10,'TEST'),(11,'TEST1'),(0,'Неизвестный тип');
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
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (61,'root','24f863cab19f8600b622ce1391431b4c','Тимофей Волков'),(143,'test','098f6bcd4621d373cade4e832627b4f6','Александра Курочкина'),(144,'lolizz00','e63c5abb6586c0eca103736855bce7e6',NULL),(146,'lolzz00','e63c5abb6586c0eca103736855bce7e6',NULL),(147,'z00','e63c5abb6586c0eca103736855bce7e6',NULL),(148,'z0','e63c5abb6586c0eca103736855bce7e6','VIL');
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

-- Dump completed on 2019-11-26 15:11:23

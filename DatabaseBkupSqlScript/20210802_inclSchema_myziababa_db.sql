CREATE DATABASE  IF NOT EXISTS `myziababa_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `myziababa_db`;
-- MySQL dump 10.16  Distrib 10.1.36-MariaDB, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: myziababa_db
-- ------------------------------------------------------
-- Server version	10.1.36-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo` (
  `_photoId` int(11) NOT NULL AUTO_INCREMENT,
  `reviewId` int(11) NOT NULL,
  `photolink` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`_photoId`),
  KEY `fk_reviewId` (`reviewId`),
  CONSTRAINT `fk_reviewId` FOREIGN KEY (`reviewId`) REFERENCES `review` (`_reviewId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,1,'./images/reviewphoto/excellentfood.png'),(2,3,'./images/reviewphoto/Tiptopfood.png'),(3,3,'./images/reviewphoto/Superfood.png');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurant` (
  `_restaurantId` int(11) NOT NULL AUTO_INCREMENT,
  `restaurantname` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restaurantaddr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restaurantimagelink` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `openinghour` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`_restaurantId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'Good Good Food','111 Orchard Road, #05-555, S(111111)','./images/restaurant/rest01.jpg','Central','Mon-Fri: 9am-9pm, Sat-Sun:9am-11pm','+65 12345678','https://www.goodgoodfood.com/'),(2,'All Time High','222 Yishun Road, #03-777, S(222222)','./images/restaurant/rest02.jpg','North','Mon-Fri: 10am-9pm, Sat-Sun:10am-11pm','+65 22345678','https://www.ultimaterestaurant.com/'),(3,'Yummy Yummy Restaurant','333 Marina Bay, #02-888, S(333333)','./images/restaurant/rest03.jpg','South','Mon-Fri: 11am-9pm, Sat-Sun:11am-11pm','+65 32345678','https://www.yummyyummyrestaurant.com/'),(4,'Tip Top Restaurant','555 Shenton Way, #02-999, S(555555)','./images/restaurant/rest04.jpg','South','Mon-Fri: 11am-10pm, Sat-Sun:10am-11pm','+65 42345678','https://www.tiptoprestaurant.com/'),(5,'Crystal Good Restaurant','110 Orchard Road, #07-777, S(111110)','./images/restaurant/rest05.jpg','Central','Mon-Fri: 9am-9pm, Sat-Sun:9am-11pm','+65 12348888','https://www.crystalgood.com/'),(6,'Super Restaurant','333 Yishun Road, #03-777, S(222222)','./images/restaurant/rest06.jpg','North','Mon-Fri: 10am-9pm, Sat-Sun:10am-11pm','+65 22345678','https://www.super.com/'),(7,'Great Great Restaurant','222 Marina Bay, #02-888, S(333222)','./images/restaurant/rest07.jpg','South','Mon-Fri: 11am-9pm, Sat-Sun:11am-11pm','+65 32345678','https://www.greatgreat.com/'),(8,'Fantastic Restaurant','111 Shenton Way, #02-999, S(555111)','./images/restaurant/rest08.jpg','South','Mon-Fri: 11am-10pm, Sat-Sun:10am-11pm','+65 42345678','https://www.fantastic.com/'),(9,'Best Best Restaurant','33 Changi Road, #03-33, S(111033)','./images/restaurant/rest09.jpg','East','Mon-Fri: 9am-9pm, Sat-Sun:9am-11pm','+65 12348888','https://www.bestbest.com/'),(10,'Ah Huat Restaurant','123 Jurong Road, #01-123, S(222123)','./images/restaurant/rest10.jpg','West','Mon-Fri: 10am-9pm, Sat-Sun:10am-11pm','+65 22345678','https://www.ahhuat.com/'),(11,'Fatty Restaurant','22 Bedok Road, #02-22, S(333022)','./images/restaurant/rest11.jpg','East','Mon-Fri: 11am-9pm, Sat-Sun:11am-11pm','+65 32345678','https://www.fatty.com/'),(12,'Nice Nice Restaurant','89 Clementi Road, #02-89, S(555089)','./images/restaurant/rest12.jpg','West','Mon-Fri: 11am-10pm, Sat-Sun:10am-11pm','+65 42345678','https://www.nicenice.com/'),(13,'Great Grandma Restaurant','99 Chai Chee Road, #01-99, S(111099)','./images/restaurant/rest13.jpg','East','Mon-Fri: 9am-9pm, Sat-Sun:9am-11pm','+65 12348888','https://www.grandgrandma.com/'),(14,'Dining By The Sea','1 Sentosa Cove, Ocean Drive, #01-01, S(222001)','./images/restaurant/rest14.jpg','South','Mon-Fri: 10am-9pm, Sat-Sun:10am-11pm','+65 22345678','https://www.bythesea.com/'),(15,'White White Restaurant','87 Punggol Road, #01-22, S(333087)','./images/restaurant/rest15.jpg','North','Mon-Fri: 11am-9pm, Sat-Sun:11am-11pm','+65 32345678','https://www.whitewhite.com/'),(16,'Sweet Sweet Restaurant','28 Seletar Road, #02-89, S(555028)','./images/restaurant/rest16.jpg','North','Mon-Fri: 11am-10pm, Sat-Sun:10am-11pm','+65 42345678','https://www.sweetsweet.com/');
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `_reviewId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `restaurantId` int(11) NOT NULL,
  `datePosted` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int(11) NOT NULL,
  PRIMARY KEY (`_reviewId`),
  KEY `fk_userId` (`userId`),
  KEY `fk_restaurantId` (`restaurantId`),
  CONSTRAINT `fk_restaurantId` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`_restaurantId`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `useraccount` (`_userAccountId`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,1,'2020-10-23 14:55:33','This restaurant the food is excellent',7),(2,3,3,'2020-11-12 22:17:24','This restaurant the food is suck',4),(3,4,4,'2020-11-27 20:47:28','This restaurant the food is tip top',8),(4,2,3,'2020-10-23 14:55:33','This restaurant the food is so so',5),(7,7,14,'2020-11-10 14:04:54','It service and food is super! It\'s also a great place for a romantic dining experience.',9),(8,1,14,'2020-11-10 14:18:35','An excellent place for dining. But will burn a big hole in your pocket.',8),(9,3,2,'2020-11-12 14:31:27','The food and ambience here is GREAT!!.',7),(10,3,6,'2020-11-10 20:10:16','OK. I like the food here. ',6),(11,3,9,'2020-11-12 21:41:42','The food here so so only lah. Bei hiam ai sai.',5),(12,1,2,'2021-4-12 10:31:4','Super ambience and fantastic service! Always feeling GREAT whenever I come here.',8),(13,1,15,'2020-11-10 20:24:32','Nice ambience. I like the clean environment. Food not bad.',7),(14,9,10,'2020-11-12 16:22:19','Down here, will definite HUAT AH(for the owner)! Yourself will be por por chan ah.',5),(15,9,7,'2020-11-12 17:6:59','The food and service here is great, though the area maybe a bit cramp. ',7),(16,9,13,'2020-11-10 20:39:26','The ambience and style of cooking is very traditional. Like it very much.',9),(17,6,13,'2020-11-10 20:37:54','Great food. Great servicing. And value for money.',8),(18,9,14,'2020-11-12 21:44:5','Great place great ambience. Nothing to complain other than the $$$.  Make sure you have deep deep pocket if you bring your rendezvous here for a unforgettable evening.',8),(20,3,14,'2020-11-13 11:34:1','Super place for dining. Excellent service.',9),(21,13,3,'2020-11-13 13:33:12','The food here ok.',6),(22,14,4,'2020-11-13 14:43:33','Good place for food and gathering. ',6),(23,6,8,'2021-6-31 21:13:8','fantastic place for dining',7);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useraccount`
--

DROP TABLE IF EXISTS `useraccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useraccount` (
  `_userAccountId` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailaddr` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `homeaddr` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profilephotolink` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`_userAccountId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccount`
--

LOCK TABLES `useraccount` WRITE;
/*!40000 ALTER TABLE `useraccount` DISABLE KEYS */;
INSERT INTO `useraccount` VALUES (1,'marktan','marktan@gmail.com','Mark','Tan','+65 12345610','333 Tiong Bahru Road, #10-777, S(123456)','Male','./images/profilephoto/marktan.png'),(2,'bencheong','bencheong@gmail.com','Ben','Cheong','+65 12345611',NULL,NULL,NULL),(3,'sallylim','sallylim@gmail.com','Sally','Lim','+65 12345612','555 Jurong West Street 55, #05-222, S(640555)','Female','./images/profilephoto/sallylim.png'),(4,'maryho','maryho@gmail.com','Mary','Ho','+65 12345613',NULL,NULL,NULL),(5,'patrickng','patrickng@gmail.com','Patrick','Ng','+65 12345614','100 Loyang Ave S(123456)','Male',''),(6,'michaeltan','michaeltan@gmail.com','Michael','Tan','+65 12345615','777 Punggol Road, #11-111, S(820777)','Male',''),(7,'jackgwee','jackgwee@gmail.com','Jack','Gwee','+65 12345616','','Male',''),(8,'jenniferneo','jenniferneo@gmail.com','Jennifer','Neo','+65 12345617','555 Toa Payoh Lorong 2, 05-55 S(555555)','Female',''),(9,'paulchan','paulchan@gmail.com','Paul','Chan','+65 12345618','','Male',''),(10,'andrewcheng','andrewcheng@gmail.com','Andrew','Cheng','','','Male',''),(11,'jamesmah','jamesmah@gmail.com','James','Mah','+65 34534567','345 Siglap Road, #07-222 S(222222)','Male',''),(12,'jameslai','jameslai@gmail.com','James','Lai','+65 23232323','23 Dover Road, #11-23 S(232323)','Male',''),(13,'peterong','peterong@gmail.com','Peter ','Ong','','','Male',''),(14,'peterlai','peterlai@gmail.com','Peter','Lai','','','Male',''),(15,'saykiat','saykiat@gmail.com','Say Kiat','Ng','','','Male','');
/*!40000 ALTER TABLE `useraccount` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-02  0:08:21

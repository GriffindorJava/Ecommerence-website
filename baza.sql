CREATE DATABASE  IF NOT EXISTS `ecommerce_web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecommerce_web`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce_web
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'wine'),(2,'vodka'),(3,'whisky'),(4,'beer'),(5,'liqueur'),(6,'gin'),(7,'rum'),(8,'tequila');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opinions`
--

DROP TABLE IF EXISTS `opinions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opinions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `opinions_fk0` (`product_id`),
  KEY `opinions_fk1` (`user_id`),
  CONSTRAINT `opinions_fk0` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `opinions_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opinions`
--

LOCK TABLES `opinions` WRITE;
/*!40000 ALTER TABLE `opinions` DISABLE KEYS */;
INSERT INTO `opinions` VALUES (1,'Super',9,1,4.5,'2022-02-11 01:25:17');
/*!40000 ALTER TABLE `opinions` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `avgRating` AFTER INSERT ON `opinions` FOR EACH ROW UPDATE product
    SET average_rating = (SELECT AVG(rating) FROM opinions WHERE opinions.product_id = NEW.product_id)
    WHERE id = NEW.product_id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ordered_products`
--

DROP TABLE IF EXISTS `ordered_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordered_products` (
  `order_tracking_number` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  KEY `ordered_products_fk0` (`order_tracking_number`),
  KEY `ordered_products_fk1` (`product_id`),
  CONSTRAINT `ordered_products_fk0` FOREIGN KEY (`order_tracking_number`) REFERENCES `orders` (`order_tracking_number`),
  CONSTRAINT `ordered_products_fk1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordered_products`
--

LOCK TABLES `ordered_products` WRITE;
/*!40000 ALTER TABLE `ordered_products` DISABLE KEYS */;
INSERT INTO `ordered_products` VALUES ('9944f209-58a1-4bb1-a7ad-5d5f1a146ff7',1,4),('51dccb58-8acd-11ec-845b-025059934707',9,3),('88cc2b05-8ad0-11ec-845b-025059934707',9,2),('88cc2b05-8ad0-11ec-845b-025059934707',34,2),('88cc2b05-8ad0-11ec-845b-025059934707',1,2),('548ee3f6-8b3a-11ec-a257-025059934707',36,1),('548ee3f6-8b3a-11ec-a257-025059934707',34,2),('548ee3f6-8b3a-11ec-a257-025059934707',9,3);
/*!40000 ALTER TABLE `ordered_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_tracking_number` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `status` varchar(64) DEFAULT NULL,
  `payment_method_id` int NOT NULL,
  `shipping_method_id` int NOT NULL,
  `city` varchar(64) NOT NULL,
  `postal_code` char(5) NOT NULL,
  `street` varchar(32) NOT NULL,
  `country` varchar(32) NOT NULL,
  `street_number` int NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`order_tracking_number`),
  UNIQUE KEY `order_tracking_number` (`order_tracking_number`),
  KEY `orders_fk1` (`user_id`),
  CONSTRAINT `orders_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('51dccb58-8acd-11ec-845b-025059934707',1,'ordered',3,5,'Cracow','12345','Kijowska','Poland',35,'2022-02-10 23:58:19'),('548ee3f6-8b3a-11ec-a257-025059934707',4,'ordered',2,3,'Cracow','12345','Kijowska','Poland',1,'2022-02-11 12:58:38'),('88cc2b05-8ad0-11ec-845b-025059934707',1,'ordered',3,3,'Cracow','12345','Kijowska','Poland',35,'2022-02-11 00:21:19'),('9944f209-58a1-4bb1-a7ad-5d5f1a146ff7',1,'ordered',1,1,'Cracow','12345','Kijowska','Poland',35,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `unit_price` decimal(6,2) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `units_in_stock` int DEFAULT NULL,
  `category_id` int NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `average_rating` decimal(2,1) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_fk0` (`category_id`),
  FULLTEXT KEY `name` (`name`,`description`),
  CONSTRAINT `product_fk0` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Amarena','Amazing drink!',10.00,'/assets/amarena.jpg',98,1,1,NULL,NULL,NULL),(2,'Stock','Amazing vodka!',25.00,'/assets/stock.jpg',100,2,1,NULL,NULL,NULL),(3,'Jack Daniels','Amazing whisky!',50.00,'/assets/jack_daniels.jfif',100,3,1,NULL,NULL,NULL),(4,'Corona','Amazing beer!',7.00,'/assets/corona.jpg',100,4,1,NULL,NULL,NULL),(5,'Blue Curacao','Amazing liqueur!',15.00,'/assets/blue_curacao.jpg',100,5,1,NULL,NULL,NULL),(6,'Tanqueray London Dry','Amazing gin!',43.00,'/assets/tanqueray_london_dry.jpg',100,6,1,NULL,NULL,NULL),(7,'Diplomatico Reserva Exclusiva','Amazing rum!',56.00,'/assets/diplomatico_reserva_exclisuva.jfif',100,7,1,NULL,NULL,NULL),(8,'Patron Silver','Amazing tequila!',54.00,'/assets/patron_silver.jpg',100,8,1,NULL,NULL,NULL),(9,'Ballantine\'s Whisky','Amazing whisky!',99.00,'/assets/ballantise.jpg',92,3,1,4.5,NULL,NULL),(10,'Desperados Mojito','Amazing beer!',5.00,'/assets/desperados_mojito.jpg',100,4,1,NULL,NULL,NULL),(11,'Żubr','Amazing beer!',4.00,'/assets/zubr.jpg',100,4,1,NULL,NULL,NULL),(12,'Lech Premium','Amazing beer!',3.00,'/assets/lech_premium.jpg',100,4,1,NULL,NULL,NULL),(13,'Heineken','Amazing beer!',4.00,'/assets/heineken.jpg',100,4,1,NULL,NULL,NULL),(14,'Skol','Amazing beer!',3.00,'/assets/skol.jpg',100,4,1,NULL,NULL,NULL),(15,'Bud Light','Amazing beer!',4.00,'/assets/bud_light.jpeg',100,4,1,NULL,NULL,NULL),(16,'Budweiser Budvar','Amazing beer!',3.00,'/assets/budweiser_budvar.jfif',100,4,1,NULL,NULL,NULL),(17,'Somersby Apple','Amazing beer!',4.00,'/assets/somersby_apple.jpg',100,4,1,NULL,NULL,NULL),(18,'Żywiec','Amazing beer!',3.00,'/assets/zywiec.jpg',100,4,1,NULL,NULL,NULL),(19,'Warka Strong','Amazing beer!',4.00,'/assets/warka_strong.jpg',100,4,1,NULL,NULL,NULL),(20,'Finlandia','Amazing vodka!',39.40,'/assets/finlandia.jpg',100,2,1,NULL,NULL,NULL),(21,'Grant\'s','Amazing whisky!',55.00,'/assets/grants.jpg',100,3,1,NULL,NULL,NULL),(22,'Wyborowa','Amazing vodka!',38.00,'/assets/wyborowa.jpg',100,2,1,NULL,NULL,NULL),(23,'Żubrówka Bison Grass','Amazing vodka!',43.00,'/assets/zubrowka_bison.jpg',100,2,1,NULL,NULL,NULL),(24,'Carlo Rossi','Amazing wine!',24.00,'/assets/carlo_rossi.jpg',100,1,1,NULL,NULL,NULL),(25,'Taittinger Brut Réserve','Amazing wine!',259.00,'/assets/taittinger_brut_reserve.jpg',100,1,1,NULL,NULL,NULL),(26,'Landgraf Hessen Riesling','Amazing wine!',73.00,'/assets/landgraf_hessen_riesling.jpg',100,1,1,NULL,NULL,NULL),(27,'Monfort Village','Amazing wine!',32.00,'/assets/monfort_carignan.jpg',100,1,1,NULL,NULL,NULL),(28,'Dalkowski Advocaat','Amazing liqueur!',33.00,'/assets/dalkowski_advocaat.jpg',100,5,1,NULL,NULL,NULL),(29,'Jagemeister','Amazing, simply amazing, Go with RedBull!!! 40% and Liqueur? XDDD',69.00,'/assets/jagemeister.jpg',100,6,1,NULL,NULL,NULL),(30,'Canari Kokos','Amazing liqueur!',23.00,'/assets/canari_kokos.jpg',100,5,1,NULL,NULL,NULL),(31,'Malibu Caribbean','Amazing rum!',55.00,'/assets/malibu_caribbean.jpg',100,7,1,NULL,NULL,NULL),(32,'Sheridans','Amazing liqueur!',44.00,'/assets/sheridans.jpg',100,5,1,NULL,NULL,NULL),(33,'Treasure By Dictador','Amazing gin!',183.00,'/assets/treausure_by_dictador.jpg',100,6,1,NULL,NULL,NULL),(34,'Beefeater Pink','Amazing gin!',74.00,'/assets/beefeater_pink.jpg',96,6,1,NULL,NULL,NULL),(35,'Chivas Regal','Amazing whisky!',259.00,'/assets/chivas_regal.jpg',100,3,1,NULL,NULL,NULL),(36,'Royal Salute','Amazing whisky!',737.00,'/assets/royal_salute.jpg',99,3,1,NULL,NULL,NULL),(37,'Shackleton','Amazing whisky!',86.00,'/assets/shackleton.jpg',100,3,1,NULL,NULL,NULL),(38,'Salitos Gold','Amazing tequila!',113.00,'/assets/salitos_gold.jpg',100,8,1,NULL,NULL,NULL),(39,'Salitos Silver','Amazing tequila!',99.00,'/assets/salitos_silver.jpg',100,8,1,NULL,NULL,NULL),(40,'Olmeca Altos Reposado Gold','Amazing tequila!',153.00,'/assets/olmeca_altos_reposado_gold.jpg',100,8,1,NULL,NULL,NULL),(41,'Komandos','Amazing, really amazing drink, or so I heard.',9.99,'/assets/komandos.jfif',100,1,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address`
--

DROP TABLE IF EXISTS `user_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `city` varchar(64) NOT NULL,
  `postal_code` char(5) NOT NULL,
  `street` varchar(32) NOT NULL,
  `country` varchar(32) NOT NULL,
  `street_number` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_address_fk0` (`user_id`),
  CONSTRAINT `user_address_fk0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address`
--

LOCK TABLES `user_address` WRITE;
/*!40000 ALTER TABLE `user_address` DISABLE KEYS */;
INSERT INTO `user_address` VALUES (1,1,'Cracow','12345','Kijowska','Poland',35),(2,4,'Cracow','12345','Kijowska','Poland',1);
/*!40000 ALTER TABLE `user_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'ROLE_USER'),(2,'ROLE_MODERATOR'),(3,'ROLE_ADMIN');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(64) DEFAULT NULL,
  `last_name` varchar(64) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(9) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `user_role_id` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `users_fk0` (`user_role_id`),
  CONSTRAINT `users_fk0` FOREIGN KEY (`user_role_id`) REFERENCES `user_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,'mark@gmail.com','$2a$10$4zr2XuTWbMqE9FQ6YWVf9OuP2/lSSh3iDcfo43uDL49OJJhiBJZta',NULL,NULL,NULL,3),(2,NULL,NULL,'hank@gmail.com','$2a$10$4zr2XuTWbMqE9FQ6YWVf9OuP2/lSSh3iDcfo43uDL49OJJhiBJZta',NULL,NULL,NULL,2),(3,NULL,NULL,'robert@gmail.com','$2a$10$4zr2XuTWbMqE9FQ6YWVf9OuP2/lSSh3iDcfo43uDL49OJJhiBJZta',NULL,NULL,NULL,1),(4,'Andzrej','Kania','akania@gmail.com','$2a$10$IMgRwrXqYxZlyyRYXKPkauacdFXkP7NpHyHOtF8wIixic02erPeVG','123456789','2022-02-11 11:40:13','2022-02-11 11:40:13',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'ecommerce_web'
--

--
-- Dumping routines for database 'ecommerce_web'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-11 14:33:24

/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.1.33-MariaDB : Database - sistema_peliculas
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sistema_peliculas` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `sistema_peliculas`;

/*Table structure for table `calificaciones` */

DROP TABLE IF EXISTS `calificaciones`;

CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calificacion` tinyint(4) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  `idpelicula` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `calificaciones` */

insert  into `calificaciones`(`id`,`calificacion`,`idusuario`,`idpelicula`) values 
(1,3,1,1),
(2,2,2,1),
(3,5,3,1),
(4,4,4,1),
(5,3,5,1),
(6,3,5,1),
(7,5,6,1);

/*Table structure for table `comentarios` */

DROP TABLE IF EXISTS `comentarios`;

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comentario` text NOT NULL,
  `idpelicula` int(11) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `comentarios` */

insert  into `comentarios`(`id`,`comentario`,`idpelicula`,`idusuario`) values 
(1,'Esta bien rara',1,1);

/*Table structure for table `genero` */

DROP TABLE IF EXISTS `genero`;

CREATE TABLE `genero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` char(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `genero` */

insert  into `genero`(`id`,`nombre`) values 
(1,'terror'),
(2,'drama'),
(3,'infantil'),
(4,'comedia'),
(5,'acción'),
(6,'suspenso');

/*Table structure for table `genero_pelicula` */

DROP TABLE IF EXISTS `genero_pelicula`;

CREATE TABLE `genero_pelicula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpelicula` int(11) DEFAULT NULL,
  `idgenero` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

/*Data for the table `genero_pelicula` */

insert  into `genero_pelicula`(`id`,`idpelicula`,`idgenero`) values 
(1,1,1),
(2,1,6),
(3,5,1),
(4,5,3),
(16,16,5);

/*Table structure for table `peliculas` */

DROP TABLE IF EXISTS `peliculas`;

CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` char(100) DEFAULT NULL,
  `descripcion` text,
  `promedio` float DEFAULT NULL,
  `genero1` char(40) DEFAULT NULL,
  `genero2` char(40) DEFAULT NULL,
  `genero3` char(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

/*Data for the table `peliculas` */

insert  into `peliculas`(`id`,`titulo`,`descripcion`,`promedio`,`genero1`,`genero2`,`genero3`) values 
(1,'Midsommar','Suspenso de una secta rara',3.57143,'Terror','Suspenso','Psicológico'),
(5,'Coraline','Una niña que viaja a otro mundo dentro de su casa',NULL,NULL,NULL,NULL),
(15,'El viaje de Chihiro','Película de anime sobre una niña que se perdió en otro mundo un poco más espiritual',NULL,'Anime','Drama',''),
(16,'Avengers','Estan enojados y se quieren vengar',NULL,NULL,NULL,NULL),
(17,'Kiki entrega a domicilio','Una brujita que se muda a otra ciudad',NULL,'Anime','Infantil','');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` char(20) DEFAULT NULL,
  `password` char(20) DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`nombre`,`password`,`tipo`) values 
(1,'cristal','123',2),
(2,'admin','123',1),
(3,'osuna','12345',2),
(4,'guti','123',2),
(5,'otro','4984',2),
(6,'a','232',2);

/* Procedure structure for procedure `addMovie` */

/*!50003 DROP PROCEDURE IF EXISTS  `addMovie` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `addMovie`(IN mtitulo varchar(100), in mdescripcion VARCHAR(300), in midgenero INT)
begin

DECLARE idp INT;

INSERT INTO peliculas SET titulo = mtitulo, descripcion = mdescripcion;

SET idp= (SELECT id FROM peliculas ORDER BY id desc LIMIT 1);
INSERT INTO genero_pelicula SET idpelicula= idp, idgenero = midgenero;

SELECT * FROM peliculas;
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

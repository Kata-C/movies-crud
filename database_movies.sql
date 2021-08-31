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
  `comentario` text,
  `idpelicula` int(11) DEFAULT NULL,
  `idusuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `calificaciones` */

insert  into `calificaciones`(`id`,`calificacion`,`comentario`,`idpelicula`,`idusuario`) values 
(1,3,'Me gustó, pero está sobrevalorada',1,3),
(2,4,'Me pareció muy entretenida',1,2),
(3,3,'Está bien, pero esperaba más. Creí que era de terror y esperaba una trama con mejor fundamento',1,4);

/*Table structure for table `peliculas` */

DROP TABLE IF EXISTS `peliculas`;

CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` char(100) DEFAULT NULL,
  `descripcion` text,
  `promedio` float DEFAULT '0',
  `genero1` char(40) DEFAULT NULL,
  `genero2` char(40) DEFAULT NULL,
  `genero3` char(40) DEFAULT NULL,
  `portada` char(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Data for the table `peliculas` */

insert  into `peliculas`(`id`,`titulo`,`descripcion`,`promedio`,`genero1`,`genero2`,`genero3`,`portada`) values 
(1,'Midsommar','Una pareja estadounidense que no está pasando por su mejor momento acude con unos amigos al Midsommar, un festival de verano que se celebra cada 90 años en una aldea remota de Suecia. Lo que comienza como unas vacaciones de ensueño en un lugar en el que el sol no se pone nunca, poco a poco se convierte en una oscura pesadilla cuando los misteriosos aldeanos les invitan a participar en sus perturbadoras actividades festivas',3.33333,'Terror','Drama','Thriller','midsommar.jpg'),
(2,'Coraline y la puerta secreta','Basada en una novela de Neil Gaiman, narra la historia de una niña que, al atravesar una pared de su casa, encuentra una versión mejorada de su vida: sus padres son más considerados con ella, pero la las sensaciones maravillosas darán paso al miedo y a la angustia',0,'Animación','Fantasía','','coraline.jpg'),
(3,'Spiderman: Far from home','Peter Parker decide irse junto a MJ, Ned y el resto de sus amigos a pasar unas vacaciones a Europa. Sin embargo, el plan de Parker por dejar de lado sus superpoderes durante unas semanas se ven truncados cuando Nick Fury contacta con él para solicitarle ayuda para frenar el ataque de unas criaturas elementales que están causando el caos en el continente. En ese momento, Parker vuelve a ponerse el traje de Spider-Man para cumplir con su labor',0,'Acción','Superhéroes','Fantasía','spiderman.png'),
(4,'El viaje de Chihiro','Chihiro es una niña de diez años que viaja en coche con sus padres. Después de atravesar un túnel, llegan a un mundo fantástico, en el que no hay lugar para los seres humanos, sólo para los dioses de primera y segunda clase. Cuando descubre que sus padres han sido convertidos en cerdos, Chihiro se siente muy sola y asustada',0,'Animación','Fantasía','Aventuras','chihiro.jpg'),
(5,'Avengers: Endgame','Después de los eventos devastadores de \'Avengers: Infinity War\', el universo está en ruinas debido a las acciones de Thanos, el Titán Loco. Con la ayuda de los aliados que quedaron, los Vengadores deberán reunirse una vez más para intentar deshacer sus acciones y restaurar el orden en el universo de una vez por todas, sin importar cuáles son las consecuencias',0,'Acción','Superhéroes','Fantasía','endgame.jpg'),
(6,'Kiki: Entregas a domicilio','Kiki es una joven bruja de 13 años, en periodo de entrenamiento, que se divierte volando en su escoba junto a Jiji, un sabio gato negro. Según la tradición, todas las brujas de esa edad deben abandonar su hogar durante un año para saber valerse por sí mismas. Así, ella descubrirá lo que significa la responsabilidad, la independencia y la amistad. En su camino Kiki y Jiji harán un nuevo amigo, Tombo, con el que vivirán extraordinarias aventuras',0,'Animación','Aventuras','','kiki.jpg'),
(7,'El Faro','Una remota y misteriosa isla de Nueva Inglaterra en la década de 1890. El veterano farero Thomas Wake (Willem Dafoe) y su joven ayudante Ephraim Winslow (Robert Pattinson) deberán convivir durante cuatro semanas. Su objetivo será mantener el faro en buenas condiciones hasta que llegue el relevo que les permita volver a tierra. Pero las cosas se complicarán cuando surjan conflictos por jerarquías de poder entre ambos',0,'Drama','Fantasía','Terror','elfaro.jpg'),
(8,'Tenet','Armado con tan solo una palabra –Tenet– el protagonista de esta historia deberá pelear por la supervivencia del mundo entero en una misión que le lleva a viajar a través del oscuro mundo del espionaje internacional, y cuya experiencia se desdoblará más allá del tiempo lineal',0,'Acción','Ciencia ficción','','tenet.jpg'),
(9,'El laberinto del fauno','Año 1944, posguerra española. Ofelia (Ivana Baquero) y su madre, Carmen (Ariadna Gil), que está embarazada, se trasladan a un pequeño pueblo al que ha sido destinado el nuevo marido de Carmen, Vidal (Sergi López), un cruel capitán del ejército franquista por el que la niña no siente ningún afecto. La misión de Vidal es acabar con los últimos miembros de la resistencia republicana que permanecen escondidos en los montes de la zona. En la zona viven Mercedes (Maribel Verdú), el ama de llaves, y el médico (Álex Angulo) que se hace cargo del delicado estado de salud de Carmen. Una noche, Ofelia descubre las ruinas de un laberinto, y allí se encuentra con un fauno (Doug Jones), una extraña criatura que le hace una sorprendente revelación: ella es en realidad una princesa, la última de su estirpe, y los suyos la esperan desde hace mucho tiempo. Para poder regresar a su mágico reino, la niña deberá enfrentarse a tres pruebas',0,'Fantasía','Drama','Thriller','el_laberinto_del_fauno.jpg'),
(10,'Prueba','Prueba',0,'Prueba','','','avengers.jpg');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` char(20) DEFAULT NULL,
  `password` text,
  `tipo` int(11) DEFAULT '2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`nombre`,`password`,`tipo`) values 
(1,'admin','$2b$10$x9Y9gIUnbtSCsKfxwfAsZuj/QT6SaEDHzXuhKSrFwlnjHPF6fmTYW',1),
(2,'Usuario','$2b$10$YR0JhFBc2y5068vu43hVPO6lJgjL7OPIex0L4mF0uZQGT6K.ePzWm',2),
(3,'Usuario2','$2b$10$3pAs/Ax0x6dG2UfDiPKQael0w/q4yQZtIhwx.vRornh2xqx5oEXyC',2),
(4,'Usuario3','$2b$10$bz5.PUERpQJs14mZkmLO7ewjzKIOkMX4Sh6k3VHsR051C16Ppauai',2);

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

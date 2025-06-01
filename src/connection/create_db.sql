-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema flexxus_prueba_tecnica
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema flexxus_prueba_tecnica
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `flexxus_prueba_tecnica` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `flexxus_prueba_tecnica` ;

-- -----------------------------------------------------
-- Table `flexxus_prueba_tecnica`.`articulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flexxus_prueba_tecnica`.`articulos` (
  `id_articulos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(80) NOT NULL,
  `fecha_modificacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `marca` VARCHAR(80) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_articulos`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `flexxus_prueba_tecnica`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flexxus_prueba_tecnica`.`roles` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `flexxus_prueba_tecnica`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flexxus_prueba_tecnica`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(150) CHARACTER SET 'armscii8' NOT NULL,
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `rol_id` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_usuarios_roles_idx` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_roles`
    FOREIGN KEY (`rol_id`)
    REFERENCES `flexxus_prueba_tecnica`.`roles` (`id_rol`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `flexxus_prueba_tecnica` ;

-- -----------------------------------------------------
-- procedure sp_create_articulo
-- -----------------------------------------------------

DELIMITER $$
USE `flexxus_prueba_tecnica`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_articulo`(
    IN p_nombre VARCHAR(80),
    IN p_marca VARCHAR(80),
    IN p_activo TINYINT
)
BEGIN
    IF p_nombre IS NULL OR p_nombre = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre es requerido';
    END IF;
    IF p_marca IS NULL OR p_marca = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La marca es requerida';
    END IF;
    INSERT INTO articulos (nombre, marca, activo, fecha_modificacion)
    VALUES (p_nombre, p_marca, IFNULL(p_activo, 1), NOW());

    SELECT id_articulos, nombre, marca, activo, fecha_modificacion
    FROM articulos
    WHERE id_articulos = LAST_INSERT_ID();
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_delete_articulo
-- -----------------------------------------------------

DELIMITER $$
USE `flexxus_prueba_tecnica`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_articulo`(
    IN p_id INT
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM articulos WHERE id_articulos = p_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El artículo no existe';
    END IF;
    UPDATE articulos
    SET activo = 0, fecha_modificacion = NOW()
    WHERE id_articulos = p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_articulo_by_id
-- -----------------------------------------------------

DELIMITER $$
USE `flexxus_prueba_tecnica`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_articulo_by_id`(
    IN p_id INT
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM articulos WHERE id_articulos = p_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El artículo no existe';
    END IF;
    SELECT id_articulos, nombre, marca, activo, fecha_modificacion
    FROM articulos
    WHERE id_articulos = p_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_articulos
-- -----------------------------------------------------

DELIMITER $$
USE `flexxus_prueba_tecnica`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_articulos`(
    IN p_nombre VARCHAR(80),
    IN p_activo TINYINT,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT id_articulos, nombre, marca, activo, fecha_modificacion
    FROM articulos
    WHERE (p_nombre IS NULL OR nombre LIKE CONCAT('%', p_nombre, '%'))
	AND (p_activo IS NULL OR activo = p_activo)
    LIMIT p_limit OFFSET p_offset;
    
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_update_articulo
-- -----------------------------------------------------

DELIMITER $$
USE `flexxus_prueba_tecnica`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_articulo`(
    IN p_id INT,
    IN p_nombre VARCHAR(80),
    IN p_marca VARCHAR(80),
    IN p_activo TINYINT
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM articulos WHERE id_articulos = p_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El artículo no existe';
    END IF;
    UPDATE articulos
    SET 
        nombre = IFNULL(p_nombre, nombre),
        marca = IFNULL(p_marca, marca),
        activo = IFNULL(p_activo, activo),
        fecha_modificacion = NOW()
    WHERE id_articulos = p_id;

    SELECT id_articulos, nombre, marca, activo, fecha_modificacion
    FROM articulos
    WHERE id_articulos = p_id;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

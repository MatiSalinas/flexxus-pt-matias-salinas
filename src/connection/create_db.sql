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
  `fecha_modificacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `marca` VARCHAR(80) NOT NULL,
  `activo` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_articulos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flexxus_prueba_tecnica`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flexxus_prueba_tecnica`.`roles` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `flexxus_prueba_tecnica`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `flexxus_prueba_tecnica`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `rol_id` INT NOT NULL,
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_usuarios_roles_idx` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_roles`
    FOREIGN KEY (`rol_id`)
    REFERENCES `flexxus_prueba_tecnica`.`roles` (`id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

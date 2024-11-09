
CREATE SCHEMA IF NOT EXISTS `Project_dev` DEFAULT CHARACTER SET utf8 ;
USE `Project_dev` ;

-- -----------------------------------------------------
-- Table `Project_dev`.`USERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`USERS` (
  `user_id` CHAR(36) NULL,
  `user_name` VARCHAR(20) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `driving_licence` VARCHAR(25) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'manager', 'admin', 'super_admin') NOT NULL DEFAULT 'user',
  `is_active` TINYINT NOT NULL DEFAULT 1,
  `mobile_number` VARCHAR(15) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE,
  UNIQUE INDEX `driving_licence_UNIQUE` (`driving_licence` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`VEHICLES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`VEHICLES` (
  `licence_plate` VARCHAR(20) NOT NULL,
  `userid` CHAR(36) NOT NULL,
  `make` VARCHAR(20) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `colour` VARCHAR(15) NOT NULL,
  `checkin` DATE NULL,
  `checkout` DATE NULL,
  PRIMARY KEY (`licence_plate`),
  UNIQUE INDEX `userid_UNIQUE` (`userid` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`userid`)
    REFERENCES `Project_dev`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`PAYMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`PAYMENTS` (
  `payment_id` INT NOT NULL AUTO_INCREMENT,
  `pdate` DATE NOT NULL,
  `status` SMALLINT(1) NOT NULL,
  `amount` DECIMAL(5,2) NOT NULL,
  `user_id` CHAR(256) NOT NULL,
  PRIMARY KEY (`payment_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Project_dev`.`USERS` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`LOCATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`LOCATION` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `longitude` VARCHAR(45) NOT NULL,
  `latitude` VARCHAR(45) NOT NULL,
  `area` INT(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`PARKING_LOTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`PARKING_LOTS` (
  `lot_id` INT NOT NULL AUTO_INCREMENT,
  `manager_id` CHAR(36) NOT NULL,
  `location` INT NOT NULL,
  PRIMARY KEY (`lot_id`),
  INDEX `manager_id_idx` (`manager_id` ASC) VISIBLE,
  INDEX `location_id_idx` (`location` ASC) VISIBLE,
  CONSTRAINT `manager_id`
    FOREIGN KEY (`manager_id`)
    REFERENCES `Project_dev`.`USERS` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `location_id`
    FOREIGN KEY (`location`)
    REFERENCES `Project_dev`.`LOCATION` (`location_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`BOOKINGS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`BOOKINGS` (
  `booking_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(36) NOT NULL,
  `payment_id` INT NOT NULL,
  `bdate` DATE NOT NULL,
  `start` DATE NOT NULL,
  `end` DATE NOT NULL,
  `status` SMALLINT(1) NOT NULL,
  `lot_id` INT NOT NULL,
  PRIMARY KEY (`booking_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `payment_id_idx` (`payment_id` ASC) VISIBLE,
  INDEX `lot_id_idx` (`lot_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Project_dev`.`USERS` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `payment_id`
    FOREIGN KEY (`payment_id`)
    REFERENCES `Project_dev`.`PAYMENTS` (`payment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lot_id`
    FOREIGN KEY (`lot_id`)
    REFERENCES `Project_dev`.`PARKING_LOTS` (`lot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`PARKING_SECTIONS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`PARKING_SECTIONS` (
  `section_id` INT NOT NULL AUTO_INCREMENT,
  `vehicle_type` SMALLINT(1) NOT NULL,
  `charge_rate` DECIMAL(5,2) NOT NULL,
  `lot_id` INT NOT NULL,
  PRIMARY KEY (`section_id`),
  INDEX `lot_id_idx` (`lot_id` ASC) VISIBLE,
  CONSTRAINT `lot_id`
    FOREIGN KEY (`lot_id`)
    REFERENCES `Project_dev`.`PARKING_LOTS` (`lot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`PARKING_SLOTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`PARKING_SLOTS` (
  `slot_id` INT NOT NULL AUTO_INCREMENT,
  `status` SMALLINT(1) NOT NULL,
  `vehicle_licence` VARCHAR(20) NOT NULL,
  `section_id` INT NOT NULL,
  `lot_id` INT NOT NULL,
  PRIMARY KEY (`slot_id`),
  INDEX `licence_idx` (`vehicle_licence` ASC) VISIBLE,
  INDEX `section_id_idx` (`section_id` ASC) VISIBLE,
  INDEX `lot_id_idx` (`lot_id` ASC) VISIBLE,
  CONSTRAINT `licence`
    FOREIGN KEY (`vehicle_licence`)
    REFERENCES `Project_dev`.`VEHICLES` (`licence_plate`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `section_id`
    FOREIGN KEY (`section_id`)
    REFERENCES `Project_dev`.`PARKING_SECTIONS` (`section_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lot_id`
    FOREIGN KEY (`lot_id`)
    REFERENCES `Project_dev`.`PARKING_LOTS` (`lot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`PARKING_ENTERENCES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`PARKING_ENTERENCES` (
  `enternece_id` INT NOT NULL AUTO_INCREMENT,
  `location` INT NOT NULL,
  `celing_height` DECIMAL(4,2) NULL,
  `lot_id` INT NOT NULL,
  PRIMARY KEY (`enternece_id`),
  INDEX `lot_id_idx` (`lot_id` ASC) VISIBLE,
  INDEX `location_id_idx` (`location` ASC) VISIBLE,
  CONSTRAINT `lot_id`
    FOREIGN KEY (`lot_id`)
    REFERENCES `Project_dev`.`PARKING_LOTS` (`lot_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `location_id`
    FOREIGN KEY (`location`)
    REFERENCES `Project_dev`.`LOCATION` (`location_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`POIS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`POIS` (
  `poi_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(36) GENERATED ALWAYS AS () VIRTUAL,
  `title` VARCHAR(15) NOT NULL,
  `descreption` LONGTEXT NULL,
  `type` SMALLINT(2) NOT NULL,
  `location` INT NOT NULL,
  PRIMARY KEY (`poi_id`),
  INDEX `owner_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `location_id_idx` (`location` ASC) VISIBLE,
  CONSTRAINT `owner_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Project_dev`.`USERS` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `location_id`
    FOREIGN KEY (`location`)
    REFERENCES `Project_dev`.`LOCATION` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Point of interests;\nadvertisers;\nentertainment, food, service, amminities';


-- -----------------------------------------------------
-- Table `Project_dev`.`REVIEWS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`REVIEWS` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `score` INT(2) NOT NULL,
  `description` LONGTEXT NULL,
  `user_id` CHAR(36) NOT NULL,
  `lot_id` INT NOT NULL,
  PRIMARY KEY (`review_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `lot_id_idx` (`lot_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Project_dev`.`USERS` (`user_name`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `lot_id`
    FOREIGN KEY (`lot_id`)
    REFERENCES `Project_dev`.`PARKING_LOTS` (`lot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`SUPPORT_TICKETS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`SUPPORT_TICKETS` (
  `ticket_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(36) NOT NULL,
  `type` SMALLINT(1) NOT NULL DEFAULT 1,
  `title` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NULL,
  PRIMARY KEY (`ticket_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Project_dev`.`USERS` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`NOTIFICATIONS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`NOTIFICATIONS` (
  `notification_id` INT NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `type` SMALLINT(1) NOT NULL,
  `message` MEDIUMTEXT NOT NULL,
  `status` SMALLINT(1) NOT NULL,
  `created_at` DATE NOT NULL,
  PRIMARY KEY (`notification_id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Project_dev`.`USERS` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Project_dev`.`ZONES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Project_dev`.`ZONES` (
  `zone_id` INT NOT NULL AUTO_INCREMENT,
  `lot_id` INT NULL,
  `poi_id` INT NULL,
  PRIMARY KEY (`zone_id`),
  INDEX `poi_id_idx` (`poi_id` ASC) VISIBLE,
  INDEX `lot_id_idx` (`lot_id` ASC) VISIBLE,
  CONSTRAINT `poi_id`
    FOREIGN KEY (`poi_id`)
    REFERENCES `Project_dev`.`POIS` (`poi_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lot_id`
    FOREIGN KEY (`lot_id`)
    REFERENCES `Project_dev`.`PARKING_LOTS` (`lot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

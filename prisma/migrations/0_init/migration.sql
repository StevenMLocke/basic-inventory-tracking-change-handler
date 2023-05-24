-- CreateTable
CREATE TABLE `action` (
    `action_id` VARCHAR(38) NOT NULL,
    `action_type` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `action_id_UNIQUE`(`action_id`),
    UNIQUE INDEX `action_type_UNIQUE`(`action_type`),
    PRIMARY KEY (`action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asset` (
    `id` VARCHAR(38) NOT NULL,
    `maunfacturer_id` VARCHAR(38) NOT NULL,
    `model_id` VARCHAR(38) NOT NULL,
    `serial_number` VARCHAR(64) NULL,
    `assigned_to_user_id` VARCHAR(38) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `assigned_to_user_UNIQUE`(`assigned_to_user_id`),
    INDEX `fk_manufacturer_id_idx`(`maunfacturer_id`),
    INDEX `fk_model_id_idx`(`model_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manufacturer` (
    `manfacturer_id` VARCHAR(38) NOT NULL,
    `name` VARCHAR(64) NOT NULL,

    UNIQUE INDEX `manfacturer_id_UNIQUE`(`manfacturer_id`),
    UNIQUE INDEX `name_UNIQUE`(`name`),
    PRIMARY KEY (`manfacturer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `model` (
    `model_id` VARCHAR(38) NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `manufacturer_id` VARCHAR(38) NOT NULL,

    UNIQUE INDEX `model_id_UNIQUE`(`model_id`),
    INDEX `fk_manfacturer_id_idx`(`manufacturer_id`),
    PRIMARY KEY (`model_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `permission_id` VARCHAR(38) NOT NULL,
    `type` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `transaction_id` VARCHAR(38) NOT NULL,
    `date` TIMESTAMP(0) NOT NULL,
    `asset_id` VARCHAR(38) NOT NULL,
    `action_id` VARCHAR(38) NOT NULL,
    `action_user_id` VARCHAR(38) NOT NULL,
    `asset_user_id` VARCHAR(38) NOT NULL,

    UNIQUE INDEX `transaction_id_UNIQUE`(`transaction_id`),
    INDEX `fk_action_id_idx`(`action_id`),
    INDEX `fk_action_user_id_idx`(`action_user_id`),
    INDEX `fk_asset_id_idx`(`asset_id`),
    INDEX `fk_asset_user_id_idx`(`asset_user_id`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(38) NOT NULL,
    `fn` VARCHAR(45) NOT NULL,
    `ln` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `permission_id` VARCHAR(38) NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    UNIQUE INDEX `permission_id_UNIQUE`(`permission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `fk_manufacturer_id` FOREIGN KEY (`maunfacturer_id`) REFERENCES `manufacturer`(`manfacturer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `fk_model_id` FOREIGN KEY (`model_id`) REFERENCES `model`(`model_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`assigned_to_user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `fk_manfacturer_id` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer`(`manfacturer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `fk_action_id` FOREIGN KEY (`action_id`) REFERENCES `action`(`action_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `fk_action_user_id` FOREIGN KEY (`action_user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `fk_asset_id` FOREIGN KEY (`asset_id`) REFERENCES `asset`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `fk_asset_user_id` FOREIGN KEY (`asset_user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`permission_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


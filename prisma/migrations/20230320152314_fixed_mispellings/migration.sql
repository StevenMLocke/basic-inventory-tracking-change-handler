/*
  Warnings:

  - You are about to drop the column `maunfacturer_id` on the `asset` table. All the data in the column will be lost.
  - The primary key for the `manufacturer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `manfacturer_id` on the `manufacturer` table. All the data in the column will be lost.
  - The primary key for the `model` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `model_id` on the `model` table. All the data in the column will be lost.
  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `transaction_id` on the `transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `manufacturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `model` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `manufacturer_id` to the `asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `manufacturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `asset` DROP FOREIGN KEY `fk_manufacturer_id`;

-- DropForeignKey
ALTER TABLE `asset` DROP FOREIGN KEY `fk_model_id`;

-- DropForeignKey
ALTER TABLE `model` DROP FOREIGN KEY `fk_manfacturer_id`;

-- DropIndex
DROP INDEX `manfacturer_id_UNIQUE` ON `manufacturer`;

-- DropIndex
DROP INDEX `model_id_UNIQUE` ON `model`;

-- DropIndex
DROP INDEX `transaction_id_UNIQUE` ON `transaction`;

-- AlterTable
ALTER TABLE `asset` DROP COLUMN `maunfacturer_id`,
    ADD COLUMN `manufacturer_id` VARCHAR(38) NOT NULL;

-- AlterTable
ALTER TABLE `manufacturer` DROP PRIMARY KEY,
    DROP COLUMN `manfacturer_id`,
    ADD COLUMN `id` VARCHAR(38) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `model` DROP PRIMARY KEY,
    DROP COLUMN `model_id`,
    ADD COLUMN `id` VARCHAR(38) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `transaction` DROP PRIMARY KEY,
    DROP COLUMN `transaction_id`,
    ADD COLUMN `id` VARCHAR(38) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `fk_manufacturer_id_idx` ON `asset`(`manufacturer_id`);

-- CreateIndex
CREATE UNIQUE INDEX `manfacturer_id_UNIQUE` ON `manufacturer`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `model_id_UNIQUE` ON `model`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `transaction_id_UNIQUE` ON `transaction`(`id`);

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `fk_manufacturer_id` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `fk_model_id` FOREIGN KEY (`model_id`) REFERENCES `model`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `fk_manfacturer_id` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

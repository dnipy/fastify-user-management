-- AlterTable
ALTER TABLE `File` ADD COLUMN `isTest` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `isTest` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isTest` BOOLEAN NOT NULL DEFAULT false;
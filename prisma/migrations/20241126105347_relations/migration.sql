/*
  Warnings:

  - You are about to drop the `ProfileFiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProfileFiles` DROP FOREIGN KEY `ProfileFiles_file_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileFiles` DROP FOREIGN KEY `ProfileFiles_profile_id_fkey`;

-- DropTable
DROP TABLE `ProfileFiles`;

-- CreateTable
CREATE TABLE `_FileToProfile` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FileToProfile_AB_unique`(`A`, `B`),
    INDEX `_FileToProfile_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FileToProfile` ADD CONSTRAINT `_FileToProfile_A_fkey` FOREIGN KEY (`A`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FileToProfile` ADD CONSTRAINT `_FileToProfile_B_fkey` FOREIGN KEY (`B`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

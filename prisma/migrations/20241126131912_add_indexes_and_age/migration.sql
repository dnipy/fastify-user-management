-- AlterTable
ALTER TABLE `User` ADD COLUMN `age` INTEGER NULL;

-- CreateIndex
CREATE INDEX `File_isActive_idx` ON `File`(`isActive`);

-- CreateIndex
CREATE INDEX `Profile_user_id_idx` ON `Profile`(`user_id`);

-- CreateIndex
CREATE INDEX `User_isActive_isDeleted_idx` ON `User`(`isActive`, `isDeleted`);

-- CreateIndex
CREATE INDEX `User_createdAt_idx` ON `User`(`createdAt`);

-- CreateIndex
CREATE INDEX `User_age_idx` ON `User`(`age`);

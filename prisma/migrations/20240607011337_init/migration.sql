/*
  Warnings:

  - You are about to drop the `Followed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Following` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Followed` DROP FOREIGN KEY `Followed_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Following` DROP FOREIGN KEY `Following_userId_fkey`;

-- DropTable
DROP TABLE `Followed`;

-- DropTable
DROP TABLE `Following`;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRelated` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Message_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

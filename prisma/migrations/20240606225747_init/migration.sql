/*
  Warnings:

  - You are about to drop the `_UserFollows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_UserFollows` DROP FOREIGN KEY `_UserFollows_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserFollows` DROP FOREIGN KEY `_UserFollows_B_fkey`;

-- DropTable
DROP TABLE `_UserFollows`;

-- CreateTable
CREATE TABLE `Followed` (
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Followed_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Following` (
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Following_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Followed` ADD CONSTRAINT `Followed_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Following` ADD CONSTRAINT `Following_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

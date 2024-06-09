-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Follows` (
    `followedById` INTEGER NOT NULL,
    `followingId` INTEGER NOT NULL,

    PRIMARY KEY (`followingId`, `followedById`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Follows` ADD CONSTRAINT `Follows_followedById_fkey` FOREIGN KEY (`followedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follows` ADD CONSTRAINT `Follows_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `picture` VARCHAR(191) NULL,

    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRelated` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `read` VARCHAR(191) NOT NULL DEFAULT 'unread',
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Message_id_key`(`id`),
    FULLTEXT INDEX `Message_userRelated_idx`(`userRelated`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

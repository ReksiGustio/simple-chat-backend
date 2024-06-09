/*
  Warnings:

  - A unique constraint covering the columns `[followingName]` on the table `Following` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followingId` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingName` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Following` ADD COLUMN `followingId` INTEGER NOT NULL,
    ADD COLUMN `followingName` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Following_followingName_key` ON `Following`(`followingName`);

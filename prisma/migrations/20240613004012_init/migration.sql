/*
  Warnings:

  - You are about to alter the column `read` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Message` MODIFY `read` VARCHAR(191) NOT NULL DEFAULT 'false';

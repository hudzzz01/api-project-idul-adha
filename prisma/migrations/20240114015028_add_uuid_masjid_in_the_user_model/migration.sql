/*
  Warnings:

  - Added the required column `uuid_masjid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `uuid_masjid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_uuid_masjid_fkey` FOREIGN KEY (`uuid_masjid`) REFERENCES `Masjid`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

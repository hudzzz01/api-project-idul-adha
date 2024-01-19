-- CreateTable
CREATE TABLE `Jamaah` (
    `id` INTEGER NOT NULL,
    `uuid` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nama_bapak` VARCHAR(191) NULL,
    `alamat` VARCHAR(191) NULL,
    `no_telepon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `uuid_masjid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Jamaah_uuid_key`(`uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jamaah` ADD CONSTRAINT `Jamaah_uuid_masjid_fkey` FOREIGN KEY (`uuid_masjid`) REFERENCES `Masjid`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

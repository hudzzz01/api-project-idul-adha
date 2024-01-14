-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Masjid` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `kode_post` VARCHAR(191) NOT NULL,
    `organisasi` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Masjid_id_key`(`id`),
    UNIQUE INDEX `Masjid_uuid_key`(`uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penerima` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `uuid_masjid` VARCHAR(191) NOT NULL,
    `tipe_token` VARCHAR(191) NOT NULL,
    `nomor_kupon` VARCHAR(191) NOT NULL,
    `nama_penerima` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Penerima_id_key`(`id`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `create_at` VARCHAR(191) NOT NULL,
    `verified_at` VARCHAR(191) NOT NULL,
    `verified_by_uuid_user` VARCHAR(191) NOT NULL,
    `uuid_penerima` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tokens_id_key`(`id`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tokens` ADD CONSTRAINT `Tokens_verified_by_uuid_user_fkey` FOREIGN KEY (`verified_by_uuid_user`) REFERENCES `User`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tokens` ADD CONSTRAINT `Tokens_uuid_penerima_fkey` FOREIGN KEY (`uuid_penerima`) REFERENCES `Penerima`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

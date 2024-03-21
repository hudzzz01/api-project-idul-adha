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
    `uuid_masjid` VARCHAR(191) NOT NULL,

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
    `img` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Masjid_id_key`(`id`),
    UNIQUE INDEX `Masjid_uuid_key`(`uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penerima` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `tipe_token` VARCHAR(191) NOT NULL,
    `nama_penerima` VARCHAR(191) NOT NULL,
    `uuid_masjid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Penerima_id_key`(`id`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `verified_at` DATETIME(3) NULL,
    `foto_penerima` VARCHAR(191) NULL,
    `is_verif` VARCHAR(191) NULL,
    `nomor_kupon` VARCHAR(191) NULL,
    `isi_token` VARCHAR(191) NOT NULL,
    `verified_by_uuid_user` VARCHAR(191) NULL,
    `uuid_penerima` VARCHAR(191) NULL,

    UNIQUE INDEX `Tokens_id_key`(`id`),
    UNIQUE INDEX `Tokens_nomor_kupon_key`(`nomor_kupon`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jamaah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `no_telepon` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NULL,
    `bin` VARCHAR(191) NULL,
    `binti` VARCHAR(191) NULL,
    `jabatan_di_keluarga` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `uuid_masjid` VARCHAR(191) NOT NULL,
    `uuid_family` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Jamaah_id_key`(`id`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Family` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `nama_kepala_keluarga` VARCHAR(191) NOT NULL,
    `tempat_lahir` VARCHAR(191) NULL,
    `tanggal_lahir` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `kelurahan` VARCHAR(191) NULL,
    `kecamatan` VARCHAR(191) NULL,
    `kota_atau_kabupaten` VARCHAR(191) NULL,
    `no_hp_wa` VARCHAR(191) NULL,
    `no_hp_alternatif` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    UNIQUE INDEX `Family_id_key`(`id`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zakat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `jumlah_zakat` INTEGER NOT NULL,
    `tahun` INTEGER NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uuid_family` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Zakat_id_key`(`id`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sodakoh` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `jumlah_sodakoh` INTEGER NOT NULL,
    `tahun` INTEGER NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `uuid_family` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Sodakoh_id_key`(`id`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_uuid_masjid_fkey` FOREIGN KEY (`uuid_masjid`) REFERENCES `Masjid`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penerima` ADD CONSTRAINT `Penerima_uuid_masjid_fkey` FOREIGN KEY (`uuid_masjid`) REFERENCES `Masjid`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tokens` ADD CONSTRAINT `Tokens_verified_by_uuid_user_fkey` FOREIGN KEY (`verified_by_uuid_user`) REFERENCES `User`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tokens` ADD CONSTRAINT `Tokens_uuid_penerima_fkey` FOREIGN KEY (`uuid_penerima`) REFERENCES `Penerima`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jamaah` ADD CONSTRAINT `Jamaah_uuid_masjid_fkey` FOREIGN KEY (`uuid_masjid`) REFERENCES `Masjid`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jamaah` ADD CONSTRAINT `Jamaah_uuid_family_fkey` FOREIGN KEY (`uuid_family`) REFERENCES `Family`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zakat` ADD CONSTRAINT `Zakat_uuid_family_fkey` FOREIGN KEY (`uuid_family`) REFERENCES `Family`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sodakoh` ADD CONSTRAINT `Sodakoh_uuid_family_fkey` FOREIGN KEY (`uuid_family`) REFERENCES `Family`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2025 at 09:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecotrace`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `No_Pel` varchar(50) DEFAULT NULL,
  `hal` text DEFAULT NULL,
  `tanggal` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`No_Pel`, `hal`, `tanggal`) VALUES
(NULL, 'Konfirmasi Akun dengan Nomor Telepon 085612341234', '2025-11-28 14:49:17'),
('782631', 'Membuat tagihan pada 2025-11-28', '2025-11-28 14:51:14'),
('782631', 'Membuat tagihan pada 2025-12-28', '2025-11-28 14:51:35'),
('782631', 'Membuat tagihan pada 2026-01-28', '2025-11-28 14:52:02'),
(NULL, 'Konfirmasi Akun dengan Nomor Telepon 085712341234', '2025-11-28 14:53:24'),
('937492', 'Membuat tagihan pada 2025-11-28', '2025-11-28 14:53:56'),
('937492', 'Membuat tagihan pada 2025-12-28', '2025-11-28 14:54:15'),
('937492', 'Membuat tagihan pada 2026-01-28', '2025-11-28 14:54:36'),
('782631', 'Menyerahkan Bukti Transaksi untuk ID Pelanggan: 782631', '2025-11-28 14:58:14'),
('782631', 'Menyerahkan Bukti Transaksi untuk ID Pelanggan: 782631', '2025-11-28 14:58:25'),
('782631', 'Admin Menyetujui Bukti Pembayaran untuk ID Pelanggan: 782631', '2025-11-28 15:09:03');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `invoice` varchar(10) NOT NULL,
  `No_Pel` varchar(50) DEFAULT NULL,
  `pemakaian` float(5,2) DEFAULT NULL,
  `biaya` int(11) DEFAULT NULL,
  `stat` enum('nunggak','pending','lunas') DEFAULT 'nunggak',
  `pem_awal` int(11) DEFAULT NULL,
  `pem_akhir` int(11) DEFAULT NULL,
  `waktu` datetime DEFAULT current_timestamp(),
  `url_bukti` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`invoice`, `No_Pel`, `pemakaian`, `biaya`, `stat`, `pem_awal`, `pem_akhir`, `waktu`, `url_bukti`) VALUES
('MSKDS221', '937492', 44.00, 440000, 'nunggak', 123, 167, '2026-01-28 00:00:00', NULL),
('OISJAD123', '782631', 100.00, 1000000, 'nunggak', 0, 100, '2025-11-28 00:00:00', NULL),
('OJASD112', '782631', 150.00, 1500000, 'pending', 100, 250, '2025-12-28 00:00:00', 'https://jypykbtfrbxpvziieqpo.supabase.co/storage/v1/object/public/Ecotrace/1764316705510-ecotrace2.jpeg'),
('SDGYY22', '937492', 34.00, 340000, 'nunggak', 89, 123, '2025-12-28 00:00:00', NULL),
('SDMEE1233', '782631', 150.00, 1500000, 'lunas', 250, 400, '2026-01-28 00:00:00', 'https://jypykbtfrbxpvziieqpo.supabase.co/storage/v1/object/public/Ecotrace/1764316694454-ecotrace2.png'),
('UYWEE2399', '937492', 89.00, 890000, 'nunggak', 0, 89, '2025-11-28 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `noHP` varchar(20) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `No_Pel` varchar(50) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `verif` enum('yes','no') DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`noHP`, `nama`, `pass`, `No_Pel`, `alamat`, `role`, `verif`) VALUES
('082111164670', 'Naufal Adli', '$2b$10$5G.UrGtOJrinxdkRg6m1ZubW6EzvFtFek9yBIgc5e1duhAxCqPq6K', NULL, NULL, 'admin', 'no'),
('085612341234', 'Naufal Adli', '$2b$10$dl11pG7GNSxvwq0tJy0gV.QAOjaUIW.5gqDqxQ6C17QH8KDAvtVBW', '782631', NULL, 'user', 'yes'),
('085712341234', 'Muhammad Tegar Wiratama Pohan', '$2b$10$SMJ2rFM7KUan8.8/iffRm.KFc7znod9tKF/WgutzNz5bUA9wjWWyW', '937492', NULL, 'user', 'yes'),
('085812341234', 'Lutfi Rizky Budi Kurnianto', '$2b$10$SKAavuSF/UCXDgb/k2zsReOJmaKQI.e8nm4TxqlBP5PmvX3PdeaKm', NULL, NULL, 'user', 'no');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`invoice`),
  ADD KEY `No_Pel` (`No_Pel`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`noHP`),
  ADD UNIQUE KEY `No_Pel` (`No_Pel`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`No_Pel`) REFERENCES `users` (`No_Pel`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

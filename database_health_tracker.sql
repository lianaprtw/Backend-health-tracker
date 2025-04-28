-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 08:24 PM
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
-- Database: `health_trecker`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_air_minum`
--

CREATE TABLE `tb_air_minum` (
  `id_air_minum` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `waktu` time(6) NOT NULL,
  `jumlah_air` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_air_minum`
--

INSERT INTO `tb_air_minum` (`id_air_minum`, `id_user`, `tanggal`, `waktu`, `jumlah_air`) VALUES
(1, 4, '2025-04-28', '04:20:00.000000', 900);

-- --------------------------------------------------------

--
-- Table structure for table `tb_jadwal`
--

CREATE TABLE `tb_jadwal` (
  `id_jadwal` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_trainner` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `waktu` year(4) NOT NULL,
  `jenis_latihan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_jadwal`
--

INSERT INTO `tb_jadwal` (`id_jadwal`, `id_user`, `id_trainner`, `tanggal`, `waktu`, `jenis_latihan`) VALUES
(5, 2, 1, '2025-04-28', '2009', 'lari');

-- --------------------------------------------------------

--
-- Table structure for table `tb_proggress`
--

CREATE TABLE `tb_proggress` (
  `id_proggress` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `jumlah_langkah` float NOT NULL,
  `kalori_harian` float NOT NULL,
  `kalori_mingguan` float NOT NULL,
  `kalori_bulanan` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_proggress`
--

INSERT INTO `tb_proggress` (`id_proggress`, `id_user`, `tanggal`, `jumlah_langkah`, `kalori_harian`, `kalori_mingguan`, `kalori_bulanan`) VALUES
(1, 4, '2025-04-28', 5000, 78, 90, 100);

-- --------------------------------------------------------

--
-- Table structure for table `tb_trainner`
--

CREATE TABLE `tb_trainner` (
  `id_trainner` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `spesialis` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_trainner`
--

INSERT INTO `tb_trainner` (`id_trainner`, `nama`, `spesialis`, `email`, `password`) VALUES
(1, 'sukijan', 'pijat', 'pijat@gmail.com', '111');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id_user`, `nama`, `email`, `password`) VALUES
(2, 'nathan', 'tanaka@gmail.com', 'uhuy'),
(3, 'nathan', 'tanaka@gmail.com', 'uhuy'),
(4, 'bambang', 'bambang@gmail.com', 'jaja');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_air_minum`
--
ALTER TABLE `tb_air_minum`
  ADD PRIMARY KEY (`id_air_minum`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tb_jadwal`
--
ALTER TABLE `tb_jadwal`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD KEY `id_trainner` (`id_trainner`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tb_proggress`
--
ALTER TABLE `tb_proggress`
  ADD PRIMARY KEY (`id_proggress`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tb_trainner`
--
ALTER TABLE `tb_trainner`
  ADD PRIMARY KEY (`id_trainner`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_air_minum`
--
ALTER TABLE `tb_air_minum`
  MODIFY `id_air_minum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_jadwal`
--
ALTER TABLE `tb_jadwal`
  MODIFY `id_jadwal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_proggress`
--
ALTER TABLE `tb_proggress`
  MODIFY `id_proggress` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_trainner`
--
ALTER TABLE `tb_trainner`
  MODIFY `id_trainner` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_air_minum`
--
ALTER TABLE `tb_air_minum`
  ADD CONSTRAINT `tb_air_minum_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`);

--
-- Constraints for table `tb_jadwal`
--
ALTER TABLE `tb_jadwal`
  ADD CONSTRAINT `tb_jadwal_ibfk_1` FOREIGN KEY (`id_trainner`) REFERENCES `tb_trainner` (`id_trainner`),
  ADD CONSTRAINT `tb_jadwal_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`);

--
-- Constraints for table `tb_proggress`
--
ALTER TABLE `tb_proggress`
  ADD CONSTRAINT `tb_proggress_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

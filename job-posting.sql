-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 02 Des 2019 pada 17.44
-- Versi Server: 5.7.28-0ubuntu0.16.04.2
-- PHP Version: 7.0.33-0ubuntu0.16.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task1db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
('41a6d84e-ef0a-49a8-9a8e-f6c62286a399', 'Lainnya'),
('5b6a8be5-bfab-444c-97a8-64695261c331', 'Data'),
('73b19e72-1d17-4189-ba6f-e7d20b3bb813', 'Programmer'),
('7da76abd-04ca-4309-a185-9386bebb9324', 'Transportasi'),
('7ec06cd8-5a79-4257-bb93-3b1dcff06b3d', 'Transportasi'),
('8cecb1ee-5984-4d2b-94d9-2efe90c57c28', 'Manajemen'),
('8e46600f-a736-4a23-aa8e-c4b4b8d95b0d', 'Administrasi'),
('9b4577e6-feff-4e89-8c91-850dff6e2443', 'IT'),
('e63477fd-151b-4fcd-96b3-1e024d13e546', 'Matematika'),
('f4037189-cd7a-4c5f-9428-8e81211afbe2', 'Psikologi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `company`
--

CREATE TABLE `company` (
  `id` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `location` varchar(30) NOT NULL,
  `description` varchar(500) NOT NULL,
  `njob` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `company`
--

INSERT INTO `company` (`id`, `name`, `logo`, `location`, `description`, `njob`) VALUES
('13025d34-5895-4e85-ab77-3af762dbd144', 'Bank Mandiri', 'www.bank-mandiri.com/logo.png', 'Jakarta', 'Bank Mandiri adalah bank yang berkantor pusat di Jakarta, dan merupakan bank terbesar di Indonesia dalam hal aset, pinjaman, dan deposit. Bank ini berdiri pada tanggal 2 Oktober 1998 sebagai bagian dari program restrukturisasi perbankan yang dilaksanakan oleh Pemerintah Indonesia.', 1),
('3069ab65-d41b-473f-8a13-863c625d71a8', 'Bukalapak', 'www.bukalapak.com/logo.png', 'Jakarta', 'Bukalapak merupakan salah satu online marketplace terkemuka di Indonesia yang menyediakan sarana jual-beli dari konsumen ke konsumen. Semua orang dapat membuka toko online di Bukalapak dan melayani pembeli dari seluruh Indonesia untuk transaksi satuan maupun banyak', 3),
('361ff907-486f-4e2f-9266-802abaae6823', 'Grab', 'www.grab.com/logo.png', 'Singapura', 'Grab is a super app that provides transportation, logistics and financial services. Grab operates a mobile technology platform that integrates city transportation for driver partners and customers in South East Asia.', 1),
('40da4aab-533b-4617-9fb2-5d9d38f142cd', 'Garuda Indonesia', 'www.garuda-indonesia.com/logo.png', 'Jakarta', 'Garuda Indonesia is the most renowned airline of Indonesia. The company, which received four stars from Skytrax, provides both domestic and international flights (passengers and cargo). Although Garuda is Indonesia\'s top class airline, it taps the low-cost aviation sector through its subsidiary Citilink Indonesia', 1),
('66a7e83f-0955-4bc6-8508-331c00da8068', 'Indofood', 'www.indofood.com/logo.png', 'Jakarta', 'PT. Indofood Sukses Makmur Tbk. dan PT. Indofood CBP Sukses Makmur Tbk. merupakan produsen berbagai jenis makanan dan minuman yang bermarkas di Jakarta, Indonesia. Perusahaan ini didirikan pada tanggal 14 Agustus 1990 oleh Sudono Salim', 0),
('6c2da8c4-92ec-4d3f-b515-84db417524e7', 'Alrasyid Lab', 'www.alrasyid-lab.com/logo.png', 'Yogyakarta', 'Sebuah perusahaan yang bergerak di bidang matematika terapan untuk Indonesia yang lebih baik.', 0),
('96110880-3bb6-4751-8ae2-5ce7e5e3374a', 'Qiscus', 'www.qiscus.com/logo.png', 'Yogyakarta', 'Qiscus adalah perusahaan teknologi B2B penyedia teknologi chat untuk bisnis. Qiscus merupakan perusahaan yang ahli di bidang teknologi komunikasi langsung. Perusahaan ini didirikan di Singapura pada tahun 2013 dan memiliki pusat riset dan pengembangan teknologi di Yogyakarta, Indonesia.', 2),
('a2d1885d-b2d3-4081-b919-cb400f622bb3', 'Kata AI', 'www.kata-ai.com/logo.png', 'Jakarta', 'We are Kata.ai, an Indonesian conversational Artificial Intelligence company, focused on understanding human conversation so we can empower the way humans collaborate with technology. Kata.ai’s Natural Language Processing (NLP) technology powers multi-purpose chatbots for major corporations in Indonesia across different industries, including FMCG, Telecommunication, Banking & Financial Service, and Retail.', 1),
('aba32353-5997-48b3-996e-18995c5e7829', 'Unilever', 'www.unilever.com/logo.png', 'Surabaya', 'Unilever Indonesia didirikan pada 5 Desember 1933 sebagai Lever Zeepfabrieken N.V. Pada 22 Juli 1980, nama perusahaan diubah menjadi PT Lever Brothers Indonesia dan pada 30 Juni 1990, nama perusahaan diubah menjadi PT Unilever Indonesia Tbk. Unilever Indonesia melepas 15% sahamnya di Bursa Efek Jakarta dan Bursa Efek Surabaya pada tahun 1981. Unilever Indonesia mempunyai lebih dari 1.000 distributor di seluruh Indonesia.', 0),
('c6d7b8d0-e739-4d7d-b739-0193ec49d815', 'Gudang Garam', 'www.gudang-garam.com/logo.png', 'Kediri', 'PT Gudang Garam Tbk adalah sebuah merek/perusahaan produsen rokok terbesar dan terpopuler asal Indonesia. Didirikan pada 26 Juni 1958 oleh Surya Wonowidjojo, perusahaan rokok ini merupakan peringkat pertama dan terbesar kelima di Indonesia menurut tahun pendiriannya dalam produksi rokok kretek.', 1),
('d722d742-21b2-4f15-97fe-e3391ca6fa27', 'Gojek', 'www.gojek.com/logo.png', 'Jakarta', 'PT Aplikasi Karya Anak Bangsa atau yang lebih dikenal dengan Gojek merupakan sebuah perusahaan teknologi asal Indonesia yang melayani angkutan melalui jasa ojek. Perusahaan ini didirikan pada tahun 2010 di Jakarta oleh Nadiem Makarim. Saat ini, Gojek telah tersedia di 50 kota di Indonesia.', 1),
('da66adf0-351a-40c3-b311-92b9c341268e', 'L', 'L', 'L', 'L', 0),
('dc543ed0-0245-47c7-b26f-9602e1027a97', 'A', 'A', 'A', 'A', 0),
('def661eb-35ea-4c50-ad30-b226fb05b2b1', '1', '1', '2', '1', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `category_id` varchar(50) NOT NULL,
  `salary` int(11) NOT NULL,
  `location` varchar(20) NOT NULL,
  `company_id` varchar(50) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `jobs`
--

INSERT INTO `jobs` (`id`, `name`, `description`, `category_id`, `salary`, `location`, `company_id`, `date_added`, `date_updated`) VALUES
('09c4cb81-963c-4851-bbe6-4cd2b6711825', 'AI Engineer', 'Minimal S2 di bidang matematika, menguasai bahasa pemrograman python.', 'e63477fd-151b-4fcd-96b3-1e024d13e546', 15000000, 'Jakarta', 'a2d1885d-b2d3-4081-b919-cb400f622bb3', '2019-11-08 10:30:12', '2019-11-08 10:30:12'),
('103d72c9-ecf0-4cc6-9c49-ee6e8715239e', 'Data Scientist', 'Mempunyai kemampuan matematika yang baik, mampu menangkap dan menyajikan informasi dari data yang tidak beraturan.', 'e63477fd-151b-4fcd-96b3-1e024d13e546', 10000000, 'Jakarta', '3069ab65-d41b-473f-8a13-863c625d71a8', '2019-11-08 10:19:28', '2019-11-08 10:19:28'),
('22d01f2c-282c-4779-9e8c-b4cba2d49ed0', 'HRD', 'Pendidikan minimal S2 di bidang psikologi.', 'f4037189-cd7a-4c5f-9428-8e81211afbe2', 12000000, 'Jakarta', 'd722d742-21b2-4f15-97fe-e3391ca6fa27', '2019-11-08 10:58:57', '2019-11-08 10:58:57'),
('32430781-92bf-4c18-89bb-53b6fc2de1b3', 'Security', 'Mempunyai tinggi badan minimum 180 CM dan berat badan antara 70 - 90 KG.', '41a6d84e-ef0a-49a8-9a8e-f6c62286a399', 5000000, 'Surabaya', 'c6d7b8d0-e739-4d7d-b739-0193ec49d815', '2019-11-08 10:28:46', '2019-11-08 10:28:46'),
('3a6f69c6-9ccb-4ad4-8aeb-0e1a70e8dc63', 'Back End Programmer', 'Menguasai bahasa pemrograman python dan javascript.', '73b19e72-1d17-4189-ba6f-e7d20b3bb813', 5000000, 'Yogyakarta', '96110880-3bb6-4751-8ae2-5ce7e5e3374a', '2019-11-08 10:42:56', '2019-11-08 10:42:56'),
('4c6f4891-406e-4737-bf4a-989e6e246306', 'Pramugari', 'Wanita dengan tinggi minimal 170 CM.', '7da76abd-04ca-4309-a185-9386bebb9324', 7500000, 'Jakarta', '40da4aab-533b-4617-9fb2-5d9d38f142cd', '2019-11-08 10:41:33', '2019-11-08 10:41:33'),
('4cc511ec-ed06-4590-b336-f481dec90078', 'Data Engineer', 'Menguasai SQL, mampu menemukan fitur-fitur yang berharga dalam data.', '5b6a8be5-bfab-444c-97a8-64695261c331', 8000000, 'Yogyakarta', '3069ab65-d41b-473f-8a13-863c625d71a8', '2019-11-08 10:23:56', '2019-11-08 10:23:56'),
('6888d971-badd-496b-b1c1-67bec0b0bdfe', 'Manajer', 'Mampu melaksanakan tugas dan memimpin dengan baik.', '8cecb1ee-5984-4d2b-94d9-2efe90c57c28', 8000000, 'Yogyakarta', '13025d34-5895-4e85-ab77-3af762dbd144', '2019-11-07 23:12:19', '2019-11-07 23:12:19'),
('a184f1da-8fa7-4d7c-be2a-3b26b549bc18', 'Front End Programmer', 'Menguasai react-js dan react-native.', '73b19e72-1d17-4189-ba6f-e7d20b3bb813', 5000000, 'Yogyakarta', '96110880-3bb6-4751-8ae2-5ce7e5e3374a', '2019-11-08 10:44:29', '2019-11-08 10:44:29'),
('ad016149-3885-4c39-ac49-c3f52e266227', 'Driver', 'Ahli mengendarai motor, mempunyai SIM C.', '7ec06cd8-5a79-4257-bb93-3b1dcff06b3d', 5000000, 'Jakarta', '361ff907-486f-4e2f-9266-802abaae6823', '2019-11-08 10:25:17', '2019-11-08 10:40:38'),
('d0f7ff9c-a418-44ff-b891-203c341c99a6', 'Full Stack Developer', 'Menguasai pemrograman front-end dan back-end, memiliki pengalaman minimal 5 tahun.', '9b4577e6-feff-4e89-8c91-850dff6e2443', 10000000, 'Yogyakarta', '3069ab65-d41b-473f-8a13-863c625d71a8', '2019-11-08 10:47:48', '2019-11-08 10:47:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL,
  `date_registered` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `date_registered`) VALUES
('12b40b80-df18-4980-bff4-01b96c193bcf', 'rasyidoke', '$2b$10$.Z0U07DHPiWTLRbNTqKN3.X8NjSxQdZJrquzACHU4pY8hJ6voGhou', 'rasyid0099@gmail.com', '2019-10-27 11:10:11'),
('2e60bca3-e8cb-478e-9e8c-5d47d3c3aa78', 'rasyidoke2', '$2b$10$D6vtlbvDU6Lnf9vmhXKzQeoguDroI36Y4my2N/hEwuZXzH0rudm4e', 'rasyid0099@gmail.com', '2019-10-31 22:11:18'),
('78c79307-ba42-42e0-8e6b-45ac86816ffe', 'rizalrizal', '$2b$10$bR.b.eD5lW26nOTtSagoQONzFeyx5b3.D3Eoqwb1lluBdDVJCU0ha', 'rizal123@gmail.com', '2019-10-27 10:08:45'),
('83a18660-cd0b-44be-a496-176f384fe1ef', 'halwanazifa', '$2b$10$jXEJ6usrj9QQmJKRQmB4Wu.TYb0drKepAI1sCrTFuD4Mj/SxHVZZ2', 'nazifahalwa@gmail.com', '2019-10-23 23:19:47'),
('86f379ca-2b09-4b89-ba10-8022a15ec1f7', 'dandani', '$2b$10$rp4IvNBpXzkY1gu7EF18oealnv8fqlLHT4hfx.LM8NsLlAIoS86HG', 'dandani@gmail.com', '2019-10-31 22:13:10'),
('c0498350-827b-4592-9755-30dccb88c6c8', 'lathifinch', '$2b$10$yCpJWZz5KSwFStRwGKVNjuIloWFMJbLOujzk0NW/VeoLxGCDzNFAS', 'lathifinch@gmail.com', '2019-10-30 18:45:35'),
('cc95e8ee-79c2-4fb7-bbb4-1bd2ec0d3b11', 'lathifalrasyid', '$2b$10$zzW3KHtw.nymg5JvMtfPKeW1NyQogyS0j5ZXDwZuVvxJb1dzs4Ld2', 'alrasyidlathif@gmail.com', '2019-10-24 15:51:51'),
('f02c01db-ac9e-4fd4-aee4-aae3ca5dd9ae', 'bimbima', '$2b$10$/hgMyPP05AUFmBy.ePcyceabfQKy0dLK.Nf9FsJMBOq6nrkamfFMG', 'bimbima@gmail.com', '2019-10-30 21:50:16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `usernew`
--

CREATE TABLE `usernew` (
  `id` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL,
  `date_registered` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usernew`
--
ALTER TABLE `usernew`
  ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

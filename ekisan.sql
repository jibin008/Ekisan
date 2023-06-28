-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2023 at 04:00 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ekisan`
--

-- --------------------------------------------------------

--
-- Table structure for table `crop_tb`
--

CREATE TABLE `crop_tb` (
  `cropid` int(200) NOT NULL,
  `cropname` varchar(200) NOT NULL,
  `cropimage` char(200) NOT NULL,
  `about_crop` varchar(200) NOT NULL,
  `quantity` int(200) NOT NULL,
  `price` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `crop_tb`
--

INSERT INTO `crop_tb` (`cropid`, `cropname`, `cropimage`, `about_crop`, `quantity`, `price`) VALUES
(1, 'abc', '9781408856772_Z.jpg', 'hai', 4, 5),
(55, 'mkl', 'sHRDAYA pics.jpg', '', 88, 4);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `name` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `email` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`name`, `age`, `email`) VALUES
('hjhg', '56', 2),
('jibin', '12', 3),
('jibin', '12', 4),
('jj', '12', 5);

-- --------------------------------------------------------

--
-- Table structure for table `fertilicer_tb`
--

CREATE TABLE `fertilicer_tb` (
  `type` text NOT NULL,
  `Fertilizer_ID` int(200) NOT NULL,
  `Fertilizer_Name` varchar(200) NOT NULL,
  `About_Fertilizer` varchar(200) NOT NULL,
  `Manufacturing_Date` date NOT NULL,
  `Expiry_Date` date NOT NULL,
  `Stock_Available` int(200) NOT NULL,
  `fertilizer_image` char(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fertilicer_tb`
--

INSERT INTO `fertilicer_tb` (`type`, `Fertilizer_ID`, `Fertilizer_Name`, `About_Fertilizer`, `Manufacturing_Date`, `Expiry_Date`, `Stock_Available`, `fertilizer_image`) VALUES
('', 578, 'bhg', 'fggh h', '2023-06-15', '2023-06-17', 5, 'smile jibin.jpg'),
('', 579, 'ghh', 'hhh', '2023-06-23', '2023-06-24', 5, 'sHRDAYA pics.jpg'),
('', 580, 'kkj', 'jhj ', '2023-06-04', '2023-06-25', 6, 'WhatsApp Image 2023-02-09 at 00.37.27.jpg'),
('undefined', 581, 'abishek', 'fcgbvhbjkm', '2023-06-08', '2023-09-09', 4, 'denial of service.png'),
('undefined', 582, '.kjlj', 'guhg koi', '2023-06-15', '2023-06-24', 6, 'mariya image1.jpg'),
('undefined', 583, 'khvkjhb', 'yfig', '2022-08-10', '2023-06-30', 5, 'multiple.png'),
('undefined', 584, 'abimanyu', 'vhbjuh', '2023-06-03', '2023-06-24', 8, 'denial of service.png'),
('undefined', 585, 'abimanyu', 'vhbjuh', '2023-06-03', '2023-06-24', 8, 'denial of service.png'),
('fertilizer', 586, 'hjj', 'kuui', '2023-06-09', '2023-06-24', 6, 'denial of service.png'),
('fertilizer', 587, 'www', 'kjkj', '2023-06-13', '2023-07-07', 5, 'denial of service.png'),
('fertilizer', 588, 'jibin', 'huu hh', '2023-06-14', '2023-06-15', 5, 'multiple.png'),
('fertilizer', 589, 'uuii', 'hjj', '2023-06-10', '2023-06-24', 5, 'denial of service.png'),
('pesticide', 590, 'sarukh', 'good boy', '2023-06-17', '2023-06-24', 5, '7-year-old_prodigy_becomes_the_1200x768.webp'),
('pesticide', 591, 'jlkj', 'jkjkn', '2023-06-29', '2023-06-30', 5, '9781408856772_Z.jpg'),
('pesticide', 592, 'sarath', 'jkj', '2023-06-23', '2023-06-30', 0, 'mariya image1.jpg'),
('pesticide', 593, 'saharukh', 'jk jk', '2023-06-14', '2023-06-30', 8, 'denial of service.png'),
('fertilizer', 594, 'kmlkm', 'klkm', '2023-06-15', '2023-06-16', 10, 'denial of service.png'),
('fertilizer', 595, 'huh', 'b b ', '2023-06-16', '2023-06-30', 19, 'nss.png'),
('fertilizer', 596, 'jk', 'hjbj', '2023-06-17', '2023-06-25', 8, 'sHRDAYA pics.jpg'),
('fertilizer', 597, 'jnjknk', 'knk', '2023-06-14', '2023-06-16', 5, 'sHRDAYA pics.jpg'),
('fertilicer', 598, 'frt', 'abt', '0000-00-00', '0000-00-00', 0, '9781408856772_Z.jpg'),
('fertilicer', 599, 'new name', 'bjkb', '2023-06-20', '2023-08-04', 5, 'WhatsApp Image 2023-02-09 at 00.37.27.jpg'),
('fertilicer', 600, 'sarath', 'jkjkllk', '2000-11-09', '2023-06-26', 1, 'kandam.jpg'),
('fertilicer', 601, 'sharukh', 'gvjh ikjkj', '0000-00-00', '0000-00-00', 10, 'goods carier.jpg'),
('fertilicer', 602, 'jak', 'it was good', '2023-06-22', '2023-06-30', 10, 'RiceHarvest.jpg'),
('fertilicer', 603, 'Frt', 'abcd', '2023-06-22', '2023-07-06', 63, '7-year-old_prodigy_becomes_the_1200x768.webp'),
('fertilicer', 604, 'Frtz', 'ssss', '2023-06-23', '2023-07-09', 22, '9781408856772_Z.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `login_table`
--

CREATE TABLE `login_table` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `date_of_birth` date NOT NULL,
  `whats_app_number` int(11) NOT NULL,
  `email_id` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `usertype` int(11) NOT NULL COMMENT '1: admin\r\n2: Officer\r\n3: Customer',
  `status` int(11) NOT NULL COMMENT '0: unapproved\r\n1: Approved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_table`
--

INSERT INTO `login_table` (`id`, `name`, `address`, `gender`, `date_of_birth`, `whats_app_number`, `email_id`, `password`, `usertype`, `status`) VALUES
(1, 'Admin', 'nayankara', 'male', '2023-06-09', 2147483647, 'admin@gmail.com', 'admin', 1, 1),
(3, 'abcd', 'abcd', 'male', '1991-06-01', 987654321, 'a@gmail.com', 'a', 2, 1),
(4, 'f', 'faddress', 'male', '2004-06-24', 987654321, 'f@gmail.cof@gmail.com', 'f', 3, 1),
(5, 'c', 'caddress', 'male', '1994-09-25', 987654321, 'cu@gmail.com', 'cu', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `notification_tb`
--

CREATE TABLE `notification_tb` (
  `Notification_ID` int(200) NOT NULL,
  `Notification_Content` varchar(200) NOT NULL,
  `link` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification_tb`
--

INSERT INTO `notification_tb` (`Notification_ID`, `Notification_Content`, `link`) VALUES
(1, 'j jiohiiiu', '');

-- --------------------------------------------------------

--
-- Table structure for table `seed_tb`
--

CREATE TABLE `seed_tb` (
  `seed_id` int(200) NOT NULL,
  `seed_name` varchar(200) NOT NULL,
  `seed_image` char(200) NOT NULL,
  `about_seed` varchar(200) NOT NULL,
  `manufacturing_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `stock_available` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seed_tb`
--

INSERT INTO `seed_tb` (`seed_id`, `seed_name`, `seed_image`, `about_seed`, `manufacturing_date`, `expiry_date`, `stock_available`) VALUES
(12, 'hj', 'nss.png', 'hkjjk hiij', '2005-04-06', '2022-05-04', 2),
(13, 'ghj', '1 ekisan.png', 'dfgvbnm ', '2023-06-02', '2023-06-04', 665),
(14, 'arunthathi', 'smile jibin.jpg', 'it was good', '2023-06-24', '2023-06-24', 9),
(15, 'jwala', 'WhatsApp Image 2023-02-09 at 00.37.27.jpg', 'jj jkjkj', '2023-06-10', '2023-06-30', 3),
(16, 'rama', 'nss.png', 'about rmanan', '2023-06-14', '2023-06-30', 4),
(17, 'jjgh', 'pestisides.jpg', 'mmmk', '2023-06-30', '2023-07-09', 5);

-- --------------------------------------------------------

--
-- Table structure for table `tool_tb`
--

CREATE TABLE `tool_tb` (
  `Tool_ID` int(200) NOT NULL,
  `Tool_Name` varchar(200) NOT NULL,
  `Tool_image` char(200) NOT NULL,
  `Manufacturing_Date` date NOT NULL,
  `License_Number` varchar(200) NOT NULL,
  `Number_of_Tools` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tool_tb`
--

INSERT INTO `tool_tb` (`Tool_ID`, `Tool_Name`, `Tool_image`, `Manufacturing_Date`, `License_Number`, `Number_of_Tools`) VALUES
(1, 'jghhjg', '7-year-old_prodigy_becomes_the_1200x768.webp', '2023-06-11', '98765', 4),
(4555, '459nn', 'IMG_7443.JPG', '2023-06-25', 'jkk55', 5),
(4556, 'jjkk', 'sHRDAYA pics.jpg', '2023-06-10', '5454545', 5),
(4557, 'jjkk', 'sHRDAYA pics.jpg', '2023-06-10', '5454545', 5),
(4558, 'jjkk', 'sHRDAYA pics.jpg', '2023-06-10', '5454545', 5),
(4559, 'jjkk', 'sHRDAYA pics.jpg', '2023-06-10', '5454545', 5),
(4560, 'jjkk', 'sHRDAYA pics.jpg', '2023-06-10', '5454545', 5),
(4561, 'jjkk', 'sHRDAYA pics.jpg', '2023-06-10', '5454545', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crop_tb`
--
ALTER TABLE `crop_tb`
  ADD PRIMARY KEY (`cropid`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `fertilicer_tb`
--
ALTER TABLE `fertilicer_tb`
  ADD PRIMARY KEY (`Fertilizer_ID`),
  ADD KEY `fertilizer_image` (`fertilizer_image`);

--
-- Indexes for table `login_table`
--
ALTER TABLE `login_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_tb`
--
ALTER TABLE `notification_tb`
  ADD PRIMARY KEY (`Notification_ID`);

--
-- Indexes for table `seed_tb`
--
ALTER TABLE `seed_tb`
  ADD PRIMARY KEY (`seed_id`);

--
-- Indexes for table `tool_tb`
--
ALTER TABLE `tool_tb`
  ADD PRIMARY KEY (`Tool_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crop_tb`
--
ALTER TABLE `crop_tb`
  MODIFY `cropid` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `email` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `fertilicer_tb`
--
ALTER TABLE `fertilicer_tb`
  MODIFY `Fertilizer_ID` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=605;

--
-- AUTO_INCREMENT for table `login_table`
--
ALTER TABLE `login_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notification_tb`
--
ALTER TABLE `notification_tb`
  MODIFY `Notification_ID` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5667;

--
-- AUTO_INCREMENT for table `seed_tb`
--
ALTER TABLE `seed_tb`
  MODIFY `seed_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tool_tb`
--
ALTER TABLE `tool_tb`
  MODIFY `Tool_ID` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4562;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

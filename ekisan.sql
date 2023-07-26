-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2023 at 04:14 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

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
  `price` int(200) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `category` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `crop_tb`
--

INSERT INTO `crop_tb` (`cropid`, `cropname`, `cropimage`, `about_crop`, `quantity`, `price`, `unit`, `category`) VALUES
(66, 'Ladiesfinger', 'venda.png', '', 98, 30, '1', 'vegetables'),
(67, 'water melon', 'watermelon.jpg', 'Tasty natural watermelon', 10, 20, '1', 'fruits'),
(68, 'Koorka', 'kooraka.jpg', '', 40, 25, '1', 'vegetables'),
(69, 'k gold', 'rice.png', 'Its\'s our own brand', 499, 39, '1', 'cereals');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `name` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `email` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `fertilizer_image` char(200) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fertilicer_tb`
--

INSERT INTO `fertilicer_tb` (`type`, `Fertilizer_ID`, `Fertilizer_Name`, `About_Fertilizer`, `Manufacturing_Date`, `Expiry_Date`, `Stock_Available`, `fertilizer_image`, `unit`, `price`) VALUES
('fertilicer', 605, '', 'Multiplex liquid fertilizer is used to maximise output by best possible yield with the lowest possible Nutrient losses', '2023-07-26', '2023-08-30', 50, 'multiplexer.png', '1', 50),
('fertilicer', 606, '', 'cially in the production of starch, sugars, oils, fats, and vitamins. Since sulfur plays a key role in forming chlorophyll, which in turn allows plants to produce these important ingredients, a sulfur', '2023-07-26', '2023-09-26', 100, 'sulpher.png', '1', 100),
('pesticide', 607, 'Pest 1', 'new item', '2023-07-04', '2023-07-30', 5, 'pesticide1.png', '12', 222),
('pesticide', 608, 'Pest 2', 'Dan', '2023-07-01', '2023-08-04', 96, 'Screenshot 2023-07-26 171136.png', 'ltr', 966),
('pesticide', 609, 'Pest 3', 'Good', '2023-07-02', '2023-08-06', 96, 'sulpher.png', 'ltr', 56),
('pesticide', 610, 'Pest 5', 'Good result', '2023-06-29', '2023-07-30', 33, 'Screenshot 2023-07-26 171136.png', 'ltr', 96);

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
  `usertype` int(11) NOT NULL COMMENT '1: admin\r\n2: Farmer\r\n3: Customer',
  `status` int(11) NOT NULL COMMENT '0: unapproved\r\n1: Approved',
  `landmark` varchar(100) NOT NULL,
  `city` varchar(20) NOT NULL,
  `pin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_table`
--

INSERT INTO `login_table` (`id`, `name`, `address`, `gender`, `date_of_birth`, `whats_app_number`, `email_id`, `password`, `usertype`, `status`, `landmark`, `city`, `pin`) VALUES
(1, 'Admin', 'nayankara', 'male', '2023-06-09', 2147483647, 'admin@gmail.com', 'admin', 1, 1, '', '', 0),
(3, 'abcd', 'abcd', 'male', '1991-06-01', 987654321, 'a@gmail.com', 'a', 2, 1, '', '', 0),
(5, 'c', 'caddress', 'male', '1994-09-25', 987654321, 'cu@gmail.com', 'cu', 3, 1, '', '', 0),
(6, 'cus', 'h41', 'male', '2001-06-08', 987654321, 'cus@gmail.com', 'cus', 3, 1, 'near bheema', 'Thrissur', 680020),
(7, 'Abishek', 'meleveetil', 'male', '2000-11-09', 2147483647, 'abishek@gmail.com', 'abishek', 2, 1, 'Athani', 'Thrissur', 680563),
(8, 'sharukh', 'Thoppil parambil', 'male', '2000-07-02', 2147483647, 'sharukh@gmail.com', 'sharukh', 3, 1, 'mapranam', 'Irinjalakuda', 680587);

-- --------------------------------------------------------

--
-- Table structure for table `notification_tb`
--

CREATE TABLE `notification_tb` (
  `Notification_ID` int(200) NOT NULL,
  `Notification_Content` varchar(200) NOT NULL,
  `link` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification_tb`
--

INSERT INTO `notification_tb` (`Notification_ID`, `Notification_Content`, `link`) VALUES
(5667, 'PM Kisan Samman nidhi', 'https://www.pmkisan.gov.in/');

-- --------------------------------------------------------

--
-- Table structure for table `order_tb`
--

CREATE TABLE `order_tb` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `qty` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `amount` int(11) NOT NULL,
  `item_type` int(11) NOT NULL COMMENT '1: fer\r\n2: pest\r\n3: crop\r\n4: seed',
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_tb`
--

INSERT INTO `order_tb` (`id`, `uid`, `item_id`, `date`, `qty`, `address`, `amount`, `item_type`, `status`) VALUES
(10, 3, 606, '2023-07-26', 4, 'chalakudi', 400, 1, 1),
(11, 5, 66, '2023-07-26', 2, 'irinjalakuda', 60, 3, 1),
(12, 3, 605, '2023-07-26', 3, 'chalakudi', 150, 1, 1),
(13, 3, 605, '2023-07-26', 3, 'hhjj', 150, 1, 1),
(14, 3, 69, '2023-07-26', 1, 'jjj', 39, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `rent_tb`
--

CREATE TABLE `rent_tb` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  `booking_date` date NOT NULL DEFAULT current_timestamp(),
  `booked_for` date NOT NULL,
  `duration` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `address` varchar(200) NOT NULL,
  `duration_unit` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `stock_available` int(200) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seed_tb`
--

INSERT INTO `seed_tb` (`seed_id`, `seed_name`, `seed_image`, `about_seed`, `manufacturing_date`, `expiry_date`, `stock_available`, `unit`, `price`) VALUES
(19, 'navara ', 'navara1.png', 'Kerala heritage rice', '2023-07-26', '2024-12-12', 10, '5', 250);

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
  `Number_of_Tools` int(200) NOT NULL,
  `day_rent` int(11) NOT NULL,
  `hour_rent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tool_tb`
--

INSERT INTO `tool_tb` (`Tool_ID`, `Tool_Name`, `Tool_image`, `Manufacturing_Date`, `License_Number`, `Number_of_Tools`, `day_rent`, `hour_rent`) VALUES
(4562, 'Tractor', 'tractor.png', '2023-07-26', 'KL089', 5, 0, 300),
(4563, 'Tiller', 'tiller machine.png', '2023-07-26', 'KL008567', 7, 0, 200);

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
-- Indexes for table `order_tb`
--
ALTER TABLE `order_tb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rent_tb`
--
ALTER TABLE `rent_tb`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `cropid` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `email` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `fertilicer_tb`
--
ALTER TABLE `fertilicer_tb`
  MODIFY `Fertilizer_ID` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=611;

--
-- AUTO_INCREMENT for table `login_table`
--
ALTER TABLE `login_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `notification_tb`
--
ALTER TABLE `notification_tb`
  MODIFY `Notification_ID` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5668;

--
-- AUTO_INCREMENT for table `order_tb`
--
ALTER TABLE `order_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `rent_tb`
--
ALTER TABLE `rent_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `seed_tb`
--
ALTER TABLE `seed_tb`
  MODIFY `seed_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tool_tb`
--
ALTER TABLE `tool_tb`
  MODIFY `Tool_ID` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4564;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

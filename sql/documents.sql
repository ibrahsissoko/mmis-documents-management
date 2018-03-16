/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost
 Source Database       : mmis_mm

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : utf-8

 Date: 04/24/2017 12:51:05 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `documents`
-- ----------------------------
DROP TABLE IF EXISTS `documents`;
CREATE TABLE `documents` (
  `document_id` varchar(128) NOT NULL,
  `document_code` varchar(20) DEFAULT NULL,
  `file_name` varchar(150) DEFAULT NULL,
  `file_path` varchar(200) DEFAULT NULL,
  `uploaded_at` varchar(20) DEFAULT NULL,
  `mime_type` varchar(50) DEFAULT NULL,
  `file_size` int(12) DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `idx_document_code` (`document_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;

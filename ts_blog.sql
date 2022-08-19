/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50729
Source Host           : 127.0.0.1:3306
Source Database       : ts_blog

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2022-08-19 11:05:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for categorys
-- ----------------------------
DROP TABLE IF EXISTS `categorys`;
CREATE TABLE `categorys` (
  `id` varchar(50) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `creator` varchar(50) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of categorys
-- ----------------------------
INSERT INTO `categorys` VALUES ('Ce0eb11eb5581fc52bcfa8514d9623f0f', 'JavaScript', 'admin', '2022-08-19 10:54:18', '2022-08-19 10:54:18');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` varchar(50) NOT NULL,
  `post_name` varchar(100) NOT NULL,
  `post_title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `creator` varchar(50) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `category_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_ibfk_1` (`category_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categorys` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of posts
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `recent_login_time` datetime DEFAULT NULL COMMENT '最近登录时间',
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `concerns` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('512249510955f513041efa5680496722', 'hhf', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-19 09:55:41', '2022-08-19 09:55:41', null, null, null, '0');
INSERT INTO `users` VALUES ('bd9a4c4ccbd7a9fc3524017c70e13567', 'admin1', '0985251f3d13076beec69aca778ea31f', null, null, null, null, '2022-08-18 17:00:04', null, null, '0');
INSERT INTO `users` VALUES ('e431cd38a0876f8e83fd3e4700adf0f5', 'admin', '0985251f3d13076beec69aca778ea31f', null, null, null, null, '2022-08-19 10:45:49', null, null, '0');
INSERT INTO `users` VALUES ('e929e6d112134e1d15c1f641264693df', 'admin2', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-18 16:41:41', '2022-08-18 16:41:41', null, null, null, '0');
INSERT INTO `users` VALUES ('e99da8b9c5bdd86d6a657e05d0f8516e', 'hhf1', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-19 09:56:39', '2022-08-19 09:56:39', null, null, null, '0');

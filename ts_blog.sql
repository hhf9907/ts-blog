/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50729
Source Host           : 127.0.0.1:3306
Source Database       : ts_blog

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2022-08-19 17:22:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for avatars
-- ----------------------------
DROP TABLE IF EXISTS `avatars`;
CREATE TABLE `avatars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `mimetype` varchar(30) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `avatars_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of avatars
-- ----------------------------
INSERT INTO `avatars` VALUES ('1', '5c499949f820f273d78fe0241cc3571a', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:00:05', '2022-08-19 15:00:05');
INSERT INTO `avatars` VALUES ('2', '8839bf562f302f569a625682b1ab5b1f', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:06:05', '2022-08-19 15:06:05');
INSERT INTO `avatars` VALUES ('3', 'db8ce1722d827692e412eb8166688e84', 'image/gif', '330244', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:09:55', '2022-08-19 15:09:55');
INSERT INTO `avatars` VALUES ('4', 'bb74ea6af2b7ef0340fd8d9e8f513f57', 'image/gif', '330244', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:10:00', '2022-08-19 15:10:00');
INSERT INTO `avatars` VALUES ('5', 'bdcec9722a7e105d2f4a43b72cf065fc', 'image/gif', '330244', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:10:12', '2022-08-19 15:10:12');
INSERT INTO `avatars` VALUES ('6', '3520d74e86604d364af6d747fa55accd', 'image/gif', '330244', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:16:51', '2022-08-19 15:16:51');

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
INSERT INTO `categorys` VALUES ('C0c88d46eb7313ab28e41f45096bb5164', '前端', 'admin', '2022-08-19 11:58:19', '2022-08-19 11:58:19');
INSERT INTO `categorys` VALUES ('C5892bc709201e1b0cab1cc51822cb78f', 'C++', 'admin', '2022-08-19 11:57:22', '2022-08-19 11:57:22');
INSERT INTO `categorys` VALUES ('Caac181aa69ce9d6e3a6337cbee6af62d', 'Java', 'admin', '2022-08-19 11:58:13', '2022-08-19 11:58:13');
INSERT INTO `categorys` VALUES ('Cd78130409db5257cfa0a80f67a5569fa', 'flutter', 'admin', '2022-08-19 11:58:25', '2022-08-19 11:58:25');
INSERT INTO `categorys` VALUES ('Ce0eb11eb5581fc52bcfa8514d9623f0f', 'JavaScript', 'admin', '2022-08-19 10:54:18', '2022-08-19 10:54:18');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `post_name` varchar(100) NOT NULL,
  `post_title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `category_ids` varchar(100) DEFAULT NULL,
  `creator` varchar(50) DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('Paa1602fffae87819555b9a115abff79d', 'e431cd38a0876f8e83fd3e4700adf0f5', '111', '222', '333', null, 'admin', '2022-08-19 17:12:55', '2022-08-19 17:12:55');
INSERT INTO `posts` VALUES ('Pc69e6f4a4742c1c2d193eec60608f38c', 'e431cd38a0876f8e83fd3e4700adf0f5', '111', '222', '333', null, 'admin', '2022-08-19 17:14:32', '2022-08-19 17:14:32');

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
  `create_time` datetime DEFAULT NULL,
  `recent_login_time` datetime DEFAULT NULL COMMENT '最近登录时间',
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `concerns` int(11) DEFAULT '0',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('512249510955f513041efa5680496722', 'hhf', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-19 09:55:41', null, null, null, '0', null);
INSERT INTO `users` VALUES ('bd9a4c4ccbd7a9fc3524017c70e13567', 'admin1', '0985251f3d13076beec69aca778ea31f', null, null, null, '2022-08-19 17:15:44', null, null, '0', null);
INSERT INTO `users` VALUES ('e431cd38a0876f8e83fd3e4700adf0f5', 'admin', '0985251f3d13076beec69aca778ea31f', 'http://localhost:3000/user/e431cd38a0876f8e83fd3e4700adf0f5/avatar', null, null, '2022-08-19 16:34:39', null, null, '0', null);
INSERT INTO `users` VALUES ('e929e6d112134e1d15c1f641264693df', 'admin2', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-18 16:41:41', null, null, null, '0', null);
INSERT INTO `users` VALUES ('e99da8b9c5bdd86d6a657e05d0f8516e', 'hhf1', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-19 09:56:39', null, null, null, '0', null);

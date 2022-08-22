/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50729
Source Host           : 127.0.0.1:3306
Source Database       : ts_blog

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2022-08-22 18:16:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar` (
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
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of avatar
-- ----------------------------
INSERT INTO `avatar` VALUES ('1', '5c499949f820f273d78fe0241cc3571a', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:00:05', '2022-08-19 15:00:05');
INSERT INTO `avatar` VALUES ('2', '8839bf562f302f569a625682b1ab5b1f', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:06:05', '2022-08-19 15:06:05');
INSERT INTO `avatar` VALUES ('3', 'db8ce1722d827692e412eb8166688e84', 'image/gif', '330244', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:09:55', '2022-08-19 15:09:55');
INSERT INTO `avatar` VALUES ('4', 'bb74ea6af2b7ef0340fd8d9e8f513f57', 'image/gif', '330244', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:10:00', '2022-08-19 15:10:00');
INSERT INTO `avatar` VALUES ('5', 'bdcec9722a7e105d2f4a43b72cf065fc', 'image/gif', '330244', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:10:12', '2022-08-19 15:10:12');
INSERT INTO `avatar` VALUES ('6', '3520d74e86604d364af6d747fa55accd', 'image/gif', '330244', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 15:16:51', '2022-08-19 15:16:51');
INSERT INTO `avatar` VALUES ('7', 'b990b3cc65fadfd271c878e77346a52f', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 17:26:50', '2022-08-19 17:26:50');
INSERT INTO `avatar` VALUES ('8', '3f5d8be80e44244cb106cb0876a4f73f', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 17:27:27', '2022-08-19 17:27:27');
INSERT INTO `avatar` VALUES ('9', '2d1b5b672008bd05d7382470315f5695', 'image/png', '18108', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-19 17:30:04', '2022-08-19 17:30:04');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` varchar(50) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `creator` varchar(50) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('C0c88d46eb7313ab28e41f45096bb5164', '前端', 'admin', '2022-08-19 11:58:19', '2022-08-19 11:58:19');
INSERT INTO `category` VALUES ('C5892bc709201e1b0cab1cc51822cb78f', 'C++', 'admin', '2022-08-19 11:57:22', '2022-08-19 11:57:22');
INSERT INTO `category` VALUES ('Caac181aa69ce9d6e3a6337cbee6af62d', 'Java', 'admin', '2022-08-19 11:58:13', '2022-08-19 11:58:13');
INSERT INTO `category` VALUES ('Cd78130409db5257cfa0a80f67a5569fa', 'flutter', 'admin', '2022-08-19 11:58:25', '2022-08-19 11:58:25');
INSERT INTO `category` VALUES ('Ce0eb11eb5581fc52bcfa8514d9623f0f', 'JavaScript', 'admin', '2022-08-19 10:54:18', '2022-08-19 10:54:18');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `content` varchar(255) NOT NULL COMMENT '评论内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `likes` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('2', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '第一次评论，有点紧张', '2022-08-22 17:24:53', '0');
INSERT INTO `comment` VALUES ('3', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '第一次评论，有点紧张', '2022-08-22 17:40:36', '0');
INSERT INTO `comment` VALUES ('4', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '第3次评论，有点紧张', '2022-08-22 17:40:39', '0');
INSERT INTO `comment` VALUES ('5', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '第n次评论，有点紧张', '2022-08-22 18:14:12', '0');
INSERT INTO `comment` VALUES ('6', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '第n+1次评论，有点紧张', '2022-08-22 18:14:15', '0');

-- ----------------------------
-- Table structure for comment_reply
-- ----------------------------
DROP TABLE IF EXISTS `comment_reply`;
CREATE TABLE `comment_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `post_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `content` varchar(255) NOT NULL COMMENT '评论内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `likes` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_reply_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_reply_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_reply_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of comment_reply
-- ----------------------------
INSERT INTO `comment_reply` VALUES ('3', '2', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '回复', '2022-08-22 17:38:29', '0');
INSERT INTO `comment_reply` VALUES ('4', '2', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '回复1', '2022-08-22 17:38:32', '0');
INSERT INTO `comment_reply` VALUES ('5', '2', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '回复12', '2022-08-22 17:38:34', '0');
INSERT INTO `comment_reply` VALUES ('6', '2', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '回复12', '2022-08-22 17:40:16', '0');
INSERT INTO `comment_reply` VALUES ('7', '3', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '回复12', '2022-08-22 17:40:48', '0');
INSERT INTO `comment_reply` VALUES ('8', '3', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '回复12', '2022-08-22 17:40:49', '0');
INSERT INTO `comment_reply` VALUES ('9', '3', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '回复12', '2022-08-22 18:14:17', '0');
INSERT INTO `comment_reply` VALUES ('10', '6', 'Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '回复12', '2022-08-22 18:14:33', '0');

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `post_name` varchar(100) NOT NULL,
  `post_title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `creator` varchar(50) DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('Pa35625916e50d6c3d94a6a0c4f1c1bea', 'e431cd38a0876f8e83fd3e4700adf0f5', '111', '222', '333', 'admin', '2022-08-19 17:59:33', '2022-08-19 17:38:41', null);
INSERT INTO `post` VALUES ('Paa1602fffae87819555b9a115abff79d', 'e431cd38a0876f8e83fd3e4700adf0f5', '111', '222', '333', 'admin', '2022-08-19 17:12:55', '2022-08-19 17:12:55', null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
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
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('512249510955f513041efa5680496722', 'hhf', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-19 09:55:41', null, null, null, '0', null);
INSERT INTO `user` VALUES ('bd9a4c4ccbd7a9fc3524017c70e13567', 'admin1', '0985251f3d13076beec69aca778ea31f', null, null, null, '2022-08-19 17:15:44', null, null, '0', null);
INSERT INTO `user` VALUES ('e431cd38a0876f8e83fd3e4700adf0f5', 'admin', '0985251f3d13076beec69aca778ea31f', 'http://localhost:3000/user/e431cd38a0876f8e83fd3e4700adf0f5/avatar', null, null, '2022-08-22 15:47:31', null, null, '0', '2022-08-22 15:47:31');
INSERT INTO `user` VALUES ('e929e6d112134e1d15c1f641264693df', 'admin2', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-18 16:41:41', null, null, null, '0', null);
INSERT INTO `user` VALUES ('e99da8b9c5bdd86d6a657e05d0f8516e', 'hhf1', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-19 09:56:39', null, null, null, '0', null);

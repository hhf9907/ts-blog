/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50729
Source Host           : 127.0.0.1:3306
Source Database       : ts_blog

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2022-08-23 17:57:55
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `creator` varchar(50) DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', 'JavaScript', 'admin', '2022-08-23 14:13:18', '2022-08-23 14:13:18');
INSERT INTO `category` VALUES ('2', 'Java', 'admin', '2022-08-23 14:13:47', '2022-08-23 14:13:47');
INSERT INTO `category` VALUES ('3', 'Java3', 'admin', '2022-08-23 14:22:58', '2022-08-23 14:22:58');

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('11', 'Pe733b68cbce0b3e5757998d8977a0228', 'e431cd38a0876f8e83fd3e4700adf0f5', '哈哈哈哈的评论', '2022-08-23 10:57:45', '0');
INSERT INTO `comment` VALUES ('12', 'Pe733b68cbce0b3e5757998d8977a0228', 'e431cd38a0876f8e83fd3e4700adf0f5', '哈哈哈哈的评论', '2022-08-23 10:57:47', '0');
INSERT INTO `comment` VALUES ('13', 'Pe733b68cbce0b3e5757998d8977a0228', 'e431cd38a0876f8e83fd3e4700adf0f5', '哈哈哈哈的评论', '2022-08-23 10:57:47', '0');
INSERT INTO `comment` VALUES ('14', 'Pe733b68cbce0b3e5757998d8977a0228', 'e431cd38a0876f8e83fd3e4700adf0f5', '哈哈哈哈的评论', '2022-08-23 10:57:48', '0');
INSERT INTO `comment` VALUES ('15', 'Pe733b68cbce0b3e5757998d8977a0228', 'e431cd38a0876f8e83fd3e4700adf0f5', '哈哈哈哈的评论', '2022-08-23 10:57:49', '0');
INSERT INTO `comment` VALUES ('16', 'P8a1030305c594c70818090477321f9e5', 'e431cd38a0876f8e83fd3e4700adf0f5', 'P8a1030305c594c70818090477321f9e5的评论', '2022-08-23 10:57:55', '0');
INSERT INTO `comment` VALUES ('17', 'P8a1030305c594c70818090477321f9e5', 'e431cd38a0876f8e83fd3e4700adf0f5', 'P8a1030305c594c70818090477321f9e5的评论', '2022-08-23 10:57:58', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of comment_reply
-- ----------------------------
INSERT INTO `comment_reply` VALUES ('25', '16', 'P8a1030305c594c70818090477321f9e5', 'e431cd38a0876f8e83fd3e4700adf0f5', 'P4839c497967d570eea03694376fa0a5c', '2022-08-23 10:58:44', '0');
INSERT INTO `comment_reply` VALUES ('26', '16', 'P8a1030305c594c70818090477321f9e5', 'e431cd38a0876f8e83fd3e4700adf0f5', 'P4839c497967d570eea03694376fa0a5c', '2022-08-23 10:58:46', '0');
INSERT INTO `comment_reply` VALUES ('27', '16', 'P8a1030305c594c70818090477321f9e5', 'e431cd38a0876f8e83fd3e4700adf0f5', '垃圾', '2022-08-23 10:59:20', '0');
INSERT INTO `comment_reply` VALUES ('28', '16', 'P8a1030305c594c70818090477321f9e5', 'e431cd38a0876f8e83fd3e4700adf0f5', '你真的还烦', '2022-08-23 10:59:27', '0');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `mimetype` varchar(255) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('1', '240b13c5c412e14abf5a1cec9c6eecd4', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:41:03');
INSERT INTO `file` VALUES ('2', 'bb73a995f32fdb41d206bb321509b1f0', 'image/png', '45073', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:41:03');
INSERT INTO `file` VALUES ('3', '4d7690952612429a582386fcfe94b57e', 'image/jpeg', '726266', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:46:36');
INSERT INTO `file` VALUES ('4', '8b4ea83bde55f957a8e7660e5b858f01', 'image/gif', '330244', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:46:45');
INSERT INTO `file` VALUES ('5', '6773ab02eedc013b14299dcc8acee321', 'image/jpeg', '726266', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:47:15');
INSERT INTO `file` VALUES ('6', '3998b74ad9a73c6f1c915b60cc96288a', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:47:15');
INSERT INTO `file` VALUES ('7', '899f05930e3e3529520cda5f86276861', 'image/jpeg', '726266', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:48:00');
INSERT INTO `file` VALUES ('8', '6abf66dc62fa75dd05fb209ffd6b21fb', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:48:00');
INSERT INTO `file` VALUES ('9', 'b0a95358832fb80f32110a658d870d64', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:49:29');
INSERT INTO `file` VALUES ('10', '33f0b5f7881cbf2487cc375476b86b5d', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:50:16');
INSERT INTO `file` VALUES ('11', 'f9bf9d59c3e9b6db910aa6245a06aec3', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:53:45');
INSERT INTO `file` VALUES ('12', '58d4ff9d796fe4a868430263dd016358', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:54:12');
INSERT INTO `file` VALUES ('13', 'b81c5d2c6d0861e14f005ee82cd6039b', 'image/jpeg', '264313', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:55:54');
INSERT INTO `file` VALUES ('14', '621cf4ce5fb6f72ca7126bb6c384d6aa', 'image/gif', '330244', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:56:28');
INSERT INTO `file` VALUES ('15', 'ce2f27a0e56bb52024797edfee1e3e61', 'image/webp', '15382', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:57:32');
INSERT INTO `file` VALUES ('16', '73dc6ef1a015a68683e2f46df42181fa', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:58:29');
INSERT INTO `file` VALUES ('17', '8b5f06246662a1085670dd48668790d7', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:58:29');
INSERT INTO `file` VALUES ('18', '37757e18e4452345dc1cce487f0cc9be', 'image/png', '45073', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 16:58:29');
INSERT INTO `file` VALUES ('19', '4e49ccbcb93734fc3f3b77b821f42ffd', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:36');
INSERT INTO `file` VALUES ('20', 'c7e6defaa033c5231a4f2f9350bf4337', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:36');
INSERT INTO `file` VALUES ('21', 'a6e3e152c16aed4130dc0e3bb6637e4e', 'image/png', '45073', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:36');
INSERT INTO `file` VALUES ('22', '5aab57f0bddf222a66a33dc59dd33909', 'image/jpeg', '6820', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:36');
INSERT INTO `file` VALUES ('23', '0e63c9633cd57a9aa89c23a7581876a3', 'image/png', '18108', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:36');
INSERT INTO `file` VALUES ('24', 'c7c298cea8d4c7364acbde3921a4a05b', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:36');
INSERT INTO `file` VALUES ('25', 'b114d73dbb6ae4b97aaa4c5497795ffb', 'image/jpeg', '52444', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:36');
INSERT INTO `file` VALUES ('26', 'f5e4780fc3425bd0a9d4e516693fb2a8', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:49');
INSERT INTO `file` VALUES ('27', 'a8179c2a8a1338185abd366eb8f66a53', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:49');
INSERT INTO `file` VALUES ('28', '7cf51b0e1ed4e2bafdea379a56d12e7d', 'image/png', '45073', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:49');
INSERT INTO `file` VALUES ('29', '720ee982aa4a760600d13d3ef32f81cc', 'image/jpeg', '6820', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:49');
INSERT INTO `file` VALUES ('30', 'c8a50ed2d82c20f6643142c69304c57b', 'image/png', '18108', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:49');
INSERT INTO `file` VALUES ('31', '42d4bf5c130c6ff788e95c9fc3f27bc9', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:49');
INSERT INTO `file` VALUES ('32', '31c1ad4fcf7373f7ecbbbf0abe693127', 'image/jpeg', '52444', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:01:49');
INSERT INTO `file` VALUES ('33', '0cb36880377c38fcaa591822135f4420', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:04:24');
INSERT INTO `file` VALUES ('34', 'f7156e3187014f090ddda1eea97f8dc5', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:05:49');
INSERT INTO `file` VALUES ('35', '44aea78a476404004e2f85260027b161', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:12:54');
INSERT INTO `file` VALUES ('36', '2267ae8965590f79efc9ecd934abc281', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:13:38');
INSERT INTO `file` VALUES ('37', 'a543dfa0ed630e134c8d38091a916dbf', 'image/png', '45073', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:13:38');
INSERT INTO `file` VALUES ('38', '461ef04676580e867f1a22141484752c', 'image/jpeg', '6820', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:13:38');
INSERT INTO `file` VALUES ('39', '2a20c50335eb11539f33ecf8b7d415af', 'image/png', '18108', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:13:38');
INSERT INTO `file` VALUES ('40', 'fd7adcbea910a034007ae8cf0385c34d', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:13:38');
INSERT INTO `file` VALUES ('41', 'ebd08662219d489d83b3d6611a59c881', 'image/jpeg', '52444', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:13:38');
INSERT INTO `file` VALUES ('42', '95a36c8c5a0f0bb4e5de6a197696d608', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:15:45');
INSERT INTO `file` VALUES ('43', '0490b676aa14204162dbcf2e10adb4ba', 'image/png', '45073', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:15:45');
INSERT INTO `file` VALUES ('44', '60ec9ddf92ae9761c8565d8e1aba830e', 'image/jpeg', '6820', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:15:45');
INSERT INTO `file` VALUES ('45', 'a0a92a6c90dd4f4a0998faaa8af466d9', 'image/png', '18108', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:15:45');
INSERT INTO `file` VALUES ('46', '42a2b1dcac1e91939d434a2f81a51a30', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:15:45');
INSERT INTO `file` VALUES ('47', '24d6df8f911776b6f4080ad0ca3cb052', 'image/jpeg', '52444', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:15:46');
INSERT INTO `file` VALUES ('48', '364fc84fe2e9ca4545a24ece9ad9f3e7', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:01');
INSERT INTO `file` VALUES ('49', 'aa9697c35cac437851bac0bd662f7000', 'image/png', '45073', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:01');
INSERT INTO `file` VALUES ('50', 'a87165167f11c6a1b3008835bfd8391b', 'image/jpeg', '6820', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:01');
INSERT INTO `file` VALUES ('51', '9212ab311a7be4ac16db16ab5496ecff', 'image/png', '18108', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:01');
INSERT INTO `file` VALUES ('52', '5202519e29b14e1954af280d9b733ff0', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:02');
INSERT INTO `file` VALUES ('53', '573874b9299dff833611c0b723784e3d', 'image/jpeg', '52444', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:02');
INSERT INTO `file` VALUES ('54', 'ea187b982f1030c7b3a2aaab3f91de72', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:10');
INSERT INTO `file` VALUES ('55', 'd6db433fe62e437e4a320ea5a589bc96', 'image/png', '45073', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:10');
INSERT INTO `file` VALUES ('56', '8418d45221f7b06ddb00632aa1ba079a', 'image/jpeg', '6820', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:10');
INSERT INTO `file` VALUES ('57', '23a3c9c7de7da03354ebb706acc4f247', 'image/png', '18108', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:10');
INSERT INTO `file` VALUES ('58', 'e10cbb76186e4f9834e0c6cbee9a8b6c', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:10');
INSERT INTO `file` VALUES ('59', 'bee952139791db8777115e86c4a990d3', 'image/jpeg', '52444', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:10');
INSERT INTO `file` VALUES ('60', 'bf2006f14cce3032148135a0aba288c0', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:16:10');
INSERT INTO `file` VALUES ('61', 'd9d3db30fe9e04d663a01dee6ef2f558', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '13147', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:24:51');
INSERT INTO `file` VALUES ('62', '94fd9f38357fa9779866d560cf41f219', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '13147', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-23 17:34:47');

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
  `category_ids` varchar(255) DEFAULT NULL,
  `pv` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_ids`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('P4839c497967d570eea03694376fa0a5c', 'e431cd38a0876f8e83fd3e4700adf0f5', '111', '222', '333', 'admin', '2022-08-23 14:53:15', '2022-08-23 10:57:12', null, '111');
INSERT INTO `post` VALUES ('P8a1030305c594c70818090477321f9e5', 'e431cd38a0876f8e83fd3e4700adf0f5', '111', '222', '333', 'admin', '2022-08-23 14:53:13', '2022-08-23 10:57:11', null, '13');
INSERT INTO `post` VALUES ('Pe733b68cbce0b3e5757998d8977a0228', 'e431cd38a0876f8e83fd3e4700adf0f5', 'postName', 'postTitle', 'content', 'admin', '2022-08-23 14:52:59', '2022-08-23 10:57:21', '1,2,3', '22');

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
INSERT INTO `user` VALUES ('bd9a4c4ccbd7a9fc3524017c70e13567', 'admin1', '0985251f3d13076beec69aca778ea31f', null, null, null, '2022-08-23 09:27:35', null, null, '0', '2022-08-23 09:27:35');
INSERT INTO `user` VALUES ('e431cd38a0876f8e83fd3e4700adf0f5', 'admin', '0985251f3d13076beec69aca778ea31f', 'http://localhost:3000/user/e431cd38a0876f8e83fd3e4700adf0f5/avatar', null, null, '2022-08-23 16:39:54', null, null, '0', '2022-08-23 16:39:54');
INSERT INTO `user` VALUES ('e929e6d112134e1d15c1f641264693df', 'admin2', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-18 16:41:41', '2022-08-23 09:20:56', null, null, '0', '2022-08-23 09:20:56');
INSERT INTO `user` VALUES ('e99da8b9c5bdd86d6a657e05d0f8516e', 'hhf1', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-19 09:56:39', null, null, null, '0', null);

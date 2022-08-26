/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50729
Source Host           : 127.0.0.1:3306
Source Database       : ts_blog

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2022-08-26 17:03:42
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
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4;

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
INSERT INTO `file` VALUES ('63', '16738fff482baaa125f00e5c3b07a39a', 'image/jpeg', '6820', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 13:47:56');
INSERT INTO `file` VALUES ('64', 'e34cbe9335559f1c23f1230e18e6a651', 'image/png', '18108', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 13:47:56');
INSERT INTO `file` VALUES ('65', 'd334db3a70a72a4784bcb9ce948ac3ca', 'image/png', '8106', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 13:47:56');
INSERT INTO `file` VALUES ('66', 'd5d436c9b71de8f3aa40a8ea35c1bbfe', 'image/jpeg', '52444', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 13:47:56');
INSERT INTO `file` VALUES ('67', '209bf34f0aaa2880b7fdcccdcddd41c3', 'image/webp', '21210', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 13:47:56');
INSERT INTO `file` VALUES ('68', 'c02db32325a4deacdfd4c47988c1fa6f', 'image/png', '10174', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 13:47:56');
INSERT INTO `file` VALUES ('69', '30838d108d82bde19490a750aec229c5', 'image/png', '45073', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 13:47:56');
INSERT INTO `file` VALUES ('70', 'b40f183255178f6004ac8ff139a43761', 'image/png', '14869', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 13:47:56');
INSERT INTO `file` VALUES ('71', 'a6f25e2ad479485778be9198b963da67', 'video/mp4', '31175850', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 14:26:31');
INSERT INTO `file` VALUES ('72', '43459c01240a3726bb12c13d950a6043', 'video/mp4', '661908', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 14:26:59');
INSERT INTO `file` VALUES ('73', '3d97e1a25e0a9de9477fe6d62a708e17', 'image/png', '80557', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 15:51:01');
INSERT INTO `file` VALUES ('74', 'e28b09024d73b9ad67644e749ee70789', 'image/jpeg', '264313', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 15:51:02');
INSERT INTO `file` VALUES ('75', 'f3c41e5e28a2c43d400f904b00d5bcce', 'image/png', '518788', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 15:51:02');
INSERT INTO `file` VALUES ('76', '3392f4ad35d97df4ac82218527198746', 'video/mp4', '50156883', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 16:11:19');
INSERT INTO `file` VALUES ('77', '20ac558087a39ae5ace78d71473ca310', 'video/mp4', '50156883', 'e431cd38a0876f8e83fd3e4700adf0f5', '2022-08-24 16:15:14');

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `post_name` varchar(150) NOT NULL,
  `post_intro` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `creator` varchar(50) DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_ids` varchar(255) DEFAULT NULL,
  `pv` int(11) DEFAULT '0',
  `edit_type` int(11) DEFAULT '1' COMMENT '1:markdown 2：富文本',
  `likes` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_ids`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('P0115ff16f243d33e9e6a69c474dd5e08', 'e431cd38a0876f8e83fd3e4700adf0f5', 'rt12131222222222222', 'test', 'test', 'admin', '2022-08-26 11:29:03', '2022-08-26 11:29:03', '2,1', '0', '1', '0');
INSERT INTO `post` VALUES ('P4839c497967d570eea03694376fa0a5c', 'e431cd38a0876f8e83fd3e4700adf0f5', '111', '222', '333', 'admin', '2022-08-23 14:53:15', '2022-08-23 10:57:12', null, '111', '1', '0');
INSERT INTO `post` VALUES ('P8a1030305c594c70818090477321f9e5', 'e431cd38a0876f8e83fd3e4700adf0f5', '111', '222', '333', 'admin', '2022-08-23 14:53:13', '2022-08-23 10:57:11', null, '13', '1', '0');
INSERT INTO `post` VALUES ('P90a657a7c6ac9c3da3645dfbf9adb8ba', 'e431cd38a0876f8e83fd3e4700adf0f5', 'JavaScript中的this绑定', '在日常的开发中，我们会经常使用JavaScript中的一个关键字：this，在常见的编程语言中，几乎都有this这个关键字，但是JavaScript中的this和常见的变成语言中的this不太一样，\n在常见的变成语言（java，c++等）中，this通常只会出现在类的方法中，而this指向它当前调用的对象，但是在JavaScript中，this是更加灵活的，无论是它出现的位置还是它代表的含义。', '## JavaScript中的this绑定\n\n在日常的开发中，我们会经常使用JavaScript中的一个关键字：this，在常见的编程语言中，几乎都有this这个关键字，但是JavaScript中的this和常见的变成语言中的this不太一样，\n在常见的变成语言（java，c++等）中，this通常只会出现在类的方法中，而this指向它当前调用的对象，但是在JavaScript中，this是更加灵活的，无论是它出现的位置还是它代表的含义。\n\n### this全局作用下的指向\n\n这个问题非常容易回答，在浏览器中，this的指向为全局对象window\n\n```js\nconsole.log(this) // window 对象\n\nvar name = \"hhf\"\n\nconsole.log(this.name) // hhf\nconsole.log(window.name) // hhf\n```\n\n但是，开发中很少直接在全局作用于下去使用this，通常都是在函数中使用的\n\n### this到底指向什么呢？\n\n下面我们通过一段代码，代码中，我们定义一个函数，对他进行三种不同的方式进行调用，它产生了不同的结果\n\n```js\nfunction foo() {\n  console.log(this)\n}\n\nfoo() // window对象\n\nconst obj = {\n  name: \"hhf\",\n  foo: foo\n}\n\nobj.foo() // obj1\n\nconst obj2 = {}\n\nfoo.call(obj2) // obj2\n```\n\n从上面代码运行的结果我们得出：\n\n1.函数在调用时，JavaScript会默认给this绑定一个值；\n2.this的绑定和定义的位置（编写的位置）没有关系；\n3.this的绑定和调用方式以及调用的位置有关系；\n4.this是在运行时被绑定的\n\n在JavaScript中，this有四种绑定规则，分别是：\n1.默认绑定\n2.隐式绑定\n3.显式绑定\n4.new绑定\n\n下面我们分别对这四种绑定规则进行学习\n\n### 默认绑定\n\n默认绑定通常是在独立函数进行调用时进行绑定，独立函数调用我们可以理解成没有被绑定到某个对象进行调用,默认绑定在浏览器中指向的是window，当为[ 严格模式](https://www.runoob.com/js/js-strict.html)（use strict）的时候指向的是undefined\n\n```js\n// 案例一\nfunction foo() {\n  console.log(this)\n}\n\nfoo() // window对象\n\n// 案例二\nfunction foo(fn) {\n  fn()\n}\n\nconst obj = {\n  name: \"hhf\",\n  bar: function() {\n    console.log(this)\n  }\n}\n\n\nfoo(obj.bar) // window\n```\n\n### 显示绑定\n\n显示绑定通常是某个对象对它进行调用，通俗来讲：谁调用就指向谁\n\n```js\nfunction foo() {\n  console.log(this.name);\n}\n\nconst obj = {\n  name: \"hhf\",\n  bar: foo\n}\n\n\nobj.bar() // hhf\n```\n\n隐示绑定的另一种情况：\n\n当有多层对象嵌套调用某个函数的时候，如 `对象.对象.函数` ,this 指向的是最后一层对象。\n\n```js\nfunction foo() {\n  console.log(this.name);\n}\n\nconst person = {\n  name: \"person\"\n}\n\nperson.foo = foo\n\nconst obj = {\n  name: \"hhf\",\n  bar: foo,\n  person: person\n}\n\nobj.person.foo() // person\n```\n\n### 显式绑定\n\n在JavaScript中，所有的函数都可以使用call、apply、bind三个方法对函数的this进行绑定\n使用方式的不同：call、apply在函数调用时对它进行调用，bind会返回一个新的函数\n\n显示绑定的用途： 防抖、节流等\n\n#### call函数的使用\n\ncall() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。\n它接收的参数为：第一个为绑定的this，后面接上的为所调用的函数的参数\n具体使用方法如下\n\n```js\n// 基本使用\nfunction foo() {\n  console.log(this.name);\n}\n\nconst obj = {\n  name: \"hhf\"\n}\n\n\nfoo.call(obj) // hhf\n\n// 传入参数\nfunction foo(n, m) {\n  console.log(this.name);\n  console.log(n, m)\n}\n\nconst obj = {\n  name: \"hhf\"\n}\n\n\nfoo.call(obj, \"n\", \"m\") // hhf n m\n```\n\n#### apply函数的使用\n\napply方法的语法和作用与 call() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。\n具体使用方法如下\n\n```js\nfunction foo(n, m) {\n  console.log(this.name);\n  console.log(n, m)\n}\n\nconst obj = {\n  name: \"hhf\"\n}\n\n\nfoo.call(obj, [\"n\", \"m\"]) // hhf, n m\n```\n\n#### bind函数的使用\n\nbind函数它所接收的参数和call函数一样，但是它会返回一个新的函数，新的函数的this会指向传入的对象\n\n```js\nfunction foo(n, m) {\n  console.log(this.name);\n  console.log(n, m)\n}\n\nconst obj = {\n  name: \"hhf\"\n}\n\n\nconst newFoo = foo.bind(obj, \"n\", \"m\")\n\nnewFoo() // hhf n m\n```\n\n### new 绑定\n\nnew是JavaScript中的一个关键字，当进行new操作调用函数时，会执行如下的操作\n1.函数内部会创建一个新的对象\n2.创建的对象的原型（__proto__）会指向函数的prototype\n3.所创建的对象会绑定到该函数的this上\n4.如果函数没有其他返回值，会默认返回该对象\n\n```js\nfunction Persion() {\n  console.log(this)\n}\n\nnew Persion(); // Persion {}\n```\n\n### 规则优先级\n\n上面我们学习了四种绑定规则，那么我们可能会思考，如果一个函数在调用的时候使用了多种绑定规则，谁的优先级最高呢？\n结果如下\n1.默认规则的优先级最低毫无疑问，默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this\n2.显示绑定优先级高于隐式绑定\n\n```js\nfunction foo() {\n  console.log(this.name)\n}\n\nconst obj1 = {\n  name: \'obj1\',\n  foo: foo\n}\n\nconst obj2 = {\n  name: \'obj2\',\n}\n\nobj1.foo.call(obj2) // obj2\n```\n\n3.new绑定优先级高于隐式绑定\n\n```js\nfunction foo() {\n  console.log(this)\n}\n\nconst obj1 = {\n  name: \'obj1\',\n  foo: foo\n}\n\nconst obj2 = {\n  name: \'obj2\',\n}\n\nnew obj1.foo() // foo {}\n```\n\n4.new绑定优先级高于bind\n new绑定和call、apply是不允许同时使用的，所以不存在谁的优先级更高\n new绑定可以和bind一起使用，new绑定优先级更高p代码测试\n\n```js\nfunction foo() {\n  console.log(this)\n}\n\nconst obj1 = {\n  name: \'obj1\',\n  foo: foo\n}\n\nconst newFoo = foo.bind(obj1)\nnew newFoo() // foo {}\n```\n\n### 箭头函数的this\n\n箭头函数是ES6中新增的一种函数的写法，但是箭头函数是不绑定this的，当在箭头函数中使用this时，它会随着它的作用域网上找，使用最近的作用域的this来使用\n\n```js\n// 使用普通函数\n\nconst obj1 = {\n  name: \'obj1\',\n  foo: function() {\n    console.log(this)\n  }\n}\n\nobj1.foo() // obj1\n\n// 使用箭头函数\nconst obj1 = {\n  name: \'obj1\',\n  foo: ()=> {\n    console.log(this)\n  }\n}\n\nobj1.foo() // window foo的上层作用域为window\n\n// setTimeout所传入的函数如果是普通函数，那么它绑定的是全局对象window，如果传入的\n//是一个箭头函数，那么它的this执行是它的上层作用域的this指向\nconst obj1 = {\n  name: \'obj1\',\n  bar: function() {\n    setTimeout(()=> {\n      console.log(this)\n    })\n  }\n}\n\nobj1.bar() // obj1\n```\n\n下面我们通过一道题，对刚刚所学的进行一个小练习\n\n```js\nvar name = \"window\"\n\nfunction Person(name) {\n  this.name = name\n  this.obj = {\n    name: \"obj\",\n    foo1: function() { \n      return function() {\n        console.log(this.name)\n      }\n    },\n    foo2: function() {\n      return ()=>{\n        console.log(this.name)\n      }\n    }\n  }\n}\n\nvar person1 = new Person(\"person1\")\nvar person2 = new Person(\"person2\")\n\nperson1.obj.foo1()()\nperson1.obj.foo1.call(person2)()\nperson1.obj.foo1().call(person2)\n\nperson1.obj.foo2()()\nperson1.obj.foo2.call(person2)()\nperson1.obj.foo2().call(person2)\n```\n\n输出结果为\n\n```js\n/*\nwindow\nwindow\nperson2\nobj\nperson2\nobj\n*/\n```', 'admin', '2022-08-26 17:00:56', '2022-08-25 15:43:43', '1,2', '211', '1', '0');
INSERT INTO `post` VALUES ('P9a7a3f3f067c790c3dc321dd2853a0a0', 'e431cd38a0876f8e83fd3e4700adf0f5', '文章名称', '文章名称\n文章名称\n文章名称\n文章名称\n文章名称\n文章名称\n文章名称\n', '文章名称\n', 'admin', '2022-08-26 11:33:24', '2022-08-26 11:32:52', '1,3', '2', '1', '0');
INSERT INTO `post` VALUES ('Pe733b68cbce0b3e5757998d8977a0228', 'e431cd38a0876f8e83fd3e4700adf0f5', 'postName', 'postTitle', 'content', 'admin', '2022-08-26 10:58:23', '2022-08-23 10:57:21', '1,2,3', '23', '1', '0');
INSERT INTO `post` VALUES ('Pe9d6b8b5cf336c499ac3952e2aa86613', 'e431cd38a0876f8e83fd3e4700adf0f5', 'rt1213', 'test', 'test', 'admin', '2022-08-26 11:27:46', '2022-08-26 11:27:46', null, '0', '1', '0');
INSERT INTO `post` VALUES ('Pebc3907840600ba4c7f39df48cb16065', 'e431cd38a0876f8e83fd3e4700adf0f5', '基于Proxy从0到1实现响应式数据', '基于Proxy从0到1实现响应式数据', '一、前言\n基于Proxy从0到1实现响应式数据，读完本文你会收获：\n\n\n什么是响应式数据\n响应式数据的实现原理\n在通过Proxy实现响应式数据时，Proxy中的get和set都分别做了什么\n\n\n二、副作用函数\n在本文开始前我们先理解一个概念副作用函数\n副作用函数是什么？\n副作用的函数不仅仅只是返回了一个值，而且还做了其他的事情：\n\n 修改了一个变量\n 直接修改数据结构\n 设置一个对象的成员\n 抛出一个异常或以一个错误终止\n 打印到终端或读取用户输入\n 读取或写入一个文件\n\n通俗点理解就是副作用函数就是会产生副作用的函数如下所示：\nfunction effect() {\n  document.getElementById(\'text\').innerHTML = obj.text\n}\n复制代码\n除了effect 函数之外的任何函数都可以读取或设置body的文本内容，也就是说，effect函数的执行会直接或间接影响其他函数的执行，这时就可以说effect函数产生了副作用\n三、响应式数据\n什么是响应式数据？\n假设在一个副作用函数中读取了某个对象的属性：\nconst obj = { text: \'hello anju\' }\nfunction effect() {\n  document.getElementById(\'text\').innerHTML = obj.text\n}\n复制代码\n这时我们希望当obj.text 发生变化时，副作用函数 effect会重新执行\nobj.text = \'hello world\'\n复制代码\n如果能实现这个目标，那对象obj就是响应式数据\n实现一个基础版响应式系统\n观察如下代码：\nconst obj = { text: \'hello anju\' }\nfunction effect() {\n  document.getElementById(\'text\').innerHTML = obj.text\n}\n复制代码\n1、当副作用函数effect执行时，会触发字段 obj.text的 读取 操作；\n2、当修改obj.text的值时，会触发字段obj.text的 设置 操作\n\n那么如果我们能拦截一个对象的读取和设置操作是不是就可以让事情变得简单？\n如何拦截？\n\n这里我们看一下vue的拦截方式：\n\n1、vue2：Object.defineProperty()\n2、vue3：Proxy\n\nProxy 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）；\nProxy 用于修改某些操作的默认行为,也可以理解为在目标对象之前架设一层拦截,外部所有的访问都必须先通过这层拦截,因此提供了一种机制,可以对外部的访问进行过滤和修改\n\n因为Object.defineProperty()存在一定的缺陷，所以这里我们采用Proxy来实现\n\n首先我们定义一个存储副作用函数的桶\n// 存储副作用函数的桶\nconst bucket = new Set()\n复制代码\n// 原始数据\nconst data = { text: \'hello anju\' }\n复制代码\n使用Proxy代理原始数据\n// 代理原始数据\nconst obj = new Proxy(data, {\n	// 拦截读取操作\n	get(target, key) {\n		// 将副作用函数存储至桶中\n		bucket.add(effect)\n		// 返回属性值\n		return target[key]\n	},\n\n	// 拦截设置操作\n	set(target, key, newVal) {\n		// 设置属性值\n		target[key] = newVal\n		// 把副作用函数从桶里取出并执行\n		bucket.forEach(fn => fn())\n		// 返回true 代表设置成功\n		return true\n	}\n})\n复制代码\n我们执行下实例代码(因为是在vue项目里写的实例代码，所以这里用onMounted)：\nfunction effect() {\n  document.getElementById(\'text\').innerHTML = obj.text\n}\n\nonMounted(() => {\n  effect()\n  setTimeout(() => {\n    obj.text = \'hello vue3\'\n  }, 2000)\n})\n\n复制代码\n看下执行效果：\n\n成功(｡◝‿◜｡)，至此，一个基础版的响应式系统就实现了\n设计一个完善的响应式系统\n我们目前实现的只是一个基础版的响应式系统，那跟完善的响应式系统相比我们还差哪些东西？\n首先，我们可以看到我们刚实现的基础版的响应式系统存在一个硬编码的问题，耦合度高，过度依赖副作用函数的名称（effect）\n所以我们要优先解决下硬编码的问题，这里我们再次的观察一下我们刚实现的基础版响应式数据，想一想一个响应式系统的工作流程是什么？\n// 存储副作用函数的桶\nconst bucket = new Set()\n// 原始数据\nconst data = { text: \'hello anju\' }\n// 代理原始数据\nconst obj = new Proxy(data, {\n	// 拦截读取操作\n	get(target, key) {\n		// 将副作用函数存储至桶中\n		bucket.add(effect)\n		// 返回属性值\n		return target[key]\n	},\n\n	// 拦截设置操作\n	set(target, key, newVal) {\n		// 设置属性值\n		target[key] = newVal\n		// 把副作用函数从桶里取出并执行\n		bucket.forEach(fn => fn())\n		// 返回true 代表设置成功\n		return true\n	}\n})\n复制代码\n响应式系统的工作流程：\n\n读取操作发生时，将副作用函数存储在桶中；\n设置操作发生时，将副作用函数从桶中取出并执行\n\n所以这里我们就要提供一个机制，能去注册副作用函数：\n// 用一个全局变量存储被注册的副作用函数\nlet activeEffect\n// effect 函数用于注册副作用函数\nfunction effect(fn) {\n  // 调用effect 注册副作用函数时，将副作用函数fn 赋值给activeEffect\n  activeEffect = fn\n  // 执行副作用函数\n  fn()\n}\n复制代码\n加入此机制，重新改善下我们基础版的响应式系统：\n// 触发响应式数据obj.text 的读取操作，\n// 进而触发代理对象Proxy的 get 拦截函数\neffect(\n  // 匿名的副作用函数\n  () => {\n    document.getElementById(\'text\').innerHTML = obj.text\n  }\n)\n\nconst obj = new Proxy(data, {\n	get(target, key) {\n            // 将activeEffect中存储的副作用函数收集至桶中\n            if (activeEffect) {\n                 bucket.add(activeEffect)\n            }\n            return target[key]\n	},\n\n	set(target, key, newVal) {\n		target[key] = newVal\n		bucket.forEach(fn => fn())\n		return true\n	}\n})\n复制代码\n(｡◝‿◜｡)，至此，一个解决了硬编码问题的响应式系统就实现了\n\n作者：业务崽\n链接：https://juejin.cn/post/7134274995051560997\n来源：稀土掘金\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。', 'admin', '2022-08-26 11:54:54', '2022-08-26 11:54:18', '1', '1', '1', '0');

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
  `status` enum('-1','0','1') DEFAULT '1' COMMENT '用户状态: 1:正常， 0：冻结, -1: 永封',
  `type` enum('1','2','3') DEFAULT '1' COMMENT '用户状态: 1:普通用户， 2：管理人员, 3: 超管',
  `nickname` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('290bd15c4043cbc447737ba4b00205c4', 'superAdmin', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-25 10:43:29', '2022-08-25 10:43:54', null, null, '0', '2022-08-25 16:12:14', '1', '3', '1212');
INSERT INTO `user` VALUES ('512249510955f513041efa5680496722', 'hhf', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-19 09:55:41', '2022-08-25 10:42:43', null, null, '0', '2022-08-25 16:12:17', '1', '1', '123132');
INSERT INTO `user` VALUES ('bd9a4c4ccbd7a9fc3524017c70e13567', 'admin1', '0985251f3d13076beec69aca778ea31f', null, null, null, '2022-08-23 09:27:35', null, null, '0', '2022-08-25 16:12:18', '1', '1', '123123');
INSERT INTO `user` VALUES ('e431cd38a0876f8e83fd3e4700adf0f5', 'admin', '0985251f3d13076beec69aca778ea31f', 'http://localhost:3000/user/e431cd38a0876f8e83fd3e4700adf0f5/avatar', null, null, '2022-08-26 11:52:03', null, null, '0', '2022-08-26 11:52:03', '1', '3', '123123');
INSERT INTO `user` VALUES ('e929e6d112134e1d15c1f641264693df', 'admin2', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-18 16:41:41', '2022-08-23 09:20:56', null, null, '0', '2022-08-25 16:12:22', '0', '1', '123123');
INSERT INTO `user` VALUES ('e99da8b9c5bdd86d6a657e05d0f8516e', 'hhf1', '0985251f3d13076beec69aca778ea31f', null, null, '2022-08-19 09:56:39', '2022-08-25 10:56:08', null, null, '0', '2022-08-25 16:12:20', '1', '1', '123123');

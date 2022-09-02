ALTER TABLE user ADD phone varchar(11)
ALTER TABLE user ADD email varchar(20)
ALTER TABLE user ADD nickname varchar(20)
ALTER TABLE user ADD home_page varchar(100)
ALTER TABLE user ADD concerns INT DEFAULT 0
ALTER TABLE user ADD status  enum('-1', '0', '1') DEFAULT '1' COMMENT '用户状态: 1:正常， 0：冻结, -1: 永封'
ALTER TABLE user ADD type  enum('1', '2', '3') DEFAULT '1' COMMENT '用户状态: 1:普通用户， 2：管理人员, 3: 超管'
 ALTER TABLE user DROP COLUMN update_time;
ALTER TABLE user ADD update_time datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP

ALTER TABLE posts ADD category_id varchar(20) FOREIGN KEY(category_id) REFERENCES categorys(id) ON DELETE CASCADE ON UPDATE CASCADE


ALTER TABLE post ADD pv  INT DEFAULT 0
ALTER TABLE post ADD user_id varchar(50) NOT NULL
ALTER TABLE post ADD content_html text
ALTER TABLE post ADD edit_type INT DEFAULT 1 COMMENT '1:markdown 2：富文本'
ALTER TABLE post ADD likes INT DEFAULT 0 
-- 删除列
 ALTER TABLE users DROP COLUMN concerns;
 ALTER TABLE user DROP COLUMN status;
 ALTER TABLE posts DROP COLUMN category_ids;
 ALTER TABLE post DROP COLUMN content_html;

-- // gengxin
update users set concerns = concerns+1 WHERE id='e431cd38a0876f8e83fd3e4700adf0f5';


ALTER TABLE comment ADD likes  INT DEFAULT 0
ALTER TABLE comment_reply ADD likes  INT DEFAULT 0
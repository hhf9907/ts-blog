SELECT SQL_CALC_FOUND_ROWS
if((c.post_id=p.id && c.user_id = 'e431cd38a0876f8e83fd3e4700adf0f5') ,1,0) AS isCollect,

( SELECT COUNT(*) FROM comment  WHERE p.id = post_id) + ( SELECT COUNT(*) FROM comment_reply WHERE p.id = post_id) AS commentNum,

p.id AS postId,
p.user_id AS userId,
u.name AS userName,
u.nickname,
u.avatar,
p.post_name AS postName,
p.post_intro AS postIntro,
p.content, creator, pv,
p.category_ids AS categoryIds,
p.create_time AS createTime

FROM post AS p
LEFT JOIN collect AS c  ON c.post_id = p.id
LEFT JOIN user AS u ON p.user_id = u.id
ORDER BY p.create_time DESC
LIMIT 0, 10;



SELECT u.id,
(
SELECT
COUNT(r.id) 
FROM relation AS r 
WHERE r.to_user_id = 'e431cd38a0876f8e83fd3e4700adf0f5'
) AS concerns,

(
SELECT
COUNT(r.id) 
FROM relation AS r 
WHERE r.from_user_id = 'e431cd38a0876f8e83fd3e4700adf0f5'
) AS fans ,

(
SELECT
SUM(p.pv) 
FROM post AS p 
WHERE p.user_id = 'e431cd38a0876f8e83fd3e4700adf0f5'
) AS pvTotal 

FROM user AS u
WHERE u.id = 'e431cd38a0876f8e83fd3e4700adf0f5'


SELECT 
COUNT(if(from_user_id='e431cd38a0876f8e83fd3e4700adf0f5',true,null)) AS fans,
COUNT(if(to_user_id='e431cd38a0876f8e83fd3e4700adf0f5',true,null)) AS concerns
FROM relation

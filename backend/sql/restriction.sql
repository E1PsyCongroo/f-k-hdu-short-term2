USE financial;
-- 外键约束
ALTER TABLE member
ADD FOREIGN KEY (family_id) REFERENCES family (family_id);
ALTER TABLE user
ADD FOREIGN KEY (member_id) REFERENCES member (member_id);
ALTER TABLE consume
ADD FOREIGN KEY (member_id) REFERENCES member (member_id);

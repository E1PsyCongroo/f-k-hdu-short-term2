USE financial;
CREATE TRIGGER update_family_num_after_insert
AFTER
INSERT ON member FOR EACH ROW BEGIN -- 更新家庭表中的家庭人数
UPDATE family
SET num = num + 1
WHERE family_id = NEW.family_id;
END

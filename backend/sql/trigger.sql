USE financial;
-- 删除现有的触发器（如果需要）
DROP TRIGGER IF EXISTS update_family_num_after_insert;
DROP TRIGGER IF EXISTS prevent_deletion_if_only_one_member;
DROP TRIGGER IF EXISTS update_family_num_after_delete;
-- 创建新的 AFTER INSERT 触发器
CREATE TRIGGER update_family_num_after_insert
AFTER
INSERT ON member FOR EACH ROW BEGIN -- 更新家庭表中的家庭人数
UPDATE family
SET num = num + 1
WHERE family_id = NEW.family_id;
END;
-- 创建 BEFORE DELETE 触发器来检查是否满足删除条件
CREATE TRIGGER prevent_deletion_if_only_one_member BEFORE DELETE ON member FOR EACH ROW BEGIN
DECLARE current_num INT;
-- 获取当前的家庭人数
SELECT num INTO current_num
FROM family
WHERE family_id = OLD.family_id;
-- 如果家庭人数为 1，则禁止删除操作
IF current_num <= 1 THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Cannot delete the last remaining member of the family.';
END IF;
END;
-- 创建 AFTER DELETE 触发器来更新家庭人数
CREATE TRIGGER update_family_num_after_delete
AFTER DELETE ON member FOR EACH ROW BEGIN -- 在删除成员后，更新家庭表中的家庭人数
UPDATE family
SET num = num - 1
WHERE family_id = OLD.family_id;
END;

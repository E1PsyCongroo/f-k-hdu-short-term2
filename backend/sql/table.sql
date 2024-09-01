USE financial;
-- 创建家庭表
CREATE TABLE family (
    -- 家庭ID
    family_id INT AUTO_INCREMENT PRIMARY KEY,
    -- 家庭人数
    num INT NOT NULL,
    -- 家庭名称
    family_name VARCHAR(64) NOT NULL,
    -- 户主ID
    host_id INT NOT NULL
);
-- 创建家庭成员表
CREATE TABLE member (
    -- 家庭成员 ID
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    -- 成员姓名
    name VARCHAR(64) NOT NULL,
    -- 成员性别
    sex VARCHAR(10) NOT NULL,
    -- 成员与户主的关系
    relation VARCHAR(64) NOT NULL,
    -- 家庭ID 外键 关联 家庭ID
    family_id INT NOT NULL
);
-- 创建用户表
CREATE TABLE user (
    -- 用户 ID
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    -- 用户名
    username VARCHAR(64) NOT NULL UNIQUE,
    -- 用户密码
    password VARCHAR(255) NOT NULL,
    -- 用户的家庭成员ID 外键
    member_id INT NOT NULL
);
-- 创建收支表
CREATE TABLE consume (
    -- 消费ID，自增，主键
    id INT AUTO_INCREMENT PRIMARY KEY,
    -- 成员ID，外键
    member_id INT NOT NULL,
    -- 消费金额
    amount INT NOT NULL,
    -- 消费类型，0支出，1收入
    transactionType BOOLEAN NOT NULL,
    -- 消费时间
    consumeDate DATE NOT NULL,
    -- 流向，金额消费给谁或如何得到收入
    recipient VARCHAR(255),
    -- 消费类别，具体的消费类别
    category VARCHAR(100),
    -- 删除标记，是否删除标记，默认为 0（未删除）
    isDeleted BOOLEAN DEFAULT 0 NOT NULL,
    -- 用户备注
    userNote VARCHAR(255)
);

CREATE TABLE Member (
    memId INT PRIMARY KEY AUTO_INCREMENT,
    -- 用户ID，主键
    name VARCHAR(100) NOT NULL,
    -- 用户姓名
    sex VARCHAR(10) -- 用户性别
);
INSERT INTO Member (memId, name, sex)
VALUES (1, "原神", "男"),
    (2, "猿神", "男");

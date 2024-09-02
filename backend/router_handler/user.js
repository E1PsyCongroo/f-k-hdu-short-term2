const db=require('../db/index.js')

const jwt = require('jsonwebtoken');

const config = require('../config.js');

/**
 * Handles user login.
 * @param {object} req - Express request object, expected to have username and password in body.
 * @param {object} res - Express response object, returns status, message, and JWT token.
 */
exports.login = (req, res) => {
    const userInfo = req.body;
    const sqlStr = 'select * from user where username = ?';
    db.query(sqlStr, [userInfo.username], (error, results) => {
        if (error) {
            return res.cc(error,500);
        }
        if (results.length !== 1) {
            return res.cc('用户名或密码错误',500);
        }
        // 验证密码是否正确, bcrypt.compareSync()
        const compareResult = (userInfo.password == results[0].password);
        if (!compareResult) {
            return res.cc('用户名或密码错误',500);
        }
        // 登录成功, 生成 token
        // ES6 高级语法, 剔除私密信息
        const user = { ...results[0], password: '', user_pic: '' };
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn });
        // 响应给客户端
        res.send({
            status: 200,
            msg: '登录成功',
            data: {
                token: tokenStr,
                username: userInfo.username,
                member_id: user.member_id,
                avatar: userInfo.avatar || ''
            }
        });
    });
};

const db = require('../db/index.js');

exports.getFamily = (req, res) => {
    console.log(req.query)
    const userInfo = req.query;
    const sqlStr = 'SELECT * from family WHERE family_id = (SELECT family_id from member WHERE member_id = 1)';
    db.query(sqlStr, [userInfo.member_id], (error, results) => {
        if (error)
            return res.cc(error, 500);
        return res.send({
            status:200,
            msg:'获取家庭成功',
            data:results[0]
        });
    });
}

exports.getMembers = (req, res) => {
    console.log(req.query)
    const userInfo = req.query;
    const sqlStr = 'SELECT * FROM member WHERE family_id = (SELECT family_id FROM member WHERE member_id = ?)';
    db.query(sqlStr, [userInfo.member_id], (error, results) => {
        if (error)
            return res.cc(error, 500);
        return res.send({
            status:200,
            msg:'获取所有成员成功',
            data:results
        });
    });
};

exports.addMember = (req,res) => {
    console.log(req.body)
    const sqlStr = 'insert into member set ?';
    const memberData = {
        name: req.body.name,
        sex: req.body.sex,
        relation: req.body.relation,
        family_id: req.body.family_id
    };
    db.query(sqlStr, memberData, (error, results) => {
        if (error)
            return res.cc(error, 500);
        return res.cc('新增用户成功');
    })
}

const axios = require('axios')
const path = require('path')
const fs = require('fs')
const {url} = require('../uploads/picurl.js')

/**
 * Retrieves random images from the URL list and sends them in the response.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.getPicture =(req,res) => {

    const getRandomImages = (count) => {
        console.log("running the funciton")
        console.log(url)
        const shuffled = url.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    // 调用函数获取指定数量的随机图片
    return res.send({
        status:200,
        msg:"返回图片成功",
        data:getRandomImages(10)
    })
}

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const config=require('./config.js')
const expressJWT = require('express-jwt');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {

  res.cc = (error,status=200) => {
    res.send({
      status,
      msg: error instanceof Error ? error.message : error,
    })
  }

  next();
})

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '后端API接口描述文档',
      version: '1.0.0',
      description: 'Backend API for 家庭收支管理',
    },
  },
  apis: ['./router/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: ['/login', '/pictures', '/api-docs'] }));

app.use('/uploads', express.static('./uploads'))

const consumes = require('./router/consume.js');
const members = require('./router/member.js');
const pictures = require('./router/picture.js');
const users = require('./router/user.js')
app.use('/',consumes);
app.use('/',members);
app.use('/',pictures);
app.use('/',users);


app.listen(8088, () => {
  console.log('server running at http://localhost:8088');
})

module.exports = app;

var mysql = require("mysql"); //导入 安装好的mysql.  npm install mysql
var config = require("../config/default.js"); // 导入位置文件

var pool = mysql.createPool({
  //创建mysql的连接
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
});

//这里我们封装了一个query方法 用于对本地数据进行操作

// 对数据库进行增删改查操作的基础
let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

exports.query = query;

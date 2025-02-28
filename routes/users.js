// @ts-ignore
const router = require("koa-router")();
const mysql = require("../utils/db"); //导入 db.js
const table = "test_db.users";

router.post("/signin", async (ctx, next) => {
  let name = ctx.request.body.name || "",
    password = ctx.request.body.password || "";
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === "koa" && password === "12345") {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
});

// 查询用户
router.post("/getUsers", async (ctx, next) => {
  try {
    const users = await mysql.query(`select * from ${table};`);
    const { pageNo, pageSize } = ctx.request.body;
    const res = await mysql.query(
      `select id, name, age, email,updateTime from ${table} limit ${
        (pageNo - 1) * pageSize
      }, ${pageSize};`
    );
    ctx.body = {
      code: 0,
      data: {
        data: res,
        total: users.length,
      },
      msg: "success",
    };
  } catch (err) {
    ctx.body = {
      code: -1,
      data: null,
      msg: err.sqlMessage,
    };
  }
});

// 查询用户详情
router.post("/getUserInfo", async (ctx, next) => {
  try {
    const user = await mysql.query(
      `select * from ${table} where id = ${ctx.request.body.id};`
    );
    ctx.body = {
      code: 0,
      data: user,
      msg: "success",
    };
  } catch (err) {
    ctx.body = {
      code: -1,
      data: null,
      msg: err.sqlMessage,
    };
  }
});

// 添加用户
router.post("/addUser", async (ctx, next) => {
  try {
    const users = await mysql.query(`select * from ${table};`);
    const { name, age, email } = ctx.request.body;
    const now = new Date().getTime();
    const id = users.length;
    if (!name || !age || !email) {
      ctx.body = {
        code: -1,
        data: null,
        msg: "参数错误",
      };
      return;
    }
    const res = await mysql.query(
      `INSERT INTO ${table} (id,name,age,email,updateTime) VALUES (${
        id + 1
      },"${name}",${age},"${email}",${now})`
    );
    ctx.body = {
      code: 0,
      data: res,
      msg: "success",
    };
  } catch (err) {
    ctx.body = {
      code: -1,
      data: null,
      msg: err.sqlMessage,
    };
  }
});

// 更新用户
router.post("/updateUser", async (ctx, next) => {
  try {
    // const res = await mysql.query(`select * from users`);
    const { name, age, email, id } = ctx.request.body;
    const now = new Date().getTime();
    if (!name || !age || !email) {
      ctx.body = {
        code: -1,
        data: null,
        msg: "参数错误",
      };
      return;
    }
    const sql = `UPDATE ${table} SET name = "${name}", age = ${age}, email = "${email}", updateTime = ${now}  where id = ${id};`;
    await mysql
      .query(sql)
      .then(async (res) => {
        ctx.body = {
          data: res,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    ctx.body = {
      err,
    };
  }
});

// 删除用户
router.post("/delUser", async (ctx, next) => {
  try {
    const { id } = ctx.request.body;
    if (!id) {
      ctx.body = {
        code: -1,
        data: null,
        msg: "参数错误",
      };
      return;
    }
    const sql = `DELETE FROM ${table} where id = ${id};`;
    await mysql
      .query(sql)
      .then(async (res) => {
        ctx.body = {
          data: res,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    ctx.body = {
      err,
    };
  }
});

module.exports = router;

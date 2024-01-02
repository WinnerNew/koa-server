// @ts-ignore
const router = require("koa-router")();
const mysql = require("../utils/db"); //导入 db.js

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
router.post("/users", async (ctx, next) => {
  const { pageNo, pageSize } = ctx.request.body;
  const sql = `select name, age, email,updateTime from test_db.users limit ${
    (pageNo - 1) * pageSize
  }, ${pageSize};`;
  await mysql
    .query(sql)
    .then(async (res) => {
      ctx.body = {
        data: res,
      };
    })
    .catch((err) => {
      console.log("添加错误", err);
    });
});

// 添加用户
router.post("/addUser", async (ctx, next) => {
  try {
    const res = await mysql.query(`select * from users;`);
    const { name, age, email } = ctx.request.body;
    const now = new Date().getTime();
    const id = res.length;
    const sql = `INSERT INTO test_db.users (id,name,age,email,updateTime) VALUES (${id},"${name}",${age},"${email}",${now})`;
    await mysql
      .query(sql)
      .then(async (res) => {
        ctx.body = {
          data: res,
        };
      })
      .catch((err) => {
        console.log("添加错误", err);
      });
  } catch (err) {
    ctx.body = {
      err,
    };
  }
});

// 更新用户
router.post("/updateUser", async (ctx, next) => {
  try {
    // const res = await mysql.query(`select * from users`);
    const { name, age, email, id } = ctx.request.body;
    const now = new Date().getTime();
    const sql = `UPDATE test_db.users SET name="${name}", age=${age}, email="${email}", updateTime=${now} where id=${id};`;
    await mysql
      .query(sql)
      .then(async (res) => {
        ctx.body = {
          data: res,
        };
      })
      .catch((err) => {
        console.log("添加错误", err);
      });
  } catch (err) {
    ctx.body = {
      err,
    };
  }
});

// 删除用户
router.get("/delUser", async (ctx, next) => {
  const { id } = ctx.request.query;
  const sql = `delete from test_db.users where id = ${id};`;
  await mysql
    .query(sql)
    .then(async (res) => {
      ctx.body = {
        data: res,
      };
    })
    .catch((err) => {
      console.log("添加错误", err);
    });
});

module.exports = router;

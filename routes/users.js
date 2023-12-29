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

router.get("/users", async (ctx, next) => {
  let sql = `select * from users`;
  // const sql = `select * from lists`;
  // 此处编写sql 语句 将新建的arr 里的内容 插入到表里面
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

  // await ctx.render("index", {
  //   title: "Hello Koa 2!",
  // });
});

router.post("/addUser", async (ctx, next) => {
  try {
    const { name, age, email } = ctx.request.body;
    const sql =
      "INSERT INTO test_db.users (id,name,age,email,updateTime) " +
      "VALUES (99," +
      '"' +
      name +
      '",' +
      age +
      "," +
      email +
      "," +
      new Date().getTime() +
      ")";
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
    console.log(err, "---");
    ctx.body = {
      err,
    };
  }
});

router.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

module.exports = router;

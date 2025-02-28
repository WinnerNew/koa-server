// @ts-ignore
const router = require("koa-router")();
const mysql = require("../utils/db"); //导入 db.js
const table = "sakila.staff";

// 查询员工
router.post("/getStaffs", async (ctx, next) => {
  try {
    const staff = await mysql.query(`select * from ${table};`);
    const { pageNo, pageSize } = ctx.request.body;
    const res = await mysql.query(
      `select * from ${table} limit ${(pageNo - 1) * pageSize}, ${pageSize};`
    );
    ctx.body = {
      code: 0,
      data: {
        data: res,
        total: staff.length,
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

router.post("/getStaffsInfo", async (ctx, next) => {
  try {
    const staff = await mysql.query(`select * from ${table};`);
    const { pageNo, pageSize } = ctx.request.body;
    const res = await mysql.query(
      `select * from ${table} limit ${(pageNo - 1) * pageSize}, ${pageSize};`
    );
    ctx.body = {
      code: 0,
      data: {
        data: res,
        total: staff.length,
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

module.exports = router;

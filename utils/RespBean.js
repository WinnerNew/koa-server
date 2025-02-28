class RespBean {
  async respBean(ctx, next) {
    //默认http状态码为200，前端请求走的是.then( res => {} )
    ctx.success = function (
      code = 200,
      msg = "请求成功",
      data,
      httpStatus = 200
    ) {
      ctx.status = httpStatus;
      ctx.type = "json";
      ctx.body = {
        code,
        msg,
        data,
      };
    };
    // 默认http状态码是400，前端请求走的是.catch( err => {})
    ctx.failure = function (code = 400, msg = "请求失败", httpStatus = 400) {
      ctx.status = httpStatus;
      ctx.type = "json";
      ctx.body = {
        code,
        msg,
      };
    };
    await next();
  }
}

module.exports = new RespBean();

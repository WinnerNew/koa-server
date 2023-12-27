const router = require("koa-router")();

router.prefix("/users");

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

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

module.exports = router;

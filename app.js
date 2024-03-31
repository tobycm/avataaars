const { default: Avataaars } = require("avataaars");
const express = require("express");
const { createElement } = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

const app = express();

app.set("view engine", "html");

app.get("/", async (req, res) => {
  if (req.query.facialHairType === "BeardMagestic") req.query.facialHairType = "BeardMajestic";

  try {
    res.send(renderToStaticMarkup(createElement(Avataaars, { ...req.query })));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV.toLowerCase() === "development")
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render("error", { message: error.message, error });
  });
else app.use((error, req, res, next) => res.status(error.status || 500));

const server = app.listen(process.env.PORT || 3000, () => console.log("Express server listening on port " + server.address().port));

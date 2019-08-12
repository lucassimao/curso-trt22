const express = require("express");

const app = express();
const db = [];

app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.post("/", function(req, res, next) {
  const { id, nome } = req.body;
  db.push({ id, nome });
  next();
});

app.get("/delete/:id", (req, res) => {
  const indice = db.findIndex(pessoa => pessoa.id == req.params.id);
  if (indice !== -1) {
    db.splice(indice, 1);
  }
  res.redirect("/");
});

app.use((req, res) => res.render("index", { pessoas: db }));
app.listen(3000);

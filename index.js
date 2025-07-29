const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = []; // [{text: "task", priority: "High"}]

app.get("/", function (req, res) {
  const filter = req.query.priority || "All";
  const filteredItems =
    filter === "All" ? items : items.filter((i) => i.priority === filter);
  res.render("list", { items: filteredItems, filter });
});

app.post("/", function (req, res) {
  const { ele1, priority } = req.body;
  if (ele1.trim() !== "") {
    items.push({ text: ele1, priority });
  }
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const index = parseInt(req.body.index);
  if (!isNaN(index)) items.splice(index, 1);
  res.redirect("/");
});

app.listen(8000, function () {
  console.log("Server started at http://localhost:8000");
});

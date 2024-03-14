const path = require('path');
const express = require("express");
const routes = require("./routes/notes");
const separate = require("./routes/separate");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api", routes);
app.use("/", separate);

// All base page routes, not routed separately.

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

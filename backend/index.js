const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes.js");

const app = express();
app.use(express.json());
const PORT = 3000;

app.use(cors());
app.use(routes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

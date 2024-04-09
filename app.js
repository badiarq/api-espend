require('dotenv').config();

const express = require("express");
const helmet = require("helmet");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => { res.json({ message: "Not authorized" }); });

// Routes
app.use("/test", require("./routes/test"));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => { console.log(`App listening at http://localhost:${port}`); });
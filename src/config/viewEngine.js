import express from 'express';
const app = express();

let handleviewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs")
    app.set("views1", "./src/views")

}

export default handleviewEngine;
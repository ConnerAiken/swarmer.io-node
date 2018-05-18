import utils from "./utils.js";
import path from "path";
import dotenv from "dotenv"; 
import express from "express";
import bodyParser from "body-parser"; 

global.express = express;
global.path = path;
global.dotenv = dotenv;
global.utils = utils;
 
utils.loadENV(); 
 
global.app = express();
global.app.use(utils.expressLog);
global.app.use(bodyParser.json());
global.app.use(bodyParser.urlencoded({
    extended: true
})); 
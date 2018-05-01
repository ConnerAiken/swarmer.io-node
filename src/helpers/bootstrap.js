import utils from "./utils.js";
import path from "path";
import dotenv from "dotenv";
import express from 'express';


global.path = path;
global.dotenv = dotenv;
global.utils = utils;
global.express = express;

utils.loadENV();

import dotenv from "dotenv";
import path from "path"; 
import DigitalOcean from "do-wrapper";
import express from "express";
import bodyParser from "body-parser";
import SlackWebhook from "slack-webhook";
import _ from "lodash";

class Utils {
    static bootstrap() {   
            this.loadENV();   
            this.api = new DigitalOcean(process.env.doApiKey, process.env.doPageSize);
            this.digitalOcean = {
                account: {},
                recentActions: [],
                droplets: [],
                images: []
            };
            this.slack = new SlackWebhook(process.env.slackWebhook, {
                defaults: {
                username: process.env.appName,
                channel: '#node-log',
                icon_emoji: ':robot_face:'
                }
            }); 

            this.app = express();
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({
                extended: true
            }));
            this.app.use(this.expressLog);
            
            // Routes -- config must be defined prior to importing
            this.app.use("/container", require('./../modules/container'));
            this.app.use("/container/:container/runner", require('./../modules/runner')); 

    }
 
    static makeID() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }
    static expressLog(err, req, res, next) { 
        if (res.headersSent) {
            return next(err);
        }

        this.log(err, 2);
        
        res.status(500);
        res.render('error', { error: err })  ;
    }
    static log(msg, type = 0) { 
        var slack = this.slack ? this.slack : {send: () => false};
 
        if(type === 1) {
            console.warn(`[${process.env.appName}] ${msg}`); 
                slack.send({
                    text: msg,  
                    icon_emoji: ':scream_cat:'
                }); 
        }else if(type === 2) {
            console.error(`[${process.env.appName}] ${msg}`);
            slack.send({
                text: msg,  
                icon_emoji: ':scream_cat:'
            });
        }else {
            console.log(`[${process.env.appName}] ${msg}`);
            slack.send(msg);
        }
    }
    static loadENV() {
        const defaultConfig = dotenv.config({
            path: path.resolve(process.cwd(), '.env')
        });
        const config = dotenv.config(); 

        if (config.error && !defaultConfig.error) {
            this.log("Could not find .env file, using default env file..");
        }else if(config.error && defaultConfig.error) {
            this.log("Could not find any .env files, please set one up!", 1);
        }else {
            this.log("Successfully loaded .env variables..");
        }
    }
    
    static checkForUpdates(digitalOcean, api) {
        const promises = [];
    
        // 0. Get account/droplet info 
        promises.push(api.account().then((data) => {
            this.log(`:thinking_face: Received ${Object.keys(data.body).length} fields about the service account.`);
            digitalOcean.account = data.body;  
        }));
        
        // 3. Fulfill promises and do sumthin 
        Promise.all(promises).then(() => {
            console.log(digitalOcean.account);
        }); 
    }
 
}

export default Utils;
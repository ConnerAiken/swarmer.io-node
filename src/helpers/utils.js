export default {
    log(msg, type = 0, path = path.resolve(process.cwd(), 'output')) {  
        if(type === 1) {
            console.warn(`[${process.env.appName}] ${msg}`);
            logPath = path.resolve(logPath, 'warnings.txt');
        }else if(type === 2) {
            console.error(`[${process.env.appName}] ${msg}`);
            logPath = path.resolve(logPath, 'errors.txt');
        }else {
            console.log(`[${process.env.appName}] ${msg}`);
            logPath = path.resolve(logPath, 'general.txt');
        } 
        
        // Todo: Promise
        fs.writeFileSync(logPath, msg);
    },
    loadENV() {
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
}
import utils from "./helpers/utils";
utils.bootstrap();

const { app } = utils;

app.get('/', (req, res) => {  
    res.send("Agent access is available.");
    return;
}); 

app.listen(process.env.port, () => utils.log(`Listening on port ${process.env.port}!`)); 
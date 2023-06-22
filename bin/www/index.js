//https://stackoverflow.com/questions/65721253/how-to-use-socket-io-in-node-js-with-es6-syntax
// https://socket.io/get-started/chat
import express from 'express';
import { Server } from "socket.io";

import { Agent } from "./src/agent.js";
import System from './src/system.cjs';

import path from 'path';


// APP EXPRESS
const __dirname = path.resolve(path.dirname(''));

let app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
    console.log('Listening on PORT :' + port);
});


// SOCKET SERVER


const io = new Server(server);

io.on('connection', (socket) => {
    console.log("on connection", socket.id,);
    system.test()

    socket.on('disconnect', () => {

        console.log("disconnected");
    });

    socket.on('command', (cmd) => {
        system.onCommand(cmd)
    });
}
);

const agent = new Agent('Bob');
console.log("agent", agent);



/* create a new Systeme with :
 const system = new System(
{
    "name": "Sys-tilt",        // default : "unknown system"
    "dbPath": "./my_folder"    // default : "./yourdb" // be careful to add it to your .gitignore
    "opts": {base: 'http://localhost/yld/custom/base'}     //  vocabulary base, default 'http://localhost/yld/base'
}    
);
*/
const system = new System({
    "name": "Sys-tilt",                                   // default : "unknown system"
    // "dbPath": "./my_folder",                              // default : "./yourdb"
    // "opts": { base: 'http://localhost/yld/custom/base' }    // default 'http://localhost/yld/base'
});
//console.log("system", system);

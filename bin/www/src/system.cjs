//https://stackoverflow.com/questions/67246229/mix-commonjs-and-es6-modules-in-same-project
const version = "0.0.0"
const debug = true

const { Level } = require('level'),
    levelgraph = require('levelgraph'),
    jsonld = require('levelgraph-jsonld')

let defaultDbPath = './yourdb'


module.exports = class System {
    constructor(config) {
        this.version = version
        this.debug = debug
        this.name = config.name || "unknown system"
        let dbPath = config.dbPath || defaultDbPath
        this.levelDB = new Level(dbPath)
        this.opts = config.opts || { base: 'http://localhost/yld/base' }
        this.db = jsonld(levelgraph(this.levelDB), this.opts);
        console.log("System", this.name, version, debug)
    }

    onCommand(cmd) {
        cmd = this.splitCmd(cmd)
        console.log("\n\t" + this.name + "\tcmd:\t" + this.s(cmd))
        switch (cmd.action) {
            case 'ls':
            case 'll':
                this.ls(cmd)
                break;

            default:
                break;
        }




    }



    //commands
    /*
    ls or ll
    
    */
    ls(cmd) {
        console.log('LS', this.s(cmd))
    }



    // tools
    /* splitCmd
    s -> JSON.stringify
    
    */



    splitCmd(full) {
        let split = full.split(' ')
        return { action: split[0], split: split, full: full }
    }
    s(json) {
        return JSON.stringify(json)
    }

    test() {
        var manu = {
            "@context": {
                "name": "http://xmlns.com/foaf/0.1/name",
                "homepage": {
                    "@id": "http://xmlns.com/foaf/0.1/homepage",
                    "@type": "@id"
                }
            },
            "@id": "http://manu.sporny.org#person",
            "name": "Manu Sporny",
            "homepage": "http://manu.sporny.org/"
        };
        this.db.jsonld.put(manu, function (err, obj) {
            // do something after the obj is inserted
            console.log(err)
            console.log(JSON.stringify(obj) + "created")
            console.log(obj['@id'])
        });
    }


}
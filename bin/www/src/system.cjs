//https://stackoverflow.com/questions/67246229/mix-commonjs-and-es6-modules-in-same-project
const version = "0.0.0"
const debug = true

const { v4: uuidv4 } = require('uuid');

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
            case 'touch':
                this.touch(cmd)
                break;

            default:
                console.warn('not implemented yet', cmd)
                break;

        }


    }



    //commands
    /*
    ls or ll
    touch
    */
    ls(cmd) {
        console.log('LS', this.s(cmd))
        this.listResources({})
    }
    touch(cmd) {
        console.log('TOUCH', this.s(cmd))
        cmd.split.forEach(file => {
            let config = { name: file }
            this.createResource(config)
        });
    }


    // actions
    /* createResource
    listResources
    
    */
    createResource(conf) {
        var resourceTemplate = {
            "@context": {
                "name": "http://xmlns.com/foaf/0.1/name",
                "homepage": {
                    "@id": "http://xmlns.com/foaf/0.1/homepage",
                    "@type": "@id"
                }
            },
            "@id": "http://manu.sporny.org#person",
            "name": "Undefined name",
            "homepage": "http://manu.sporny.org/"
        };
        let resource = Object.assign({}, resourceTemplate); // copy template
        resource['@id'] = uuidv4()
        resource['@type'] = 'resource'
        resource.name = conf.name
        resource.created = Date.now()

        this.db.jsonld.put(resource, function (err, obj) {
            // do something after the obj is inserted
            console.log(err)
            console.log(JSON.stringify(obj) + "created")
            console.log("created -->", obj['@id'], obj['name'])
        });

    }

    listResources(conf) {
        this.db.search([
            {
                subject: this.db.v('repon'),
                predicate: 'http://xmlns.com/foaf/0.1/homepage',
                object: 'http://manu.sporny.org/'
            }
            /*{
            subject: manu['@id'],
            predicate: 'http://xmlns.com/foaf/0.1/knows',
            object: db.v('webid')
        }, {
            subject: db.v('webid'),
            predicate: 'http://xmlns.com/foaf/0.1/based_near',
            object: paris
        }, {
            subject: db.v('webid'),
            predicate: 'http://xmlns.com/foaf/0.1/name',
            object: db.v('name')
        }*/
        ], function (err, solution) {
            console.log(err)
            console.log(solution)
            // solution contains
            // [{
            //   webid: 'http://bblfish.net/people/henry/card#me',
            //   name: '"Henry Story"'
            // }, {
            //   webid: 'https://my-profile.eu/people/deiu/card#me',
            //   name: '"Andrei Vlad Sambra"'
            // }]
        });
    }






    // tools
    /* 
    listener
    splitCmd
    s -> JSON.stringify
    
    */

    listener() {
        // https://github.com/Level/levelup#events
        this.db.on('*', function (e, key, value) {
            console.log("event", e, { key, value })
        })
    }

    splitCmd(full) {
        let split = full.split(' ')
        return { action: split.shift(), split: split, full: full }
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

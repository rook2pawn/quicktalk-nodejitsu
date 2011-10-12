var argv = require('optimist')
    .usage('Dnode-EZ Webserver Example\nUsage: $0 -p [port]')
    .demand(['p'])
    .alias('p','port') 
    .describe('p','Port to start webserver on')
    .argv;
var connect = require('connect');
var browserify = require('browserify');
var dnode_ez = require('dnode-ez');
var webapp = connect.createServer();
webapp.use(connect.static(__dirname));
webapp.use(browserify({
    require : ['dnode-ez','events'],
    mount : '/browserify.js'
}));
webapp.listen(argv.p);
var server = dnode_ez();
var webclients = {};
server.listen(webapp);
server.on('relayCanvasPosition',function(obj) {
    var pos = obj[0];
    var id = undefined;
    for (id in webclients) {
        webclients[id].emitter.emit('drawCanvasPosition',pos.canvasx,pos.canvasy);
    }
});
server.on('end',function(remote,conn) {
    if (webclients[conn.id] !== undefined) {
        delete webclients[conn.id];
    }
});
server.on('connect',function(remote,conn) {
    if (remote.name = 'webclient') {
        webclients[conn.id] = {};
        console.log("webclient connected connection id : " + conn.id);
    }
});
server.on('bind',function(id,remote,conn) {
    console.log("Getting bind request on id " + id + " from " + conn.id);
    webclients[conn.id].emitter = server.getEmitterByConnId(conn.id);
});

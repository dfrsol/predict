'use strict';

const Hapi = require('hapi');


const internals = {};
internals.plugins = [
    require('./good'),
    require('./routes')
];


exports.init = function (port, next) {

    const server = new Hapi.Server();
    server.connection({ port });

    server.register(internals.plugins, (err) => {

        if (err) {

            return next(err);
        }

        server.start((err) => {

            return next(err, server);
        });
    });
};

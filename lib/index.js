'use strict';

const Hapi = require('hapi');


const internals = {};
internals.plugins = [];


exports.init = function (port, next) {

    const server = new Hapi.Server();
    server.connection({ port: port });

    server.register(internals.plugins, (err) => {

        if (err) {

            return next(err);
        }

        server.route({ method: 'GET', path: '/', handler: (request, reply) => return reply('Hello') });

        server.start((err) => {

            return next(err, server);
        });
    });
};

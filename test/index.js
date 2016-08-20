'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Server = require('../lib/index');
const Good = require('../lib/good');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

describe('Server', () => {

    it('Starts the server and returns the hapi server object', { parallel: false }, (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('Starts the server on the correct port', { parallel: false }, (done) => {

        Server.init(5000, (err, server) => {

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(5000);

            server.stop(done);
        });
    });

    it('handles plugin registration errors', { parallel: false }, (done) => {

        const orig = Good.register;

        Good.register = function (server, options, next) {

            Good.register = orig;
            return next(new Error('register good failed'));
        };

        Good.register.attributes = {
            name: 'fake Logging'
        };

        Server.init(0, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('register good failed');

            done();
        });
    });
});

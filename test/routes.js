'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../lib/index');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('Routing', () => {

    it('/ returns hello world', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject('/', (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal('hello world');
            });

            server.stop(done);
        });
    });
});

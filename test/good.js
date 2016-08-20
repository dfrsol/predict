'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../lib/index');
const GoodPlugin = require('good');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('Good logger plugin', () => {

    it('errors on failed registering of good plugin', { parallel: false }, (done) => {

        const orig = GoodPlugin.register;

        GoodPlugin.register = function (plugin, options, next) {

            GoodPlugin.register = orig;
            return next(new Error('fail'));
        };

        GoodPlugin.register.attributes = {
            name: 'fake good failure'
        };

        Server.init(0, (err) => {

            expect(err).to.exist();
            done();
        });
    });

    it('success registered good', { parallel: false }, (done) => {

        Server.init(0, (err) => {

            expect(err).to.not.exist();
            done();
        });
    });
});

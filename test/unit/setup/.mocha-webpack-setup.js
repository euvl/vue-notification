const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const jsdom = require('jsdom').jsdom;

global.expect = chai.expect;
global.sinon = sinon;

chai.use(sinonChai);

// Set up JS DOM
const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom(
  '<html><head><style></style></head><body></body></html>',
);
global.window = document.defaultView;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

documentRef = document;

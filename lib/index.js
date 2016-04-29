'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Log = function Log() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  this.silent = options.silent || false;
  this.label = options.label || false;
  this.console = true;
  this.remote = true;
};

Log.prototype.output = function (level, args) {
  if (this.label) {
    args = arguments.length === 1 ? [args[0]] : Array.apply(null, args);
    args.unshift('[' + this.label + ']');
  }

  if (!this.silent && this.console && console) {
    var fn = console[level];
    fn.apply(console, args);
  }
};

Log.prototype.export = function () {
  // todo: integrate remote logging
  return;
};

Log.prototype.log = function () {
  this.output('log', arguments);
};

Log.prototype.error = function () {
  this.output('error', arguments);
};

Log.prototype.warning = function () {
  this.output('warning', arguments);
};

Log.prototype.info = function () {
  this.output('info', arguments);
};

Log.prototype.debug = function () {
  this.output('debug', arguments);
};

Log.prototype.group = function () {
  this.output('group', arguments);
};

Log.prototype.groupEnd = function () {
  this.output('groupEnd', arguments);
};

// custom methods
Log.prototype.event = function (event, data) {
  var color = 'green';
  this.output('log', ['%c' + event, 'color: ' + color, data]);
};

exports.default = Log;
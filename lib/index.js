var util = require('util');
var EventEmitter = require('events').EventEmitter;
var binding = require('./contract_binding');

function
Contract(/* ... */)
{
	var self = this;

	EventEmitter.call(this);

	this._binding = binding._new.apply(this,
	    Array.prototype.slice.call(arguments));

	this._binding._emit = function () {
		var args = Array.prototype.slice.call(arguments);
		self.emit.apply(self, args);
	};

	this._binding._hold();
}
util.inherits(Contract, EventEmitter);

/* XXX async? */
Contract.prototype.status = function status() {
	return (this._binding._status());
};

Contract.prototype.abandon = function abandon() {
	this._binding._abandon();
};

Contract.prototype.ack = function ack(evid) {
	this._binding._ack(evid);
};

Contract.prototype.dispose = function dispose() {
	this._binding._rele();
	this._binding = null;
};

Contract.prototype.nack = function nack(evid) {
	this._binding._nack(evid);
};

Contract.prototype.qack = function qack(evid) {
	this._binding._qack(evid);
};

Contract.prototype.sigsend = function sigsend(sig) {
	this._binding._sigsend(sig);
};

function
create()
{
	binding._create();
}

function
adopt(ctid)
{
	return (new Contract(ctid, true));
}

function
observe(ctid)
{
	return (new Contract(ctid));
}

function
latest()
{
	return (new Contract());
}

function
set_template(tmpl)
{
	binding._set_template(tmpl);
}

function
clear_template()
{
	binding._clear_template();
}

module.exports = {
	create: create,
	adopt: adopt,
	observe: observe,
	latest: latest,
	set_template: set_template,
	clear_template: clear_template
};

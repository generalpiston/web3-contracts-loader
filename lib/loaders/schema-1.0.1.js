"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require("debug");
var _ = require("lodash");
var semver = require("semver");
var debug = Debug("schema-0.0.5");
function load_pre_100(web3, abi, address, options) {
    return web3.eth.contract(abi).at(address);
}
function load_100(web3, abi, address, options) {
    return new web3.eth.Contract(abi, address, options);
}
function ContractDefinitionLoader(i) {
    var web3 = i.web3, contractDefinition = i.contractDefinition, options = i.options;
    var contractName = contractDefinition.contractName, networks = contractDefinition.networks, abi = contractDefinition.abi, bytecode = contractDefinition.bytecode;
    var network = _.first(_.reverse(_.sortBy(networks, "updatedAt")));
    var address = null;
    if (network) {
        debug("Creating contract " + contractName + " pegged to " + network.address + ".");
        address = network.address;
    }
    else {
        debug("Creating contract " + contractName + " unpegged.");
    }
    var definition;
    if (semver.satisfies(web3.version.api ? web3.version.api : web3.version, "< 1.0.0")) {
        definition = load_pre_100(web3, abi, address, options);
    }
    else {
        definition = load_100(web3, abi, address, options);
    }
    if (network) {
        debug("Created contract " + contractName + " pegged to " + network.address + ".");
    }
    else {
        debug("Created contract " + contractName + " unpegged.");
    }
    if (!definition.options)
        definition.options = {};
    definition.options.data = bytecode;
    return definition;
}
exports.default = ContractDefinitionLoader;
;
//# sourceMappingURL=schema-1.0.1.js.map
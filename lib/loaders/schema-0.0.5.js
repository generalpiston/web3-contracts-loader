"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var semver = require("semver");
function load_pre_100(web3, abi, address, options) {
    return web3.eth.contract(abi).at(address);
}
function load_100(web3, abi, address, options) {
    return new web3.eth.Contract(abi, address, options);
}
function ContractDefinitionLoader(i) {
    var web3 = i.web3, contractDefinition = i.contractDefinition, options = i.options;
    var contract_name = contractDefinition.contract_name, networks = contractDefinition.networks, abi = contractDefinition.abi, unlinked_binary = contractDefinition.unlinked_binary;
    var network = _.first(_.reverse(_.sortBy(networks, "updated_at")));
    var address = null;
    if (network) {
        console.info("Creating contract " + contract_name + " pegged to " + network.address + ".");
        address = network.address;
    }
    else {
        console.info("Creating contract " + contract_name + " unpegged.");
    }
    var definition;
    if (semver.satisfies(web3.version.api ? web3.version.api : web3.version, "< 1.0.0")) {
        definition = load_pre_100(web3, abi, address, options);
    }
    else {
        definition = load_100(web3, abi, address, options);
    }
    definition.options.data = unlinked_binary;
    return definition;
}
exports.default = ContractDefinitionLoader;
;
//# sourceMappingURL=schema-0.0.5.js.map
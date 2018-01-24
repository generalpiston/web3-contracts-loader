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
    var web3 = i.web3, contractDefinitions = i.contractDefinitions, options = i.options;
    var contracts = {};
    for (var key in contractDefinitions) {
        var contractDefinition = contractDefinitions[key];
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
        if (semver.satisfies(web3.version.api ? web3.version.api : web3.version, "< 1.0.0")) {
            contracts[contract_name] = load_pre_100(web3, abi, address, options);
            contracts[contract_name].options.data = unlinked_binary;
        }
        else {
            contracts[contract_name] = load_100(web3, abi, address, options);
            contracts[contract_name].options.data = unlinked_binary;
        }
    }
    return contracts;
}
exports.default = ContractDefinitionLoader;
;
//# sourceMappingURL=loader.js.map
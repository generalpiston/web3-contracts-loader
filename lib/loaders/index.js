"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_0_0_5_1 = require("./schema-0.0.5");
var schema_1_0_1_1 = require("./schema-1.0.1");
function ContractDefinitionLoader(i) {
    var web3 = i.web3, contractDefinitions = i.contractDefinitions, options = i.options;
    var contracts = {};
    for (var key in contractDefinitions) {
        var contractDefinition = contractDefinitions[key];
        if (contractDefinition.schemaVersion) {
            contracts[key] = schema_1_0_1_1.default({ web3: web3, contractDefinition: contractDefinition, options: options });
        }
        else {
            contracts[key] = schema_0_0_5_1.default({ web3: web3, contractDefinition: contractDefinition, options: options });
        }
    }
    return contracts;
}
exports.default = ContractDefinitionLoader;
;
//# sourceMappingURL=index.js.map
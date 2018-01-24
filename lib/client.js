"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
function getClient(url) {
    if (url) {
        return new Web3(new Web3.providers.HttpProvider(url));
    }
    else {
        return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
}
exports.default = getClient;
;
//# sourceMappingURL=client.js.map
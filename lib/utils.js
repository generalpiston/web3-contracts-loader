"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleReceiptErrors(receipt) {
    if (receipt.events.LogError) {
        throw new Error(receipt.events.LogError.returnValues[0]);
    }
}
exports.handleReceiptErrors = handleReceiptErrors;
//# sourceMappingURL=utils.js.map

export function handleReceiptErrors(receipt: { events: any }): void {
  if (receipt.events.LogError) {
    throw new Error(receipt.events.LogError.returnValues[0]);
  }
}

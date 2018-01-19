const Web3 = require("web3");

export default function get (url?: string) {
  if (url) {
    return new Web3(new Web3.providers.HttpProvider(url));
  } else {
    return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
};

import * as Web3 from "web3";

export default function getClient (url?: string) {
  if (url) {
    return new Web3(new Web3.providers.HttpProvider(url));
  } else {
    return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
};

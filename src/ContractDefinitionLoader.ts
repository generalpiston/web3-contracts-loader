import * as _ from "lodash";
import * as semver from "semver";
import { IABI } from "./IContractDefinition";
import { IContractDefinitions } from "./IContractDefinitions";

function load_pre_100 (web3: any, abi: IABI[], address: string|null|undefined, options: object|null|undefined): any {
  return web3.eth.contract(abi).at(address);
}

function load_100 (web3: any, abi: IABI[], address: string|null|undefined, options: object|null|undefined): any {
  return new web3.eth.Contract(abi, address, options);
}

export default function ContractDefinitionLoader (i: { web3: any, contractDefinitions: IContractDefinitions, options: any }) {
  let { web3, contractDefinitions, options } = i;
  const contracts: any = {};

  for (let key in contractDefinitions) {
    const contractDefinition = contractDefinitions[key];
    const { contract_name, networks, abi, unlinked_binary } = contractDefinition;
    const network = _.first(_.reverse(_.sortBy(networks, "updated_at")));
    let address: (string|null) = null;
    if (network) {
      console.info(`Creating contract ${contract_name} pegged to ${network.address}.`);
      address = network.address;
    } else {
      console.info(`Creating contract ${contract_name} unpegged.`);
    }

    if (semver.satisfies(web3.version.api ? web3.version.api : web3.version, "< 1.0.0")) {
      contracts[contract_name] = load_pre_100(web3, abi, address, options);
      contracts[contract_name].options.data = unlinked_binary;
    } else {
      contracts[contract_name] = load_100(web3, abi, address, options);
      contracts[contract_name].options.data = unlinked_binary;
    }
  }

  return contracts;
};

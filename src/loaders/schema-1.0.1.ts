import { IABI, IContractDefinition } from "../interfaces/schema-1.0.1";
import * as _ from "lodash";
import * as semver from "semver";

function load_pre_100 (web3: any, abi: IABI[], address: string|null|undefined, options: object|null|undefined): any {
  return web3.eth.contract(abi).at(address);
}

function load_100 (web3: any, abi: IABI[], address: string|null|undefined, options: object|null|undefined): any {
  return new web3.eth.Contract(abi, address, options);
}

export default function ContractDefinitionLoader (i: { web3: any, contractDefinition: IContractDefinition, options: any }) {
  let { web3, contractDefinition, options } = i;
  let { contractName, networks, abi, bytecode } = contractDefinition;
  let network = _.first(_.reverse(_.sortBy(networks, "updatedAt")));
  let address: (string|null) = null;
  if (network) {
    console.info(`Creating contract ${contractName} pegged to ${network.address}.`);
    address = network.address;
  } else {
    console.info(`Creating contract ${contractName} unpegged.`);
  }

  let definition: any;

  if (semver.satisfies(web3.version.api ? web3.version.api : web3.version, "< 1.0.0")) {
    definition = load_pre_100(web3, abi, address, options);
  } else {
    definition = load_100(web3, abi, address, options);
  }

  definition.options.data = bytecode;

  return definition;
};

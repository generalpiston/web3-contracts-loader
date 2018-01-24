import ContractDefinitionLoader005 from "./schema-0.0.5";
import ContractDefinitionLoader101 from "./schema-1.0.1";

export interface ILoaderParams {
  web3: any;
  contractDefinitions: {
    [name: string]: any;
  };
  options: any;
}

export default function ContractDefinitionLoader (i: ILoaderParams) {
  let { web3, contractDefinitions, options } = i;
  let contracts: any = {};
  for (let key in contractDefinitions) {
    let contractDefinition = contractDefinitions[key];
    if (contractDefinition.schemaVersion) {
      contracts[key] = ContractDefinitionLoader101({ web3, contractDefinition, options });
    } else {
      contracts[key] = ContractDefinitionLoader005({ web3, contractDefinition, options });
    }
  }
  return contracts;
};
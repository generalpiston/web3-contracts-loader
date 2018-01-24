
export interface IOutput {
  readonly name: string;
  readonly type: string;
}

export interface IInput {
  readonly name: string;
  readonly type: string;
}

export interface IABI {
  readonly constant: boolean;
  readonly inputs: IInput[];
  readonly name: string;
  readonly outputs: IOutput[];
  readonly payable: boolean;
  readonly type: string;
}

export interface INetwork {
  readonly events: any,
  readonly links: any,
  readonly address: string,
  readonly updated_at: number
}

export interface INetworks {
  readonly [networkId: string]: INetwork
}

export interface IContractDefinition {
  readonly contract_name: string;
  readonly abi: IABI[],
  readonly unlinked_binary: string;
  readonly networks: INetworks;
  readonly schema_version: string;
  readonly updated_at: number;
}

export interface IContractDefinitions {
  [contractName: string]: IContractDefinition;
}

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
    readonly stateMutability: string;
    readonly type: string;
}
export interface INetwork {
    readonly events: any;
    readonly links: any;
    readonly address: string;
    readonly updatedAt: number;
}
export interface INetworks {
    readonly [networkId: string]: INetwork;
}
export interface IContractDefinition {
    readonly contractName: string;
    readonly abi: IABI[];
    readonly bytecode: string;
    readonly networks: INetworks;
    readonly schemaVersion: string;
    readonly updatedAt: number;
}
export interface IContractDefinitions {
    [contractName: string]: IContractDefinition;
}

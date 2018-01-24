export interface IContractDefinition {
    readonly schemaVersion: string;
    [prop: string]: any;
}
export interface IContractDefinitions {
    [contractName: string]: IContractDefinition;
}

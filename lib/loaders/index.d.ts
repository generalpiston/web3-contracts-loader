export interface ILoaderParams {
    web3: any;
    contractDefinitions: {
        [name: string]: any;
    };
    options: any;
}
export default function ContractDefinitionLoader(i: ILoaderParams): any;

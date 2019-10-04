import * as vscode from 'vscode';
import { IServiceBusClient } from '../client/IServiceBusClient';
import path from 'path';

export interface IItemData {
	name: string;
	connection: string;
	error?: any;
	clientInstance?: IServiceBusClient;
}

export class ExplorerItemBase extends vscode.TreeItem {

	constructor(
		public readonly itemData: IItemData,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(itemData.name, collapsibleState);
	}

	public get description(): string {
		return this.itemData.error ? this.itemData.error.message : '';
	}

	public getChildren(): Promise<ExplorerItemBase[]> {
		throw new Error("Not implemented.");
	}

	contextValue = 'base';
}
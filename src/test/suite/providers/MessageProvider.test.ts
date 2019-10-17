import * as assert from 'assert';
import { before } from 'mocha';
import * as vscode from 'vscode';
import { MessageProvider } from  "../../../providers/messageProvider";
import { MessageStore } from  "../../../messages/MessageStore";
import { MessageStoreInstance } from '../../../common/global';


suite('MessageProvider Test Suite', () => {
	const body = { root: { "node": "data" } };
	const messageid="TestMessageId";
	var messageProvider=new MessageProvider();
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
		var testmsg: any={};
		testmsg.body=body;
		MessageStoreInstance.setMessage("TestMessageId",testmsg);
	});

	test('Test provide text document content', () => {
		
		let testUri = vscode.Uri.parse(`http://www.msft.com/some/path?query&messageid=TestMessageId`);

		let result= messageProvider.provideTextDocumentContent(testUri);

		let resultObject = JSON.parse(result);

		assert.equal(resultObject.root.node ,body.root.node);
	 });
	 
	 test('Test  Provide empty text document content if missing message id', () => {
		let testUri = vscode.Uri.parse(`http://www.msft.com/some/path?query&messageid`);

		let result= messageProvider.provideTextDocumentContent(testUri);

		assert.equal(result,"");
 	});
});
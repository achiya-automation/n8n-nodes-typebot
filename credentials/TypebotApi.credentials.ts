import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TypebotApi implements ICredentialType {
	name = 'typebotApi';
	displayName = 'Typebot API';
	documentationUrl = 'https://docs.typebot.io/api-reference/authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API token for authenticating with Typebot. You can generate one in your Typebot dashboard under Settings & Members > My account > API tokens.',
		},
		{
			displayName: 'Management Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.typebot.io/api',
			required: true,
			description: 'The base URL for Typebot Management API (Typebots, Folders, Results, Workspaces). Use https://app.typebot.io/api for the cloud version.',
		},
		{
			displayName: 'Chat Base URL',
			name: 'chatBaseUrl',
			type: 'string',
			default: 'https://typebot.io/api',
			required: false,
			description: 'The base URL for Typebot Chat API (Start Chat, Continue Chat). Use https://typebot.io/api for the cloud version. If not set, uses Management Base URL.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};
}

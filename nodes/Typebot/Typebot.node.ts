import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';

export class Typebot implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Typebot',
		name: 'typebot',
		icon: 'file:typebot.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Typebot API',
		defaults: {
			name: 'Typebot',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'typebotApi',
				required: true,
			},
		],
		properties: [
			// Resource
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Typebot',
						value: 'typebot',
					},
					{
						name: 'Result',
						value: 'result',
					},
					{
						name: 'Workspace',
						value: 'workspace',
					},
					{
						name: 'Folder',
						value: 'folder',
					},
				],
				default: 'chat',
			},

			// =====================================
			// Chat Operations
			// =====================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chat'],
					},
				},
				options: [
					{
						name: 'Start Chat',
						value: 'startChat',
						description: 'Start a new chat session',
						action: 'Start a chat session',
					},
					{
						name: 'Continue Chat',
						value: 'continueChat',
						description: 'Continue an existing chat session',
						action: 'Continue a chat session',
					},
					{
						name: 'Start Preview Chat',
						value: 'startPreviewChat',
						description: 'Start a preview chat session',
						action: 'Start a preview chat session',
					},
					{
						name: 'Update Typebot in Session',
						value: 'updateTypebotInSession',
						description: 'Update typebot configuration in an active session',
						action: 'Update typebot in session',
					},
					{
						name: 'Save Logs',
						value: 'saveLogs',
						description: 'Save client logs for a session',
						action: 'Save logs',
					},
					{
						name: 'Generate Upload URL',
						value: 'generateUploadUrl',
						description: 'Generate a presigned URL for file upload',
						action: 'Generate upload URL',
					},
				],
				default: 'startChat',
			},

			// Start Chat fields
			{
				displayName: 'Public ID',
				name: 'publicId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['startChat'],
					},
				},
				default: '',
				description: 'The public ID of your typebot',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['startChat'],
					},
				},
				options: [
					{
						displayName: 'Message',
						name: 'message',
						type: 'string',
						default: '',
						description: 'Message to send with the chat start',
					},
					{
						displayName: 'Result ID',
						name: 'resultId',
						type: 'string',
						default: '',
						description: 'Result ID to overwrite an existing result',
					},
					{
						displayName: 'Is Stream Enabled',
						name: 'isStreamEnabled',
						type: 'boolean',
						default: false,
						description: 'Whether to enable streaming for OpenAI blocks',
					},
					{
						displayName: 'Is Only Registering',
						name: 'isOnlyRegistering',
						type: 'boolean',
						default: false,
						description: 'Whether to only register the session without starting the bot',
					},
					{
						displayName: 'Prefilled Variables',
						name: 'prefilledVariables',
						type: 'json',
						default: '{}',
						description: 'Prefilled variables as JSON object',
					},
					{
						displayName: 'Text Bubble Content Format',
						name: 'textBubbleContentFormat',
						type: 'options',
						options: [
							{
								name: 'Rich Text',
								value: 'richText',
							},
							{
								name: 'Markdown',
								value: 'markdown',
							},
						],
						default: 'richText',
						description: 'Format for text bubble content',
					},
				],
			},

			// Continue Chat fields
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['continueChat'],
					},
				},
				default: '',
				description: 'The session ID from a previous chat start',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['continueChat'],
					},
				},
				default: '',
				description: 'The message to send',
			},

			// Start Preview Chat fields
			{
				displayName: 'Typebot ID',
				name: 'typebotId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['startPreviewChat'],
					},
				},
				default: '',
				description: 'The ID of your typebot',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['startPreviewChat'],
					},
				},
				options: [
					{
						displayName: 'Message',
						name: 'message',
						type: 'string',
						default: '',
						description: 'Message to send with the preview chat start',
					},
					{
						displayName: 'Is Stream Enabled',
						name: 'isStreamEnabled',
						type: 'boolean',
						default: false,
						description: 'Whether to enable streaming',
					},
					{
						displayName: 'Prefilled Variables',
						name: 'prefilledVariables',
						type: 'json',
						default: '{}',
						description: 'Prefilled variables as JSON object',
					},
				],
			},

			// Update Typebot in Session fields
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['updateTypebotInSession'],
					},
				},
				default: '',
				description: 'The session ID to update',
			},

			// Save Logs fields
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['saveLogs'],
					},
				},
				default: '',
				description: 'The session ID for the logs',
			},
			{
				displayName: 'Client Logs',
				name: 'clientLogs',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['saveLogs'],
					},
				},
				default: '[{"description": "Log entry", "status": "info"}]',
				description: 'Array of log entries with description, status, details, and context',
			},

			// Generate Upload URL fields
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['generateUploadUrl'],
					},
				},
				default: '',
				description: 'The session ID for the upload',
			},
			{
				displayName: 'File Name',
				name: 'fileName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['generateUploadUrl'],
					},
				},
				default: '',
				description: 'Name of the file to upload',
			},
			{
				displayName: 'File Type',
				name: 'fileType',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['generateUploadUrl'],
					},
				},
				default: '',
				description: 'MIME type of the file (optional)',
			},

			// =====================================
			// Typebot Operations
			// =====================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['typebot'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List all typebots',
						action: 'List all typebots',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a typebot',
						action: 'Get a typebot',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a typebot',
						action: 'Create a typebot',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a typebot',
						action: 'Update a typebot',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a typebot',
						action: 'Delete a typebot',
					},
					{
						name: 'Publish',
						value: 'publish',
						description: 'Publish a typebot',
						action: 'Publish a typebot',
					},
					{
						name: 'Unpublish',
						value: 'unpublish',
						description: 'Unpublish a typebot',
						action: 'Unpublish a typebot',
					},
					{
						name: 'Get Published',
						value: 'getPublished',
						description: 'Get published typebot',
						action: 'Get published typebot',
					},
					{
						name: 'Import',
						value: 'import',
						description: 'Import a typebot from JSON',
						action: 'Import a typebot',
					},
				],
				default: 'list',
			},

			// List Typebots fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['typebot'],
						operation: ['list'],
					},
				},
				options: [
					{
						displayName: 'Workspace ID',
						name: 'workspaceId',
						type: 'string',
						default: '',
						description: 'Filter by workspace ID',
					},
					{
						displayName: 'Folder ID',
						name: 'folderId',
						type: 'string',
						default: '',
						description: 'Filter by folder ID',
					},
				],
			},

			// Get/Update/Delete/Publish/Unpublish Typebot fields
			{
				displayName: 'Typebot ID',
				name: 'typebotId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['typebot'],
						operation: ['get', 'update', 'delete', 'publish', 'unpublish'],
					},
				},
				default: '',
				description: 'The ID of the typebot',
			},

			// Get Typebot additional fields
			{
				displayName: 'Migrate to Latest Version',
				name: 'migrateToLatestVersion',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['typebot'],
						operation: ['get'],
					},
				},
				default: false,
				description: 'Whether to migrate the typebot to the latest version',
			},

			// Get Published Typebot field
			{
				displayName: 'Public ID',
				name: 'publicId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['typebot'],
						operation: ['getPublished'],
					},
				},
				default: '',
				description: 'The public ID of the typebot',
			},

			// Create Typebot fields
			{
				displayName: 'Workspace ID',
				name: 'workspaceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['typebot'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The workspace ID where the typebot will be created',
			},
			{
				displayName: 'Typebot Data',
				name: 'typebotData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['typebot'],
						operation: ['create'],
					},
				},
				default: '{\n  "name": "My Typebot"\n}',
				description: 'The typebot configuration as JSON',
			},

			// Import Typebot fields
			{
				displayName: 'Workspace ID',
				name: 'workspaceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['typebot'],
						operation: ['import'],
					},
				},
				default: '',
				description: 'The workspace ID where the typebot will be imported',
			},
			{
				displayName: 'Typebot Data',
				name: 'typebotData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['typebot'],
						operation: ['import'],
					},
				},
				default: '{\n  "version": "6",\n  "name": "Imported Bot"\n}',
				description: 'The complete typebot configuration to import (supports versions 3-6.1)',
			},

			// Update Typebot fields
			{
				displayName: 'Update Data',
				name: 'updateData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['typebot'],
						operation: ['update'],
					},
				},
				default: '{}',
				description: 'The data to update as JSON',
			},

			// =====================================
			// Result Operations
			// =====================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['result'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List all results',
						action: 'List all results',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a result',
						action: 'Get a result',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete results',
						action: 'Delete results',
					},
					{
						name: 'Get Stats',
						value: 'getStats',
						description: 'Get statistics',
						action: 'Get statistics',
					},
					{
						name: 'List Logs',
						value: 'listLogs',
						description: 'List logs for a result',
						action: 'List logs in result',
					},
				],
				default: 'list',
			},

			// List/Delete Results fields
			{
				displayName: 'Typebot ID',
				name: 'typebotId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['result'],
						operation: ['list', 'delete', 'getStats'],
					},
				},
				default: '',
				description: 'The ID of the typebot',
			},

			// Get Result fields
			{
				displayName: 'Typebot ID',
				name: 'typebotId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['result'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the typebot',
			},
			{
				displayName: 'Result ID',
				name: 'resultId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['result'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the result',
			},

			// List Logs fields
			{
				displayName: 'Typebot ID',
				name: 'typebotId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['result'],
						operation: ['listLogs'],
					},
				},
				default: '',
				description: 'The ID of the typebot',
			},
			{
				displayName: 'Result ID',
				name: 'resultId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['result'],
						operation: ['listLogs'],
					},
				},
				default: '',
				description: 'The ID of the result',
			},

			// Delete Results fields
			{
				displayName: 'Result IDs',
				name: 'resultIds',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['result'],
						operation: ['delete'],
					},
				},
				default: '',
				description: 'Comma-separated list of result IDs to delete',
			},

			// =====================================
			// Workspace Operations
			// =====================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['workspace'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List all workspaces',
						action: 'List all workspaces',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a workspace',
						action: 'Get a workspace',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a workspace',
						action: 'Create a workspace',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a workspace',
						action: 'Update a workspace',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a workspace',
						action: 'Delete a workspace',
					},
					{
						name: 'List Members',
						value: 'listMembers',
						description: 'List workspace members',
						action: 'List workspace members',
					},
				],
				default: 'list',
			},

			// Workspace ID field
			{
				displayName: 'Workspace ID',
				name: 'workspaceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['workspace'],
						operation: ['get', 'update', 'delete', 'listMembers'],
					},
				},
				default: '',
				description: 'The ID of the workspace',
			},

			// Create Workspace fields
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['workspace'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The name of the workspace',
			},

			// Update Workspace fields
			{
				displayName: 'Update Data',
				name: 'updateData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['workspace'],
						operation: ['update'],
					},
				},
				default: '{}',
				description: 'The data to update as JSON',
			},

			// =====================================
			// Folder Operations
			// =====================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['folder'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List all folders',
						action: 'List all folders',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a folder',
						action: 'Create a folder',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a folder',
						action: 'Update a folder',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a folder',
						action: 'Delete a folder',
					},
				],
				default: 'list',
			},

			// List Folders field
			{
				displayName: 'Workspace ID',
				name: 'workspaceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['list'],
					},
				},
				default: '',
				description: 'The ID of the workspace',
			},

			// Create Folder fields
			{
				displayName: 'Workspace ID',
				name: 'workspaceId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The ID of the workspace',
			},
			{
				displayName: 'Folder Data',
				name: 'folderData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['create'],
					},
				},
				default: '{\n  "name": "My Folder"\n}',
				description: 'The folder data as JSON',
			},

			// Update Folder fields
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the folder',
			},
			{
				displayName: 'Update Data',
				name: 'updateData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['update'],
					},
				},
				default: '{}',
				description: 'The data to update as JSON',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('typebotApi');
		const baseUrl = credentials.baseUrl as string;
		const chatBaseUrl = (credentials.chatBaseUrl as string) || baseUrl;

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData: any;

				// =====================================
				// Chat Operations
				// =====================================
				if (resource === 'chat') {
					if (operation === 'startChat') {
						const publicId = this.getNodeParameter('publicId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {};

						if (additionalFields.message) {
							body.message = additionalFields.message;
						}
						if (additionalFields.resultId) {
							body.resultId = additionalFields.resultId;
						}
						if (additionalFields.isStreamEnabled !== undefined) {
							body.isStreamEnabled = additionalFields.isStreamEnabled;
						}
						if (additionalFields.isOnlyRegistering !== undefined) {
							body.isOnlyRegistering = additionalFields.isOnlyRegistering;
						}
						if (additionalFields.prefilledVariables) {
							try {
								body.prefilledVariables = JSON.parse(additionalFields.prefilledVariables as string);
							} catch (error) {
								throw new NodeOperationError(this.getNode(), 'Prefilled Variables must be valid JSON');
							}
						}
						if (additionalFields.textBubbleContentFormat) {
							body.textBubbleContentFormat = additionalFields.textBubbleContentFormat;
						}

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${chatBaseUrl}/v1/typebots/${publicId}/startChat`,
							body,
							json: true,
						});
					} else if (operation === 'continueChat') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const message = this.getNodeParameter('message', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${chatBaseUrl}/v1/sessions/${sessionId}/continueChat`,
							body: { message },
							json: true,
						});
					} else if (operation === 'startPreviewChat') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {};

						if (additionalFields.message) {
							body.message = additionalFields.message;
						}
						if (additionalFields.isStreamEnabled !== undefined) {
							body.isStreamEnabled = additionalFields.isStreamEnabled;
						}
						if (additionalFields.prefilledVariables) {
							try {
								body.prefilledVariables = JSON.parse(additionalFields.prefilledVariables as string);
							} catch (error) {
								throw new NodeOperationError(this.getNode(), 'Prefilled Variables must be valid JSON');
							}
						}

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${chatBaseUrl}/v1/typebots/${typebotId}/preview/startChat`,
							body,
							json: true,
						});
					} else if (operation === 'updateTypebotInSession') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${chatBaseUrl}/v1/sessions/${sessionId}/updateTypebot`,
							json: true,
						});
					} else if (operation === 'saveLogs') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const clientLogs = this.getNodeParameter('clientLogs', i) as string;

						let logs;
						try {
							logs = JSON.parse(clientLogs);
						} catch (error) {
							throw new NodeOperationError(this.getNode(), 'Client Logs must be valid JSON');
						}

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${chatBaseUrl}/v2/sessions/${sessionId}/clientLogs`,
							body: { clientLogs: logs },
							json: true,
						});
					} else if (operation === 'generateUploadUrl') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const fileName = this.getNodeParameter('fileName', i) as string;
						const fileType = this.getNodeParameter('fileType', i) as string;

						const body: IDataObject = {
							fileName,
						};

						if (fileType) {
							body.fileType = fileType;
						}

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${chatBaseUrl}/v2/generate-upload-url`,
							qs: { sessionId },
							body,
							json: true,
						});
					}
				}

				// =====================================
				// Typebot Operations
				// =====================================
				else if (resource === 'typebot') {
					if (operation === 'list') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (additionalFields.workspaceId) {
							qs.workspaceId = additionalFields.workspaceId;
						}
						if (additionalFields.folderId) {
							qs.folderId = additionalFields.folderId;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'GET',
								url: `${baseUrl}/v1/typebots`,
								qs,
								json: true,
							},
						);
					} else if (operation === 'get') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;
						const migrateToLatestVersion = this.getNodeParameter('migrateToLatestVersion', i) as boolean;

						const qs: IDataObject = {};
						if (migrateToLatestVersion) {
							qs.migrateToLatestVersion = true;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'GET',
								url: `${baseUrl}/v1/typebots/${typebotId}`,
								qs,
								json: true,
							},
						);
					} else if (operation === 'create') {
						const workspaceId = this.getNodeParameter('workspaceId', i) as string;
						const typebotData = this.getNodeParameter('typebotData', i) as string;

						let typebot;
						try {
							typebot = JSON.parse(typebotData);
						} catch (error) {
							throw new NodeOperationError(this.getNode(), 'Typebot Data must be valid JSON');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'POST',
								url: `${baseUrl}/v1/typebots`,
								body: {
									workspaceId,
									typebot,
								},
								json: true,
							},
						);
					} else if (operation === 'update') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;
						const updateData = this.getNodeParameter('updateData', i) as string;

						let updates;
						try {
							updates = JSON.parse(updateData);
						} catch (error) {
							throw new NodeOperationError(this.getNode(), 'Update Data must be valid JSON');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'PATCH',
								url: `${baseUrl}/v1/typebots/${typebotId}`,
								body: updates,
								json: true,
							},
						);
					} else if (operation === 'delete') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/v1/typebots/${typebotId}`,
								json: true,
							},
						);
					} else if (operation === 'publish') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'POST',
								url: `${baseUrl}/v1/typebots/${typebotId}/publish`,
								json: true,
							},
						);
					} else if (operation === 'unpublish') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'POST',
								url: `${baseUrl}/v1/typebots/${typebotId}/unpublish`,
								json: true,
							},
						);
					} else if (operation === 'getPublished') {
						const publicId = this.getNodeParameter('publicId', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${chatBaseUrl}/v1/publicTypebots/${publicId}`,
							json: true,
						});
					} else if (operation === 'import') {
						const workspaceId = this.getNodeParameter('workspaceId', i) as string;
						const typebotData = this.getNodeParameter('typebotData', i) as string;

						let typebot;
						try {
							typebot = JSON.parse(typebotData);
						} catch (error) {
							throw new NodeOperationError(this.getNode(), 'Typebot Data must be valid JSON');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'POST',
								url: `${baseUrl}/v1/typebots/import`,
								body: {
									workspaceId,
									typebot,
								},
								json: true,
							},
						);
					}
				}

				// =====================================
				// Result Operations
				// =====================================
				else if (resource === 'result') {
					if (operation === 'list') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'GET',
								url: `${baseUrl}/v1/typebots/${typebotId}/results`,
								json: true,
							},
						);
					} else if (operation === 'get') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;
						const resultId = this.getNodeParameter('resultId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'GET',
								url: `${baseUrl}/v1/typebots/${typebotId}/results/${resultId}`,
								json: true,
							},
						);
					} else if (operation === 'delete') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;
						const resultIds = this.getNodeParameter('resultIds', i) as string;

						const ids = resultIds.split(',').map(id => id.trim());

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/v1/typebots/${typebotId}/results`,
								body: { resultIds: ids },
								json: true,
							},
						);
					} else if (operation === 'getStats') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'GET',
								url: `${baseUrl}/v1/typebots/${typebotId}/analytics/stats`,
								json: true,
							},
						);
					} else if (operation === 'listLogs') {
						const typebotId = this.getNodeParameter('typebotId', i) as string;
						const resultId = this.getNodeParameter('resultId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'GET',
								url: `${baseUrl}/v1/typebots/${typebotId}/results/${resultId}/logs`,
								json: true,
							},
						);
					}
				}

				// =====================================
				// Workspace Operations
				// =====================================
				else if (resource === 'workspace') {
					if (operation === 'list') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'GET',
								url: `${baseUrl}/v1/workspaces`,
								json: true,
							},
						);
					} else if (operation === 'get') {
						const workspaceId = this.getNodeParameter('workspaceId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'GET',
								url: `${baseUrl}/v1/workspaces/${workspaceId}`,
								json: true,
							},
						);
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'POST',
								url: `${baseUrl}/v1/workspaces`,
								body: { name },
								json: true,
							},
						);
					} else if (operation === 'update') {
						const workspaceId = this.getNodeParameter('workspaceId', i) as string;
						const updateData = this.getNodeParameter('updateData', i) as string;

						let updates;
						try {
							updates = JSON.parse(updateData);
						} catch (error) {
							throw new NodeOperationError(this.getNode(), 'Update Data must be valid JSON');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'PATCH',
								url: `${baseUrl}/v1/workspaces/${workspaceId}`,
								body: updates,
								json: true,
							},
						);
					} else if (operation === 'delete') {
						const workspaceId = this.getNodeParameter('workspaceId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/v1/workspaces/${workspaceId}`,
								json: true,
							},
						);
					} else if (operation === 'listMembers') {
						const workspaceId = this.getNodeParameter('workspaceId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'GET',
								url: `${baseUrl}/v1/workspaces/${workspaceId}/members`,
								json: true,
							},
						);
					}
				}

				// =====================================
				// Folder Operations
				// =====================================
				else if (resource === 'folder') {
					if (operation === 'list') {
						const workspaceId = this.getNodeParameter('workspaceId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'GET',
								url: `${baseUrl}/v1/folders`,
								qs: { workspaceId },
								json: true,
							},
						);
					} else if (operation === 'create') {
						const workspaceId = this.getNodeParameter('workspaceId', i) as string;
						const folderData = this.getNodeParameter('folderData', i) as string;

						let folder;
						try {
							folder = JSON.parse(folderData);
						} catch (error) {
							throw new NodeOperationError(this.getNode(), 'Folder Data must be valid JSON');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'POST',
								url: `${baseUrl}/v1/folders`,
								body: {
									workspaceId,
									...folder,
								},
								json: true,
							},
						);
					} else if (operation === 'update') {
						const folderId = this.getNodeParameter('folderId', i) as string;
						const updateData = this.getNodeParameter('updateData', i) as string;

						let updates;
						try {
							updates = JSON.parse(updateData);
						} catch (error) {
							throw new NodeOperationError(this.getNode(), 'Update Data must be valid JSON');
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'PATCH',
								url: `${baseUrl}/v1/folders/${folderId}`,
								body: updates,
								json: true,
							},
						);
					} else if (operation === 'delete') {
						const folderId = this.getNodeParameter('folderId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'typebotApi',
							{
								method: 'DELETE',
								url: `${baseUrl}/v1/folders/${folderId}`,
								json: true,
							},
						);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error instanceof Error ? error.message : String(error) }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

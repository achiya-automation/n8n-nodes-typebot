# n8n-nodes-typebot

This is an n8n community node that lets you use [Typebot](https://typebot.io/) in your n8n workflows.

Typebot is a powerful open-source chatbot builder that allows you to create conversational apps and forms.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Node Installation

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-typebot` in the npm Package Name field
5. Click **Install**

### Manual Installation (for development)

```bash
cd ~/.n8n/custom
npm install n8n-nodes-typebot
```

After installation, restart your n8n instance.

## Prerequisites

You will need:

1. A Typebot account (cloud or self-hosted)
2. An API token from your Typebot account

### Getting Your API Token

1. Log into your Typebot dashboard at https://app.typebot.io
2. Navigate to **Settings & Members** → **My account**
3. Scroll to the **API tokens** section
4. Click **Create**
5. Give your token a name and click **Create**
6. Copy the generated token (you'll need it for n8n credentials)

## Operations

This node supports all major Typebot API operations:

### Chat Operations
- **Start Chat** - Start a new chat session with a published typebot
- **Continue Chat** - Continue an existing chat session
- **Start Preview Chat** - Start a preview chat session (for testing unpublished bots)

### Typebot Management
- **List** - List all typebots in your workspace
- **Get** - Get a specific typebot by ID
- **Create** - Create a new typebot
- **Update** - Update an existing typebot
- **Delete** - Delete a typebot
- **Publish** - Publish a typebot
- **Unpublish** - Unpublish a typebot
- **Get Published** - Get a published typebot by public ID

### Results
- **List** - List all results for a typebot
- **Get** - Get a specific result
- **Delete** - Delete results
- **Get Stats** - Get statistics for a typebot

### Workspaces
- **List** - List all workspaces
- **Get** - Get a specific workspace
- **Create** - Create a new workspace
- **Update** - Update a workspace
- **Delete** - Delete a workspace
- **List Members** - List workspace members

### Folders
- **List** - List all folders in a workspace
- **Create** - Create a new folder
- **Update** - Update a folder
- **Delete** - Delete a folder

## Credentials

To use this node, you need to set up Typebot API credentials in n8n:

1. In n8n, go to **Credentials** → **New**
2. Search for "Typebot API"
3. Enter your credentials:
   - **API Token**: Your Typebot API token
   - **Base URL**:
     - For cloud: `https://app.typebot.io/api`
     - For self-hosted: `https://your-domain.com/api`
4. Click **Save**

## Compatibility

- Tested with n8n version 1.0.0+
- Tested with Typebot API v1

## Usage

### Example 1: Start a Chat Session

This example shows how to start a chat with a published typebot:

1. Add the **Typebot** node to your workflow
2. Select **Chat** as the resource
3. Select **Start Chat** as the operation
4. Enter your typebot's **Public ID** (found in typebot settings)
5. Optionally add a message or prefilled variables
6. Execute the node

The node will return:
- `sessionId` - Use this to continue the conversation
- `messages` - The bot's response messages
- `input` - The next expected input from the user

### Example 2: Continue a Chat Conversation

1. Add another **Typebot** node
2. Select **Chat** → **Continue Chat**
3. Enter the `sessionId` from the previous chat start
4. Enter the user's message
5. Execute the node

### Example 3: Create a New Typebot

1. Add the **Typebot** node
2. Select **Typebot** → **Create**
3. Enter your **Workspace ID**
4. Enter the typebot configuration as JSON:

```json
{
  "name": "My New Bot",
  "groups": [],
  "events": [{
    "type": "start",
    "graphCoordinates": { "x": 0, "y": 0 }
  }]
}
```

### Example 4: Get Chat Results

1. Add the **Typebot** node
2. Select **Result** → **List**
3. Enter your **Typebot ID**
4. Execute to get all conversation results

## Tips for Usage

### Working with JSON Fields

Several operations require JSON input (like creating or updating typebots). You can:

1. Use the **Code** node to prepare the JSON data
2. Reference data from previous nodes using expressions: `{{ $json.fieldName }}`
3. Use the **Set** node to construct complex objects

### Chat Flow Pattern

A typical chat flow in n8n might look like:

1. **Webhook** node - Receives user message
2. **Typebot** (Start/Continue Chat) - Processes the message
3. **IF** node - Check if conversation is complete
4. **Typebot** (Get Result) - Retrieve final answers
5. **HTTP Request** - Send response back to user

### Error Handling

- Enable **Continue On Fail** in node settings to handle errors gracefully
- The node will return error information in the output if the API request fails
- Check Typebot API documentation for specific error codes

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Typebot documentation](https://docs.typebot.io/)
- [Typebot API reference](https://docs.typebot.io/api-reference)
- [GitHub repository](https://github.com/yourusername/n8n-nodes-typebot) (update with your repo URL)

## License

[MIT](LICENSE.md)

## Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/yourusername/n8n-nodes-typebot/issues)
- Check the [n8n community forum](https://community.n8n.io/)
- Refer to [Typebot documentation](https://docs.typebot.io/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Version History

### 1.0.0
- Initial release
- Support for all major Typebot API operations
- Chat operations (start, continue, preview)
- Typebot management (CRUD operations)
- Results management
- Workspace and folder management

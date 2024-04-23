# Discord Bot for Server Management

This README provides documentation for the Discord bot designed to manage server messages and interactions. The bot is capable of handling welcome messages, rule enforcement, role management, and member verification.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you start, ensure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

### Installation

Clone the repository to your local machine:

```
git clone https://github.com/Liam-Nothing/JIHEDN-Bot
```

Navigate to the cloned directory:

```
cd https://github.com/Liam-Nothing/JIHEDN-Bot
```

Install the necessary packages:

```
npm install
```

### Configuration

Create a `.env` file in the root directory of your project and add the following environment variables:

```
API_KEY_BOT=your_discord_bot_token
WEBHOOK_URL=your_webhook_url
GUILD_ID=your_guild_id
WELCOME_CHANNEL_ID=your_welcome_channel_id
ROLES_CHANNEL_ID=your_roles_channel_id
RULES_CHANNEL_ID=your_rules_channel_id
CONTROLE_CHANNEL_ID=your_controle_channel_id
MEMBER_ROLE_ID=your_member_role_id
VISITOR_ROLE_ID=your_visitor_role_id
CONTROLEUR_ROLE_ID=your_controleur_role_id
```

### Running the Bot

To run the bot, use the following command:

```
node index.js
```

## Bot Commands and Usage

The bot handles various events and commands:

- **On Ready**: When the bot starts, it will automatically manage previous messages and post new information messages in the configured channels.
- **Message Creation**: Based on the channel and the user's roles, the bot handles messages differently for verification, rules acceptance, and role assignments.
- **Interaction Handling**: Manages role assignments through interactions in specific channels.

## Built With

- [Node.js](https://nodejs.org/) - The runtime server
- [Discord.js](https://discord.js.org/) - A powerful JavaScript library for interacting with the Discord API

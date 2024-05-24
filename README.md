# Discord Bot for Jeunes IHEDN Server

This Discord bot is designed to facilitate management and interaction within the Jeunes IHEDN Discord server. It handles various tasks such as role management, membership verification, and automated messaging within designated channels.

## Features

- **Email Validation**: Automatically validates emails in the welcome channel to verify new members.
- **Role Management**: Allows administrators to assign roles based on user interaction and verifications.
- **Automated Responses**: Provides automated messages in specific channels for guidance and interaction.
- **Custom Logging**: Utilizes a custom logging function to keep track of activities and errors.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v16.x or higher recommended)
- npm (Node Package Manager)
- A Discord Bot Token ([Discord Developer Portal](https://discord.com/developers/applications))
- Configured `.env` file with necessary environment variables

## Installation

Follow these steps to get your development environment running:

1. **Clone the repository**


```
git clone https://github.com/your-repository/your-project-name.git
cd your-project-name
```

2. **Install Dependencies**

Run the following command to install the project dependencies: `npm install`

3. **Set Up Environment Variables**

Create a .env file in the root directory of your project. Add the following environment variables according to your setup:
```
API_KEY_BOT=your_discord_bot_token
WEBHOOK_URL=your_webhook_url_for_integration
WELCOME_CHANNEL_ID=your_welcome_channel_id
ROLES_CHANNEL_ID=your_roles_channel_id
RULES_CHANNEL_ID=your_rules_channel_id
CONTROLE_CHANNEL_ID=your_controle_channel_id
MEMBER_ROLE_ID=your_member_role_id
VISITOR_ROLE_ID=your_visitor_role_id
CONTROLEUR_ROLE_ID=your_controleur_role_id
GUILD_ID=your_guild_id
```
4. **Run the Bot**

Use the following command to start the bot: `node index.js`

## Usage

Once the bot is running, it will listen to the configured channels for specific triggers such as message creation and reactions. The bot will automatically handle all operations based on its configuration.

- **Welcome Messages**: Automatically sends an embedded welcome message in the designated welcome channel.
- **Email Verification**: Listens for messages in the welcome channel and validates them as email addresses.
- **Role Assignment**: In the roles channel, the bot allows for role assignments through interactions with messages.

## Contributing

Contributions are what make the open-source community such a fantastic place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- Fork the Project
- Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
- Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the Branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

Your Name – [@your_twitter](https://twitter.com/your_twitter) – email@example.com

Project Link: [https://github.com/your-repository/your-project-name](https://github.com/your-repository/your-project-name)

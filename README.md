# Athena BOT

Athena BOT is a Discord bot designed to manage the Discord server of the "Jeune IHEDN" association. This bot automates various tasks to help maintain the server's organization and engagement.

## Installation

1. Install the dependencies:

    ```
    npm install
    ```

## Configuration

Create a `.env` file in the root directory of the project and add the following variables:

```
API_KEY_BOT=""
WEBHOOK_URL=""
WELCOME_CHANNEL_ID=""
ROLES_CHANNEL_ID=""
RULES_CHANNEL_ID=""
CONTROLE_CHANNEL_ID=""
MEMBER_ROLE_ID=""
VISITOR_ROLE_ID=""
CONTROLEUR_ROLE_ID=""
GUILD_ID=""
```

An example `.env` file is provided as `.env-example`.

## Usage

Start the bot by running the following command:

```
node index.js
```

The bot will start and connect to your Discord server using the provided API key.

## Usage on O2Switch

! DO NOT CONNECT TO THE WEB SSH !

### Prerequisites

- Access to o2switch cPanel
- A Discord bot ready for deployment
- Basic knowledge of SSH and Node.js

### Step 1: Initial Configuration

1. **Log in to cPanel**: Access your cPanel account provided by o2switch.
2. **Open Setup Node.js App**: Locate and open the "Setup Node.js App" tool.

### Step 2: Create a New Node.js Application

1. **Create the Application**:
    - Click on `Create Application`.
    - Select the Node.js version (e.g., `14`, `16`, or `18`).
    - Set the application mode (`Development` or `Production`).
    - **Application Root**: Specify the path to your project directory (e.g., `/home/username/discord-bot`).
    - **Application URL**: Define the URL for your application.
    - **Application Startup File**: Set this to `index.js`.

2. **Install Dependencies**:
    - Open the terminal in cPanel or connect via SSH.
    - Navigate to your project directory:
      ```
      cd /home/username/discord-bot
      ```
    - Install the necessary dependencies:
      ```
      npm install
      ```

### Step 3: Ensure Automatic Restart with pm2

To keep your bot running and automatically restart it if it crashes, use `pm2`.

1. **Install pm2**:
    - In the terminal, install pm2 globally:
      ```
      npm install -g pm2
      ```

2. **Start Your Bot with pm2**:
    - Start your bot using pm2:
      ```
      pm2 start index.js --name "discord-bot"
      ```
    - Save the pm2 process list and setup pm2 to start on boot:
      ```
      pm2 save
      pm2 startup
      ```

### Step 4: Manage and Monitor Your Bot

- **View the status of your application**:
    ```
    pm2 list
    ```
- **Restart your application**:
    ```
    pm2 restart discord-bot
    ```
- **Stop your application**:
    ```
    pm2 stop discord-bot
    ```

### Step 5: Updating and Maintenance

When you need to update your bot or its dependencies:

1. **Stop the application**:
  ```
  pm2 stop discord-bot
  ```
2. **Make necessary updates** (e.g., `git pull` or `npm update`).
3. **Restart the application**:
  ```
  pm2 restart discord-bot
  ```
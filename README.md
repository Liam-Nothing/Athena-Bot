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
    - Select the Node.js version 19.
    - Set the application mode (`Development`).
    - **Application Root**: Specify the path to your project directory (e.g., `/home/username/discord-bot`)(where you git clone).
    - **Application URL**: Define the URL for your application. (let empty)
    - **Application Startup File**: Set this to `satus.js`.

2. **Install Dependencies**:
    - Connect via SSH.
    - Navigate to your project directory: (Enter to the virtual environment. To enter to virtual environment, run the command)
      ```
      source /home/XXXXX/nodevenv/public_html/XXXXX/XXXXX/bin/activate && cd /home/XXXXX/public_html/XXXXX
      ```
    - Install the necessary dependencies:
      ```
      npm install
      ```

### Step 3: Run the Bot

1. Click on "Run app."
2. Verify the status by visiting "URL/status."
   - If the bot is not running, this page will indicate it.
3. Click on "Run JS script."
4. Select and launch the "start" script.
5. Return to "URL/status" (wait a few seconds for processes like `npm i`, `git pull`, etc.).
   - The bot should now be running.
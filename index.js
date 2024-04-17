
require('dotenv').config();
const { logText } = require("./functs_utils.js");
const Discord = require("discord.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const emailvalidator = require("email-validator");
const { exit } = require("process");
// require("./splash_screen.js");
logText("Starting bot...");

// Initialisation of Discord client
const Client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildMessageReactions,
        Discord.IntentsBitField.Flags.GuildMembers,
    ]
});
logText("Discord client initialized");

// Initialisation of XMLHttpRequest
const http = new XMLHttpRequest();
const method = 'POST';
const url = process.env.WEBHOOK_URL;

// Initialisation of variables
const ChannelID_Welcome = process.env.WELCOME_CHANNEL_ID;
// var fs = require('fs');
// var RoleID_visiteur = fs.readFileSync('RoleID_visiteur.txt','utf8');
// var RoleID_membre = fs.readFileSync('RoleID_membre.txt','utf8');
// var RoleID_controleur = fs.readFileSync('RoleID_controleur.txt','utf8');
// var ChannelID_Roles = fs.readFileSync('ChannelID_Roles.txt','utf8');
// var ChannelID_Rules = fs.readFileSync('ChannelID_Rules.txt','utf8');
// var ChannelID_Controle = fs.readFileSync('ChannelID_Controle.txt','utf8');
// var GuildID = fs.readFileSync('GuildID.txt','utf8');
// var guild = 0;
// var memberID = 0;


Client.login(process.env.API_KEY_BOT)
    .then(() => {
        logText("Connected to Discord successfully!");
    })
    .catch(err => {
        logText(`Error connecting to Discord: ${err.message}`);
        exit(1);
    });

// Client.on('ready', () => {
//     logText("Bot is ready to handle requests!");

//     const welcomeChannel = Client.channels.cache.get(ChannelID_Welcome);
//     if (!welcomeChannel) {
//         logText("Welcome channel not found!");
//         return;
//     }

//     welcomeChannel.send("Hello everyone, I'm now connected and ready to assist!")
//         .then(message => logText("Welcome message sent successfully!"))
//         .catch(err => logText(`Failed to send welcome message: ${err.message}`));
// });
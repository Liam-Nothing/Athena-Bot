require('dotenv').config();
const { logText } = require("./functs_utils.js");
const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');
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

// Initialisation of variables for channels
const ChannelID_Welcome = process.env.WELCOME_CHANNEL_ID;
const ChannelID_Roles = process.env.ROLES_CHANNEL_ID;
const ChannelID_Rules = process.env.RULES_CHANNEL_ID;
const ChannelID_Controle = process.env.CONTROLE_CHANNEL_ID;

// Initialisation of variables for roles
// [TODO] What is a GuildID ???
const RoleID_membre = process.env.MEMBER_ROLE_ID;
const RoleID_visiteur = process.env.VISITOR_ROLE_ID;
const RoleID_controleur = process.env.CONTROLEUR_ROLE_ID;

// Initialisation of variables for guild
const GuildID = process.env.GUILD_ID;

let guild = null;
let memberID = 0;

const embed_welcome = new EmbedBuilder()
.setTitle("Bienvenue sur le serveur des Jeunes IHEDN")
.setDescription("Bonjour, vous êtes bien arrivés sur le serveur Discord de l'association des Jeunes IHEDN. Je vais vous guider pas à pas pour accéder à la communauté.")
.addFields(
    { name: "Étape 1", value: "Afin de vous identifier, merci de renseigner votre adresse email pour procéder au contrôle de votre cotisation (Cet email correspond à celui indiqué lors de votre paiement sur HelloAsso)." },)
.setImage("https://media.giphy.com/media/ygBB0CrnoRTDrzIrdG/giphy-downsized-large.gif")
.setFooter({ text: "L'usurpation d'identité est évidemment interdite." });

const embed_rules = new EmbedBuilder()
.setTitle("Règles du serveur !")
.setDescription("**Étape 3** Acceptez le règlement du serveur des Jeunes IHEDN ci-dessous pour accéder à l'intégralité du serveur")
.addFields(
    { name: "Engagement", value: "Le statut de membre du serveur implique le respect des [statuts et du règlement intérieur](https://www.jeunes-ihedn.org/informations-administratives/) de l’association." },
    { name: "Compte", value: "Votre identité ne doit pas être confondue avec celle d'une autre personne. L'usurpation d'identité étant évidemment interdite." },
    { name: "Généralité", value: "Le respect étant l'une des bases primordiales de la communication interpersonnelle, nous vous demandons d'être le plus poli, courtois et correct possible envers les autres membres." },
    { name: "Expression", value: "Les propos discriminatoires (racistes, sexistes, xénophobe, lgbt-phobe...), à caractère pornographique ou incitant à la haine et/ou à la violence sont proscrits." },
    { name: "Salons", value: "L'abus de messages, par spam, flood ou majuscules est prohibé et tout manquement au règlement fera l'objet d'une sanction pouvant aller du rappel à l'ordre au ban du serveur." },
    { name: "Rappel", value: "Les [Conditions d'Utilisation de Discord](https://discord.com/terms) et la [Charte d’Utilisation de la Communauté Discord](https://discord.com/guidelines) s'appliquent à tous les serveurs, dont celui-ci." },
    { name: "Aide", value: "Si vous avez besoin d'aide, ouvrez un ticket dans le canal <#949665174883803196> et un administrateur prendra contact avec vous" },)
.setImage("https://c.tenor.com/EsQ7Ahmi_L4AAAAC/oss117-oss.gif")
.setFooter({ text: "Pour accepter le règlement du serveur veuillez interagir avec la réaction ci-dessous ! ✅" });

const embed_controle = new EmbedBuilder()
.setTitle("Espace de contrôle des membres")
.setDescription("Afin de procéder au contrôle de cotisation d'un membre, merci de renseigner son adresse email. Vous pouvez également vérifier un membre du serveur en renseignant son ID [Aide](https://support.discord.com/hc/fr/articles/206346498-O%C3%B9-trouver-l-ID-de-mon-compte-utilisateur-serveur-message).")
.addFields(
    { name: "Vérification groupée", value: "Si vous voulez contrôler une liste de personnes rapidement, vous pouvez également utiliser [ce service](https://tally.so/r/wv5r83)." },)
.setImage("https://media.giphy.com/media/fovdbgAA1vQ6A/giphy.gif")
.setFooter({ text: "Pour information, tous les membres présents sur le Discord sont à jour de cotisation" });

const embed_roles = new EmbedBuilder()
.setTitle("Espace d'intégration à une entité")
.setDescription("Afin d'autoriser, à un membre (rôle <@&"+RoleID_membre+">), l'accès à une entité sous votre responsabilité (👑), merci de renseigner ci-dessous l'ID Discord de l'utilisateur (visible avec le mode développeur activé).")
.addFields(
    { name: "Trouver l'ID", value: "Sur mobile, il vous suffit de cliquer sur son profil, puis sur "+'"'+"Copier l'identifiant"+'"'+". Sur PC, il vous faut réaliser un clic droit sur son profil, puis sur "+'"'+"Copier l'identifiant"+'"'+"." },
    { name: "Mode développeur", value: "Pour activer ce mode, rendez-vous dans les paramètres de votre profil, puis dans "+'"'+"Apparence"+'"'+" sur mobile ou "+'"'+"Avancés"+'"'+" sur PC. [Aide](https://support.discord.com/hc/fr/articles/206346498-O%C3%B9-trouver-l-ID-de-mon-compte-utilisateur-serveur-message)" },
    { name: "Liste de vos membres", value: "Vous pouvez générer facilement la liste de vos membres Discord via [ce service](https://tally.so/r/nGe7Wo)." },)
.setImage("https://media.giphy.com/media/WEYLWp4RrzTAiOFt7V/giphy.gif")
.setFooter({ text: "Les accès plus élevés (Cadre, Modérateur ...) se demandent auprès des modérateurs, via le canal ❔・support-discord"});

Client.login(process.env.API_KEY_BOT)
    .then(() => {
        logText("Connected to Discord successfully!");
    })
    .catch(err => {
        logText(`Error connecting to Discord: ${err.message}`);
        exit(1);
    });

Client.on("ready", () => {
    logText("Bot online !");
    // Client.user.setActivity('un podcast Fort Éclair', { type: 'LISTENING' });
    Client.channels.cache.get(ChannelID_Welcome).send({ embeds: [embed_welcome]});
    logText("Welcome published");
    Client.channels.cache.get(ChannelID_Rules).send({ embeds: [embed_rules]});
    logText("Rules published");
    Client.channels.cache.get(ChannelID_Roles).send({ embeds: [embed_roles]});
    logText("Roles published");
    Client.channels.cache.get(ChannelID_Controle).send({ embeds: [embed_controle]});
    logText("Controle published");
    logText("Webhook url : " + url);
    guild = Client.guilds.cache.get(GuildID);
    logText("Guild : " + guild);
});
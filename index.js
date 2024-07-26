require('dotenv').config();
const { logText } = require("./functs_utils.js");
const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const emailvalidator = require("email-validator");
const { exit } = require("process");
const fs = require('fs');
require("./splash_screen.js");
logText("Starting bot...");

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Initialisation of Discord client
const Client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildMessageReactions,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.MessageContent,
    ]
});
logText("Discord client initialized");

// Initialisation of XMLHttpRequest
let http = new XMLHttpRequest();
const method = 'POST';
const url = process.env.WEBHOOK_URL;

// Initialisation of variables for channels
const ChannelID_Welcome = process.env.WELCOME_CHANNEL_ID;
const ChannelID_Roles = process.env.ROLES_CHANNEL_ID;
const ChannelID_Rules = process.env.RULES_CHANNEL_ID;
const ChannelID_Controle = process.env.CONTROLE_CHANNEL_ID;

// Initialisation of variables for roles
const RoleID_membre = process.env.MEMBER_ROLE_ID;
const RoleID_visiteur = process.env.VISITOR_ROLE_ID;
const RoleID_controleur = process.env.CONTROLEUR_ROLE_ID;

// Initialisation of variables for guild
const GuildID = process.env.GUILD_ID;

let guild = null;
let memberID = null;

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
    .setDescription("Afin d'autoriser, à un membre (rôle <@&" + RoleID_membre + ">), l'accès à une entité sous votre responsabilité (👑), merci de renseigner ci-dessous l'ID Discord de l'utilisateur (visible avec le mode développeur activé).")
    .addFields(
        { name: "Trouver l'ID", value: "Sur mobile, il vous suffit de cliquer sur son profil, puis sur " + '"' + "Copier l'identifiant" + '"' + ". Sur PC, il vous faut réaliser un clic droit sur son profil, puis sur " + '"' + "Copier l'identifiant" + '"' + "." },
        { name: "Mode développeur", value: "Pour activer ce mode, rendez-vous dans les paramètres de votre profil, puis dans " + '"' + "Apparence" + '"' + " sur mobile ou " + '"' + "Avancés" + '"' + " sur PC. [Aide](https://support.discord.com/hc/fr/articles/206346498-O%C3%B9-trouver-l-ID-de-mon-compte-utilisateur-serveur-message)" },
        { name: "Liste de vos membres", value: "Vous pouvez générer facilement la liste de vos membres Discord via [ce service](https://tally.so/r/nGe7Wo)." },)
    .setImage("https://media.giphy.com/media/WEYLWp4RrzTAiOFt7V/giphy.gif")
    .setFooter({ text: "Les accès plus élevés (Cadre, Modérateur ...) se demandent auprès des modérateurs, via le canal ❔・support-discord" });

function loginBot() {
    const token = process.env.API_KEY_BOT;
    if (!token) {
        logText("API_KEY_BOT is undefined. Please check your .env file.");
        exit(1);
    }
    logText(`Logging...`);
    Client.login(token)
        .then(() => {
            logText(`Bot connected successfully`);
        })
        .catch(err => {
            logText(`Error connecting to Discord - ${err.message}`);
            exit(1);
        });
}

loginBot();

const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
setInterval(() => {
    logText("Refreshing bot token...");
    Client.destroy()
        .then(() => {
            logText("Bot disconnected successfully.");
            loginBot();
        })
        .catch(err => {
            logText(`Error disconnecting bot: ${err.message}`);
        });
}, REFRESH_INTERVAL);

Client.on("ready", () => {
    logText("Bot online !");

    const dataPath = './savedMessageIds.json';
    if (fs.existsSync(dataPath)) {
        const savedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        savedData.forEach(data => {
            const channel = Client.channels.cache.get(data.channelId);
            if (channel) {
                channel.messages.fetch(data.messageId)
                    .then(message => {
                        message.delete();
                        logText(`Message deleted successfully: ID ${message.id} in channel: ${channel.id}`);
                    })
                    .catch(err => logText(`Failed to delete message: ${err.message}`));
            }
        });
        fs.writeFileSync(dataPath, '[]');
    }

    const messagesToSave = [];

    Client.channels.cache.get(ChannelID_Welcome).send({ embeds: [embed_welcome] }).then(message => {
        logText(`Welcome message published`);
        messagesToSave.push({ messageId: message.id, channelId: message.channel.id });
    }).catch(err => logText(`Failed to send welcome message: ${err.message}`));

    Client.channels.cache.get(ChannelID_Rules).send({ embeds: [embed_rules] }).then(message => {
        logText(`Rules message published`);
        messagesToSave.push({ messageId: message.id, channelId: message.channel.id });
    }).catch(err => logText(`Failed to send rules message: ${err.message}`));

    Client.channels.cache.get(ChannelID_Roles).send({ embeds: [embed_roles] }).then(message => {
        logText(`Roles message published`);
        messagesToSave.push({ messageId: message.id, channelId: message.channel.id });
    }).catch(err => logText(`Failed to send roles message: ${err.message}`));

    Client.channels.cache.get(ChannelID_Controle).send({ embeds: [embed_controle] }).then(message => {
        logText(`Controle message published`);
        messagesToSave.push({ messageId: message.id, channelId: message.channel.id });
    }).catch(err => logText(`Failed to send controle message: ${err.message}`));

    setTimeout(() => {
        fs.writeFileSync(dataPath, JSON.stringify(messagesToSave, null, 4));
    }, 5000);

    guild = Client.guilds.cache.get(GuildID);
});


Client.on("messageCreate", message => {
    // Filtrage bot
    if (message.author.bot) return;
    logText("Bot message received from " + message.author.id);

    // Channel de vérification
    if (message.channel.id === ChannelID_Welcome) {
        // Rôle visiteur uniquement
        if (message.member.roles.cache.has(RoleID_visiteur)) {
            // Contrôle si email correct
            if (emailvalidator.validate(message.content)) {
                message.react("🔍");
                message.reply("Vérification de votre cotisation en cours...")
                    .then(msg => {
                        setTimeout(() => msg.delete()
                            .then()
                            .catch(console.error)
                            , 5000)
                    })
                    .catch(console.error);
                setTimeout(() => message.delete()
                    .then()
                    .catch(console.error)
                    , 5000)
                var data = {
                    channel_id: message.channel.id,
                    user_message_id: message.id,
                    author_id: message.author.id,
                    content: message.content.toLowerCase(),
                    request_type: "NEW"
                };
                var jsonString = JSON.stringify(data);

                http.open(method, url);
                http.setRequestHeader("Content-Type", "application/json");
                http.send(jsonString);
                http = new XMLHttpRequest();
                logText("Sent email data for user " + message.author.id + " with email " + message.content);
            } else {
                message.react("❌");
                message.reply("Merci de renseigner uniquement un email afin de procéder à la vérification.")
                    .then(msg => {
                        setTimeout(() => msg.delete()
                            .then()
                            .catch(console.error)
                            , 10000)
                    })
                    .catch(console.error);
                setTimeout(() => message.delete()
                    .then()
                    .catch(console.error)
                    , 5000)
                logText("Email incorrect for user " + message.author.id + " with email " + message.content);
            }
        } else {
            message.react("⛔");
            message.reply("Bonjour, vous n'êtes pas autorisé à utiliser ce service.")
                .then(msg => {
                    setTimeout(() => msg.delete()
                        .then()
                        .catch(console.error)
                        , 5000)
                })
                .catch(console.error);
            setTimeout(() => message.delete()
                .then()
                .catch(console.error)
                , 5000)
            logText("User not allowed to use the service " + message.author.id + " in channel " + message.channel.id);
        }
        // Channel contrôle
    } else if (message.channel.id === ChannelID_Controle) {
        // Rôle contrôleur uniquement
        if (message.member.roles.cache.has(RoleID_controleur)) {
            // Contrôle si email correct
            if (emailvalidator.validate(message.content)) {
                message.react("✅");
                message.reply("Bonjour, je vais procéder à la vérification de la cotisation de cette personne.")
                    .then(msg => {
                        setTimeout(() => msg.delete()
                            .then()
                            .catch(console.error)
                            , 10000)
                    })
                    .catch(console.error);
                setTimeout(() => message.delete()
                    .then()
                    .catch(console.error)
                    , 5000)
                var data = {
                    channel_id: message.channel.id,
                    user_message_id: message.id,
                    author_id: message.author.id,
                    content: message.content.toLowerCase(),
                    request_type: "CHECK"
                };
                var jsonString = JSON.stringify(data);

                http.open(method, url);
                http.setRequestHeader("Content-Type", "application/json");
                http.send(jsonString);
                http = new XMLHttpRequest();
                logText("Verification email data for user " + message.author.id + " with email " + message.content);
            } else {
                // Recherche de l'utilisateur avec son ID
                guild.members.fetch(message.content).then((user) => {
                    memberID = user;
                    message.react("✅");
                    message.reply("Bonjour, je vais procéder à la recherche d'informations sur cette personne.")
                        .then(msg => {
                            setTimeout(() => msg.delete()
                                .then()
                                .catch(console.error)
                                , 10000)
                        })
                        .catch(console.error);
                    setTimeout(() => message.delete()
                        .then()
                        .catch(console.error)
                        , 5000)
                    var data = {
                        channel_id: message.channel.id,
                        user_message_id: message.id,
                        author_id: message.author.id,
                        content: message.content,
                        request_type: "CHECK_ID"
                    };
                    var jsonString = JSON.stringify(data);

                    http.open(method, url);
                    http.setRequestHeader("Content-Type", "application/json");
                    http.send(jsonString);
                    http = new XMLHttpRequest();
                    logText("Verification ID data for user " + message.author.id + " with ID " + message.content);
                }).catch(error => {
                    // Si l'ID n'existe pas sur ce serveur
                    memberID = 0;
                    message.react("❌");
                    message.reply("Bonjour, merci de renseigner **un email** à vérifier ou **l'ID d'un membre** du serveur uniquement. Vous pouvez aussi demander de l" + "'" + "aide auprès des modérateurs, via le canal <#949665174883803196>")
                        .then(msg => {
                            setTimeout(() => msg.delete()
                                .then()
                                .catch(console.error)
                                , 10000)
                        })
                        .catch(console.error);
                    setTimeout(() => message.delete()
                        .then()
                        .catch(console.error)
                        , 5000)
                    logText("Email or ID incorrect for user " + message.author.id + " in channel " + message.channel.id);
                })
            }
        } else {
            message.react("⛔");
            message.reply("Bonjour, vous n'êtes pas autorisé à utiliser ce service.")
                .then(msg => {
                    setTimeout(() => msg.delete()
                        .then()
                        .catch(console.error)
                        , 5000)
                })
                .catch(console.error);
            setTimeout(() => message.delete()
                .then()
                .catch(console.error)
                , 5000)
            logText("User not allowed to use the service " + message.author.id + " in channel " + message.channel.id);
        }
        // Channel rôles
    } else if (message.channel.id === ChannelID_Roles) {
        // Rôle contrôleur uniquement
        if (message.member.roles.cache.has(RoleID_controleur)) {
            // Recherche de l'utilisateur avec son ID
            guild.members.fetch(message.content).then((user) => {
                memberID = user;
                // Utilisateur membre uniquement
                if (memberID.roles.cache.has(RoleID_membre)) {
                    message.react("✅");
                    // Recherche du (premier) rôle de responsabilité de l'auteur (contenants l'emoji 👑)
                    var author = guild.members.cache.get(message.author.id);
                    var respo_role = author.roles.cache.find(respo_role => respo_role.name.includes("👑"));
                    if (respo_role === undefined) {
                        logText("No role found for user " + message.author.id);
                        message.reply('L' + "'" + 'ID est correct, malheureusement, vous n' + "'" + 'êtes pas responsable d' + "'" + 'un groupe (👑) pour donner des droits. Vous pouvez demander de l' + "'" + 'aide auprès des modérateurs, via le canal <#949665174883803196>')
                            .then(msg => {
                                memberID = 0;
                                setTimeout(() => msg.delete()
                                    .then()
                                    .catch(console.error)
                                    , 10000)
                            })
                            .catch(console.error);
                        setTimeout(() => message.delete()
                            .then()
                            .catch(console.error)
                            , 5000)
                    } else {
                        // Récupérer l'emoji du rôle en évitant une erreur de lecture
                        var emoji = String.fromCodePoint(respo_role.name.codePointAt(0));
                        // Trouver le rôle enfant lié à cet emoji
                        var member_role = guild.roles.cache.find(member_role => member_role.name.startsWith(emoji) && !member_role.name.includes("👑"));
                        if (member_role === undefined) {
                            memberID = 0;
                            message.reply("Il n'existe pas de rôle enfant associé à la responsabilité " + '"' + respo_role.name + '".  Vous pouvez demander de l' + "'" + 'aide auprès des modérateurs, via le canal <#949665174883803196>')
                                .then(msg => {
                                    setTimeout(() => msg.delete()
                                        .then()
                                        .catch(console.error)
                                        , 10000)
                                })
                                .catch(console.error);
                            setTimeout(() => message.delete()
                                .then()
                                .catch(console.error)
                                , 5000)
                        } else {
                            // Créer le menu de sélection
                            var row = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageSelectMenu()
                                        .setCustomId('select')
                                        .setPlaceholder('Liste des rôles')
                                        .addOptions(
                                            {
                                                label: member_role.name,
                                                value: member_role.id,
                                            },
                                            {
                                                label: respo_role.name,
                                                value: respo_role.id,
                                            },
                                        ),
                                );
                            message.reply({ content: ('Sélectionner le rôle que vous souhaitez associer à **<@' + memberID + '>** dans le menu ci-dessous :'), components: [row] })
                                .then(msg => {
                                    setTimeout(() => msg.delete()
                                        .then()
                                        .catch(console.error)
                                        , 10000)
                                })
                                .catch(console.error);
                            setTimeout(() => message.delete()
                                .then()
                                .catch(console.error)
                                , 10000)
                            logText("Role selection for user " + message.author.id + " with ID " + message.content);
                        }
                    }
                } else {
                    message.react("⛔");
                    message.reply("L'utilisateur n'a pas terminé son intégration au serveur. Ce service est réservé au role <@&" + RoleID_membre + ">")
                        .then(msg => {
                            setTimeout(() => msg.delete()
                                .then()
                                .catch(console.error)
                                , 5000)
                        })
                        .catch(console.error);
                    setTimeout(() => message.delete()
                        .then()
                        .catch(console.error)
                        , 5000)
                    logText("User not allowed to use the service " + message.author.id + " in channel " + message.channel.id);
                }
            }).catch(error => {
                // Si l'ID n'existe pas sur ce serveur
                memberID = 0;
                message.react("❌");
                message.reply("Bonjour, merci de renseigner uniquement **l'ID d'un membre** du serveur (voir tuto ci-dessus). Vous pouvez aussi demander de l" + "'" + "aide auprès des modérateurs, via le canal <#949665174883803196>")
                    .then(msg => {
                        setTimeout(() => msg.delete()
                            .then()
                            .catch(console.error)
                            , 10000)
                    })
                    .catch(console.error);
                setTimeout(() => message.delete()
                    .then()
                    .catch(console.error)
                    , 5000)
                logText("ID incorrect for user " + message.author.id + " with ID " + message.content + " in channel " + message.channel.id);
            })
        } else {
            message.react("⛔");
            message.reply("Bonjour, vous n'êtes pas autorisé à utiliser ce service.")
                .then(msg => {
                    setTimeout(() => msg.delete()
                        .then()
                        .catch(console.error)
                        , 5000)
                })
                .catch(console.error);
            setTimeout(() => message.delete()
                .then()
                .catch(console.error)
                , 5000)
            logText("User not allowed to use the service " + message.author.id + " in channel " + message.channel.id);
        }
    }
});

Client.on("messageReactionAdd", (reaction, user) => {
    // Filter out bot reactions
    if (user.bot) return;
    logText("Bot reaction received from " + user.id);

    // Check if it's the rules channel
    if (reaction.message.channel.id === ChannelID_Rules) {
        logText("Reaction received in the rules channel.");

        // Check if the emoji is the checkmark
        if (reaction.emoji.name === "✅") {
            var data = {
                channel_id: ChannelID_Rules,
                user_message_id: " ",
                author_id: user.id,
                content: " ",
                request_type: "RULES"
            };
            var jsonString = JSON.stringify(data);

            http.open(method, url);
            http.setRequestHeader("Content-Type", "application/json");
            http.send(jsonString);
            logText("Sent rules acceptance data for user " + user.id);
            http = new XMLHttpRequest();
        }
    }
});

Client.on("interactionCreate", interaction => {
    // Check if it's the roles channel
    logText("Bot interaction received from " + interaction.user.id);

    if (interaction.channel.id === ChannelID_Roles) {

        if (interaction.isSelectMenu()) {
            if (interaction.customId === "select") {
                try {
                    var role = interaction.guild.roles.cache.find(role => role.id === interaction.values[0]);
                    interaction.member.roles.add(role);
                    interaction.update({ content: ('✅ Le rôle ' + role.name + ' a été ajouté !') });
                    logText("Role " + role.name + " added to user " + interaction.member.id);
                } catch (error) {
                    logText("Error adding role: " + error.message);
                }
            }
        }
    }
});

Client.on("error", (e) => {
    logText("Discord client error: " + e.message);
});

Client.on("disconnect", () => {
    logText("Bot disconnected.");
});

// Express server for status endpoint
app.get('/status', (req, res) => {
    if (Client.isReady()) {
        res.status(200).send('Bot is running');
    } else {
        res.status(500).send('Bot is not running');
    }
});

app.listen(port, () => {
    logText(`Status server running at http://localhost:${port}`);
});

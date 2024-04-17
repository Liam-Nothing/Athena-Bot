console.log(" ");
console.log("                                               ▓▓▓▓▓");
console.log("                                         ▓▓             ▓▓");
console.log("                                      ▓       ▓▓▓▓▓▓▓▓▓▓▓   ▓");
console.log("                                    ▓      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ▓");
console.log("                                  ▓       ▓▓▓▓▓ ▓▓▓▓▓▓          ▓");
console.log("                                 ▓       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓          ▓");
console.log("                                ▓        ▓▓▓▓ ▓▓▓▓▓▓▓▓▓▓ ▓        ▓");
console.log("                                ▓       ▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓        ▓");
console.log("                               ▓         ▓▓         ▓▓▓▓▓          ▓");
console.log("                               ▓         ▓▓    ▓▓▓▓▓  ▓▓▓▓         ▓");
console.log("                               ▓         ▓▓▒   ▓▓ ▓     ▓ ▓        ▓");
console.log("                                ▓             ▓▓▓▓ ▓▓▓▓     ▓     ▓");
console.log("                                ▓     ▓  ▓  ▓▓▓▓▓▓ ▓▓    ▓ ▓▓▓    ▓");
console.log("                                 ▓  ▓▒▓ ▓ ▓ ▓▓       ▓▓     ▓▓▓  ▓");
console.log("                                  ▓▓▓▓▓▓ ▓▓▓▓  ▓▓▓▓▓▓▓ ▓▓    ▓▓ ▓");
console.log("                                    ▓▓ ▓▓▓  ▓▓▓▓ ▓▓▓▓▓▓▓▓▓   ▓▓");
console.log("                                      ▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓ ▓▓ ▓");
console.log("                                         ▓▓▓ ▓▓▓▓▓▓▓▓▓  ▓▓");
console.log("                                               ▓▓▓▓▓");
console.log(" ");
console.log("---------------------------------------------------------------------------------------------------");
console.log("::::'###::::'########:'##::::'##:'########:'##::: ##::::'###:::::::'########:::'#######::'########:");
console.log(":::'## ##:::... ##..:: ##:::: ##: ##.....:: ###:: ##:::'## ##:::::: ##.... ##:'##.... ##:... ##..::");
console.log("::'##:. ##::::: ##:::: ##:::: ##: ##::::::: ####: ##::'##:. ##::::: ##:::: ##: ##:::: ##:::: ##::::");
console.log(":'##:::. ##:::: ##:::: #########: ######::: ## ## ##:'##:::. ##:::: ########:: ##:::: ##:::: ##::::");
console.log(": #########:::: ##:::: ##.... ##: ##...:::: ##. ####: #########:::: ##.... ##: ##:::: ##:::: ##::::");
console.log(": ##.... ##:::: ##:::: ##:::: ##: ##::::::: ##:. ###: ##.... ##:::: ##:::: ##: ##:::: ##:::: ##::::");
console.log(": ##:::: ##:::: ##:::: ##:::: ##: ########: ##::. ##: ##:::: ##:::: ########::. #######::::: ##::::");
console.log("::..:::::..:::::..:::::..:::::..::........::..::::..::..:::::..:::::........::::.......::::::..::::");
console.log("------------------------------------[ Les Jeunes IHEDN - 2023 ]------------------------------------");
console.log(" ");
console.log("Bot started");

// Initialisation des autorisations Discord
const Discord = require("discord.js");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
});

// Initialisation des autorisations Make/Integromat
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = new XMLHttpRequest();
var fs = require('fs');
var url = fs.readFileSync('Webhook_link.txt','utf8');
var method = 'POST';

// Variables fonctionnelles
const emailvalidator = require("email-validator");
var RoleID_visiteur = fs.readFileSync('RoleID_visiteur.txt','utf8');
//var RoleID_intégration = fs.readFileSync('RoleID_intégration.txt','utf8');
var RoleID_membre = fs.readFileSync('RoleID_membre.txt','utf8');
var RoleID_controleur = fs.readFileSync('RoleID_controleur.txt','utf8');
var ChannelID_Welcome = fs.readFileSync('ChannelID_Welcome.txt','utf8');
var ChannelID_Roles = fs.readFileSync('ChannelID_Roles.txt','utf8');
var ChannelID_Rules = fs.readFileSync('ChannelID_Rules.txt','utf8');
var ChannelID_Controle = fs.readFileSync('ChannelID_Controle.txt','utf8');
var GuildID = fs.readFileSync('GuildID.txt','utf8');

var guild = 0;
var memberID = 0;

const embed_welcome = new Discord.MessageEmbed()
.setTitle("Bienvenue sur le serveur des Jeunes IHEDN")
.setDescription("Bonjour, vous êtes bien arrivés sur le serveur Discord de l'association des Jeunes IHEDN. Je vais vous guider pas à pas pour accéder à la communauté.")
.addFields(
    { name: "Étape 1", value: "Afin de vous identifier, merci de renseigner votre adresse email pour procéder au contrôle de votre cotisation (Cet email correspond à celui indiqué lors de votre paiement sur HelloAsso)." },)
.setImage("https://media.giphy.com/media/ygBB0CrnoRTDrzIrdG/giphy-downsized-large.gif")
.setFooter({ text: "L'usurpation d'identité est évidemment interdite." });

const embed_rules = new Discord.MessageEmbed()
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

const embed_controle = new Discord.MessageEmbed()
.setTitle("Espace de contrôle des membres")
.setDescription("Afin de procéder au contrôle de cotisation d'un membre, merci de renseigner son adresse email. Vous pouvez également vérifier un membre du serveur en renseignant son ID [Aide](https://support.discord.com/hc/fr/articles/206346498-O%C3%B9-trouver-l-ID-de-mon-compte-utilisateur-serveur-message).")
.addFields(
    { name: "Vérification groupée", value: "Si vous voulez contrôler une liste de personnes rapidement, vous pouvez également utiliser [ce service](https://tally.so/r/wv5r83)." },)
.setImage("https://media.giphy.com/media/fovdbgAA1vQ6A/giphy.gif")
.setFooter({ text: "Pour information, tous les membres présents sur le Discord sont à jour de cotisation" });

const embed_roles = new Discord.MessageEmbed()
.setTitle("Espace d'intégration à une entité")
.setDescription("Afin d'autoriser, à un membre (rôle <@&"+RoleID_membre+">), l'accès à une entité sous votre responsabilité (👑), merci de renseigner ci-dessous l'ID Discord de l'utilisateur (visible avec le mode développeur activé).")
.addFields(
    { name: "Trouver l'ID", value: "Sur mobile, il vous suffit de cliquer sur son profil, puis sur "+'"'+"Copier l'identifiant"+'"'+". Sur PC, il vous faut réaliser un clic droit sur son profil, puis sur "+'"'+"Copier l'identifiant"+'"'+"." },
    { name: "Mode développeur", value: "Pour activer ce mode, rendez-vous dans les paramètres de votre profil, puis dans "+'"'+"Apparence"+'"'+" sur mobile ou "+'"'+"Avancés"+'"'+" sur PC. [Aide](https://support.discord.com/hc/fr/articles/206346498-O%C3%B9-trouver-l-ID-de-mon-compte-utilisateur-serveur-message)" },
    { name: "Liste de vos membres", value: "Vous pouvez générer facilement la liste de vos membres Discord via [ce service](https://tally.so/r/nGe7Wo)." },)
.setImage("https://media.giphy.com/media/WEYLWp4RrzTAiOFt7V/giphy.gif")
.setFooter({ text: "Les accès plus élevés (Cadre, Modérateur ...) se demandent auprès des modérateurs, via le canal ❔・support-discord"});

// Connexion à l'interface Discord du bot
Client.login("xxxxxxxxxxx_clé identification du botxxxxxxxxxxxxxxx");
Client.on("ready", () => {
    console.log("Bot online !");
    Client.user.setActivity('un podcast Fort Éclair', { type: 'LISTENING' });
    Client.channels.cache.get(ChannelID_Welcome).send({ embeds: [embed_welcome]});
    console.log("Welcome published");
    Client.channels.cache.get(ChannelID_Rules).send({ embeds: [embed_rules]});
    console.log("Rules published");
    Client.channels.cache.get(ChannelID_Roles).send({ embeds: [embed_roles]});
    console.log("Roles published");
    Client.channels.cache.get(ChannelID_Controle).send({ embeds: [embed_controle]});
    console.log("Controle published");
    console.log(url);
    guild = Client.guilds.cache.get(GuildID);
});

Client.on("messageCreate", message => {
    // Filtrage bot
    if (message.author.bot) return;
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
                }).catch(error => {
                    // Si l'ID n'existe pas sur ce serveur
                    memberID = 0;
                    message.react("❌");
                    message.reply("Bonjour, merci de renseigner **un email** à vérifier ou **l'ID d'un membre** du serveur uniquement. Vous pouvez aussi demander de l"+"'"+"aide auprès des modérateurs, via le canal <#949665174883803196>")
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
                        message.reply('L'+"'"+'ID est correct, malheureusement, vous n'+"'"+'êtes pas responsable d'+"'"+'un groupe (👑) pour donner des droits. Vous pouvez demander de l'+"'"+'aide auprès des modérateurs, via le canal <#949665174883803196>')
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
                            message.reply("Il n'existe pas de rôle enfant associé à la responsabilité " + '"' + respo_role.name + '".  Vous pouvez demander de l'+"'"+'aide auprès des modérateurs, via le canal <#949665174883803196>')
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
                                message.reply({content: ('Sélectionner le rôle que vous souhaitez associer à **<@' + memberID + '>** dans le menu ci-dessous :'), components: [row]})
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
                        }
                    }
                } else {
                    message.react("⛔");
                    message.reply("L'utilisateur n'a pas terminé son intégration au serveur. Ce service est réservé au role <@&"+RoleID_membre+">")
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
                }
            }).catch(error => {
                // Si l'ID n'existe pas sur ce serveur
                memberID = 0;
                message.react("❌");
                message.reply("Bonjour, merci de renseigner uniquement **l'ID d'un membre** du serveur (voir tuto ci-dessus). Vous pouvez aussi demander de l"+"'"+"aide auprès des modérateurs, via le canal <#949665174883803196>")
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
        }
    }
});

Client.on("messageReactionAdd", (reaction, user) => {   
    // Filtrage bot
    if (user.bot) return;
    // Channel des règles
    if (reaction.message.channel.id === ChannelID_Rules) {
        // Contrôle si validation
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
            http = new XMLHttpRequest();
        }
    }
});

Client.on("interactionCreate", interaction => {
    // Channel des rôles
    if (interaction.channel.id === ChannelID_Roles) {
        if(interaction.isSelectMenu()){
            if(interaction.customId ==="select"){
                try {
                    var role= memberID.guild.roles.cache.find(role => role.id === interaction.values[0]);
                    memberID.roles.add(role);
                    interaction.update({content: ('✅ Le rôle ' + role.name + ' a été ajouté !')})
                    memberID = 0;  
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
})
var Discord = require('discord.js');

var client = new Discord.Client();

var prefix = "!";

client.login("process.env.BOT_TOKEN");

client.on("ready", function()  {
    console.log("Bot prêt!")
    client.user.setGame("!help")

});

const uneCommande = '!bot '


client.on('message', message => {
      if (message.content.startsWith(uneCommande)) {
        const str = message.content.substring(uneCommande.length)
      var interval = setInterval(function(){
        message.channel.sendMessage(str)
    } , 43200  * 1000);

client.on('message', function(message) {
     if (message.content === '!stop') {
        clearInterval(interval);  
     }
    })}});


client.on('message', message => {
   
    if(message.content === "!Bonjour"){
        message.reply("salut");
        console.log('Le bot dit bonjour');
    }

    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#0099FF")
        .setTitle("Commandes de la FLEM")
        .addField("!help","Affiche les commandes disponible sur le BOT FLEM.")
        .addField("!Bonjour", "Le bot te repondra!")
        .addField("!statistiques", "Pour connaître tes statistiques d'utilisateur Discord.")
        .addField("!bot", "Le bot répetera à interval régulier le message qui suivra la commande. Seul le staff est autorisé à l'utiliser.")
        .addField("!stop", "Cette commande arrêtera le messsage.")
        .setFooter("Pour plus d'information se renseigner auprès du technicien Discord (@shoumi#7812)")
        .addField("!clear XX", "Permet de supprimer le nombre de message indiqué, seul le staff est autorisé à utiliser cette fonction!")
        message.channel.sendMessage(help_embed)
        console.log("Menu !help ouvert!")
    }
    

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("tu n'as pas la permission requise! :/");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Tu dois indiquer le nombre de messages à supprimer! ;)")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} message ont été supprimés!`);
        }
    )}



    if (!message.content.startsWith(prefix)) return;
    
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "statistiques":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("#FFFF99")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField(`ID de l'utilisateur`, msgauthor, true)
        .addField("Date de création du compte:", userCreateDate[1] + ' '+ userCreateDate[2]+ ' '+ userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Rendez-vous en MP pour voir tes statistiques d'utilisateurs! ;)")
        message.author.send({embed: stats_embed});
        break;

    }
})

client.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "accueil").send(`Bienvenue ${member} sur le serveur Fun Of Event!!!

    Grâce à cette nouvelle communauté de Clasheurs vous allez pouvoir participer à des Events organisés sans limite d'âge ni de niveau HDV-BH !!!
    Et oui enfin une communauté pour vous TOUS !!!
    
    Toutefois, ben oui il faut bien un mais :wink: Vous devrez dès votre arrivée vous présenter, signer le règlement #regles_generales📃 
    
    Bienvenue parmi nous, soyez FUN !!!!`)
    
})

client.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "accueil").send(`${member} viens de quitter Fun Of Event. Tant pis pour ${member}`)
})

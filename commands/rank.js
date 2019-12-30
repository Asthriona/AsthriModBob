var discord = require("discord.js");
var mongoose = require("mongoose");
var Canvas = require('canvas');
var botConfig = require('../botconfig.json');

let dbusername = botConfig.dbuser;
let dbpasswd = botConfig.dbpass;
mongoose.connect('mongodb+srv://' + dbusername + ':'+ dbpasswd +'@yukiko-pcvs8.mongodb.net/discordbot?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var Users = require('../model/xp.js')

module.exports.run = async (bot, message, args) => {

    
    var canvas = Canvas.createCanvas(934, 282);
    var ctx = canvas.getContext('2d');
    //Get Background Image
    var background = await Canvas.loadImage('https://cdn.asthriona.com/discordbotCard.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(260, 80, 650, 160);
    ctx.closePath();
    ctx.stroke();
    //show Username
    ctx.font = '60px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(message.author.username, 280, 136);
    //Show Avatar
    //ctx.beginPath();
	//ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	//ctx.clip();
	//ctx.closePath();

	const avatar = await Canvas.loadImage(message.author.displayAvatarURL);
	ctx.drawImage(avatar, 10, 15, 250, 250);

    
    //Temp New Cards

    Users.findOne({
        did: message.author
    }, (err, users) =>{
        if(err) console.log(err);
    //Show Level & XP
    let nxtlvl = 300*Math.pow(2, users.level)
    var xpleft = nxtlvl-users.xp;
    ctx.font = '50px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText("You are level " + users.level +" - "+ users.xp + " XP", 280, 180);
    //xp Left
    ctx.font = '50px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText("Next Level in "+ xpleft + " xp", 280, 225);
    var lvlimg = new discord.Attachment(canvas.toBuffer(), 'lvlup-image.png');
    message.channel.send(lvlimg);


    });

    }     
module.exports.help = {
    name: "rank",
    description: "Show... bot uptime? more or less."
}
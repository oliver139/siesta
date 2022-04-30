const { token } = require('./config.json');
const fs = require('fs');
const { Client, Collection, Intents, WebhookClient,MessageEmbed } = require('discord.js');
const  config  = require('./config.json');
const { url } = require('inspector');
const client = new Client({partials:["CHANNEL"], intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MESSAGES ,Intents.FLAGS.GUILD_WEBHOOKS , Intents.FLAGS.DIRECT_MESSAGES , Intents.FLAGS.GUILD_MEMBERS]});
const prefix = '-'

client.commands = new Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./cmds/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`以 ${client.user.tag} 登入`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.on('messageCreate', async msg => {
	if (msg.author.bot) return;

	//normal
	if (msg.channelId === '950020050792894464'){

		const webhook = new WebhookClient({url : 'https://discord.com/api/webhooks/952935493153222756/7mtoiRicyc-4LJ5zmvMhedcXDzUFhi9pw_tEncTZ7UEhYB5vabMZmfdqo72GqNp6Se_J'});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}

	//tc
	if (msg.channelId === '951115920607154186'){

		const webhook = new WebhookClient({url : 'https://discord.com/api/webhooks/957162016785711134/TIMHVfMweK5-w5pgkdLq6LQ1Njx0i6uMYiv8niBa2SJ79wJGhOOreoVaTVUIGEXdg2B9'});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}

	//yt
	if (msg.channelId === '951116441497792664'){

		const webhook = new WebhookClient({url : 'https://discord.com/api/webhooks/957162169127022652/fOXsGHo6tX8QHv85EOmnkSg26dNSRMmRt76twEZWURb0iu6UAuYfyA-eJHgO8GXXf5Qa'});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

	}
	//檢舉區
	if (msg.channelId === '965615569686642729'){

		const webhook = new WebhookClient({url : 'https://discord.com/api/webhooks/969982744669089873/Szcb083stnd3w4ZDxOXJrFRmPmFBxXhFf5AAud8h2F6AgE0hmKxCmiynjPU46ty3mX3u'});
		webhook.send({
			content: `${msg.content}`,
			username: `${msg.author.tag}`,
			avatarURL: `${msg.author.avatarURL()}`
		})

		if (msg.attachments.size > 0){
			msg.attachments.forEach(a=>{
				const url = a.url
				webhook.send({
					content: `${url}`,
					username: `${msg.author.tag}`,
					avatarURL: `${msg.author.avatarURL()}`
				})
			})}
	}

	//人設指令
	const args = msg.content.slice(prefix.length).split(' ')
	if(msg.content.startsWith(prefix) && msg.author.id === '678493512836317194'){
		if (msg.content.includes('listcharacters') || msg.content.includes('lc')){
			const embed = new MessageEmbed()
				.setColor('#c5c6c9')
				.setTitle('可用人設')
				.setDescription('1.エミリア\n2.めぐみん\n3.ニニム\n4.シエスタ\n5.シエル\n6.イレイナ\n7.Zeta\n8.レーナ')
			msg.channel.send({embeds:[embed]})
			await msg.delete()
		}else if(msg.content.includes('setcharacter') || msg.content.includes('sc')){
			if(args[1] === '1'){
				client.user.setUsername('エミリア')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964534390451490857/unknown.png')
			}else if(args[1] === '2'){
				client.user.setUsername('めぐみん')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964534908414459914/unknown.png')
			}else if(args[1] === '3'){
				client.user.setUsername('ニニム')
				client.user.setAvatar('https://cdn.discordapp.com/attachments/867034103097196544/964535108369518654/unknown.png')
			}else if(args[1] === '4'){
				client.user.setUsername('シエスタ')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964852363707953162/IMG_20220402_1134062.jpg?width=468&height=468')
			}else if(args[1] === '5'){
				client.user.setUsername('シエル')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/962620978075160586/FGo0dVpVEAAWgjS.png')
			}else if(args[1] === '6'){
				client.user.setUsername('イレイナ')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964535722457575454/unknown.png')
			}else if(args[1] === '7'){
				client.user.setUsername('Vestia Zeta')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964850615991803904/zeta.png')
			}else if(args[1] === '8'){
				client.user.setUsername('レーナ')
				client.user.setAvatar('https://media.discordapp.net/attachments/867034103097196544/964536496801591307/unknown.png')
			}
			await msg.channel.send('已變更人設')
			msg.delete()
		}else if(msg.content.includes('bomb')){
			for(let i=0; i<args[1]; i++){
				msg.channel.send(args[2])
			}
		}
	}

	//監控
	if (msg.content.includes('蒼')){
		const embed = new MessageEmbed()
			.setColor('AQUA')
			.setTitle(`${msg.author.tag}(${msg.author.id}) 在 #${msg.channel.name} 提及了蒼`)
			.setDescription(`<#${msg.channelId}> <@${msg.author.id}>\n`+ msg.content )
		client.users.fetch(config.oid).then((owner) => 
		owner.send({embeds:[embed]}))
	}

	/*if(msg.content.includes('check')){
		console.log(`check from ${msg.author.tag} in ${msg.channel.type}`)
		console.log('check')
		msg.author.send('check')
		client.users.fetch('862307742710366240').then((owner)=>
		owner.send('check'))
	}*/

	//DM
	if (msg.channel.type === 'DM'){
		if(msg.author.id === config.oid)return;
		const embed1 = new MessageEmbed()
			.setColor('#c5c6c9')
			.setTitle(`來自 ${msg.author.tag} (${msg.author.id})的訊息`)
			.setDescription(`<@${msg.author.id}>\n` + msg.content)
			.setFooter({text:`來信時間 : ${msg.createdAt.toLocaleDateString()} ${msg.createdAt.toLocaleTimeString()}`})

		if(msg.attachments.size > 0){
			msg.attachments.forEach(a=>{
				const url = a.url
				embed1.setImage(url)
			})
		}
		client.users.fetch(config.oid).then((owner)=>
		owner.send({embeds:[embed1]})
		)
	}
})

client.login(token);
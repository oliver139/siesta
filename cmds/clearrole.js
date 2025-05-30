const { SlashCommandBuilder, MessageFlags } = require('discord.js')
const { isAdmin, logTime } = require('../modules/utility')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearrole')
    .setDescription('清除身分組中的成員')
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('目標身分組')
        .setRequired(true)),

  async execute(interaction) {
    if (!isAdmin(interaction)) {
      await interaction.reply({ content: '此指令僅限管理員使用', flags: MessageFlags.Ephemeral })
      return
    }

    const targetrole = interaction.options.getRole('role')
    const allMembers = await interaction.guild.members.fetch()
    allMembers.forEach((member) => {
      if (member.roles.cache.some(role => role.id === targetrole.id)) {
        member.roles.remove(targetrole).catch(() => {
          interaction.channel.send('無法清除身分組成員，以下是可能原因 :\n1.此身分為機器人整合身分\n2.此身份位階太高')
        })
      }
    })
    await interaction.reply('已執行')

    logTime()
    console.log(`-----------------------\n${interaction.user.displayName} 清除了 ${targetrole.name} 中的成員 (${interaction.guild.name})\n-----------------------`)
  },
}

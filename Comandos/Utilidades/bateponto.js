const Discord = require("discord.js");
const moment = require("moment");
const {
  ApplicationCommandType,
  ActionRowBuilder,
  EmbedBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  name: "pausa",
  description: "Iniciar pausa.",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction, collected, options, message, reply) => {
    var canal = client.channels.cache.get(interaction.channel.id);
    let minutes = 0;
    const timer = setInterval(() => {
      minutes++;
    }, 60000); // Executa depois de 300.000 milissegundos, ou seja, depois de 5 minutos // Executa a cada 60.000 milissegundos, ou seja, a cada minuto

    let terminar = new ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setCustomId("terminar")
        .setLabel("Finalizar")
        .setStyle("Danger")
    );

    let embed = new EmbedBuilder()
      .setTitle(`Sistema de Pausa - Mutant Whats`)
      .setThumbnail(
        interaction.user.displayAvatarURL({
          format: "png",
          dinamyc: true,
          size: 4096,
        })
      )
      .setFields(
        {
          name: "Usuário:",
          value: `${interaction.user.username}\n> ${interaction.user.id}`,
          inline: false,
        },
        {
          name: "Data/Horário:",
          value: `<t:${moment(
            interaction.createdTimestamp
          ).unix()}>(<t:${parseInt(
            interaction.createdTimestamp / 1000.0000055
          )}:R>)`,
          inline: true,
        },
        {
          name: "**Informações:**",
          value: "Sua pausa ainda não foi finalizada",
          inline: true,
        }
      )
      .setColor("000000")
      .setFooter({
        text: "Ponto - Andamento",
        iconURL:
          "https://media.discordapp.net/attachments/1058066137067294811/1058070235682443285/discord_bot.png?width=683&height=683",
      });
    const msg = await canal.send({ embeds: [embed], components: [terminar] });

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
    });

    collector.on("collect", async (i) => {
      if (i.user.id != interaction.user.id) {
        if (i.user.id != interaction.user.id) {
          console.log('Você não pode fechar este ticket porque você não o abriu.');
        } else {
         console.log()
        }
      }

      if (i.customId === "terminar") {
        const terminou = new EmbedBuilder()
          .setTitle(`Sistema de Pausa - Mutant Whats`)
          .setThumbnail(
            interaction.user.displayAvatarURL({
              format: "png",
              dinamyc: true,
              size: 4096,
            })
          )
          .setFields(
            {
              name: "Usuário:",
              value: `${interaction.user.username}\n> ${interaction.user.id}`,
              inline: false,
            },
            {
              name: "Data/Horário:",
              value: `${minutes}` + " Minutos",
              inline: true,
            },
            {
              name: "**Informações:**",
              value: "Pausa Finalizada",
              inline: true,
            }
          )
          .setColor("000000")
          .setFooter({
            text: "Ponto - Encerrado",
            iconURL:
              "https://media.discordapp.net/attachments/1058066137067294811/1058070235682443285/discord_bot.png?width=683&height=683",
          });
        i.update({
          embeds: [terminou],
          components: [],
        });
      }
    });
  },
};

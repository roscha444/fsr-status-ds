#!/usr/bin/env node
const LOGGER = require("./log.js")("index");
const Discord = require("discord.js");
const axios = require("axios");

require("dotenv").config();

client = new Discord.Client()

client.on("ready", () => {
    LOGGER.info("Bot started!");
    callApiForChanges();
});

client.login(process.env.BOT_TOKEN);

const delay = ms => new Promise(res => setTimeout(res, ms));

const callApiForChanges = async () => {
    while (true) {
        await delay(10000);
        try {
            const res = await axios.get(
                process.env.API_URL,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            if (res.data.open === true) {
                setChannelName(process.env.CHANNEL_OPEN_NAME);
            } else if (res.data.open === false) {
                setChannelName(process.env.CHANNEL_CLOSED_NAME);
            }
        } catch (e) {
            LOGGER.error("Error " + e);
        }
    }
}

function setChannelName(channelName) {
    let chan = client.channels.cache.get(process.env.CHANNEL_ID);
    if(chan.name !== channelName) {
        chan.setName(channelName);
        LOGGER.info("Rename channel to " + channelName);
    }
}

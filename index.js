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
        var lastStatus;
        try {
            const res = await axios.get(
                process.env.API_URL,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            if (res.data.open === true && !lastStatus || res.data.open === true && lastStatus === undefined) {
                setChannelOpen();
                lastStatus = true;
            } else if (res.data.open === false && lastStatus || res.data.open === false && lastStatus === undefined) {
                setChannelClosed();
                lastStatus = false;
            }
        } catch (e) {
            LOGGER.error("Error " + e);
        }
    }
}

function setChannelClosed() {
    LOGGER.info("Rename channel to " + process.env.CHANNEL_CLOSED_NAME);
    var chan = client.channels.cache.get(process.env.CHANNEL_ID);
    chan.edit({ name: process.env.CHANNEL_CLOSED_NAME });
}

function setChannelOpen() {
    LOGGER.info("Rename channel to " + process.env.CHANNEL_OPEN_NAME);
    let chan = client.channels.cache.get(process.env.CHANNEL_ID);
    chan.edit({ name: process.env.CHANNEL_OPEN_NAME });
}

# fsr-status-ds

DiscordJS bot to show the status of of the Fachschaftsraum [open,closed].

# Docker

https://hub.docker.com/r/roscha444/fsr-status-ds

## environment variables:

- API_URL=https://fsr-api.dev.fs-matheinfo.de/api/v1/status

  (default)

- BOT_TOKEN=
  
  Bot token from discord dev portal

- CHANNEL_ID=
  
  Channel which is renamed from the bot

- CHANNEL_CLOSED_NAME=❌ CLOSED ❌ 

  (default)

- CHANNEL_OPEN_NAME=✅ OPEN ✅ 

  (default)

## run

docker run -d -p 80:80 -e API_SECRET=404 roscha444/fsr-status-api

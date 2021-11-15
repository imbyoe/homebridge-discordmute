# Homebridge Discord Mute
Ever wanted to mute yourself on Discord through homekit? Here's your answer!


## Quick start:
to use this plugin you have to have the [Client](https://github.com/imbyoe/homebridge-discordmute-client) Running on the machine with Discord.

then go to your homebridge machine, and run the following command:

`` npm i -g homebridge-discordmute``

and add this to your homebridge config.json file: 

```json
"accessories": [
    {
        "name": "Mute",
        "accessory": "DiscordMute",
        "type": "Mute",
        "ip_address": "127.0.0.0"
    }
]
```

## Configuration
to make Homebridge aware that you've installed a new plugin, you have to add it into your config file. Somewhere inside that file you should see a key named `accessories`.

the `type` parameter has to be either Mute or Deafen, **with** the first letter being __upper case__!

the `ip_address` parameter needs to be the ip address of the computer **with Discord** on!

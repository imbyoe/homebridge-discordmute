# Homebridge muter!
ever wanted to mute yourself on discord through homekit? here's your answer!


## Quick start:
to install the plugin please make sure you have the (Discord Mute Client)[https://motomoto.fun] Running on the machine with Discord, then
go to your homebridge machine, and run the following command:

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
the `type` parameter has to be either Mute or Deafen, **with** the first letter being __upper case__!

the `ip_address` parameter needs to be the ip address of the computer **with Discord** on!

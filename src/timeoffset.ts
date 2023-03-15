import clc from "cli-color";
import clipboard from "clipboardy";
import prompts from "prompts";
import SteamTotp from "steam-totp";
import SteamUser from "steam-user";
const user = new SteamUser();

SteamTotp.getTimeOffset((err, offset, latency) => { 
	console.log("Time offset to api.steampowered.com (seconds): " + clc.green(offset)); 
	console.log("Latency (milliseconds): " + clc.yellow(latency));
});

import clc from "cli-color";
import clipboard from "clipboardy";
import prompts from "prompts";
import SteamTotp from "steam-totp";
import SteamUser from "steam-user";
const user = new SteamUser();

var shared_secret = process.argv.slice(2)[0];
console.log("All codes will be copied to clipboard automatically."); 
setInterval(() => {
		let code = SteamTotp.generateAuthCode(shared_secret);
		clipboard.writeSync(code);
		console.log("Steam guard code: " + clc.green(code));
	}, 10000);

import clc from "cli-color";
import clipboard from "clipboardy";
import prompts from "prompts";
import SteamTotp from "steam-totp";
import SteamUser from "steam-user";
const user = new SteamUser();

prompts([
    {
        type: "text",
        name: "accountName",
        message: "What's your steam account name?",
    },
    {
        type: "password",
        name: "accountPassword",
        message: "What's your steam account password?",
    },
]).then((userPrompts) => {
    user.logOn({
        accountName: userPrompts.accountName,
        password: userPrompts.accountPassword,
    });
});

user.on("loggedOn", (r) => {
    user.enableTwoFactor((err, resp) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log("Secret received from Steam: " + resp["shared_secret"]);

        (async () => {
            const smsCode = await prompts({
                type: "text",
                name: "smsCode",
                message: "Provide SMS code you received.",
            });

            user.finalizeTwoFactor(
                resp["shared_secret"],
                smsCode.smsCode,
                (err) => {
                    if (!err) {
                        console.log(
                            clc.green(
                                "Succesfully added steam guard to your account."
                            )
                        );
                        console.log(
                            clc.blue(
                                "Your revocation code is: " +
                                    resp["revocation_code"]
                            )
                        );
                        console.log(
                            clc.green(
                                "Your shared secret: " + resp["shared_secret"]
                            )
                        );
						clipboard.writeSync(resp["shared_secret"]);
                        console.log(
                            clc.underline("Shared secret copied to clipboard!")
                        );
                        setInterval(() => {
                            let code = SteamTotp.generateAuthCode(
                                resp["shared_secret"]
                            );
                            console.log("Steam guard code: " + clc.green(code));
                        }, 10000);
                        return;
                    }
                    console.log(
                        clc.red(
                            "Error occured while trying to register new Steam guard code."
                        )
                    );
                    console.error(err);
                }
            );
        })();
    });
});

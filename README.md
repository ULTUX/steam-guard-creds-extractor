# Steam Guard credentials extractor
Simple typescript project that acts as steam guard authenticator and extracts important information.

This app was mainly designed to extract auth secret from steam so it can be used by Bitwarden TOTP,
however it can also be used as temoprary steam authenticator (only for one session). This app does not preserve state when closed, 
so **make sure you save all output produced from running this tool!**.

Data extracted by this tool:
  - Revocation code
  - Shared secret
  - Auth secret
  - Activation code (every 10 seconds)
  
# Setup instructions
Add a telephone number to your Steam account in https://store.steampowered.com/phone/manage.

Disable any [Steam Guard authenticator](https://store.steampowered.com/twofactor/manage).

Install [nodejs](https://nodejs.org).

Open a terminal and execute the following commands:


```
npm install -g typescript
npm install -g ts-node
git clone https://github.com/ULTUX/steam-guard-creds-extractor.git
cd steam-guard-creds-extractor
npm i 
```

To run the app:

```
ts-node-esm src/index.ts
```

The app will ask you for your steam \[account name\], \[password\] and the \[secret code\] received in the telephone (SMS).

```
√ What's your steam account name? ... [account name]
√ What's your steam account password? ... [password]
Secret received from Steam: [this is what you are looking for]
√ Provide SMS code you received. ... 43237
Succesfully added steam guard to your account.
Your revocation code is: [revocation code]
Your shared secret: [this is what you are looking for]
Your auth secret (for bitwarden TOTP): [secret code for bitwarden (optional)]
Auth secret copied to clipboard!
Steam activation code: 8N826
Steam activation code: 8N826
Steam activation code: XF83D
...
```

Press CTRL+C to stop and *save all this data* but Steam activation codes. A new Steam guard has been added to your account with the given shared secret. You will need the revocation code to remove it from your account in the future.

If you need to sign in later you can use the shared secret code to generate Steam guard codes, as the Steam mobile app does. Just execute the following command, passing as argument your shared secret code.

```
ts-node-esm src/guardcode.ts [your shared secret]
```

Press CTRL+C to stop the app.
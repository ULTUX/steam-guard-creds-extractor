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

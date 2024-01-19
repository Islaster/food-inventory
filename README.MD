# Inventory

created to keep track of inventory.

## Installation

Clone repo

```console
$ git clone https://github.com/Islaster/food-inventory.git
```

Install all dependancies from project

```console
$ npm i
```

to get all node_modules

You'll also to download a keyfile.json from your service account on google cloud developer

### Google Sheet API

1. **Google Cloud Console Setup:**
   - go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one.
   - Enable the Google Sheets API for your project.
2. **Creating Credentials:**
   - In the Google Cloud Console, navigate to the "Credentials" page.
   - Click "Create credentials" and choose the service account.
   - Follow the prompts to set up your credentials.
3. **Download Credentials JSON File:**
   - Once your credentials are created, download the JSON file. This file contains your client ID and secret, which are needed API access.
4. **File Placement:**
   - place file in root directory.
   - rename keyfile.json in config/google-sheets.js to your keyfile name

### Google SSO

1. **Google Cloud Console Setup:**
   - go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one.
2. **Creating Google Consent Screen**
   - From navigation menu go to API & Services
   - Go to OAuth consent screen
   - Follow prompts to set up screen
3. **Create OAuth Client ID**
   - From navigation menu go to Credentials
   - Click "Create credentials" and choose OAuth Client ID
   - Follow the prompts to set up your credentials.
4. **Save Client ID**

   - Add client ID to server/.env file under GOOGLE_CLIENT_ID.

   ```
   GOOGLE_CLIENT_ID=your client id
   ```

   or

   ```
   GOOGLE_CLIENT_ID="your client id"
   ```

## How To Run

in 2 different cmds or terminals run these 2 commands:
1st:

```console
$ cd into server
```

```console
$ run node server
```

2nd:

```console
$ cd into client
```

```console
$ run npm start
```

## Usage

localhost:3000 on chrome is the best outlook on the it

## Next Steps

1. **make google sso button bigger**
2. **Fix CSS for search bar and add button**
3. **link google account with jwt account**
4. **Add more SSOs**
5. **Add safety nets for large traffic flow**

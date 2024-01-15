# Inventory

created to keep track of inventory.


## Installation
clone repo
```console
$ git clone https://github.com/Islaster/food-inventory.git
```
```console
$ npm i
```

You'll also to download a keyfile.json from your service account on google cloud developer

1. **Google Cloud Console Setup:**
    - go to the [Google Cloud Console](https://console.cloud.google.com/)
    - Create a new project or select an existing one.
    - Enable the Google Sheets API for your project.
2. **Creating Credentials:**
    - In the Google Cloud Console, navigate to the "Credentials" page.
    - Click "Create credentials" and choose the appropriate type (e.g., OAuth client ID, Service account).
    - Follow the prompts to set up your credentials.
3. **Download Credentials JSON File:**
    - Once your credentials are created, download the JSON file. This file contains your client ID and secret, which are needed API access.
4. **File Placement:**
    - place file in root directory.
    - rename example-keyfile.json in config/google-sheets.js to your keyfile name
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

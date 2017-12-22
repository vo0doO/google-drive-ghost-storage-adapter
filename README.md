# Ghost Google Drive

This is a Google Drive storage adapter for the Ghost Blog! It allows you to host your images on your own Google Drive!

**This adapter is only for Ghost V > 1.x!**


## Installation

### Via Git

To install this storage adapter, go through the following steps:

- Create a new directory `/storage` inside `/content/adapters`
- Clone this repo to `/storage`
  ```
  cd [path/to/ghost]/content/adapters/storage
  git clone https://github.com/glur4k/google-drive-ghost-storage-adapter.git
  ```

- Install dependencies
  ```
  cd ghost-google-drive
  npm install
  ```

- Create Google service account and copy your credentials (for example, see [https://github.com/robincsamuel/ghost-google-drive#create-oauth-credentials](Robin C Samuel's repo) - credits to him)

[Optional] If you want to upload the files to a shared Google Drive folder you can follow these instructions:
- Open the `settings.json` in `/content/adapters/storage/google-drive-ghost-storage-adapter`
- Fill in the ID for `sharedFolderId` or leave it empty ("")

To get the ID of the folder just share the desired folder via Google Drive, open it and copy the ID from the URL


## Configuration

Add the following `storage` block to either your `config.production.js` our `config.development.js` and replace the `key` with your generated credentials:

```json
"storage": {
  "active": "google-drive-ghost-storage-adapter",
  "google-drive-ghost-storage-adapter": {
    "key": {
      "type": "service_account",
      "project_id": "YOUR PROJECT ID",
      "private_key_id": "YOUR PRIVATE KEY ID",
      "private_key": "YOUR PRIVATE KEY",
      "client_email": "YOUR CLIENT EMAIL",
      "client_id": "YOUR CLIENT ID",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://accounts.google.com/o/oauth2/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "YOUR CERT URL"
    }
  }
}
```


## License

Read [LICENSE](LICENSE)

Feel free to create an [issue](https://github.com/glur4k/google-drive-ghost-storage-adapter/issues), in case of troubles!

Thanks to [Robin C Samuel](https://github.com/robincsamuel/ghost-google-drive). His repo inspired this.

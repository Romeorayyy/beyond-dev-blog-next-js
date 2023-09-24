import { google } from 'googleapis';

const CREDENTIALS = {
  installed: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    project_id: process.env.GOOGLE_PROJECT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris: [process.env.GOOGLE_REDIRECT_URIS],
  },
};

const TOKEN = {
  type: process.env.GOOGLE_TYPE,
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const email = req.body.email;
      const auth = await authorize();
      await appendEmail(auth, email);
      res.status(200).send({ message: 'Email appended successfully!' });
    } catch (error) {
      console.error('Error while appending email:', error.message);
      res.status(500).send({ message: `An error occurred: ${error.message}` });
    }
  } else {
    res.status(405).send({ message: 'Only POST requests are allowed!' });
  }
}

async function appendEmail(auth, email) {
  const sheets = google.sheets({ version: 'v4', auth });
  const values = [[email]];
  const resource = {
    values: values,
  };

  return sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: process.env.GOOGLE_RANGE_NAME,
    valueInputOption: 'RAW',
    resource: resource,
  });
}

async function authorize() {
  const { OAuth2Client } = require('google-auth-library');
  const oAuth2Client = new OAuth2Client(
    CREDENTIALS.installed.client_id,
    CREDENTIALS.installed.client_secret,
    CREDENTIALS.installed.redirect_uris[0]
  );

  oAuth2Client.setCredentials({
    refresh_token: TOKEN.refresh_token,
  });

  return oAuth2Client;
}

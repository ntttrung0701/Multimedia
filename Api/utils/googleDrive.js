const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
require('dotenv').config();

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';

// Tạo OAuth2 client.
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Đọc credentials từ tệp và ủy quyền client.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content));
});

/**
 * Tạo OAuth2 client với các credentials đã cho và sau đó thực hiện callback được cung cấp.
 * @param {Object} credentials Dữ liệu xác thực client.
 */
function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Kiểm tra xem token đã lưu chưa.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
  });
}

/**
 * Lấy và lưu token mới sau khi yêu cầu quyền truy cập từ người dùng, và sau đó thực thi callback với OAuth2 client đã được ủy quyền.
 * @param {google.auth.OAuth2} oAuth2Client OAuth2 client để lấy token.
 */
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Lưu token vào đĩa để sử dụng cho lần chạy sau
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
    });
  });
}

module.exports = oAuth2Client;

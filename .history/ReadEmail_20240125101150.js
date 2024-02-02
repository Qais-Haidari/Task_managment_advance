const Imap = require('imap');
const {simpleParser} = require('mailparser');
const imapConfig = {
  user: 'youremail@gmail.com',
  password: 'secret',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
};
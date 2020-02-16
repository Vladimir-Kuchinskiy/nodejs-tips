// Cipheriv encryption

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const password = 'Good strong password for key';
const salt = crypto.randomBytes(32);
const key = crypto.scryptSync(password, salt, 32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);

let ssn = '111-000-0000';
console.log({ ssn });

let encrypted = cipher.update(ssn, 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log({ encrypted });

const decipher = crypto.createDecipheriv(algorithm, key, iv);

let decrypted = decipher.update(encrypted, 'hex', 'utf8');

decrypted = decipher.final('utf8')
console.log({ decrypted });

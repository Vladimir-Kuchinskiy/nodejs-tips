const crypto = require('crypto');

// Diffie-Hellman

const sally = crypto.createDiffieHellman(2048);
const sallyKeys = sally.generateKeys();

const bob = crypto.createDiffieHellman(sally.getPrime(), sally.getGenerator());

const bobKeys = bob.generateKeys();

const sallySecret = sally.computeSecret(bobKeys);

const bobSecret = bob.computeSecret(sallyKeys);

const str1 = sallySecret.toString('hex');
const str2 = bobSecret.toString('hex');

console.log({ sallySecret: str1 });
console.log({ bobSecret: str2 });


// Hmac

const hmac = crypto.createHmac('sha256', 'a secret');
hmac.update('some data to hash');
const hmacDigest = hmac.digest('hex');
console.log({ hmacDigest });


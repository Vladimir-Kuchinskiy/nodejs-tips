const dns = require('dns');

dns.lookup('app.pluralsight.com', (err, address) => {
  console.log({ address });
});

dns.resolve4('app.pluralsight.com', (err, address) => {
  console.log({ address });
});

dns.reverse('104.16.209.40', (err, hostnames) => {
  console.log({ hostnames });
});


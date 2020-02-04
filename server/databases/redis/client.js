const redis = require('redis');

const client = redis.createClient({
  url: 'redis://redis-12642.c135.eu-central-1-1.ec2.cloud.redislabs.com:12642'
  
});
client.auth('tRkvQDYCj6lqBABxlN0Hr1e48F75ZXnr', function(err) {
  if (err) throw err;
});

client.on('connect', function() {
  console.log('Connected to Redis');
});

client.on('error', function(err) {
  console.log(`Error ${err}`);
});

module.exports = client;

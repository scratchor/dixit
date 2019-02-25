const redis = require('redis');

const client = redis.createClient({
  url: 'redis://redis-19616.c135.eu-central-1-1.ec2.cloud.redislabs.com:19616'
});
client.auth('ggvzE5oyYBhV0ZNvhKzwP3YTyeXiAT5A', function(err) {
  if (err) throw err;
});

client.on('connect', function() {
  console.log('Connected to Redis');
});

client.on('error', function(err) {
  console.log(`Error ${err}`);
});

module.exports = client;

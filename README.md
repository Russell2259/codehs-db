<h1 align="center">CodeHS DB</h1>

Just a fun little project. Probably not going to work on it much.

Open an issue if a bug is discovered.

## Installation
````bash
$ npm install github:Russell2259/codehs-db
````

## Configuration
````javascript
import CodeHS_DB from 'codehs-db';

const DB = new CodeHS_DB('codehsdb' /*subdomain.codehs.me*/, 'new_database' /*The name of your database. If you are using a more common instance do not anticipate security*/);

DB.on('ready', async () => {
  // The tokens have been obtained
  
  DB.set('value'); // Set the value of the database
  await DB.get(); // Returns a promise with the value of the database
});
````

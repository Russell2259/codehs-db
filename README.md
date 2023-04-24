<h1 align="center">CodeHS Database</h1>

Just a fun little project. Probably not going to work on it much.

Open an issue if a bug is discovered.

## Installation
````bash
$ npm install github:Russell2259/codehs-db
````

## Configuration
A simple example
````javascript
import CodeHS_DB from 'codehs-db';

const DB = await CodeHS_DB.init('codehsdb' /*subdomain.codehs.me*/, 'new_database' /*The name of your database. Acts sort of like a file or a folder. If you are using a more common instance do not anticipate security*/);

DB.on('ready', async () => {
  // The tokens have been obtained
  
  DB.set('value'); // Set the value of the database
  console.log(await DB.get()); // Returns a promise with the value of the database
});
````

## Step by Step
1. Create an account with codehs [https://codehs.com/signup/begin](https://codehs.com/signup/begin)
2. Go to your sandbox [https://codehs.com/sandbox](https://codehs.com/sandbox)
3. From there click create program
4. Select firebase (or html)
5. Setup a server and complete the integration as show above
6. Change the subdomain parameter in the config to your project's subdomain name
7. You're done!

# TeamC-Backend

## Working Steps:
1. Setup packages/modules : npm install --save express express-validator mongoose mongoose-delete body-parser lodash bcrypt multer jsonwebtoken passport passport-local passport-jwt

2. npm init and edit the "test scripts" : ("test" : "nodemon -r ./index.js").

3. Setup Database , using NOSql(MongoDB):
- Prepare dummy data in CSV files then convert to JSON file
- Prepare dummy data in JSON files in "databases" folder.
- Create new database, in terminal: ~/<path where you keep your databases file>$ mongo, > use (DATABASE_NAME)
- Import dummy data (JSON files), in terminal: ~/<path where you keep your databases file>$ mongoimport --jsonArray --db <database name> --collection <collection name> --file <filename.json>

4. Setup connection with mongodb:
- Inside folder "models" create and code index.js file.
- Inside folder "models" create the schema files of each collection {movie,user,characters,reviews}.
  Note:
   ~ Fill the type, default value (if necessarily) and requirement {true or false} of each field.
   ~ Add mongoose plugin

5. Setup index.js file
- Import modules and routes (Comment it first until finish coding the validator and controller files).
- Use bodyParser, express.static, routes, and listen to port.

6. Routes
- Inside the 'routes' folder, create the routes file of based on the architecture designed (Based on the function and the page).
  {category, home, movie, user}

7. Middlewares: Authentication
- Inside the 'middlewares/auth' folder, create index.js and code the required authentication.
  {signup,login,profile,admin}

8. Middlewares: Validator
- Inside the 'middlewares/validators' folder, create the validators file of each routes containing different validations based on the routes requirement.

9. Controller
- Inside the 'controllers' folder, create the controllers file of each each routes containing different controllers files based on the API.

10. Run the test using "POSTMAN"

11. Create the ".gitignore" file to prevent the "node_modules/" file from being push to the git account

12. Push your file to github/gitlab project

Note: Steps below are for gitlab user.

13. Setup the instance in AWS EC2 Free-tier
- Create new instance <Launch instaces>
  ~ Select the AMI (Amazon Machine Image) <Ubuntu Server 18.04 LTS>
  ~ Choose instance type <t2.micro Free tier eligible>
  Note: If you already have the key/pem file <Next:Configure Instance Details>, if not select <Review and Launch> to create new key/pem file

  ~ Download the key/pem file
  ~ Success creating the instance

- Connect to server using terminal
  ~ in terminal ~/<path to the key/pem file>$ CHMOD 400 <pem.file>
  ~ in terminal ~/<path to the key/pem file>$ ssh -i ubuntu@<Public IPv4 address or DNS>
  ~ Success connect to Server

- Install gitlab-runner : https://docs.gitlab.com/runner/install/linux-manually.html

- Install nodejs : https://github.com/nodesource/distributions/blob/master/README.md

- Install mongo (depend on the type of databases used): https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

- Install nodemon globally, in terminal ~$ sudo npm install -g forever nodemon mocha

- Create the folder where you will upload your project: in terminal ~$ sudo mkdir -p /var/www/mini-project

- Permit gitlab-runner to read/write/execute the folder:
in terminal ~$ sudo setfacl -m user:gitlab-runner:rwx /var/www/mini-project

- Register the gitlab-runner from the server connecting gitlab project, in terminal ~$ sudo gitlab-runner register
  ~ Enter the gitlab-ci coordinator URL : https://gitlab.com/
  ~ Enter the gitlab-ci token: <in your gitlab project Settings > CI/CD > Runners section
  ~ Enter the gitlab-cit description: mini-project
  ~ Enter the gitlab-ci tags: mini-project
  ~ Enter the executor : shell

14. CI/CD Deployment
- Create the ".gitlab-ci.yml" file and code based on requirement, (can follow directly the one in slide as it is the simpliest one and accomodate to the above coding style).

15. Run the test using "POSTMAN" using the IP from the server one more time.


16. Unit Testing using mocha chai chai-http
- Install npm package: npm install --save-dev mocha chai chai-http
- Edit the scripts:
  "test" : "mocha ./tests/*.js --exit"
  "dev" : "nodemon -r ./index.js"
- Create folder "tests" and the test.js file of each route inside the folder.
- Exports app or express() in index.js file
- Create the tester file in "tests" folder

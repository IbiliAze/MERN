///////////////////////////////////////////////////////////////////////////////////MODULES
const mongoose = require('mongoose');
const chalk = require('chalk');
//////////////////////////////////////////////////////////////////////////////////////////

const connectionURL = `mongodb://${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`;

console.log(`Connecting to ${connectionURL}`);
mongoose.connect(
  connectionURL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      return console.log(`Connection error: ${error}`);
    }
    console.log(`${chalk.bold.green('Successful')} MongoDB Connection: at [ ${chalk.bold.blue(connectionURL)} ]`);
  }
);

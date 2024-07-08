const mongoose = require('mongoose');

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  };
  try {
    mongoose.connect(process.env.DB);
    //	change

    console.log('Connected to database successfully');
  } catch (error) {
    console.log(error);
    console.log('Could not connect database!');
  }
};

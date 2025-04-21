import 'dotenv/config';
import app from './app';
import dbConnect from './config/dbConnect';

const PORT = 5333;

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

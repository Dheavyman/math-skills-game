import path from 'path';
import express from 'express';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

app.set('port', process.env.PORT || 5500);

app.listen(app.get('port'), (error) => {
  if (error) {
    console.log(error.message); // eslint-disable-line no-console
  }
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${app.get('port')}`);
});

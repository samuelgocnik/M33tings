import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const app = express();
const port = 4000;

// automatically parse every sent object
app.use(express.json());
app.use(cors());

const db = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'm33tings',
  port: 5432,
  connectionTimeoutMillis: 2000,
});

console.log(db.totalCount, db.idleCount);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello consumer!' });
});

app.post('/login', (req: Request, res: Response) => {
  const username = req.body.username;
  const pwd = req.body.pwd;

  db.query(
    'SELECT * FROM users WHERE name = $1 AND pwd = $2',
    [username, pwd],
    (error, result) => {
      if (error) {
        res.status(404).json({ error });
        return;
      }
      if (result.rowCount > 0) {
        res.json(result.rows);
      } else {
        res.json({ message: 'Wrong name or password!' });
      }
    }
  );
});

app.post('/register', (req: Request, res: Response) => {
  const username = req.body.username;
  const pwd = req.body.pwd;

  bcrypt.hash(pwd, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      res.status(404).json({ message: 'Hash error occured' });
      return;
    }

    db.query(
      'INSERT INTO users (name, pwd) VALUES ($1, $2)',
      [username, hash],
      (error, result) => {
        if (error) {
          res.status(404).json({ error });
          return;
        }
        res.json(result);
      }
    );
  });
});

app.get('/events', (req: Request, res: Response) => {
  db.query('SELECT * FROM event', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json({ result: results.rows });
  });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

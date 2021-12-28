import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const saltRounds = 10;
const app = express();
const port = 4000;

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: {} | null };
  }
}

// automatically parse every sent object
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(function (req: Request, res: Response, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(cookieParser());
//important line, always put it here, otherwise it won't work
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: 'user',
    secret: 'thisismysecrctekeyfhrgfgrfrty84fw2i3ohfdhibenqdownmcwncir767', // a random unique string key used to authenticate a session, Can't be exposed to the public
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
      // secure: true,   // uncomment for production
      maxAge: 1000 * 60 * 60 * 12, // lasts for 12h, default is 'session' -> cookie will last until closing browser etc.
    },
  })
);

const db = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'm33tings',
  port: 5432,
  connectionTimeoutMillis: 2000,
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello consumer!' });
});

app.get('/logout', (req: Request, res: Response) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res.send({ message: 'Logout error' });
      }
      req.session = null;
      res.clearCookie('user', { path: '/' });
      res.send({ clearSession: 'success' });
    });
  } else {
    res.status(404).json();
  }
});

app.get('/login', (req: Request, res: Response) => {
  if (req.session.user) {
    console.log('logged');
    res.json({
      loggedIn: true,
      user: {
        id: req.session.user.id,
        name: req.session.user.name,
        picture: req.session.user.picture,
        created_at: req.session.user.created_at,
      },
    });
  } else {
    console.log('not logged');
    res.json({ loggedIn: false, user: null });
  }
});

app.post('/login', (req: Request, res: Response) => {
  const username = req.body.username;
  const pwd = req.body.pwd;

  db.query(
    'SELECT * FROM users WHERE name = $1',
    [username],
    (error, result) => {
      if (error) {
        res.status(404).json(error);
        return;
      }

      if (result.rowCount > 0) {
        bcrypt.compare(pwd, result.rows[0].pwd, (err, same) => {
          if (err) {
            res.status(404).json(err);
            return;
          }
          if (same) {
            // create user's session
            req.session.user = {
              id: result.rows[0].id,
              name: result.rows[0].name,
              picture: result.rows[0].picture,
              created_at: result.rows[0].created_at,
            };
            res.json(req.session.user);
          } else {
            res.json({ message: 'Wrong password!' });
          }
        });
      } else {
        res.json({ message: "User doesn't exist!" });
      }
    }
  );
});

// returning ID of newly registered user
// in db has to be at least one user for correct working
app.post('/register', (req: Request, res: Response) => {
  const username = req.body.username;
  const pwd = req.body.pwd;

  bcrypt.hash(pwd, saltRounds, (error, hash) => {
    if (error) {
      res.status(404).json(error);
      return;
    }

    db.query(
      'INSERT INTO users (name, pwd) ' +
        'SELECT $1, $2 ' +
        'FROM users ' +
        'WHERE NOT EXISTS( ' +
        'SELECT id ' +
        'FROM users ' +
        'WHERE name = $1 ' +
        ') ' +
        'LIMIT 1',
      [username, hash],
      (err, result) => {
        if (err) {
          res.status(404).json(err);
          return;
        }
        if (result.rowCount == 0) {
          res.json({ message: 'User already exists!', result: result });
        } else {
          res.status(201).json(result);
        }
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

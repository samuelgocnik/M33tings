"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const saltRounds = 10;
const app = (0, express_1.default)();
const port = 4000;
// automatically parse every sent object
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use((0, cookie_parser_1.default)());
//important line, always put it here, otherwise it won't work
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    name: 'user',
    secret: 'thisismysecrctekeyfhrgfgrfrty84fw2i3ohfdhibenqdownmcwncir767',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'none',
        // secure: true,   // uncomment for production
    },
}));
const db = new pg_1.Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'm33tings',
    port: 5432,
    connectionTimeoutMillis: 2000,
});
app.get('/', (req, res) => {
    res.json({ message: 'Hello consumer!' });
});
app.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                return res.send({ message: 'Logout error' });
            }
            req.session = null;
            res.clearCookie('user', { path: '/' });
            res.send({ clearSession: 'success' });
        });
    }
    else {
        res.status(404).json();
    }
});
app.get('/login', (req, res) => {
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
    }
    else {
        console.log('not logged');
        res.json({ loggedIn: false, user: null });
    }
});
app.post('/login', (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;
    db.query('SELECT * FROM users WHERE name = $1', [username], (error, result) => {
        if (error) {
            res.status(404).json(error);
            return;
        }
        if (result.rowCount > 0) {
            bcrypt_1.default.compare(pwd, result.rows[0].pwd, (err, same) => {
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
                }
                else {
                    res.json({ message: 'Wrong password!' });
                }
            });
        }
        else {
            res.json({ message: "User doesn't exist!" });
        }
    });
});
// returning ID of newly registered user
// in db has to be at least one user for correct working
app.post('/register', (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;
    bcrypt_1.default.hash(pwd, saltRounds, (error, hash) => {
        if (error) {
            res.status(404).json(error);
            return;
        }
        db.query('INSERT INTO users (name, pwd) ' +
            'SELECT $1, $2 ' +
            'FROM users ' +
            'WHERE NOT EXISTS( ' +
            'SELECT id ' +
            'FROM users ' +
            'WHERE name = $1 ' +
            ') ' +
            'LIMIT 1', [username, hash], (err, result) => {
            if (err) {
                res.status(404).json(err);
                return;
            }
            if (result.rowCount == 0) {
                res.json({ message: 'User already exists!', result: result });
            }
            else {
                res.status(201).json(result);
            }
        });
    });
});
app.get('/events', (req, res) => {
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
//# sourceMappingURL=app.js.map
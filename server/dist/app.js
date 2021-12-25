"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 4000;
// automatically parse every sent object
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const db = new pg_1.Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'm33tings',
    port: 5432,
    connectionTimeoutMillis: 2000,
});
console.log(db.totalCount, db.idleCount);
app.get('/', (req, res) => {
    res.json({ message: 'Hello consumer!' });
});
app.post('/login', (req, res) => {
    const username = req.body.username;
    const pwd = req.body.pwd;
    db.query('SELECT * FROM users WHERE name = $1 AND pwd = $2', [username, pwd], (error, result) => {
        if (error) {
            res.status(404).json({ error });
            return;
        }
        if (result.rowCount > 0) {
            res.json(result);
        }
        else {
            res.json({ message: 'Wrong name or password!' });
        }
    });
});
app.post('/register', (req, res) => {
    console.log('register!!');
    const username = req.body.username;
    const pwd = req.body.pwd;
    db.query('INSERT INTO users (name, pwd) VALUES ($1, $2)', [username, pwd], (error, result) => {
        if (error) {
            res.status(404).json({ error });
            return;
        }
        res.json(result);
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
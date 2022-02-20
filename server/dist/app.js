"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const logging_1 = __importDefault(require("./config/logging"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./routes/user"));
const event_1 = __importDefault(require("./routes/event"));
const NAMESPACE = "Server";
const port = config_1.default.server.port;
const host = config_1.default.server.hostname;
const origin = config_1.default.origin;
const app = (0, express_1.default)();
/** Logging the request */
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    // when response is send
    res.on("finish", () => {
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});
/** Parse the request */
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
/** Api rules */
app.use((0, cors_1.default)({
    origin,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}));
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", origin); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/** Routes */
app.use("/users", user_1.default);
app.use("/events", event_1.default);
/** Error handling */
app.use((_req, res, _next) => {
    const err = new Error("not found");
    return res.status(404).json({
        message: err.message,
    });
});
/** Create the server */
app.listen(port, host, () => {
    logging_1.default.info(NAMESPACE, `Express is listening at http://${host}:${port}`);
});
// declare module "express-session" {
//   export interface SessionData {
//     user: { [key: string]: {} | null };
//   }
// }
// // automatically parse every sent object
// app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
// app.use(function (req: Request, res: Response, next) {
//   res.header("Access-Control-Allow-Origin", process.env.ORIGIN); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.use(cookieParser());
// //important line, always put it here, otherwise it won't work
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   session({
//     name: "user",
//     secret: "thisismysecrctekeyfhrgfgrfrty84fw2i3ohfdhibenqdownmcwncir767", // a random unique string key used to authenticate a session, Can't be exposed to the public
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       sameSite: "none",
//       // secure: true,   // uncomment for production
//       maxAge: 1000 * 60 * 60 * 12, // lasts for 12h, default is 'session' -> cookie will last until closing browser etc.
//     },
//   })
// );
// // verifying if provided token is valid
// const verifyJWT = (req: Request, res: Response, next) => {
//   const token: string = req.headers["x-access-token"].toString();
//   if (!token) {
//     res.json({ auth: false, message: "No authentication token was provided!" });
//     return;
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       res.json({ auth: false, message: "Authentication failed" });
//       return;
//     }
//     res.locals.userId = decoded.id;
//     next();
//   });
// };
// app.get("/auth/logout", (req: Request, res: Response) => {
//   if (req.session.user) {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.send({ message: "Logout error" });
//       }
//       req.session = null;
//       res.clearCookie("user", { path: "/" });
//       res.send({ clearSession: "success" });
//     });
//   } else {
//     res.status(404).json();
//   }
// });
// app.get("/auth/login", (req: Request, res: Response) => {
//   if (req.session.user) {
//     res.json({
//       loggedIn: true,
//       user: {
//         id: req.session.user.id,
//         name: req.session.user.name,
//         picture: req.session.user.picture,
//         created_at: req.session.user.created_at,
//       },
//     });
//   } else {
//     res.json({ loggedIn: false, user: null });
//   }
// });
// app.post("/auth/login", (req: Request, res: Response) => {
//   const username: string = req.body.username;
//   const pwd: string = req.body.pwd;
//   if (username.length < 4 || username.length > 32 || pwd.length < 6) {
//     res.json({ message: "Invalid username or password" });
//     return;
//   }
//   db.query(
//     "SELECT * FROM users WHERE name = $1",
//     [username],
//     (error, result) => {
//       if (error) {
//         res.status(404).json(error);
//       }
//       if (result.rowCount > 0) {
//         bcrypt.compare(pwd, result.rows[0].pwd, (err, same) => {
//           if (err) {
//             res.status(404).json(err);
//           }
//           if (same) {
//             // create token
//             const id = result.rows[0].id;
//             const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//               expiresIn: 300,
//             });
//             // create user's session
//             req.session.user = {
//               id: result.rows[0].id,
//               name: result.rows[0].name,
//               picture: result.rows[0].picture,
//               created_at: result.rows[0].created_at,
//             };
//             res.json({
//               auth: true,
//               token: token,
//               message: null,
//               result: req.session.user,
//             });
//           } else {
//             res.json({
//               auth: false,
//               token: null,
//               message: "Wrong password!",
//               result: null,
//             });
//           }
//         });
//       } else {
//         res.json({ message: "User doesn't exist!" });
//       }
//     }
//   );
// });
// // returning ID of newly registered user
// // in db has to be at least one user for correct working
// app.post("/auth/register", (req: Request, res: Response) => {
//   const username: string = req.body.username;
//   const pwd: string = req.body.pwd;
//   if (username.length < 4 || username.length > 32 || pwd.length < 6) {
//     res.json({ message: "Invalid username or password" });
//     return;
//   }
//   bcrypt.hash(pwd, saltRounds, (error, hash) => {
//     if (error) {
//       res.status(404).json(error);
//       return;
//     }
//     db.query(
//       "INSERT INTO users (name, pwd) " +
//         "SELECT $1, $2 " +
//         "FROM users " +
//         "WHERE NOT EXISTS( " +
//         "SELECT id " +
//         "FROM users " +
//         "WHERE name = $1 " +
//         ") " +
//         "LIMIT 1",
//       [username, hash],
//       (err, result) => {
//         if (err) {
//           res.status(404).json(err);
//           return;
//         }
//         if (result.rowCount == 0) {
//           res.json({ message: "User already exists!", result: result });
//         } else {
//           res.json(result);
//         }
//       }
//     );
//   });
// });
// app.get("/events", verifyJWT, (req: Request, res: Response) => {
//   db.query("SELECT * FROM event", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(201).json({ result: results.rows });
//   });
// });
//# sourceMappingURL=app.js.map
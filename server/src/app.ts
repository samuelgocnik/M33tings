import express, { NextFunction, Request, Response } from "express";
import config from "./config/config";
import logging from "./config/logging";

import cors from "cors";
import bodyParser from "body-parser";
import usersRouter from "./routes/user";
import eventsRouter from "./routes/event";
import participantRouter from "./routes/participant";

const NAMESPACE = "Server";
const port: number = config.server.port as number;
const host: string = config.server.hostname;
const origin: string = config.origin;

const app = express();

/** Logging the request */
app.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );

  // when response is send
  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });
  next();
});

/** Parse the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Api rules */
app.use(
  cors({
    origin,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", origin); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/** Routes */
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/participant", participantRouter);

/** Error handling */
app.use((_req: Request, res: Response, _next: NextFunction) => {
  const err = new Error("not found");
  return res.status(404).json({
    message: err.message,
  });
});

/** Create the server */
app.listen(port, host, () => {
  logging.info(NAMESPACE, `Express is listening at http://${host}:${port}`);
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

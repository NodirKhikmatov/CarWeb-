import ConnectMongoDB from "connect-mongodb-session";
import {MORGAN_FORMAT} from "./libs/config";
import {T} from "./libs/types/common";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
//for building sessions
import session from "express-session";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions", //mongo collection
});

// console.log("_dirname:", __dirname);

/** 1-entrance */
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({extended: true})); //htmlni handle qilish tradition api orqali
app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

/** 2-sessions */

//req DB

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 6, //3hours
    },
    store: store,
    resave: true,
    saveUninitialized: true, //save uninitialized sessions to the store
  })
);
//+req.session
app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member; //global tarzda local variable  yaratish ejga for send data
  next();
});

/** 3-views */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-routers */

app.use("/admin", routerAdmin); //SSR: EJS
app.use("/", router); //SPA, REACT

export default app;

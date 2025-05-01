import ConnectMongoDB from "connect-mongodb-session";
import { MORGAN_FORMAT } from "./libs/config";
import { T } from "./libs/types/common";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import session from "express-session";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

/** 1-entrance */
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //htmlni handle qilish tradition api orqali
app.use(express.json());
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

/** 2-sessions */

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

/** 3-views */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4router */
app.use("/admin", routerAdmin); //EJS
app.use("/", router); //Spa:React

export default app;

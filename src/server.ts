import "./env"; // <-- run dotenv config first

import app from "./app";
import mongoose from "mongoose";

// rest of your server code here


if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI as string,{})
  .then((data) => {
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(console.error);

import { connectToDb } from "@config/db";
import { swaggerDocs } from "@config/swagger";
import * as cors from "cors"; 
import * as express from "express";
import * as swaggerUi from "swagger-ui-express";

import routes from "./routes"; 

export const app = express();

app.use(cors());
 
app.use(express.json());

connectToDb();

app.use(routes);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
import { createConnection } from "typeorm";

export const connectToDb = async (): Promise<void> => {
  const conection = await createConnection();
  console.log(`App connected to db ${conection.options.database}`);

  process.on("SIGINT", () => {
    conection.close();
    console.log("DB connection closed");
  });
};
import dotenv from "dotenv";
import pl from "../db/db-connection.js";
dotenv.config();

// Generic logic for GET request for table metadata or categories
export const getMetadata = async (req, res) => {
  try {
    const db = await pl.connect();
    const result = await db.query("SELECT * FROM metadata");
    res.json(result.rows);
  } catch (err) {
    console.error("Error querying table:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", detail: err.message });
  }
};

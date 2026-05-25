import dotenv from "dotenv";
import pl from "../db/db-connection.js";
dotenv.config();

// Helper to generate a generic query based on search input
function getQuery(searchInput) {
  if (searchInput) {
    const query = {
      text: "SELECT * FROM public.items WHERE item_name=$1",
      values: [searchInput],
    };
    return query;
  } else {
    return "SELECT * FROM items";
  }
}

// Generic logic for GET request
export const getItems = async (req, res) => {
  const searchInput = req.query.searchInput;
  try {
    const db = await pl.connect();
    const result = await db.query(getQuery(searchInput));
    res.json(result.rows);
    console.log("GET QUERY EXECUTED SUCCESSFULLY");
  } catch (err) {
    console.error("Error querying table:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", detail: err.message });
  }
};

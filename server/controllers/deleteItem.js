import dotenv from "dotenv";
import pl from "../db/db-connection.js";
dotenv.config();

// Generic logic for DELETE request for selected item with endpoint '/items/:id'
export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const db = await pl.connect();
    await db.query("DELETE FROM items WHERE id=$1", [itemId]);
    res.status(200).end();
  } catch (err) {
    console.error("Error deleting item from DB:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", detail: err.message });
  }
};

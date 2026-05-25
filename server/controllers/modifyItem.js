import dotenv from "dotenv";
import pl from "../db/db-connection.js";
dotenv.config();

// Generic logic for PATCH request to modify an item
export const modifyItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { item_name, description, status } = req.body;

    const db = await pl.connect();
    const result = await db.query(
      `UPDATE items SET item_name=$1, description=$2, status=$3 WHERE id=$4 RETURNING *`,
      [item_name, description, status, itemId],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating item in DB:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", detail: err.message });
  }
};

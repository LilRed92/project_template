import dotenv from "dotenv";
import pl from "../db/db-connection.js";
dotenv.config();

// Generic logic for PUT request to toggle status
export const toggleItemStatus = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { status } = req.body;
    const db = await pl.connect();
    const result = await db.query(
      `UPDATE items SET status=$1 WHERE id=$2 RETURNING *`,
      [status, itemId],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error toggling item status in DB:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", detail: err.message });
  }
};

import dotenv from "dotenv";
import pl from "../db/db-connection.js";
dotenv.config();

// Generic logic for POST request to add an item via endpoint '/items'
export const createItem = async (req, res) => {
  try {
    const newItem = {
      item_name: req.body.itemName,
      metadata_id: req.body.metadataId || 1,
      description: req.body.description,
      status: req.body.status || false,
    };
    const db = await pl.connect();
    const result = await db.query(
      `INSERT INTO items(item_name, metadata_id, description, status) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        newItem.item_name,
        newItem.metadata_id,
        newItem.description,
        newItem.status,
      ],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting into DB:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", detail: err.message });
  }
};

import express from "express";
import { getItems } from "../controllers/getItems.js";
import { createItem } from "../controllers/createItem.js";
import { modifyItem } from "../controllers/modifyItem.js";
import { toggleItemStatus } from "../controllers/toggleItemStatus.js";
import { deleteItem } from "../controllers/deleteItem.js";
import { getMetadata } from "../controllers/getMetadata.js";

const route = express.Router();

route.get("/", (req, res) => {
  res.json({ message: "Generic API Template Root" });
});

// Standard CRUD REST API structure templates
route.get("/items", getItems);
route.get("/items/:id", getItems);
route.post("/items", createItem);
route.patch("/items/:id", modifyItem);
route.put("/items/:id/status", toggleItemStatus);
route.delete("/items/:id", deleteItem);
route.get("/metadata", getMetadata);

export default route;

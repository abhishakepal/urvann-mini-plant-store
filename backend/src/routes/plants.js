import express from "express";
import { z } from "zod";
import Plant from "../models/Plant.js";

const router = express.Router();

// Validation schema
const PlantInput = z.object({
  name: z.string().min(2).max(80),
  price: z.number().nonnegative(),
  categories: z.array(z.string().min(2)).min(1),
  inStock: z.boolean(),
  image: z.string().url().or(z.literal("")).optional()
});

// GET /api/plants?search=&category=&inStock=&page=1&limit=12&sort=price:asc
router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      inStock = "",
      page = "1",
      limit = "12",
      sort = "createdAt:desc"
    } = req.query;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit) || 12, 1), 100);

    const query = {};

    if (search) {
      // search by name OR category keyword (case-insensitive)
      const rx = new RegExp(search, "i");
      query.$or = [{ name: rx }, { categories: rx }];
    }

    if (category) {
      // exact filter by category
      query.categories = { $in: [new RegExp(`^${category}$`, "i")] };
    }

    if (inStock === "true" || inStock === "false") {
      query.inStock = inStock === "true";
    }

    // sorting
    let sortObj = { createdAt: -1 };
    if (sort) {
      const [field, dir] = String(sort).split(":");
      if (field) {
        sortObj = { [field]: dir === "asc" ? 1 : -1 };
      }
    }

    const [items, total] = await Promise.all([
      Plant.find(query).sort(sortObj).skip((pageNum - 1) * pageSize).limit(pageSize),
      Plant.countDocuments(query)
    ]);

    res.json({
      page: pageNum,
      limit: pageSize,
      total,
      pages: Math.ceil(total / pageSize),
      items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET distinct categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Plant.distinct("categories");
    // Normalize & sort
    const unique = [...new Set(categories.map(c => c.trim()))].sort((a, b) => a.localeCompare(b));
    res.json(unique);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/plants (admin)
router.post("/", async (req, res) => {
  try {
    const parsed = PlantInput.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    }
    const plant = await Plant.create(parsed.data);
    res.status(201).json(plant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/plants/:id
router.get("/:id", async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ error: "Not found" });
    res.json(plant);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid id" });
  }
});

export default router;

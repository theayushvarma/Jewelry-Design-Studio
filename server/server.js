import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// ✅ Load diamonds from db.json
const getDiamonds = () => {
  const data = fs.readFileSync("db.json", "utf8");
  return JSON.parse(data).diamonds;
};
const getSettings = () => {
  const data = fs.readFileSync("db.json", "utf8");
  return JSON.parse(data).settings;
};

app.post("/api/diamonds", (req, res) => {
  const { page = 1, limit = 10, filters = {}, id } = req.body;
  let data = getDiamonds();

  // ✅ 0. If "id" is present, ignore filters and return that diamond
  if (id) {
    const diamond = data.find((d) => String(d.id) === String(id));
    if (!diamond) {
      return res.status(404).json({ message: "Diamond not found" });
    }
    return res.json({
      total: 1,
      page: 1,
      limit: 1,
      data: [diamond],
    });
  }

  // ✅ Extract sorting values if present
  const { sort_field, sort_order, ...activeFilters } = filters;

  // ✅ 1. Apply filters (excluding sort keys)
  Object.entries(activeFilters).forEach(([key, value]) => {
    if (!value) return;

    // Handle range filters like "carat": "6.38-29.98"
    if (typeof value === "string" && value.includes("-")) {
      const [min, max] = value.split("-").map((v) => parseFloat(v));
      if (!isNaN(min) && !isNaN(max)) {
        data = data.filter(
          (item) => Number(item[key]) >= min && Number(item[key]) <= max
        );
      }
      return;
    }

    // Convert comma-separated strings to array
    let filterValues = [];
    if (Array.isArray(value)) {
      filterValues = value;
    } else if (typeof value === "string") {
      filterValues = value.split(",").map((v) => v.trim().toLowerCase());
    } else {
      filterValues = [String(value).toLowerCase()];
    }

    // Boolean filters
    if (typeof value === "boolean") {
      data = data.filter((item) => Boolean(item[key]) === value);
    } else if (filterValues.length > 0) {
      data = data.filter((item) =>
        filterValues.includes(String(item[key]).toLowerCase())
      );
    }
  });

  // ✅ 2. Sorting (inside filters)
  if (sort_field) {
    data = data.sort((a, b) => {
      const aVal = a[sort_field];
      const bVal = b[sort_field];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sort_order === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sort_order === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }

  // ✅ 3. Pagination
  const total = data.length;
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + Number(limit));

  res.json({
    total,
    page: Number(page),
    limit: Number(limit),
    data: paginated,
  });
});

app.post("/api/settings", (req, res) => {
  const { page = 1, limit = 10, filters = {}, id } = req.body;
  let data = getSettings();

  if (filters.shape) {
    const shapeFilter = filters.shape.toLowerCase().trim();
    data = data.filter((item) => {
      if (!item.shape) return false;
      const shapes = item.shape
        .toLowerCase()
        .split(",")
        .map((s) => s.trim());
      return shapes.includes(shapeFilter);
    });
  }

  const total = data.length;
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + Number(limit));

  res.json({
    total,
    page: Number(page),
    limit: Number(limit),
    data: paginated,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Diamond Filter API running at http://localhost:${PORT}`);
});

import { query } from "../config/db.js";

const CategoryModel = {
  async create(name) {
    const { rows } = await query(
      `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
      [name]
    );
    return rows[0];
  },

  async findAll() {
    const { rows } = await query(
      `SELECT id, name, created_at FROM categories ORDER BY created_at DESC`
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await query(
      `SELECT id, name, created_at FROM categories WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  },

  async update(id, name) {
    const { rows } = await query(
      `UPDATE categories SET name = $1 WHERE id = $2 RETURNING *`,
      [name, id]
    );
    return rows[0];
  },

  async delete(id) {
    const { rows } = await query(
      `DELETE FROM categories WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
  },
};

export default CategoryModel;

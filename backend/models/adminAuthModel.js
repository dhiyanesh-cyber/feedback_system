import db from "../config/database.js";

class AdminModel {
  static async findByUsernameAndPassword(username, password) {
    const query = "SELECT * FROM admin WHERE admin_username = ? AND admin_pass = ?";
    const [result] = await db.query(query, [username, password]);

    return result.length > 0 ? result[0] : null;
  }
}

export default AdminModel;

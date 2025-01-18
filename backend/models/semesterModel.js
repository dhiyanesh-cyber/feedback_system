import db from "../config/database.js"

class Semester {
    static async findSemester() {
        const query = "SELECT * FROM smester";
        const [result] = await db.query(query);
    
        return result.length > 0 ? result[0] : null;
      }
}

export default Semester;
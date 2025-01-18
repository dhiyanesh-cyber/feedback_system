import db from "../config/database.js"

class Semester {
    static async findSemester() {
        const query = "SELECT * FROM semester";
        const [result] = await db.query(query);
    
        return result.length > 0 ? result[0].semester : null;
      }
}

export default Semester;
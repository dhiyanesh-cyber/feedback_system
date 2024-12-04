import db from "../config/database.js"

class SubjectModel {
    static async getSubjectName(sub_code) {
        try {
          if (!sub_code) {
            throw new Error("All parameters must be provided");
          }
    
          const [subjectName] = await db.execute(
            "SELECT * FROM subject_details WHERE sub_code = ? ",
            [sub_code]
          );
    
          return subjectName;
        } catch (error) {
          console.error("Error fetching subjectName:", error);
          throw error;
        }
      }
}


export default SubjectModel;
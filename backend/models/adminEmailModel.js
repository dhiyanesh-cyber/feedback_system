import db from "../config/database.js";


class AdminEmailModel {
    static async findByEmail(email) {
        try {
            const [result] = await db.execute(
                "SELECT * FROM admin_emails WHERE email = ?",
                [email]
            );


            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error querying admin email : ", error)
            throw new Error("Database query failed");
        }
    }
}


export default AdminEmailModel;
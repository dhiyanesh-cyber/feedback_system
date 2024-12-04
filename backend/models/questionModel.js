import  db  from '../config/database.js';

class Question {

  static async findAll() {
    const [questions] = await db.execute(
        'SELECT * FROM questions'
      );
      return questions;
  }
}

export default Question;
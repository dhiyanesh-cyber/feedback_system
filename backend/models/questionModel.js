import  db  from '../config/database.js';

class Question {

  static async findAll() {
    const [questions] = await db.execute(
        'SELECT * FROM questions'
      );
      return questions;
  }

  static async findById(id) {
    const [question] = await db.execute(
        'SELECT * FROM questions WHERE question_id = ?',
        [id]
      );
      return question[0];
  }
}

export default Question;
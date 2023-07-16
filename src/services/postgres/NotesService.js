const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, title, body, tags, createdAt, updatedAt],
    };

    const result= this._pool.query(query);

    if (!result.row[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return result.row[0].id;
  }
}

// 1. app.js make a connection to the database
const sqlite3 = require('sqlite3').verbose();

// 2. create a database
const db = new sqlite3.Database(':memory:');

// . create a tabel
db.serialize(() => {
    db.run('CREATE TABLE Works (id INT, composer TEXT, title TEXT)');

    // 4. insert some data
    const stmt = db.prepare('INSERT INTO Works VALUES (?, ?, ?)');
    stmt.run(101, 'Beethoven ', 'Symphony No. 5'); // 공백 + 소문자
    stmt.run(202, 'MOZART', 'Eine kleine Nachtmusik'); // 전부 대문자
    stmt.run(303, 'Bach, J.S.', 'cello suite no.1'); // 제각각인 이름
    stmt.finalize();

    console.log('Data inserted successfully');

});
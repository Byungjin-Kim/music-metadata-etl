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

// 5. [select] 데이터 한 줄씩 꺼내오기
console.log("----------------- Select all works -----------------");
console.log("clean Database");
console.log("------------------ Select all works -----------------");

db.each("SELECT rowid AS id, composer, title FROM Works", (err, row) => {
    // row: 데이터베이스에서 꺼낸 한 줄 (Object)
    //[Before] 원래 데이터 출력
    console.log(`❌ 원본: [${row.id}] ${row.composer} - ${row.title}`);

    //[After] 데이터 정제 후 출력
    // A. 공백 제거(trim): 앞뒤 공백 제거
    let cleanComposer = row.composer.trim();
    // B. 작곡가 이름 통일 (Normalization)
    if (cleanComposer.toLowerCase().includes('bach')) {
        cleanComposer = 'Bach, Johann Sebastian';
    } else if (cleanComposer.toLowerCase().includes('beethoven')) {
        cleanComposer = 'Beethoven, Ludwig van';
    } else if (cleanComposer.toLowerCase().includes('mozart')) {
        cleanComposer = 'Mozart, Wolfgang Amadeus';
    }
    // [After] 청소된 데이터 출력
    console.log(`✅ 청소된 데이터: [${row.id}] ${cleanComposer} - ${row.title}`);

    // 7. 데이터 정제 후 업데이트
    db.run(`UPDATE Works SET composer = ? WHERE rowid = ?`, [cleanComposer, row.id], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Updated row ${row.id} with cleaned composer name.`);
    });
});

db.close();

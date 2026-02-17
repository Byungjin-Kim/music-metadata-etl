// 1. 필요한 도구 가져오기 (Express 웹 서버, SQLite3 데이터베이스)
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

// 2. 서버 설정
const app = express();
const PORT = 3000;

// 3. music.db 연결 (이미 app.js에서 생성한 데이터베이스 파일을 사용)
const db = new sqlite3.Database('./music.db');



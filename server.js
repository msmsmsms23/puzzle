const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로로 접속시 index.html을 보여줌
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'puzzle.html'));
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

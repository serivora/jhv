const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MongoDB 연결
mongoose.connect('mongodb://localhost/vacationDB', { useNewUrlParser: true, useUnifiedTopology: true });

// 휴가 신청 스키마 정의
const vacationSchema = new mongoose.Schema({
  employeeNumber: String,
  employeeName: String,
  vacationDate: Date
});

// 휴가 신청 모델 생성
const Vacation = mongoose.model('Vacation', vacationSchema);

// Express 앱 생성
const app = express();

// body-parser 미들웨어 사용
app.use(bodyParser.json());

// 휴가 신청 API 엔드포인트
app.post('/vacations', (req, res) => {
  const newVacation = new Vacation(req.body);
  newVacation.save((err, vacation) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(vacation);
  });
});

// 서버 시작
app.listen(3000, () => console.log('Server is running on port 3000'));

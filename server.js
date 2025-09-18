const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://santhoshqq42_db_user:16S5Y6AhdKS3ba65@cluster0123.2r5ihzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0123');

const AttendanceSchema = new mongoose.Schema({
  studentId: String,
  session: String,
  time: String
});
const Attendance = mongoose.model('Attendance', AttendanceSchema);

// Mark attendance
app.post('/api/attendance', async (req, res) => {
  const { studentId, session } = req.body;
  if (!studentId || !session) return res.status(400).send('Missing fields');
  const exists = await Attendance.findOne({ studentId, session });
  if (exists) return res.status(409).send('Already marked');
  const attendance = new Attendance({
    studentId,
    session,
    time: new Date().toLocaleString()
  });
  await attendance.save();
  res.send('Attendance marked');
});

// Get all attendance
app.get('/api/attendance', async (req, res) => {
  const data = await Attendance.find();
  res.json(data);
});

app.listen(3000, () => console.log('Server running on port 3000'));

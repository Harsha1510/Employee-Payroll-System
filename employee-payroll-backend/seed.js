const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/Employee'); // Ensure correct path

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('MongoDB connected');

  const sampleEmployees = [
    { name: 'Harsha Vardhan Dorapalli', salary: 90000, email: 'dorapalliharsha@gmail.com', PhoneNumber: 9014829938, WorkingDays: 18 },
    { name: 'Anika Sharma', salary: 45000, email: 'anika.sharma@example.com', PhoneNumber: 9876543210, WorkingDays: 21 },
    { name: 'Rohit Verma', salary: 52000, email: 'rohit.verma@example.com', PhoneNumber: 9123456789, WorkingDays: 22 },
    { name: 'Priya Sen', salary: 40000, email: 'priya.sen@example.com', PhoneNumber: 9988776655, WorkingDays: 19 },
    { name: 'Karthik Reddy', salary: 48000, email: 'karthik.reddy@example.com', PhoneNumber: 9090909090, WorkingDays: 16 },
    { name: 'Sneha Iyer', salary: 51000, email: 'sneha.iyer@example.com', PhoneNumber: 9887788990, WorkingDays: 20 },
    { name: 'Aditya Mehta', salary: 47000, email: 'aditya.mehta@example.com', PhoneNumber: 9876501234, WorkingDays: 17 },
    { name: 'Divya Nair', salary: 55000, email: 'divya.nair@example.com', PhoneNumber: 9911223344, WorkingDays: 23 },
    { name: 'Vikram Das', salary: 43000, email: 'vikram.das@example.com', PhoneNumber: 9955667788, WorkingDays: 15 },
    { name: 'Neha Kapoor', salary: 46000, email: 'neha.kapoor@example.com', PhoneNumber: 9845612378, WorkingDays: 21 },
    { name: 'Ravi Choudhary', salary: 39000, email: 'ravi.choudhary@example.com', PhoneNumber: 9100001122, WorkingDays: 19 },
    { name: 'Ishita Malhotra', salary: 52000, email: 'ishita.m@example.com', PhoneNumber: 9877890001, WorkingDays: 22 },
    { name: 'Manish Gupta', salary: 49500, email: 'manish.gupta@example.com', PhoneNumber: 9823421234, WorkingDays: 18 },
    { name: 'Pooja Joshi', salary: 47000, email: 'pooja.joshi@example.com', PhoneNumber: 9765544332, WorkingDays: 20 },
    { name: 'Siddharth Rao', salary: 50500, email: 'siddharth.rao@example.com', PhoneNumber: 9012233445, WorkingDays: 23 },
    { name: 'Meera Pillai', salary: 48000, email: 'meera.pillai@example.com', PhoneNumber: 9009876543, WorkingDays: 17 },
    { name: 'Nikhil Jain', salary: 51000, email: 'nikhil.jain@example.com', PhoneNumber: 9833322110, WorkingDays: 16 },
    { name: 'Ananya Dutta', salary: 44500, email: 'ananya.dutta@example.com', PhoneNumber: 9734567890, WorkingDays: 22 },
    { name: 'Arjun Bhat', salary: 53000, email: 'arjun.bhat@example.com', PhoneNumber: 9898989898, WorkingDays: 15 },
    { name: 'Tanvi Mishra', salary: 49000, email: 'tanvi.mishra@example.com', PhoneNumber: 9745632187, WorkingDays: 19 }
  ];

  try {
    await Employee.deleteMany();
    await Employee.insertMany(sampleEmployees);
    console.log('Sample employee data inserted');
  } catch (err) {
    console.error('Error inserting seed data:', err);
  } finally {
    mongoose.connection.close();
  }
}).catch(err => console.error('MongoDB connection error:', err));

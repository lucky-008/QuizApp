import mongoose from 'mongoose';
export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://luckyverma14082004_db_user:quizapp123@cluster0.py6o078.mongodb.net/QuizApp')
    .then(()=> {console.log('DB CONNECTED')})
}
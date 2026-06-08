import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: { type: String, trim: true },
  degree:      { type: String, trim: true },
  field:       { type: String, trim: true },
  startYear:   { type: String, trim: true },
  endYear:     { type: String, trim: true },
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  company:     { type: String, trim: true },
  role:        { type: String, trim: true },
  startYear:   { type: String, trim: true },
  endYear:     { type: String, trim: true },
  description: { type: String, trim: true },
}, { _id: false });

const profileSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name:       { type: String, trim: true, default: '' },
  email:      { type: String, trim: true, default: '' },
  bio:        { type: String, trim: true, default: '' },
  education:  { type: [educationSchema], default: [] },
  experience: { type: [experienceSchema], default: [] },
  skills:     { type: [String], default: [] },
  template:   { type: String, enum: ['minimal', 'modern', 'card'], default: 'modern' },
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);

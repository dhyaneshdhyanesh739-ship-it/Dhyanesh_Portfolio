import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    message: {
      type: String,
      required: [true, 'Please provide your message'],
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [200, 'Subject cannot exceed 200 characters']
    }
  },
  {
    timestamps: true
  }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const rawUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
    
    // For logging and verification purposes only, create a copy and sanitize it
    let displayUri = rawUri.replace(/[\[\]"']/g, '').trim();

    // Check for potential password encoding issues on the display copy
    const atSymbolsCount = (displayUri.match(/@/g) || []).length;
    if (atSymbolsCount > 1) {
      console.warn(
        'WARNING: MONGO_URI contains multiple "@" symbols. If your password contains special characters like "@", please URL-encode them (e.g., replace "@" with "%40").'
      );
    }

    // Mask the password in the copy for safe logging
    const maskedUri = displayUri.replace(/:([^:@]+)@/, ':******@');
    console.log(`Connecting to MongoDB at: ${maskedUri}`);

    // Connect to database using the RAW, unmodified MONGO_URI
    const conn = await mongoose.connect(rawUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;

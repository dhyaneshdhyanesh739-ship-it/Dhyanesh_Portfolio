import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
    
    // Sanitize the URI string (remove brackets, quotes, and whitespace)
    uri = uri.replace(/[\[\]"']/g, '').trim();

    // Check for potential password encoding issues (e.g. multiple '@' symbols)
    const atSymbolsCount = (uri.match(/@/g) || []).length;
    if (atSymbolsCount > 1) {
      console.warn(
        'WARNING: MONGO_URI contains multiple "@" symbols. If your password contains special characters like "@", please URL-encode them (e.g., replace "@" with "%40").'
      );
    }

    // Mask the password in the URI for safe logging
    const maskedUri = uri.replace(/:([^:@]+)@/, ':******@');
    console.log(`Connecting to MongoDB at: ${maskedUri}`);

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

// multer.config.ts
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Multer storage engine configuration
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads'); // No local storage, file will not be stored locally
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${extname(file.originalname)}`); // Generate unique filename
  },
});

// Multer options configuration
const multerOptions: MulterOptions = {
  storage: storage, // Use the custom storage engine
};

export default multerOptions;

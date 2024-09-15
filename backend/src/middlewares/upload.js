import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory in ES6 (equivalent to __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer storage with the correct path to 'backend/public/temp'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Resolve to 'backend/public/temp'
        cb(null, path.resolve(__dirname, '../', 'public', 'temp'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

export { upload };

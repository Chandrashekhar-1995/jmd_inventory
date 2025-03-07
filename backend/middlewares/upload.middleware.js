import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Filter for Excel and CSV files
const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".xlsx", ".xls", ".csv"];
    const allowedMimeTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
    ];

    const extName = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    if (allowedExtensions.includes(extName) && allowedMimeTypes.includes(mimeType)) {
        cb(null, true);
    } else {
        cb(new Error("Only Excel and CSV files are allowed."));
    }
};

// Multer upload instance
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
});

export default upload;
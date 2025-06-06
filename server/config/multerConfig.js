import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, file isn't imagen"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
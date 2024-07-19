import multer from "multer";
import path from "path";

const maxSize = 512 * 512;
const fileName = new Date().toISOString().replace(/:/g, "-");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../resources/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, `${fileName}${file.originalname}`);
  },
});

const fileFilter = (req: any, file: any, callback: any) => {
  const filetypes = /jpeg|jpg|png|gif/;

  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return callback(null, true);
  } else {
    callback("Error: Images Only!");
  }
};

const upload = multer({ storage: storage, limits: { fieldNameSize: Number(maxSize) }, fileFilter });

export default upload;

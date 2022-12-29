import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { BUCKET_KEY, BUCKET_REGION, BUCKET_SECRET, BUCKET_URL } from "./config";
import crypto from "crypto";
import path from "path";
const S3 = new S3Client({
  credentials: {
    secretAccessKey: BUCKET_SECRET,
    accessKeyId: BUCKET_KEY,
  },
  endpoint: BUCKET_URL,
  region: BUCKET_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: S3,
    acl: "public-read",
    bucket: BUCKET_URL,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, crypto.randomUUID());
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
  fileFilter: (req, file, cb) => {
    const ACCEPTED_FILES = /jpeg|jpg|png|webp|gif/;
    const extname = ACCEPTED_FILES.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = ACCEPTED_FILES.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only Images Allowed: jpeg|jpg|png|webp|gif"));
    }
  },
});

export default upload;

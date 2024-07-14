import { v2 } from "cloudinary";
const cloudinary = v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: "dfu4raix4",
  api_key:895448536935596,
  api_secret: "U8ZaTowEX2syhfEVfYupbHMNNDI",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "social-media",
    resource_type: "image",
  },
});

const parser = multer({ storage: storage });

export { cloudinary, parser };

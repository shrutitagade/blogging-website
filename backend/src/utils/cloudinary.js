import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath, retryCount = 3) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        });

        console.log("Local path:", localFilePath);
        if (!localFilePath) return null;

        // Attempt to upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            upload_preset: 'image_preset',
            folder: 'images',
            timeout: 600000
        });

        // File has been uploaded successfully
        console.log("File uploaded to Cloudinary:", response.secure_url);
        // fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
        return response.secure_url;

    } catch (error) {
        console.error("Cloudinary upload error:", error);

        // Retry logic
        if (retryCount > 0 && error.name === 'TimeoutError') {
            console.log(`Retrying upload... Attempts left: ${retryCount - 1}`);
            return await uploadOnCloudinary(localFilePath, retryCount - 1);
        } else {
            fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
            return null;
        }
    }
};

export { uploadOnCloudinary };

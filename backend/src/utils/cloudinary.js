// cloudinary.js

import cloudinary from 'cloudinary';
import fs from 'fs';

// Your upload function
export const uploadOnCloudinary = async (localFilePath, retryCount = 3) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        });

        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            secure: true, // Ensure the URL is secure
            folder: 'images',
            timeout: 60000, // Timeout setting
        });

        fs.unlinkSync(localFilePath); // Remove the local file after upload
        return response;

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        fs.unlinkSync(localFilePath); // Clean up local file in case of error
        return null;
    }
};

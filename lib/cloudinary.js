import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dciadhpoj',
  api_key: process.env.CLOUDINARY_API_KEY || '156686838932624',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Awf0uzOMhPeuz4ilJLTOKs0pQlQ',
});

/**
 * Upload a single image to Cloudinary from base64 string
 * 
 * @param {string} base64Str - Base64 encoded image string (with or without data URI prefix)
 * @param {Object} options - Additional Cloudinary upload options
 * @returns {Promise<Object>} Upload result with secure_url
 * @throws {Error} If upload fails or file size exceeds 5MB
 */
export async function uploadSingleImage(base64Str, options = {}) {
  try {
    const maxSize = 5 * 1024 * 1024; // 5 MB limit

    // Extract the base64 part after the comma if it has data URI prefix
    const base64Data = base64Str.includes(',') ? base64Str.split(',')[1] : base64Str;
    const decodedSize = Buffer.from(base64Data, 'base64').length;

    // Check if the decoded file size exceeds the maxSize
    if (decodedSize > maxSize) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Str, {
      upload_preset: 'ml_default',
      ...options,
    });

    return {
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    };
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
}

/**
 * Upload multiple images to Cloudinary from base64 strings
 * 
 * @param {string[]} base64Array - Array of base64 encoded image strings
 * @param {Object} options - Additional Cloudinary upload options
 * @returns {Promise<Object>} Upload results with URLs array
 * @throws {Error} If any upload fails
 */
export async function uploadMultipleImages(base64Array, options = {}) {
  try {
    if (!Array.isArray(base64Array) || base64Array.length === 0) {
      throw new Error('Invalid input: expected non-empty array of base64 strings');
    }

    // Upload all images in parallel
    const uploadPromises = base64Array.map((base64Str) =>
      cloudinary.uploader.upload(base64Str, {
        upload_preset: 'ml_default',
        ...options,
      })
    );

    const uploadResponses = await Promise.all(uploadPromises);
    const imageUrls = uploadResponses.map((response) => response.secure_url);
    const publicIds = uploadResponses.map((response) => response.public_id);

    return {
      success: true,
      urls: imageUrls,
      public_ids: publicIds,
    };
  } catch (error) {
    console.error('Error uploading images to Cloudinary:', error);
    throw new Error(error.message || 'Failed to upload images');
  }
}

/**
 * Delete an image from Cloudinary
 * 
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: result.result === 'ok',
      result,
    };
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw new Error(error.message || 'Failed to delete image');
  }
}

/**
 * Delete multiple images from Cloudinary
 * 
 * @param {string[]} publicIds - Array of public IDs to delete
 * @returns {Promise<Object>} Deletion results
 */
export async function deleteMultipleImages(publicIds) {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return {
      success: true,
      result,
    };
  } catch (error) {
    console.error('Error deleting images from Cloudinary:', error);
    throw new Error(error.message || 'Failed to delete images');
  }
}

export default cloudinary;

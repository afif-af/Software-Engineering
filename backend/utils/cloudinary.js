import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to cloudinary
export const uploadImageToCloudinary = async (filePath, folderName = 'ecommerce') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderName,
            resource_type: 'auto',
        });

        return {
            public_id: result.public_id,
            url: result.secure_url,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to upload image',
            success: false
        };
    }
};

// Delete image from cloudinary
export const deleteImageFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            return {
                message: 'Image deleted successfully',
                success: true
            };
        } else {
            return {
                message: 'Failed to delete image',
                success: false
            };
        }
    } catch (error) {
        return {
            error: error.message || 'Failed to delete image',
            success: false
        };
    }
};

// Upload multiple images to cloudinary
export const uploadMultipleImagesToCloudinary = async (filePaths, folderName = 'ecommerce') => {
    try {
        const uploadPromises = filePaths.map(filePath =>
            cloudinary.uploader.upload(filePath, {
                folder: folderName,
                resource_type: 'auto',
            })
        );

        const results = await Promise.all(uploadPromises);

        const images = results.map(result => ({
            public_id: result.public_id,
            url: result.secure_url
        }));

        return {
            images,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to upload images',
            success: false
        };
    }
};

// Optimize image
export const optimizeImage = (imageUrl, options = {}) => {
    const defaultOptions = {
        width: 800,
        height: 800,
        crop: 'fill',
        quality: 'auto',
        fetch_format: 'auto'
    };

    const mergedOptions = { ...defaultOptions, ...options };

    let optimizedUrl = imageUrl;
    
    // If it's a cloudinary URL, apply transformations
    if (imageUrl.includes('cloudinary')) {
        const urlParts = imageUrl.split('/upload/');
        if (urlParts.length === 2) {
            const transformationString = Object.entries(mergedOptions)
                .map(([key, value]) => `${key}_${value}`)
                .join(',');
            
            optimizedUrl = `${urlParts[0]}/upload/${transformationString}/${urlParts[1]}`;
        }
    }

    return optimizedUrl;
};

// Get image info from cloudinary
export const getImageInfo = async (publicId) => {
    try {
        const result = await cloudinary.api.resource(publicId);
        return {
            data: result,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to get image info',
            success: false
        };
    }
};

// Delete multiple images from cloudinary
export const deleteMultipleImagesFromCloudinary = async (publicIds) => {
    try {
        const deletePromises = publicIds.map(publicId =>
            cloudinary.uploader.destroy(publicId)
        );

        const results = await Promise.all(deletePromises);

        const successCount = results.filter(result => result.result === 'ok').length;

        return {
            message: `${successCount} images deleted successfully`,
            success: true,
            deletedCount: successCount
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to delete images',
            success: false
        };
    }
};

// Generate image transformation URL
export const generateTransformedImageUrl = (imageUrl, transformations = {}) => {
    const defaultTransformations = {
        width: 500,
        height: 500,
        crop: 'fill',
        gravity: 'auto',
        quality: 'auto',
        fetch_format: 'auto'
    };

    const mergedTransformations = { ...defaultTransformations, ...transformations };

    if (!imageUrl.includes('cloudinary')) {
        return imageUrl;
    }

    const urlParts = imageUrl.split('/upload/');
    if (urlParts.length !== 2) {
        return imageUrl;
    }

    const transformationString = Object.entries(mergedTransformations)
        .map(([key, value]) => {
            if (value === null || value === undefined) return null;
            return `${key}_${value}`;
        })
        .filter(Boolean)
        .join(',');

    return `${urlParts[0]}/upload/${transformationString}/${urlParts[1]}`;
};

export default cloudinary;

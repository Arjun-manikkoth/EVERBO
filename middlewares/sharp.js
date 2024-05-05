const sharp = require('sharp');
const path = require('path');

const sharpMiddleware = (cropSize) => (req, res, next) => {
    const processedFiles = [];
    let processedCount = 0;

    if (req.files) {
        // Handle multiple file uploads
        req.files.forEach((file, index) => {
            const outputPath = path.join(__dirname, '../public/images/userImages', `crop_${file.filename}`);
            sharp(file.path)
                .resize(cropSize[0].width, cropSize[0].height)
                .toFile(outputPath, (err, info) => {
                    if (err) {
                        return next(err);
                    }
                    const processedFile = {
                        fieldname: file.fieldname,
                        originalname: file.originalname,
                        filename: `crop_${file.filename}`,
                        path: outputPath,
                        size: info.size
                    };
                    processedFiles[index] = processedFile;
                    processedCount++;
                    
                    if (processedCount === req.files.length) {
                        req.files = processedFiles;
                        next();
                    }
                });
        });
    } else if (req.file) {
        // Handle single file upload
        const file = req.file;
        const outputPath = path.join(__dirname, '../public/images/userImages', `crop_${file.filename}`);
        sharp(file.path)
            .resize(cropSize[0].width, cropSize[0].height)
            .toFile(outputPath, (err, info) => {
                if (err) {
                    return next(err);
                }
                const processedFile = {
                    fieldname: file.fieldname,
                    originalname: file.originalname,
                    filename: `crop_${file.filename}`,
                    path: outputPath,
                    size: info.size
                };
                req.file = processedFile;
                next();
            });
    } 
};

module.exports = sharpMiddleware;

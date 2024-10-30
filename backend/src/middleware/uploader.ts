import { Request, Response, NextFunction } from 'express';
import multer, { memoryStorage } from 'multer';
import { randomUUID } from 'crypto';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

const upload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter(_, file, callback) {
    if (allowedMimeTypes.includes(file.mimetype)) {
      return callback(new Error('Invalid file type'));
    }

    callback(null, true);
  },
});

export function uploader(
  fieldName: string,
  callback: (fileName: string, fileBuffer: Buffer) => Promise<string>
  filePath: string,
) {
  return [
    upload.single(fieldName),
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      try {
        const fileName = `${randomUUID()}-${req.file.originalname}`;
        const fileBuffer = req.file.buffer;

        const fileUrl = await callback(fileName, fileBuffer, filePath);

        req.fileUrl = fileUrl;
        next();
      } catch (error) {
        console.error('Error: unable to upload to the R2', error);
        return res.status(500).json({ error: 'File upload failed' });
      }
    },
  ];
}

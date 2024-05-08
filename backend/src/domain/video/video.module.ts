import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuid}-${Date.now()}.${ext}`);
        },
      }),
    }),
  ],
})
export class VideoModule {}

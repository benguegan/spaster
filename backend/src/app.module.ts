import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import { User, UserSchema } from './common/users/user.entity';
import { UsersModule } from './common/users/users.module';
import { UsersService } from './common/users/users.service';
import { secret } from './common/utils/constants';
import { VideoController } from './domain/video/video.controller';
import { Video, VideoSchema } from './domain/video/video.entity';
import { VideoService } from './domain/video/video.service';
import { isAuthenticated } from './app.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/build'),
    }),
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://mongo:mongo@mongodb:27017/Stream'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AppController, VideoController],
  providers: [AppService, VideoService, UsersService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude({
        path: 'api/v1/video/:id',
        method: RequestMethod.GET,
      })
      .forRoutes(VideoController);
  }
}

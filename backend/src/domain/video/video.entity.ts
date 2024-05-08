import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../common/users/user.entity';

@Schema()
export class Video {
  @Prop()
  title: string;
  @Prop()
  video: string;
  @Prop()
  coverImage: string;
  @Prop({ default: Date.now() })
  uploadDate: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

import { model, Schema } from 'mongoose';

const personSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    groupId: {
      type: Number,
      required: true,
    },
    imgPath: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'persons',
  },
);

export default model('Person', personSchema);

import { model, Schema } from 'mongoose';

const personSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    groupIds: {
      type: [Number],
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'persons',
  },
);

export default model('Person', personSchema);

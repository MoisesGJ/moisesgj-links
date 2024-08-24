import { Schema, model } from 'mongoose';

const linkSchema = new Schema(
  {
    url: {
      type: String,
      lowercase: true,
      required: [true, 'El link es obligatorio.'],
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
        'La URL proporcionada no es válida. Debe proporcionar el protocolo HTTPS.',
      ],
    },
    shortUrl: {
      type: String,
      required: [true, 'La frase acortada es obligatoria.'],
      minlength: [3, 'La frase acortada debe tener al menos 3 caracteres.'],
      maxlength: [10, 'La frase acortada no debe exceder los 50 caracteres.'],
      unique: true,
    },
    trackers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tracker',
      },
    ],
  },
  {
    collection: 'links',
    timestamps: true,
  }
);

linkSchema.index({ url: 1 }, { unique: true });
linkSchema.index({ shortUrl: 1 }, { unique: true });

const Link = model('Link', linkSchema);

export default Link;

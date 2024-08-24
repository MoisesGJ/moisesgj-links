import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio.'],
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com)$/,
        'El correo electrónico proporcionado no es válido, Intente con otro.',
      ],
    },
    displayName: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio.'],
      minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres.'],
      maxlength: [
        50,
        'El nombre de usuario no debe exceder los 50 caracteres.',
      ],
      trim: true,
    },
    roles: {
      type: [String],
      default: ['user'],
      enum: {
        values: ['user', 'admin', 'superadmin'],
        message: 'El rol {VALUE} no es válido.',
      },
    },
  },
  {
    collection: 'users',
  }
);

userSchema.index({ email: 1 }, { unique: true });

const User = model('User', userSchema);

export default User;

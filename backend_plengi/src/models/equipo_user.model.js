import mongoose from "mongoose";

const equipo_user_Schema = new mongoose.Schema(
  {
    equipo: {
      type: String,
      required: true,
    },
    unidad: {
      type: String,
      required: true,
    },
    val_unitario: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    Apu_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apu_user'
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Equipo_user", equipo_user_Schema);

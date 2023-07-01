import mongoose from "mongoose";

const equipo_BD_Schema = new mongoose.Schema(
  {
    name: {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Equipo_BD", equipo_BD_Schema);

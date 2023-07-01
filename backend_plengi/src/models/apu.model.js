import mongoose from "mongoose";

const apuUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  actividad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity_user',
    required: true,
  },
  material: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material_user',
    required: true,
  }],
  labour: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Labour_user',
    required: true,
  }],
  equipo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipo_user',
    required: true,
  }],
});

export default mongoose.model('APU_User', apuUserSchema);


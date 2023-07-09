import mongoose from "mongoose";

const apuUserSchema = new mongoose.Schema({
  name_apu: {
    type: String,
    required: true,
  },
  actividad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity_user',
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  material: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material_BD',
    required: true,
  }],
  labour: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Labour_BD',
    required: true,
  }],
  equipo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipo_user',
    required: true,
  }],
});

export default mongoose.model('APU_User', apuUserSchema);


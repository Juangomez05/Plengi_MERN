import APU_User from '../models/apu.model.js';

// Obtener todos los APUs del usuario
export const getApus = async (req, res) => {
  try {
    const apus = await APU_User.find({}).populate('actividad material labour equipo');
    res.json(apus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo APU para el usuario
export const createApu = async (req, res) => {
  try {
    const { actividad, materiales, manoDeObra, equipo } = req.body;

    const newApu = new APU_User({
      actividad,
      name: actividad.actividad,
      material: materiales,
      labour: manoDeObra,
      equipo,
    });

    await newApu.save();

    res.status(201).json(newApu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un APU específico del usuario
export const getApu = async (req, res) => {
  try {
    const apu = await APU_User.findById(req.params.id)
      .populate('actividad material labour equipo');

    if (!apu) {
      return res.status(404).json({ message: 'APU not found' });
    }

    res.json(apu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un APU específico del usuario
export const updateApu = async (req, res) => {
  try {
    const { actividad, materiales, manoDeObra, equipo } = req.body;

    const updatedApu = await APU_User.findByIdAndUpdate(
      req.params.id,
      {
        actividad,
        material: materiales,
        labour: manoDeObra,
        equipo,
      },
      { new: true }
    ).populate('actividad material labour equipo');

    if (!updatedApu) {
      return res.status(404).json({ message: 'APU not found' });
    }

    res.json(updatedApu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un APU específico del usuario
export const deleteApu = async (req, res) => {
  try {
    const deletedApu = await APU_User.findByIdAndDelete(req.params.id);

    if (!deletedApu) {
      return res.status(404).json({ message: 'APU not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

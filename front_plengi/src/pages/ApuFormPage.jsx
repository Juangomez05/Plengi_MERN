/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useBD } from "../context/BDContext";
import { useApu } from "../context/Apu_user_context";
import { useParams, useNavigate } from "react-router-dom";

function ApuFormPage() {
  const { 
    materials, 
    getMaterials_BD,
    equipos,
    getEquipos_BD,
    labours,
    getLabours_BD
  } = useBD();
  const { getApu, updateApu } = useApu();

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedEquipo, setSelectedEquipo] = useState(null)
  const [selectedLabour, setSelectedLabour] = useState(null)
  const [apuData, setApuData] = useState(null);
  const [nameApu, setNameApu] = useState(null)

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getMaterials_BD();
    getEquipos_BD();
    getLabours_BD();

    if (params.id) {
      loadApu();
    }
  }, []);

  const loadApu = async () => {
    try {
      const apu = await getApu(params.id);
      setApuData(apu);
      setSelectedMaterial(apu.material);
      setSelectedEquipo(apu.equipo)
      setSelectedLabour(apu.labour)
      setNameApu(apu.name_apu)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedMaterialId = e.target.value;
    const material = materials.find((m) => m._id === selectedMaterialId);
    setSelectedMaterial(material);
  };

  const handleSelectChangeEquipo = (e) => {
    const selectedEquipoId = e.target.value
    const equipo = equipos.find((m) => m._id === selectedEquipoId)
    setSelectedEquipo(equipo) 
  }

  const handleSelectChangeLabour = (e) => {
    const selectedLabourId = e.target.value
    const labour = labours.find((m) => m._id === selectedLabourId)
    setSelectedLabour(labour)
  }

  const handleSubmit = async () => {
    try {
      if (params.id) {
        if (!apuData.materiales_id.includes(selectedMaterial._id)) {
          apuData.materiales_id.push(selectedMaterial._id)
        }
        const actuliazado = await updateApu(params.id, apuData);
        console.log(apuData.materiales_id);
      } else {
        console.log("No tiene params");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEquipo = async () => {
    try {
      if (params.id) {
        if (!apuData.equipos_id.includes(selectedEquipo._id)) {
          apuData.equipos_id.push(selectedEquipo._id)
        }
        const actuliazado = await updateApu(params.id, apuData)
        console.log(actuliazado);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmitLabour = async () => {
    try {
      if(params.id){
        if (!apuData.labours_id.includes(selectedLabour._id)) {
          apuData.labours_id.push(selectedLabour._id)
        }
        const actuliazado = await updateApu(params.id, apuData)
        console.log(actuliazado);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>

      {/* MATERIALES */}
      <h1>Apu {nameApu}</h1>
      <label htmlFor="materialSelect">Selecciona un material:</label>
      <select
        className="text-black"
        id="materialSelect"
        onChange={handleSelectChange}
      >
        <option value="">Selecciona un material</option>
        {materials.map((material) => (
          <option key={material._id} value={material._id}>
            {material.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>
        Agregar Material
      </button>

      {/* EQUIPOS */}
      <label className="px-4 py-2" htmlFor="equipoSelect">Selecciona un equipo:</label>
      <select
        className="text-black"
        id="equipoSelect"
        onChange={handleSelectChangeEquipo}
      >
        <option value="">Selecciona un equipo</option>
        {equipos.map((equipo) => (
          <option key={equipo._id} value={equipo._id}>
            {equipo.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmitEquipo}>
        Agregar Equipo
      </button>

      {/* MANO DE OBRA */}
      <label className="px-4 py-2" htmlFor="labourSelect">Selecciona la mano de obra:</label>
      <select
        className="text-black"
        id="labourSelect"
        onChange={handleSelectChangeLabour}
      >
        <option value="">Selecciona la mano de obra</option>
        {labours.map((labour) => (
          <option key={labour._id} value={labour._id}>
            {labour.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmitLabour}>
        Agregar Mano de obra
      </button>

    </div>
  );
}

export default ApuFormPage;
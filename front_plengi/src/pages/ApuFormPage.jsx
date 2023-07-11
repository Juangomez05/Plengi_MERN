/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useBD } from "../context/BDContext";
import { useApu } from "../context/Apu_user_context";
import { useParams, useNavigate } from "react-router-dom";

function ApuFormPage() {
  const { materials, getMaterials_BD } = useBD();
  const { getApu, updateApu } = useApu();

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [apuData, setApuData] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getMaterials_BD();

    if (params.id) {
      loadApu();
    }
  }, []);

  const loadApu = async () => {
    try {
      const apu = await getApu(params.id);
      setApuData(apu);
      setSelectedMaterial(apu.material);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedMaterialId = e.target.value;
    const material = materials.find((m) => m._id === selectedMaterialId);
    setSelectedMaterial(material);
  };

  const  handleSubmit  = async () => {
    try {
      if (params.id) {
        
        if (!apuData.materiales_id.includes(selectedMaterial._id) ) {
          apuData.materiales_id.push(selectedMaterial._id)
        }

        const actuliazado = await updateApu(params.id, apuData);

        console.log(actuliazado);
      }else{
        console.log("No tiene params");
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <h1>Apu {params.id}</h1>
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

    </div>
  );
}

export default ApuFormPage;

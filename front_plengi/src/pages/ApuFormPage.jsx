import { useState, useEffect } from "react";
import { useBD } from "../context/BDContext";

function ApuFormPage() {
  const { materials, getMaterials_BD } = useBD();
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    getMaterials_BD();
  }, []);

  const handleSelectChange = (e) => {
    const selectedMaterialId = e.target.value;
    const material = materials.find((m) => m._id === selectedMaterialId);
    setSelectedMaterial(material);
  };

  const handleSubmit = () => {
    if (selectedMaterial) {
      console.log(selectedMaterial);
    }
  };

  return (
    <div>
      <h1>ApuFormPage</h1>
      <label htmlFor="materialSelect">Selecciona un material:</label>
      <select className="text-black" id="materialSelect" onChange={handleSelectChange}>
        <option value="">Selecciona un material</option>
        {materials.map((material) => (
          <option key={material._id} value={material._id}>
            {material.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Agregar material</button>
    </div>
  );
}

export default ApuFormPage;

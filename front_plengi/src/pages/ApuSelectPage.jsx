import { useEffect, useState } from "react";
import { useBD } from "../context/BDContext";
import { useMaterial } from "../context/Material_user_context";
import { useEquipo } from "../context/Equipo_user_context";

function ApuSelectPage() {
  const { 
    materials, 
    equipos,
    getMaterials_BD, 
    getEquipos_BD,
    
  } = useBD();
  const { createMaterial } = useMaterial();
  const { createEquipo } = useEquipo()

  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [addedMaterials, setAddedMaterials] = useState([]);

  const [selectedEquipo, setSelectedEquipo] = useState('');
  const [addedEquipos, setAddedEquipos] = useState([]);

  useEffect(() => {
    // Obtener los materiales desde BD al cargar la página
    getMaterials_BD();
    getEquipos_BD();
  }, []);

  const handleMaterialChange = (e) => {
    setSelectedMaterial(e.target.value);
  };

  const handleEquipoChange = (e) => {
    setSelectedEquipo(e.target.value);
  };

  const handleAddMaterial = () => {
    if (selectedMaterial) {
      const materialToAdd = materials.find((material) => material._id === selectedMaterial);
      if (materialToAdd) {
        const isMaterialAdded = addedMaterials.some((materialId) => materialId === materialToAdd._id);
        if (!isMaterialAdded) {
          setAddedMaterials([...addedMaterials, materialToAdd._id]); // Actualizar el estado primero
          createMaterial(materialToAdd); // Luego, crear el material
        } else {
          console.log("El material ya ha sido agregado."); // Opcional: mostrar un mensaje si el material ya está agregado
        }
      }
    }
  };

  const handleAddEquipo = () => {
    if (selectedEquipo) {
      const equipoToAdd = equipos.find((equipo) => equipo._id === selectedEquipo);
      if (equipoToAdd) {
        const isEquipoAdded = addedEquipos.some((equipoId) => equipoId === equipoToAdd._id);
        if (!isEquipoAdded) {
          setAddedEquipos([...addedEquipos, equipoToAdd._id]); // Actualizar el estado primero
          createEquipo(equipoToAdd); // Luego, crear el equipo
        } else {
          console.log("El equipo ya ha sido agregado."); // Opcional: mostrar un mensaje si el material ya está agregado
        }
      }
    }
  };


  return (

    //material 

    <div className="text-black">
      <select value={selectedMaterial} onChange={handleMaterialChange}>
        <option value="">Seleccionar material</option>
        {materials.map((material) => (
          <option key={material._id} value={material._id}>
            {material.name}
          </option>
        ))}
      </select>
      <button className="text-white py-2" style={{ margin: '10px' }} onClick={handleAddMaterial}>
        Agregar material
      </button>

      {/* equipo */}

      <select value={selectedEquipo} onChange={handleEquipoChange}>
        <option value="">Seleccionar equipo</option>
        {equipos.map((equipo) => (
          <option key={equipo._id} value={equipo._id}>
            {equipo.name}
          </option>
        ))}
      </select>
      <button className="text-white py-2" style={{ margin: '10px' }} onClick={handleAddEquipo}>
        Agregar equipo
      </button>

    </div>
   

  );

}

export default ApuSelectPage;

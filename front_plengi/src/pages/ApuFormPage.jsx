import { useForm } from "react-hook-form";
import { useApu } from "../context/Apu_user_context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function ApuFormPage() {

  const { register, handleSubmit, setValue } = useForm()
  const { createApu, getApu, updateApu } = useApu()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadApu() {
      if (params.id) {
        const apu = await getApu(params.id)
        setValue('apu', apu.apu)
        setValue('unidad', apu.unidad)
        setValue('val_unitario', apu.val_unitario)
      }
    }
    loadApu()
  }, [])

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateApu(params.id, data);
    } else {
      createApu(data);
    }
    navigate('/apu')
  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

        <label htmlFor="apu">Apu</label>

        <form onSubmit={onSubmit}>
          <input
            type="text" placeholder="Apu"
            {...register("apu")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            autoFocus
          />

          <label htmlFor="unidad">Unidad</label>

          <input type="text" placeholder="Unidad"
            {...register("unidad")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          ></input>

          <label htmlFor="val_unitario">Valor unitario</label>
          <input
            type="number"
            placeholder="Valor unitario"
            {...register("val_unitario")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <button className='bg-indigo-500 px-3 py-2 rounded-md'>Guardar</button>
        </form>

      </div>
    </div>
  )
}

export default ApuFormPage
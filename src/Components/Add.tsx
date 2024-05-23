import { useOutletContext } from "react-router-dom"
import { dialog } from "../adds/interfaces"
import { useEffect, useRef } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"


const Add = () => {

    const client = useQueryClient()

    const input = useRef<HTMLInputElement>(null)

    const [dialog,navigate] = useOutletContext() as [ dialog, Function]
    useEffect(() => {
        dialog.current.showModal()
    })

    const Mutation = useMutation({
        mutationFn: async (Url: string) => {
          await fetch('http://localhost:3000/posts',{ method: 'POST'
          ,headers:{}
          ,body: JSON.stringify({
            img: Url,
            id: crypto.randomUUID() + ""
          }) })
        },
        onSuccess: () => {
            client.invalidateQueries()
        }
      })
  

  return (
    <div className="bg-white rounded w-200px h-200px p-32 flex flex-col justify-around items-center">
        <input ref={input} className=" mb-3 block w-full bg-white border-black border-solid border-[2px] rounded font-bold text-amber-900 focus:placeholder:text-green-600 placeholder:font-bold p-2" type="text" placeholder="enter a Url" />
        <button className="bg-cyan-400 p-2 rounded-sm border-black border-solid border-[2px] box-content font-bold text-white" onClick={() => {
            navigate('/')
            dialog.current.close()
            if(input.current){
                if(input.current.value){
                    Mutation.mutate(input.current.value) 
                }
            }
        }}>Save</button>
    </div>
  )
}

export default Add
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useOutletContext, useParams } from "react-router-dom"
import { dialog, oneData } from "../adds/interfaces"
import { useEffect } from "react"

const ImgPage = () => {

    const params = useParams()
    const [dialog,navigate] = useOutletContext() as [ dialog, Function]
    const client = useQueryClient()

    useEffect(() => {
        dialog.current.showModal()
    })

    
    async function ImgQuery (){
        const stock = await fetch(`http://localhost:3000/posts/${params.Id}`)
        const data = await stock.json()
        
        return data
      }

    const query = useQuery({
        queryKey: ["posts", params.Id],
        queryFn: ImgQuery,
    }) as oneData

    const mutation = useMutation({
        mutationFn: async () => {
           await fetch(`http://localhost:3000/posts/${params.Id}`,{
            method: 'DELETE'
           })
           dialog.current.close()
           navigate('/')
        },
        onSuccess: () => {
            client.invalidateQueries()
        }
    })


    if(query.isLoading){
        return <h1>Loading...</h1>
    }

    return (
        <div className=" h-full w-full m-32">
            <img className="w-[120%] h-[120%] scale-[2] rounded-sm" src={query.data.img} alt="" />
            <div className=" w-full flex justify-center items-center">
               <button onClick={() => mutation.mutate()} className=" border-solid border-black border-[2px] rounded-sm p-1 translate-y-[320%] text-white font-bold bg-red-500">Delete</button> 
            </div>
            
        </div>
    )
}

export default ImgPage
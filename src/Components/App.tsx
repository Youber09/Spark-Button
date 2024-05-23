import { useQuery } from "@tanstack/react-query";
import { data, inData } from "../adds/interfaces";
import ImgDisplay from "./imgDisplay";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

function App() {

    const dialog = useRef<HTMLDialogElement>(null)
    const params = useParams()
    const navigate = useNavigate()
    const Location = useLocation()
    const AddSvg = useRef<SVGSVGElement>(null)
    

    async function ImgQuery (){
      const stock = await fetch('http://localhost:3000/posts')
      const data = await stock.json()

      
      return data
    }



    const query = useQuery({
      queryKey: ['Img'],
      queryFn: ImgQuery,
    }) as data


    
    useEffect(() => {
      
      
      
      if(dialog.current){
        if(!(params.Id || Location.pathname !== "/Add")){
          dialog.current.close()
        }
        
      }
    }, [params])
    

    const Back = (e: any) => {

      if (e.key === "Escape" || e.keyCode === 27) {
        navigate('/') 
      }
      
    }
  

  return (
    <>
    <h1 className=" text-white ">Gallery is on : {query.status}</h1>
      <dialog onKeyDown={(e) => Back(e)} id="dialog" className=" bg-transparent z-0 rounded overflow-hidden flex justify-around items-center w-fit h-fit " ref={dialog}>
        <Outlet context={[dialog,navigate]} />   
      </dialog>
      
      
      
      <div className="grid grid-cols-12 grid-flow-row">
        {query.data && query.data.map((image: inData) => <ImgDisplay image={image} modal={dialog} /> )}
        <Link className=' cursor-pointer' to={'/Add'} onClick={() => {dialog.current?.showModal()}}>
          <div className=' bg-white w-[95%] aspect-square flex justify-center items-center group'>
              <div className='w-[95%] aspect-square flex justify-center items-center translate-y-[-5%]'>
                <p className=" text-center translate-x-[-2%] translate-y-[10%]">
                  
                  <svg
                    ref={AddSvg}
                    className="w-[50%] inline-block h-[50%] group-hover:text-green-500 group-hover:rotate-[360deg] transition-all duration-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="800"
                    height="800"
                    viewBox="0 0 463 463"
                  >
                    <path d="M423.5 128h-384C17.72 128 0 145.72 0 167.5v128C0 317.28 17.72 335 39.5 335h384c21.78 0 39.5-17.72 39.5-39.5v-128c0-21.78-17.72-39.5-39.5-39.5zM15 295.5v-128c0-13.509 10.991-24.5 24.5-24.5H320v177H39.5C25.991 320 15 309.009 15 295.5zm433 0c0 13.509-10.991 24.5-24.5 24.5H335V143h88.5c13.509 0 24.5 10.991 24.5 24.5v128z"></path>
                    <path d="M423.5 224H399v-24.5a7.5 7.5 0 00-15 0V224h-24.5a7.5 7.5 0 000 15H384v24.5a7.5 7.5 0 0015 0V239h24.5a7.5 7.5 0 000-15zM96.976 196.984c-2.33-7.766-9.343-12.984-17.5-12.984-8.108 0-15.122 5.218-17.452 12.984l-21.708 72.36a7.5 7.5 0 005.028 9.339 7.497 7.497 0 009.339-5.028L60.28 255h38.44l5.597 18.655a7.504 7.504 0 007.181 5.347 7.5 7.5 0 007.186-9.657l-21.708-72.361zM64.78 240l11.611-38.705c.405-1.351 1.674-2.295 3.132-2.295a3.24 3.24 0 013.084 2.295L94.22 240H64.78zM167.5 184h-24a7.5 7.5 0 00-7.5 7.5v80a7.5 7.5 0 007.5 7.5h24c21.78 0 39.5-17.72 39.5-39.5v-16c0-21.78-17.72-39.5-39.5-39.5zm24.5 55.5c0 13.509-10.991 24.5-24.5 24.5H151v-65h16.5c13.509 0 24.5 10.991 24.5 24.5v16zM255.5 184h-24a7.5 7.5 0 00-7.5 7.5v80a7.5 7.5 0 007.5 7.5h24c21.78 0 39.5-17.72 39.5-39.5v-16c0-21.78-17.72-39.5-39.5-39.5zm24.5 55.5c0 13.509-10.991 24.5-24.5 24.5H239v-65h16.5c13.509 0 24.5 10.991 24.5 24.5v16z"></path>
                  </svg>
                </p>
              </div>
          </div>
        </Link>
      </div>
      
    </>
  )
}

export default App

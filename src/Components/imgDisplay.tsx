import { useEffect, useRef } from 'react'
import type { Display } from '../adds/interfaces'
import { Link } from 'react-router-dom'

const ImgDisplay = ({image,modal}: Display) => {

  return (
    <div className=' z-10 hover:scale-105 transition-all hover:rotate-3' >
        <Link className=' bg-white w-[95%] aspect-square flex justify-center items-center' onClick={() => { modal.current && modal.current.showModal()}} to={`/Image/${image.id}`}>
            <img className='w-[95%] aspect-square' src={image.img} alt="" />
        </Link>
    </div>
  )
}

export default ImgDisplay
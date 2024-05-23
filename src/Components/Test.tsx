import { useRef } from "react";


function ButtonDialog() {

  const ref = useRef<HTMLDialogElement>(null)
  

  return (
    <div>
      <dialog ref={ref} className="bg-white">
        <div> Hey</div> 
      </dialog>
      <button className=" p-1 bg-white" onClick={() => ref.current?.showModal()}>Click !!!!!</button>
    </div>
  );
}

export default ButtonDialog;

import type { ChangeEvent } from "react"

interface LabelledInputType{
    label:string,
    placeholder:string,
    onchange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type?:string
}
export function LabelledInput({label,placeholder,onchange,type}:LabelledInputType){
    return <div className='w-full mt-4'>
            <label className="block mb-2.5 text-lg font-semibold text-heading">{label}</label>
            <input onChange={onchange} type={type || "text"} id="first_name" className="bg-gray-100 border border-black text-heading text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-xs placeholder:text-body " placeholder={placeholder} required />
    </div>
}
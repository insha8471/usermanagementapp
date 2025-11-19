const Inputs = ({label,value,onChange, type, placeholder}) => {
    return (
        <div className="mb-4">
            <label htmlFor="" className="text-[13px] text-slate-800 block mb-1">{label}</label>
            <div className="relative">
                <input
                    type={type}
                    onChange={(e) =>  onChange(e)}
                    value={value}
                    placeholder={placeholder} 
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-3 px-2 pr-10 text-gray-700 focus:border-blue-500" />
            </div>
        </div>
    )
}

export default Inputs;
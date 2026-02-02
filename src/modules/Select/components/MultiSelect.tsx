import { observer } from 'mobx-react-lite';
import FilterIcon from '../../../assets/filter.svg'
import { useDropdown } from "../hooks/useDropdown";
import type { Filter } from '../../../types/employee';

interface MultiSelectProps{
  options: Filter[]
  value: Filter[],
  name : string,
  onChange: (newValue: Filter) => void
}

const MultiSelect = observer(({ options, value, name, onChange }: MultiSelectProps) => {
  const { open, toggle, ref } = useDropdown()

  return (
    <div ref={ref}  className="relative cursor-pointer">
      <div
        onClick={toggle}
        className='flex items-center'
      >
        <span className={`mr-[8px] md:mr-[12px] text-[12px] md:text-[20px] ${open ? "text-[#155da4] font-medium" : ""}`}>{name}</span>
        <img className={`inline ${open ? "rotate-0" : "rotate-180"} h-[5px] w-[10px] md:h-[8px] md:w-[17px] transition-transform duration-300`} src={FilterIcon} alt="" />
      </div>

      {open && (
        <div
          className="
          absolute
          md: right-[0px] 
          w-[224px]
          md:w-[267px]
          h-[204px] 
          md:h-[224px] 
          p-[20px]
          flex
          justify-center
          items-start
          flex-col
          border-t 
         border-[#155da4]
          bg-[#fff]
         dark:bg-main-bg-dark
          shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
         "
        >
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex w-[190px] md:w-[227px] items-center justify-between py-1.5 cursor-pointer select-none"
            >
              <span className="text-[12px] md:text-[16px]">{opt.label}</span>
              <div className="relative inline-flex shrink-0">
                <input
                  type="checkbox"
                  className="
        appearance-none
        h-[19px] w-[19px]
        border border-[#155da4] rounded-[2px]
        bg-transparent
        checked:bg-[#155da4]
        checked:border-[#155da4]
        cursor-pointer
        transition-colors
      "
                  checked={value.some(v => v.value === opt.value)}
                  onChange={() => {
                    if (value.some(v => v.value === opt.value)) {
                      onChange(opt)
                    } else {
                      onChange(opt)
                    }
                  }}
                />
                <svg
                  className={`
        absolute inset-0 m-auto h-[14px] w-[14px] text-white pointer-events-none
        ${value.some(v => v.value === opt.value) ? "opacity-100" : "opacity-0"}
        transition-opacity duration-150
      `}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  )
})

export default MultiSelect;
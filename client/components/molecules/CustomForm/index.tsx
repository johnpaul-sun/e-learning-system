import React from "react";
import { useField } from "formik";
import { Eye, EyeOff } from "react-feather";

type Props = {
  name: string
  type: string
  label: string
  onChange?: any
  isDark?: boolean
  labelClass?: string
  showButton?: boolean
  className?: string
  placeholder: string
  defaultValue?: string
  isPassHidden?: boolean
  setIsPassHidden?: (value: boolean) => void
}

const CustomForm = ({
  label,
  isDark,
  onChange,
  className,
  labelClass,
  defaultValue,
  isPassHidden,
  showButton = true,
  setIsPassHidden = () => { },
  ...props
}: Props) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;

  return (
    <div className="w-full">
      <label htmlFor="last_name" className={`block text-md font-medium ${isDark ? "text-slate-600" : "text-slate-200"} mb-1 ${labelClass}`}>
        <small className="text-failed">*</small> {label}
      </label>
      <div>
        <div className="relative">
          <input
            {...field}
            {...props}
            value={field?.value || defaultValue || ""}
            className={`
              px-2 pb-1
              placeholder-text-failed bg-transparent 
              outline-none focus:ring-1 focus:border-failed
              block w-full h-[45px] rounded-md border-[2px] border-els-10 py-0.5 
              ${isDark ? "text-slate-600" : "text-slate-200"}
              ${touched && error && "text-failed border-failed"}
              ${className}
            `}
          />
          {(props.name === "password" && showButton) && (
            <button
              type="button"
              className="group absolute inset-y-0 right-0 block overflow-hidden rounded-r px-4 outline-none transition duration-75 ease-in-out"
              onClick={(e: any) => {
                e.preventDefault()
                setIsPassHidden(!isPassHidden)
              }}
            >
              {isPassHidden
                ? <EyeOff className={`h-4 w-4 ${isDark ? "text-slate-700 group-hover:text-slate-600" : "text-slate-300 group-hover:text-slate-400"} marker:group-focus:text-slate-400`} />
                : <Eye className={`h-4 w-4 ${isDark ? "text-slate-700 group-hover:text-slate-600" : "text-slate-300 group-hover:text-slate-400"} group-focus:text-slate-400`} />}
            </button>
          )}
        </div>
      </div>
      {touched && error && <span className="text-failed">{error}</span>}
    </div>
  );
};

export default CustomForm;

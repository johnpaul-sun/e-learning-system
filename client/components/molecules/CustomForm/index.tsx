import React from "react";
import { useField } from "formik";
import { Eye, EyeOff } from "react-feather";

type Props = {
  name: string
  type: string
  label: string
  className?: string
  placeholder: string
  defaultValue?: string
  isPassHidden?: boolean
  setIsPassHidden?: (value: boolean) => void
}

const CustomForm = ({
  label,
  className,
  defaultValue,
  isPassHidden,
  setIsPassHidden = () => { },
  ...props
}: Props) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;

  return (
    <div className="w-full">
      <label htmlFor="last_name" className="block text-md font-medium text-slate-200 mb-1">
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
              placeholder-text-failed  
              bg-transparent text-white
              outline-none focus:ring-1 focus:border-failed
              block w-full h-[45px] rounded-md border-[2px] border-els-10 py-0.5 
              ${touched && error && "text-failed border-failed"}
              ${className}
            `}
          />
          {props.name === "password" && (
            <button
              type="button"
              className="group absolute inset-y-0 right-0 block overflow-hidden rounded-r px-4 outline-none transition duration-75 ease-in-out"
              onClick={() => setIsPassHidden(!isPassHidden)}
            >
              {isPassHidden
                ? <EyeOff className="h-4 w-4 text-slate-300 group-hover:text-slate-400 marker:group-focus:text-slate-400" />
                : <Eye className="h-4 w-4 text-slate-300 group-hover:text-slate-400 group-focus:text-slate-400" />}
            </button>
          )}
        </div>
      </div>
      {touched && error && <span className="text-failed">{error}</span>}
    </div>
  );
};

export default CustomForm;

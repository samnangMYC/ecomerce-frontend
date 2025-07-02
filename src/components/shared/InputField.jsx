import React from "react";

const InputField = ({
  label,
  id,
  type = "text",
  errors,
  register,
  required = false,
  message = "This field is required",
  labelClassName = "",
  inputClassName = "",
  min,
  value,
  placeholder = "",
}) => {
  const baseStyles =
    "w-full px-4 py-3 border rounded-md bg-white text-slate-800 placeholder-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const errorStyles = errors?.[id]?.message ? "border-red-500" : "border-gray-300";

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className={`text-sm font-medium text-slate-700 ${labelClassName}`}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        className={`${baseStyles} ${errorStyles} ${inputClassName}`}
        {...register(id, {
          required: required ? { value: true, message } : false,
          minLength: min
            ? { value: min, message: `Minimum ${min} characters required.` }
            : undefined,
          pattern:
            type === "email"
              ? {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email address",
                }
              : type === "url"
              ? {
                  value:
                    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/\S*)?$/,
                  message: "Invalid URL format",
                }
              : undefined,
        })}
      />

      {errors?.[id]?.message && (
        <p className="text-sm text-red-600 font-medium mt-1">
          {errors[id].message}
        </p>
      )}
    </div>
  );
};

export default InputField;

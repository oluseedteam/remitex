import { useState } from 'react';
import CurrencyFlag from './CurrencyFlag';

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-3 border rounded-lg bg-white flex justify-between"
      >
        {value ? (
          <div className="flex gap-2 items-center">
            <CurrencyFlag currency={value.value} />
            {value.label}
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        ▼
      </button>

      {open && (
        <div className="absolute z-10 w-full bg-white border rounded-lg mt-1">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="w-full p-3 flex gap-2 hover:bg-blue-50"
            >
              <CurrencyFlag currency={opt.value} />
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

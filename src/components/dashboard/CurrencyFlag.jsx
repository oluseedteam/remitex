const CurrencyFlag = ({ currency, size = 'sm' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold`}
    >
      {currency?.slice(0, 2)}
    </div>
  );
};

export default CurrencyFlag;

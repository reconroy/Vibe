const Select = ({ children, defaultValue, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  
  return (
    <div className="relative">
      <button
        className="w-full px-3 py-2 text-left bg-white/5 border border-white/20 rounded-md text-white flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-white/20 rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ value, children, onClick }) => (
  <button
    className="w-full px-3 py-2 text-left text-white hover:bg-white/10"
    onClick={() => onClick?.(value)}
  >
    {children}
  </button>
);

export default { Select, SelectItem };

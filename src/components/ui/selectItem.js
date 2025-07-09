const SelectItem = ({ value, children, onClick }) => (
  <button
    className="w-full px-3 py-2 text-left text-white hover:bg-white/10"
    onClick={() => onClick?.(value)}
  >
    {children}
  </button>
);

export default SelectItem;
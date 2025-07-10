export const SelectItem = ({ value, children, onClick, onSelect, closeDropdown }) => {
  const handleClick = () => {
    onClick?.(value);
    onSelect?.(value, children);
    closeDropdown?.();
  };

  return (
    <button
      className="w-full px-3 py-2 text-left text-white hover:bg-white/10"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

SelectItem.displayName = "SelectItem";

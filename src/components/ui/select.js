import { useState } from "react";

export const Select = ({ children, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || "");

  const handleSelect = (value, label) => {
    setSelected(label);
    setIsOpen(false);
    // We trigger child’s onClick from SelectItem
  };

  return (
    <div className="relative">
      <button
        className="w-full px-3 py-2 text-left bg-white/5 border border-white/20 rounded-md text-white flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mb-2 bottom-full bg-gray-800 border border-white/20 rounded-md max-h-60 overflow-y-auto">
          {Array.isArray(children)
            ? children.map((child) =>
                child &&
                typeof child === "object" &&
                child.type?.displayName === "SelectItem"
                  ? {
                      ...child,
                      props: {
                        ...child.props,
                        onSelect: handleSelect,
                        closeDropdown: () => setIsOpen(false),
                      },
                    }
                  : child
              )
            : children}
        </div>
      )}
    </div>
  );
};

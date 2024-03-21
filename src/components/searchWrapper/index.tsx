const SearchInputWrapper = (props: any) => {
  const {
    children,
    showList,
    sampleData,
    handleSelect,
    style,
    field,
    selected,
  } = props;
  return (
    <div className="relative">
      {children}
      {showList && sampleData?.length > 0 && (
        <div
          className="overflow-auto max-h-56 absolute z-50 mt-1 w-full rounded-md bg-[#ffff] text-base shadow-lg sm:text-sm origin-top-right"
          role="menu"
          aria-labelledby="menu-button"
        >
          {sampleData.map((item: any) => {
            return (
              <button
                key={item.id}
                className="relative w-full cursor-default select-none py-2 pl-3 pr-9"
                onClick={() => handleSelect(item)}
                style={{
                  ...style,
                }}
              >
                <div className="flex items-center text-onPrimary cursor-pointer">
                  <span className="font-regular  ml-3 block truncate">
                    {item?.[field]}
                  </span>
                </div>
                {selected === item?.[field] && (
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
                    style={{
                      color:
                        selected === item?.[field]
                          ? "rgba(255, 255, 255, 0.04)"
                          : "#0F0D24",
                    }}
                  ></span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInputWrapper;

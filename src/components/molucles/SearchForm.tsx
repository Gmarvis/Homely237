import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchForm = () => {
  return (
    <form className="w-[30vw] border border-slate-400 flex items-center px-1 rounded ">
      <input
        type="text"
        className="outline-none bg-transparent border-none w-full py-2 text-sm text-gray-600"
        placeholder="What service do you need?"
      />
      <button>
        <FiSearch size={20} />
      </button>
    </form>
  );
};

export default SearchForm;

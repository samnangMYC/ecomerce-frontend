import React, { useState } from "react";
import { RiResetRightLine } from "react-icons/ri";

const Filter = ({ onFilterChange }) => {
  const categories = [
    { categoryId: 1, categoryName: "Electronics" },
    { categoryId: 2, categoryName: "Clothing" },
    { categoryId: 3, categoryName: "Book" },
  ];

  const sortOptions = [
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "nameAsc", label: "Name: A to Z" },
    { value: "nameDesc", label: "Name: Z to A" },
  ];

  

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    triggerFilterChange({ category: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    triggerFilterChange({ sortBy: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    triggerFilterChange({ searchTerm: e.target.value });
  };

  const resetFilters = () => {
    setCategory("All");
    setSortBy("");
    setSearchTerm("");
    if (onFilterChange)
      onFilterChange({ category: "All", sortBy: "", searchTerm: "" });
  };

  const triggerFilterChange = (changedField) => {
    if (!onFilterChange) return;
    onFilterChange({
      category,
      sortBy,
      searchTerm,
      ...changedField,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-full">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-grow min-w-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sort By</option>
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="bg-red-500 p-2 hover:cursor-pointer rounded-lg text-white hover:underline whitespace-nowrap"
        >
          <RiResetRightLine size={20} />
        </button>
      </div>
    </div>
  );
};

export default Filter;

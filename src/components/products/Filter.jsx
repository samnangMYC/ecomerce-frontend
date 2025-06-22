import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { RiResetRightLine } from "react-icons/ri";

const Filter = ({ categories }) => {


  const sortOptions = [
    { value: "asc", label: "Price: Low to High" },
    { value: "desc", label: "Price: High to Low" },
  ];

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "All";
    const currentSortOrder = searchParams.get("sortby") || "";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortBy(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        params.set("keyword", searchTerm);
      } else {
        params.delete("keyword");
      }
      navigate(`${pathName}?${params.toString()}`);
    }, 1200);

    return () => clearTimeout(handler);
  }, [searchTerm, navigate, pathName]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "All") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }

    navigate(`${pathName}?${params.toString()}`);
    setCategory(selectedCategory);
    triggerFilterChange({ category: selectedCategory });
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;

    if (selectedSort === "") {
      params.delete("sortby");
    } else {
      params.set("sortby", selectedSort);
    }

    navigate(`${pathName}?${params.toString()}`);
    setSortBy(selectedSort);
    triggerFilterChange({ sortBy: selectedSort });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    triggerFilterChange({ searchTerm: e.target.value });
  };

  const resetFilters = () => {
    navigate({ pathname: window.location.pathname });
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
             {cat.categoryName.charAt(0).toUpperCase() + cat.categoryName.slice(1)}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled hidden>
            Sort By
          </option>
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

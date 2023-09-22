import { useState, useEffect, useRef } from "react";
import { getTags } from "../services/tagServices";

function TradeFilterBar({ onFilter, startDate, endDate }) {
  // Local state for the filters
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [localSymbol, setLocalSymbol] = useState("");
  const [localTags, setLocalTags] = useState("At least one");
  const [localSelectedTags, setLocalSelectedTags] = useState([]);
  //states for the tags dropdown/functionality when selecting tage names to display
  const [tagInputValue, setTagInputValue] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([]);
  //make sure tags are only fetched once
  const [hasFetchedTags, setHasFetchedTags] = useState(false);
  //save tags so they can be reused
  const [savedTags, setSavedTags] = useState([]);

  // Refs for the dropdown
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setTagSuggestions([]); // Clear the suggestions to hide the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //handle api call to get tags and make sure it only happens once
  const fetchTagSuggestions = async () => {
    if (!hasFetchedTags) {
      const fetchedTags = await getTags();
      const tagArray = fetchedTags.data.tags.map((tag) => tag.tag_name);
      setSavedTags(tagArray);
      setTagSuggestions(tagArray);
      setHasFetchedTags(true); // Set to true after fetching
    } else {
      setTagSuggestions(savedTags);
    }
  };

  //function to handle the tag input change
  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInputValue.trim() !== "") {
      setLocalSelectedTags((prev) => [...prev, tagInputValue.trim()]);
      setTagInputValue("");
    }
  };

  //check if the tag is already in the array
  const handleAddTag = (tag) => {
    if (!localSelectedTags.includes(tag)) {
      setLocalSelectedTags((prevTags) => [...prevTags, tag]);
      setInputValue(""); // Clear the input after adding the tag
    }
  };

  const handleRemoveTag = (tag) => {
    setLocalSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleTagClick = (tag) => {
    setLocalSelectedTags((prev) => [...prev, tag]);
  };

  const handleFilter = () => {
    onFilter(
      localStartDate,
      localEndDate,
      localSymbol,
      localTags,
      localSelectedTags
    ); // send the filter criteria back to parent
  };

  return (
    <div className="bg-gray-800 text-white p-4 sm:p-2">
      <div className="flex flex-wrap items-center">
        {/* Symbol Input */}
        <div className="flex items-center mr-4 sm:mr-2 mb-2">
          <label htmlFor="symbol" className="mr-2">
            Symbol:
          </label>
          <input
            type="text"
            id="symbol"
            placeholder="Symbol"
            value={localSymbol}
            onChange={(e) => setLocalSymbol(e.target.value)}
            className="form-input p-1 rounded bg-gray-700 text-white"
          />
        </div>

        {/* Tags Dropdown */}
        <div className="flex items-center mr-4 sm:mr-2 mb-2">
          <label htmlFor="tagsDropdown" className="mr-2">
            Tags:
          </label>
          <select
            id="tagsDropdown"
            value={localTags}
            onChange={(e) => setLocalTags(e.target.value)}
            className="form-select-sm bg-gray-700 text-white p-1 rounded mr-4 pr-8"
          >
            <option value="atLeastOne" className="bg-gray-700">
              At least one
            </option>
            <option value="all" className="bg-gray-700">
              All
            </option>
          </select>
        </div>

        {/* Select Tags Input */}
        <div className="flex items-center mb-2">
          {/* Add relative here for positioning */}
          <label htmlFor="selectTags" className="mr-2">
            Select Tags:
          </label>

          <div className="relative flex-grow flex items-center p-1 border border-gray-600 rounded">
            {localSelectedTags.map((tag) => (
              <span
                key={tag}
                className="mr-2 bg-blue-500 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button
                  className="ml-1 text-white"
                  onClick={() => handleRemoveTag(tag)}
                >
                  x
                </button>
              </span>
            ))}

            <input
              ref={inputRef}
              type="text"
              id="selectTags"
              value={tagInputValue}
              onChange={(e) => setTagInputValue(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              onFocus={fetchTagSuggestions}
              placeholder="Select Tags"
              className="form-input bg-transparent p-1 flex-grow rounded text-white outline-none"
              style={{ boxShadow: "none" }} // to remove default styling if any
            />

            {tagSuggestions && inputRef.current === document.activeElement && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 bg-gray-700 border border-gray-600 mt-1 rounded w-full max-h-40 overflow-y-auto"
              >
                {tagSuggestions.map((tag) => (
                  <div
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="cursor-pointer p-2 hover:bg-gray-600"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date Range, Filter & Clear sections */}
        <div className="flex flex-wrap items-center mb-2">
          <span className="mr-2">Date Range - </span>

          {/* Start Date Group */}
          <div className="flex items-center mr-4 sm:mr-2">
            <label htmlFor="startDate" className="mr-2">
              Start:
            </label>
            <input
              type="date"
              value={localStartDate}
              onChange={(e) => setLocalStartDate(e.target.value)}
              id="startDate"
              className="form-input p-1 rounded bg-gray-700 text-white"
            />
          </div>

          {/* End Date Group */}
          <div className="flex items-center mr-4 sm:mr-2">
            <label htmlFor="endDate" className="mr-2">
              End:
            </label>
            <input
              type="date"
              value={localEndDate}
              onChange={(e) => setLocalEndDate(e.target.value)}
              id="endDate"
              className="form-input p-1 rounded bg-gray-700 text-white"
            />
          </div>

          {/* Filter & Clear Buttons Group */}
          <div className="flex items-center">
            <button
              className="btn bg-blue-600 hover:bg-blue-500 text-white border border-blue-400 p-1 rounded mr-2"
              onClick={handleFilter}
            >
              Filter
            </button>
            <button className="btn bg-red-600 hover:bg-red-500 text-white border border-red-400 p-1 rounded">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeFilterBar;

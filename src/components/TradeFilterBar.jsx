import { useState, useRef, useEffect } from "react";
import { getTags } from "../services/tagService";

function TradeFilterBar({ onFilter, startDate, endDate, initialTags }) {
  // Local state for the filters
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [localSymbol, setLocalSymbol] = useState("");
  const [localSelectedTags, setLocalSelectedTags] = useState([]);
  const [localSelectedTagOption, setLocalSelectedTagOption] =
    useState("atLeastOne");

  //for tags
  const [initialTagsFromFetch, setInitialTagsFromFetch] = useState([]);
  const [tags, setTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const wrapperRef = useRef(null);

  const handleFilter = () => {
    onFilter(
      localStartDate,
      localEndDate,
      localSymbol,
      //send back only the ids of the selected tags. This makes it easier to filter.
      localSelectedTags.map(tag => tag.id),
      localSelectedTagOption
    ); // send the filter criteria back to parent
  };

  useEffect(() => {
    async function fetchTags() {
      const response = await getTags();
      const tags = response.data.tags;
      //get each tags_name and put into array
      const tagsArray = tags.map((tag) => ({ id: tag.id, name: tag.tag_name }));
      //set initial tags from fetch
      setInitialTagsFromFetch(tagsArray);
      //set tags to initial tags from fetch for first load
      setTags(tagsArray);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
        const matchingTag = initialTagsFromFetch.find(t => t.name === inputValue.trim());
        if (matchingTag) {
            addTag(matchingTag);
            setInputValue("");
        }
    }
};

  const addTag = (tag) => {
    setLocalSelectedTags((prev) => [...prev, tag]);
    setTags(initialTagsFromFetch.filter((t) => t.id !== tag.id));
    setInputValue(""); 
};

const removeTag = (tag) => {
  setLocalSelectedTags(localSelectedTags.filter((t) => t.id !== tag.id));
  setTags((prev) => [...prev, tag]);
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
            value={localSelectedTagOption}
            onChange={(e) => setLocalSelectedTagOption(e.target.value)}
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
        <div className="flex-grow flex items-center mr-4 sm:mr-2 mb-2">
          <label htmlFor="selectTags" className="mr-2">
            Select Tags:
          </label>
          <div className="flex relative flex-grow" ref={wrapperRef}>
            <input
              type="text"
              id="selectTags"
              placeholder="Select Tags"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setTags(
                  initialTagsFromFetch.filter((tag) =>
                    tag.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                );
              }}
              onKeyDown={(e) => handleKeyDown(e)}
              className="form-input p-1 rounded bg-gray-700 text-white"
              onClick={() => setShowDropdown(true)}
            />
            <div className="flex ml-2">
              {localSelectedTags.map((tag) => (
                <div
                  key={tag.id}
                  className="mr-2 bg-blue-500 p-1 rounded text-white"
                >
                  {tag.name}
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    x
                  </span>
                </div>
              ))}
            </div>
            {showDropdown && (
              <div className="absolute w-full top-full mt-1 bg-gray-700 border z-10">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    onClick={() => addTag(tag)}
                    className="p-2 hover:bg-gray-900 cursor-pointer"
                  >
                    {tag.name}
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
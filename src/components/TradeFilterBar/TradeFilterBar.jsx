import { useState, useRef, useEffect } from "react";
import { getTags } from "../../services/tagService";
import { useGlobalState } from "../../../context/GlobalStateContext";
import { resetTagsDropdown } from "../../utils/resetTagDropdown";

function TradeFilterBar({
  onFilter,
  startDate,
  endDate,
  today,
  thirtyDaysAgo,
}) {
  const {
    isTradeTagBeingAltered,
    localSelectedTags,
    setLocalSelectedTags,
    initialTagsFromFetch,
    setInitialTagsFromFetch,
    tags,
    setTags,
  } = useGlobalState();

  // Local state for the filters
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [localSymbol, setLocalSymbol] = useState("");
  // const [localSelectedTags, setLocalSelectedTags] = useState([]);
  const [localSelectedTagOption, setLocalSelectedTagOption] =
    useState("atLeastOne");

  //for tags
  // const [initialTagsFromFetch, setInitialTagsFromFetch] = useState([]);
  // const [tags, setTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //states for when updates are made to the tradefilterbar

  const wrapperRef = useRef(null);

  const handleFilter = () => {
    onFilter(
      localStartDate,
      localEndDate,
      localSymbol,
      //send back only the ids of the selected tags. This makes it easier to filter.
      localSelectedTags.map((tag) => tag.id),
      localSelectedTagOption
    ); // send the filter criteria back to parent
  };

  //handle clear button
  const handleClear = () => {
    setLocalStartDate(thirtyDaysAgo);
    setLocalEndDate(today);
    setLocalSymbol("");
    setLocalSelectedTags([]);
    setLocalSelectedTagOption("atLeastOne");
    onFilter(thirtyDaysAgo, today, "", [], "atLeastOne");
    // Call the utility function to get the updated tags
    const updatedTags = resetTagsDropdown(initialTagsFromFetch, []);
    // Set the updated tags to your component's state
    setTags(updatedTags);
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
  }, [isTradeTagBeingAltered]);

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
      const matchingTag = initialTagsFromFetch.find(
        (t) => t.name === inputValue.trim()
      );
      if (matchingTag) {
        addTag(matchingTag);
        setInputValue("");
      }
    }
  };

  const addTag = (tag) => {
    if (!localSelectedTags.some((t) => t.id === tag.id)) {
      setLocalSelectedTags((prev) => {
        const newSelectedTags = [...prev, tag];
        const updatedTags = resetTagsDropdown(
          initialTagsFromFetch,
          newSelectedTags
        );
        setTags(updatedTags);
        return newSelectedTags;
      });
    }
  };

  const removeTag = (tag) => {
    setLocalSelectedTags((prevSelected) => {
      const newSelectedTags = prevSelected.filter((t) => t.id !== tag.id);
      const updatedTags = resetTagsDropdown(
        initialTagsFromFetch,
        newSelectedTags
      );
      setTags(updatedTags);
      return newSelectedTags;
    });
  };

  // const resetTagsDropdown = (currentSelectedTags) => {
  //   setTags(
  //     initialTagsFromFetch.filter(
  //       (tag) => !currentSelectedTags.some((t) => t.id === tag.id)
  //     )
  //   );
  // };

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
        <div className="flex items-center mb-2">
          {/* Add relative here for positioning */}
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
                    tag.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  )
                );
              }}
              onKeyDown={(e) => handleKeyDown(e)}
              className="form-input p-1 rounded bg-gray-700 text-white"
              onClick={() => setShowDropdown(true)}
              autoComplete="off"
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
              className="text-white border p-1 rounded mr-2  hover:bg-gray-400"
              onClick={handleFilter}
            >
              Filter
            </button>
            <button
              className="text-white border p-1 rounded hover:bg-gray-400"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeFilterBar;

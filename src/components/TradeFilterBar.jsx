function TradeFilterBar() {
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
          <input
            type="text"
            id="selectTags"
            placeholder="Select Tags"
            className="form-input flex-grow p-1 rounded bg-gray-700 text-white"
          />
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
              id="endDate"
              className="form-input p-1 rounded bg-gray-700 text-white"
            />
          </div>

          {/* Filter & Clear Buttons Group */}
          <div className="flex items-center">
            <button className="btn bg-blue-600 hover:bg-blue-500 text-white border border-blue-400 p-1 rounded mr-2">
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

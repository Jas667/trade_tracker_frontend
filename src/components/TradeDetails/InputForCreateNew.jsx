function InputForCreateNew({ value, onChange }) {
  return (
    <div className="p-4">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter Tags (separated by commas)"
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default InputForCreateNew;

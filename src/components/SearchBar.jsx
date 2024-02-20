function SearchBar({ onSearch, input, setInput, suggestions, setSuggestions, handleInputChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    setInput(''); // Optionally clear the input upon submission
    setSuggestions([]); // Optionally clear suggestions upon submission
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion); // Set input to the selected suggestion
    onSearch(suggestion); // Optionally perform the search immediately upon selecting a suggestion
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex' }}>
        <input
          type="text"
          value={input}
          placeholder="Enter city name"
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {suggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar
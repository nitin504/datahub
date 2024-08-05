import React, { Component } from 'react';

class CompanySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const { query } = this.state;
    if (query) {
      // Simulate a search operation (replace with actual API call)
      const mockData = ['Company A', 'Company B', 'Company C'];
      const results = mockData.filter(company =>
        company.toLowerCase().includes(query.toLowerCase())
      );
      this.setState({ results });
    }
  };

  render() {
    const { query, results } = this.state;

    return (
      <div style={styles.container}>
        <input
          type="text"
          value={query}
          onChange={this.handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && this.handleSearch()}
          placeholder="Search for companies"
          style={styles.input}
        />
        <button onClick={this.handleSearch} style={styles.button}>
          Search
        </button>
        <div style={styles.resultsContainer}>
          {results.length > 0 ? (
            results.map((company, index) => (
              <div key={index} style={styles.resultItem}>
                {company}
              </div>
            ))
          ) : (
            <div style={styles.noResults}>No results found</div>
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    background: 'linear-gradient(to right, #4A90E2, #003DA5)',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: 'auto',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    background: '#ffffff',
    color: '#4A90E2',
    cursor: 'pointer',
  },
  resultsContainer: {
    marginTop: '10px',
    background: 'white',
    borderRadius: '5px',
    padding: '10px',
    maxHeight: '150px',
    overflowY: 'auto',
  },
  resultItem: {
    padding: '5px 0',
  },
  noResults: {
    color: '#888',
  },
};

export default CompanySearch;

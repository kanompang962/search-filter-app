
import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchWords, setSearchWords] = useState('');
  const [dataFilter, setDataFilter] = useState(['name', 'capital']);

  useEffect(() => {
    fetch(`https://restcountries.com/v2/all`)
      .then(response => response.json())
      .then(data => setCountries(data));
  }, []);

  const searchCountries = (countries) => {
    return countries.filter((item) => {
      return dataFilter.some((filter) => {
        if (item[filter]) {
          return item[filter].toString().toLowerCase().indexOf(searchWords.toLowerCase()) > -1;
        }
      })
    })
  };

  return (
    <div className="App">
      <h1>Filter App</h1>
      <div className='main-container'>
        <div className='search-container'>
          <label htmlFor='search-form'>
            <input type='text' className='search-input' placeholder='ค้นหาข้อมูล'
              onChange={(e) => setSearchWords(e.target.value)}
              value={searchWords} />
          </label>
        </div>
        <div className='container'>
          {
            searchCountries(countries).map((item, index) => (
              <div className='card'
                key={index}>
                <div className='card-title'>
                  <img src={item.flag} alt={item.name} />
                </div>
                <div className='card-body'>
                  <div className='card-description'>
                    <h3>{item.name}</h3>
                    <div className='card-list'>
                      <div>ประชากร:<span> {item.population}</span></div>
                      <div>ภูมิภาค: <span>{item.region}</span></div>
                      <div>เมืองหลวง: <span>{item.capital}</span></div>
                    </div>
                  </div>
                </div>

              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;

import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(() => {
        return {monsters: users}
      },
      () => console.log(users)
      ))
  }

  // changes search state
  onSearchChange = (e) => {
    const searchField = e.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  }

  
  render() {

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // array of filtered (searching) monsters
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <SearchBox 
          className='monsters-search-box' 
          placeholder='search monsters' 
          onChangeHandler={onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;

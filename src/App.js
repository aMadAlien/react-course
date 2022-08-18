import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
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

  render() {
    return (
      <div className="App">
        <input 
          className='search-box' 
          type="search" 
          placeholder='search monsters' 
          onChange={(e) => {
            console.log(e.target.value);
            const searchStr = e.target.value.toLocaleLowerCase();
            const filteredMonsters = this.state.monsters.filter((monster) => {
              return monster.name.toLocaleLowerCase().includes(searchStr);
            });

            this.setState(() => {
              return { monsters: filteredMonsters };
            });
          }}
        />
        {this.state.monsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;

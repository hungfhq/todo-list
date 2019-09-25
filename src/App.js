import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

class App extends Component {
  constructor() {
    super();
    this.todoItems = [
      'Wash clothes',
      'Empty trash bin',
      'Clean the bike'
    ];
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {
            this.todoItems
              .map((item, index) => <TodoItem key={index} title={item} />)
          }
        </header>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

class App extends Component {
  constructor() {
    super();
    this.todoItems = [
      { title: 'Wash clothes', isComplete: true },
      { title: 'Empty trash bin', isComplete: false },
      { title: 'Clean the bike', isComplete: false }
    ];
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {
            this.todoItems.length > 0 &&
            this.todoItems
              .map((item, index) =>
                <TodoItem key={index} item={item} />)
          }
          {
            this.todoItems.length === 0 && <div>Nothing here</div>
          }
        </header>
      </div>
    );
  }
}

export default App;

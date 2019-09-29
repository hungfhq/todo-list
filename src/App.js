import React, { Component } from 'react';
import classNames from 'classnames';
import './App.css';
import TodoItem from './components/TodoItem';
import tick from './img/tick.svg';

class App extends Component {

  constructor() {
    super();
    this.state = {
      newItem: '',
      todoItems: [
        { title: 'Wash clothes', isComplete: true },
        { title: 'Empty trash bin', isComplete: false },
        { title: 'Clean the bike', isComplete: false }
      ],
      allIsTicked: false,
      filterState: [
        {
          title: 'All',
          selected: true
        },
        {
          title: 'Active',
          selected: false
        },
        {
          title: 'Completed',
          selected: false
        }
      ]
    };
  }

  onItemClicked(item) {
    return () => {

      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = this.state.todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
    }
  }

  checkIsAllComplete = () => {
    if (this.state.todoItems.find(item => item.isComplete === false) === undefined) {
      this.setState({
        allIsTicked: true
      });
    } else {
      this.setState({
        allIsTicked: false
      });
    }
  }

  onTickClicked = () => {
    const { todoItems } = this.state;
    this.setState({
      todoItems:
        todoItems.map(item => {
          return {
            title: item.title,
            isComplete: !this.state.allIsTicked
          }
        })
    });
  }

  onKeyUp = (event) => {
    if (event.keyCode === 13) { // Enter key is pressed
      const text = event.target.value.trim();
      if (!text) {
        return;
      }
      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems
        ]
      });
    }
  }

  onChange = (event) => {
    this.setState({
      newItem: event.target.value
    });
  }

  removeItem(item) {
    const index = this.state.todoItems.indexOf(item);
    const { todoItems } = this.state;
    this.setState({
      todoItems: [
        ...todoItems.slice(0, index),
        ...todoItems.slice(index + 1)
      ]
    });
  }

  clearCompleted = () => {
    this.setState({
      todoItems: this.state.todoItems.filter(item => item.isComplete === false)
    });
  }

  selectFilterState(item) {
    return () => {
      const { filterState } = this.state;
      const index = filterState.indexOf(item);
      let temp = filterState.map(e => {
        return {
          title: e.title,
          selected: false
        }
      });
      temp[index].selected = true;
      this.setState({
        filterState: temp
      });
    }
  }

  render() {
    const { todoItems, newItem, filterState } = this.state;
    const filter = filterState.find(e => e.selected);
    let filterTodoItems = todoItems;
    if (filter.title === 'Active') {
      filterTodoItems = todoItems.filter(e => e.isComplete === false);
    }
    if (filter.title === 'Completed') {
      filterTodoItems = todoItems.filter(e => e.isComplete === true);
    }
    return (
      <div className="App" onLoad={this.checkIsAllComplete}>
        <header className="App-header">
          <div className="Container">
            <div className="Add-todo">
              <img
                className={classNames('All-is-not-ticked', {
                  'All-is-ticked': this.state.allIsTicked === true
                })}
                src={tick}
                alt=""
                width="30"
                height="30"
                onClick={this.onTickClicked}
              />
              <input
                type="text"
                placeholder="Add todo..."
                onKeyUp={this.onKeyUp}
                value={newItem}
                onChange={this.onChange}
              />
            </div>
            {
              todoItems.length > 0 &&
              filterTodoItems
                .map(
                  (item, index) =>
                    <TodoItem
                      key={index}
                      item={item}
                      removeItem={() => this.removeItem(item)}
                      onClick={this.onItemClicked(item)}
                      checkIsAllComplete={this.checkIsAllComplete}
                    />
                )
            }
            {
              todoItems.length === 0 && <div>Nothing here</div>
            }
            <div className='Footer'>
              <span>
                {todoItems.filter(item => item.isComplete === false).length} item(s) left
              </span>
              <div className='Filter'>

                {
                  filterState.map((item, index) =>
                    <a href={'#/' + item.title}
                      className={classNames('Filter-state', {
                        'Filter-state-selected': item.selected === true
                      })} key={index} onClick={this.selectFilterState(item)}> {item.title}</a>
                  )}

              </div>
              <span className='ClearButton' onClick={this.clearCompleted}>
                clear completed
              </span>
            </div>
          </div>
        </header>
      </div >
    );
  }
}

export default App;

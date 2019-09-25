import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
  render() {
    const { item } = this.props;
    let className = 'TodoItem';
    if (item.isComplete) {
      className += ' TodoItem-complete';
    }
    return (
      <div className={className}>
        <input type='checkbox' checked={item.isComplete} />
        <span>{this.props.item.title}</span>
      </div>
    )
  }
}

export default TodoItem;
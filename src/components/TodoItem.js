import React, { Component } from 'react';
import classNames from 'classnames';
import './TodoItem.css';
import before from '../img/before.svg';
import after from '../img/after.svg';

class TodoItem extends Component {

  render() {
    const { item, onClick } = this.props;
    let img = before;
    if (item.isComplete) {
      img = after;
    }
    return (
      <div className='TodoItem'>
        <img onClick={onClick}
          src={img}
          alt=""
          width="50px" />
        <span
          className={classNames('Title', {
            'TodoItem-complete': item.isComplete === true
          })}>
          {this.props.item.title}
        </span>
        <span className='DeleteButton'
          onClick={this.props.removeItem}
        >x</span>
      </div>
    )
  }
}

export default TodoItem;
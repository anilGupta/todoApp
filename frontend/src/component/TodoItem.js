import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

const TodoItem = ({ id, title, description, handleAction}) => {
  return (
    <div>
      <h3>
        {title}
        <div>
           <span onClick={handleAction.bind(null, 'delete')}>delete</span>
           <span onClick={handleAction.bind(null, 'archive')}>archive</span>
        </div>
      </h3>
      <p>{description}</p>
    </div>
  )
}


export default TodoItem;

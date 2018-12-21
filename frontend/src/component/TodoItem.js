import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import ItemStyles from './styles/ItemStyles';
import { Edit, Delete, Archive, Unarchive } from 'styled-icons/material';

const TodoItem = ({ id, title, archive, description, handleAction}) => {
  return (
    <ItemStyles archive={archive}>
      <h3>
        {title}
      </h3>
      <p>{description}</p>
      <div className="buttonList">
        <NavLink to={`/todo/${id}/edit`}><Edit size="18" title="add todos" /> &nbsp;Edit</NavLink>
        <NavLink to="#" onClick={handleAction.bind(null, 'archive')} >
          {archive
            ? <Archive size="18" title="archive todos" />
            : <Unarchive  size="18" title="un-archive todos"  />
          }
           &nbsp;{archive ? 'Restore': 'Archive'}
         </NavLink>
        <NavLink to="#" className="danger" onClick={handleAction.bind(null, 'delete')} ><Delete size="18" title="archive todos" /> &nbsp;Delete</NavLink>
      </div>
    </ItemStyles>
  )
}


export default TodoItem;

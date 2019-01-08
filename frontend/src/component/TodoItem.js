import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ItemStyles from './styles/ItemStyles';
import {
  Edit,
  Delete,
  Archive,
  Unarchive,
  AttachFile,
} from 'styled-icons/material';
import { FilePdf, FileExcel, File, FileWord } from 'styled-icons/fa-regular';
import { baseUrl } from '../constants/Urls';

const TodoItem = ({
  id,
  title,
  archive,
  description,
  handleAction,
  attachment,
}) => {
  return (
    <ItemStyles archive={archive}>
      <h3>
        {title}
      </h3>
      <p>{description}</p>
      {
        attachment
        <div className="attachments">
          <a href={`${baseUrl}/Attachments/files/download/${attachment.name}`}>
            {attachment.type.includes('image') ? (
              <img
                src={`${baseUrl}/Attachments/files/download/${attachment.name}`}
                alt={attachment.name}
              />
            ) : attachment.type.includes('excel') ? (
              <FileExcel size="42" title={attachment.name} />
            ) : attachment.type.includes('pdf') ? (
              <FilePdf size="42" title={attachment.name} />
            ) : attachment.type.includes('word') ? (
              <FileWord size="42" title={attachment.name} />
            ) : (
              <File size="42" title={attachment.name} />
            )}
          </a>
          <AttachFile size="28" className="pin" />
        </div>
      ) : null}
      <div className="buttonList">
        <NavLink to={`/todo/${id}/edit`}>
          <Edit size="18" title="add todos" /> &nbsp;Edit
        </NavLink>
        <NavLink to="#" onClick={handleAction.bind(null, 'archive')}>
          {archive
            ? <Archive size="18" title="archive todos" />
          ) : (
            <Unarchive size="18" title="un-archive todos" />
          )}
          &nbsp;{archive ? 'Restore' : 'Archive'}
        </NavLink>
        <NavLink
          to="#"
          className="danger"
          onClick={handleAction.bind(null, 'delete')}
        >
          <Delete size="18" title="archive todos" /> &nbsp;Delete
        </NavLink>
      </div>
    </ItemStyles>
  );
};


export default TodoItem;

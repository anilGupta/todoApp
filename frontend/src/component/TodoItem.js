/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Edit,
  Delete,
  Archive,
  Unarchive,
  AttachFile,
} from 'styled-icons/material';
import { FilePdf, FileExcel, File, FileWord } from 'styled-icons/fa-regular';
import ItemStyles from './styles/ItemStyles';
import { baseUrl } from '../constants/Urls';

const TodoItem = ({
  id,
  title,
  archive,
  description,
  handleAction,
  attachment,
}) => {
  const [file] = attachment && attachment.length ? attachment : [];
  return (
    <ItemStyles archive={archive}>
      <h3>{title}</h3>
      <p>{description}</p>
      {file ? (
        <div className="attachments">
          <a href={`${baseUrl}/Attachments/files/download/${file.name}`}>
            {file.type.includes('image') ? (
              <img
                src={`${baseUrl}/Attachments/files/download/${file.name}`}
                alt={file.name}
              />
            ) : attachment.type.includes('excel') ? (
              <FileExcel size="42" title={file.name} />
            ) : attachment.type.includes('pdf') ? (
              <FilePdf size="42" title={file.name} />
            ) : attachment.type.includes('word') ? (
              <FileWord size="42" title={file.name} />
            ) : (
              <File size="42" title={file.name} />
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
          {archive ? (
            <Archive size="18" title="archive todos" />
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

TodoItem.defaultProps = {
  archive: false,
  attachment: [],
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  archive: PropTypes.bool,
  description: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
  attachment: PropTypes.array,
};

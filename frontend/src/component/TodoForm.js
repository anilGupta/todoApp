import React, { Component } from 'react'
import { Spinner } from '../component';
import Form from '../component/styles/Form';
import { ToastContainer, toast  } from 'react-toastify';
import Dropzone from 'react-dropzone';
import { RemoveCircleOutline } from 'styled-icons/material';


const Priorities = ['Low', 'Medium', 'High'];

class TodoForm extends React.Component {
  constructor(props){
      super(props);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onDrop       = this.onDrop.bind(this);
      this.onCancel     = this.onCancel.bind(this);
      this.state = {
        id: null,
        title: '',
        description: '',
        priorities: null,
        files: null,
        attaching: false,
        attachFile: false,
        removeFile: false
      };
  }


  handleSubmit(e){
    e.preventDefault();
    this.props.handleSubmit(this.state).then(res => {
      if(!res.error){
        toast(`Todo ${this.state.id ? 'Updated': 'Created'} Successfully`);
        setTimeout(()=> {
          this.props.history.push("/")
        },2000)
      }
    })
  }

  handleLogout(e){
     e.preventDefault();
     this.props.logout()
  }

  componentDidMount(){
     if(this.props.data){
        this.setState(this.props.data)
     }
  }

  onDrop(files) {
    if(files.length){
        this.setState({files: files[0], attaching: true, attachFile: true});
    }else{
        toast(`Please Select valid files types (Images, Text, Word, PDF, Excel)`);
    }
  }

  onCancel() {
    this.setState({
      files: null,
      removeFile: !!this.props.data.attachment,
      attaching: false,
      attachFile: false
    });
  }

  handleChange(e){
    const el = e.target;
    this.setState({
      [el.name] : el.value
    })
  }

  render() {
    const { loading, error, errorDetails } = this.props,
          { id, title, description, files, removeFile, attachment, priorities } = this.state,
            isValidForm = title && description,
            submitProps = isValidForm ? {} : {disabled: 'disabled', className: 'disabled'},
            label = id ? 'Update': 'Create';

            if(loading){
              return <Spinner/>
            }

            return (
              <Form method="post" onSubmit={this.handleSubmit} full={true}>
                <h2>{label} Todo</h2>
                <fieldset disabled={false} aria-busy={false}>
                  { error
                    ? <ul className="error">
                      {Object.keys(errorDetails).map((err, key) => {
                        return <li key={key}> -- {err} {errorDetails[err]}</li>
                      })}
                    </ul> : null}
                  <label htmlFor="email"> Title
                    <input type="input" name="title" placeholder="title" value={title} onChange={this.handleChange} />
                  </label>

                  <label htmlFor="email"> Description
                    <textarea name="description" placeholder="description" value={description} onChange={this.handleChange} />
                  </label>

                  <label htmlFor="email"> Priorities
                    <select name="priorities"  onChange={this.handleChange}>
                      {Priorities.map(item => {
                        const props = item === priorities ? { selected: 'selected'} : {};
                        return <option value={item} key={item} {...props}>{item}</option>
                      })}
                    </select>
                  </label>

                  {attachment && !removeFile
                    ?  <div className="upload-container" onClick={this.onCancel}>
                          <p>{attachment.originalFilename}</p>
                          <span className="remove-attachment"><RemoveCircleOutline size="24" title="todos" /> Remove Attachment</span>
                       </div>
                    : files
                      ? <div className="upload-container" onClick={this.onCancel}>
                          <p>{files.name}</p>
                          <span className="remove-attachment"><RemoveCircleOutline size="24" title="todos" /> Remove Attachment</span>
                        </div>
                      : <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        onFileDialogCancel={this.onCancel.bind(this)}
                        accept={['image/jpg', 'image/jpeg', 'image/png', 'application/vnd.ms-excel', 'application/docx','application/pdf','text/plain','application/msword','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',]}
                        >
                          {({getRootProps, getInputProps}) => (
                            <div className="upload-container" {...getRootProps()}>
                              <input {...getInputProps()} />
                              <p>Click or drop files here, for attachment (images/docs/spreadsheet)</p>
                            </div>
                          )}
                      </Dropzone>
                    }
                  <button type="submit" {...submitProps} >{label}</button>
                </fieldset>
                <ToastContainer hideProgressBar={true} />
              </Form>
            );
  }
}
export default TodoForm;

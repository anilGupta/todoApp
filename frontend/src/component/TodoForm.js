import React, { Component } from 'react'
import { Spinner } from '../component';
import Form from '../component/styles/Form';
import { ToastContainer, toast  } from 'react-toastify';
import Dropzone from 'react-dropzone';


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
        files: [],
        attaching: false
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
    this.setState({files: files[0], attaching: true});
    this.props.attachFiles(files).then(res => {

    });

    //console.log("files", files);

  }

  onCancel() {
    this.setState({
      files: []
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
          { id, title, description } = this.state,
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

                  <Dropzone onDrop={this.onDrop.bind(this)} onFileDialogCancel={this.onCancel.bind(this)} >
                    {({getRootProps, getInputProps}) => (
                      <div className="upload-container" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Click or drop files here, for attachment (images/docs/spreadsheet)</p>
                      </div>
                    )}
                  </Dropzone>

                  <button type="submit" {...submitProps} >{label}</button>
                </fieldset>
                <ToastContainer hideProgressBar={true} />
              </Form>
            );
  }
}
export default TodoForm;

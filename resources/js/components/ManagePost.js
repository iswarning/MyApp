import Axios from 'axios';
import { countBy, thru } from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ManagePost extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: 0,
            title: '',
            content: '',
            posts: [],
            flag: null,
            errors : {}
        };

    }

    componentDidMount(){
        this.getAll();
    }

    getAll(){
        Axios.get('/api/post')
            .then((res) => {
                this.setState({
                    posts: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getOne(post){
        this.setState({
            id: post.id,
            title: post.title,
            content: post.content
        });
    }

    deleteOne(id){
        Axios.delete('/api/post/'+ id)
            .then((res) => {
                this.getAll();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    submit(event,id){
        event.preventDefault();
        if(this.state.id == 0){
            Axios.post('/api/post', {
                    title: this.state.title,
                    content: this.state.content
                })
                .then((res) => {
                    this.getAll();
                    this.setState({
                        flag: true
                    });
                })
                .catch((err) => {
                    this.setState({
                        flag: false,
                        errors: err.response.data.errors
                    });
                });
        }else{
            Axios.put('/api/post/'+id, {
                    title: this.state.title,
                    content: this.state.content
                })
                .then((res) => {
                    this.getAll();
                })
                .catch((err) => {
                    this.setState({
                        flag: false,
                        errors: err.response.data.errors
                    });
                });
        }



    }

    titleChange(event){
        this.setState({
            title: event.target.value
        });
    }

    contentChange(event){
        this.setState({
            content: event.target.value
        });
    }

    resetForm(e){
        this.setState({
            id: 0,
            title: '',
            content: '',
            flag: null,
            errors: {}
        });
        document.getElementById('submitForm').reset();
    }

    render(){
        const errors = Array(this.state.errors);

        return (
            <div className="container">
                <button className='btn btn-success btn-sm' onClick={(e)=>this.resetForm(e)}>Reset</button><hr/>
                {
                    this.state.flag == false ? errors.map(error=>
                        <div key={error.toString()}>
                            { error.title !== undefined ? <div className='alert alert-danger'>{error.title}</div> : <div></div> }
                            { error.content !== undefined ? <div className='alert alert-danger'>{error.content}</div> : <div></div> }
                        </div>
                    ) : <div></div>
                }
                <div className='row'>
                    <div className='col-md-12'>
                        <form onSubmit={(e)=>this.submit(e, this.state.id)} id='submitForm'>
                            <div className='form-group'>
                                <label>Title: </label>
                                <input onChange={(e)=>this.titleChange(e)} type='text' className='form-control' value={this.state.title}/>
                            </div>
                            <div className='form-group'>
                                <label>Content: </label>
                                <textarea onChange={(e)=>this.contentChange(e)} className='form-control' rows='2' value={this.state.content}></textarea>
                            </div>
                            <button type='submit' className='btn btn-primary btn-sm'>Save</button>
                        </form>
                    </div>
                </div><br/>
                <div className='row'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.posts.map(post =>
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td><button onClick={(e)=>this.getOne(post)} className='btn btn-outline-success btn-sm'>Edit</button></td>
                                <td><button onClick={(e)=>this.deleteOne(post.id)} className='btn btn-outline-danger btn-sm'>Delete</button></td>
                            </tr>
                            )}


                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default ManagePost;

if (document.getElementById('example')) {
    ReactDOM.render(<ManagePost />, document.getElementById('example'));
}

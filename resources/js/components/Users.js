import React, {Component} from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import { countBy, thru } from 'lodash';

const initialState = {
    users: [],
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 2,
    errors: {},
    flag: null,
    success: ''
};

class Users extends React.Component {
    constructor(props){
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.getAll();
    }

    getAll(){
        Axios.get('/api/user')
            .then(res => {
                this.setState({
                    users: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getOne(user){
        document.getElementById('password').setAttribute("readonly","readonly");
        this.setState({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            password: user.password
        });
    }

    deleteOne(id){
        Axios.delete('/api/user/' + id)
            .then(res => {
                this.getAll();
            })
            .catch(err => {
                console.log(err);
            });
    }

    submit(e, id){
        e.preventDefault();
        if(this.state.id == 0)
        {
            Axios.post('/api/user', {
                name: this.state.name,
                email: this.state.email,
                role: this.state.role,
                password: this.state.password
            })
            .then(res => {
              this.getAll();
              this.setState({
                flag: true,
                success: res.data.message
              })
            })
            .catch((err) =>{
              this.setState({
                flag: false,
                errors: err.response.data
              })
            });
        }
        else
        {
            Axios.put('/api/user/' + id, {
                    name: this.state.name,
                    email: this.state.email,
                    role: this.state.role,
                })
                .then(res => {
                  this.getAll();
                  console.log(res.data);
                })
                .catch((err) =>{
                  console.log(err.response.data);
                });
        }
    }

    nameChange(event){
        this.setState({
            name: event.target.value
        });
    }

    emailChange(event){
        this.setState({
            email: event.target.value
        });
    }

    passwordChange(event){
        this.setState({
            password: event.target.value
        });
    }

    roleChange(event){
        this.setState({
            role: event.target.value
        });
    }

    resetForm(e){
        this.setState(initialState);
        this.getAll();
    }


    render(){

        const errors = Array(this.state.errors);

        return (
            <div className='container'>
                <button className='btn btn-success btn-sm' onClick={(e)=>this.resetForm(e)}>Reset</button><hr/>
                {
                    this.state.flag == false ? errors.map(error=>
                        <div key={error}>
                            { error.name !== undefined ? <div className='alert alert-danger'>{error.name}</div> : <div></div> }
                            { error.email !== undefined ? <div className='alert alert-danger'>{error.email}</div> : <div></div> }
                            { error.password !== undefined ? <div className='alert alert-danger'>{error.password}</div> : <div></div> }
                            { error.role !== undefined ? <div className='alert alert-danger'>{error.role}</div> : <div></div> }
                        </div>
                    ) : this.state.flag == true ? <div className='alert alert-success'>{this.state.success}</div> : <div></div>
                }

                <div className='row'>
                    <div className='col-md-12'>
                        <form onSubmit={(e)=>this.submit(e, this.state.id)}>
                            <div className='form-group'>
                                <label>Name: </label>
                                <input onChange={(e)=>this.nameChange(event)} type='text' className='form-control' value={this.state.name}/>
                            </div>
                            <div className='form-group'>
                                <label>Email: </label>
                                <input onChange={(e)=>this.emailChange(event)} type='email' className='form-control' value={this.state.email}/>
                            </div>
                            <div className='form-group' >
                                <label>Password: </label>
                                <input onChange={(e)=>this.passwordChange(event)} type='password' className='form-control' id='password' value={this.state.password}/>
                            </div>
                            <div className='form-group'>
                                <label>Role: </label>
                                <input onChange={(e)=>this.roleChange(event)} type='number' className='form-control' value={this.state.role}/>
                            </div>
                            <button type='submit' className='btn btn-primary btn-sm'>Save</button>
                        </form>
                    </div>
                </div><br/>

                <div className='row'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map(user =>
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><button onClick={(e)=>this.getOne(user)} className='btn btn-outline-success btn-sm'>Edit</button></td>
                                <td><button onClick={(e)=>this.deleteOne(user.id)} className='btn btn-outline-danger btn-sm'>Delete</button></td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Users;

if(document.getElementById('users')){
    ReactDOM.render(<Users />, document.getElementById('users'));
}

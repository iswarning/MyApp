import React, { Component } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import { countBy, thru } from 'lodash';
const initialState = {
    products: [],
    id: 0,
    TenSanPham: '',
    MaLoai: 0,
    Gia: 0,
    MoTa: '',
    HinhAnh: '',
    HinhCT1: '',
    HinhCT2: '',
    HangSanXuat: '',
    flag: null,
    errors: {},
    success: ''
};

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.getAll();
    }

    getAll() {
        Axios.get('/api/product')
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    getOne(product) {
        this.setState({
            id: product.id,
            MaLoai: product.MaLoai,
            TenSanPham: product.TenSanPham,
            Gia: product.Gia,
            MoTa: product.MoTa,
            HinhAnh: product.HinhAnh,
            HinhCT1: product.HinhCT1,
            HinhCT2: product.HinhCT2,
            HangSanXuat: product.HangSanXuat
        })
    }

    deleteOne(id) {
        Axios.delete('/api/product/' + id)
            .then(res => {
                this.getAll();
            })
            .catch(err => {
                console.log(err);
            });
    }

    submit(e, id) {
        e.preventDefault();
        if (this.state.id === 0) {
            Axios.post('/api/product', {
                    MaLoai: thís.state.MaLoai,
                    TenSanPham: this.state.TenSanPham,
                    Gia: this.state.Gia,
                    MoTa: this.state.MoTa,
                    HinhAnh: this.state.HinhAnh,
                    HinhCT1: this.state.HinhCT1,
                    HinhCT2: this.state.HinhCT2,
                    HangSanXuat: this.state.HangSanXuat
                })
                .then(res => {
                    this.getAll();
                    this.setState({
                        flag: true,
                        success: res.data.message
                    })
                })
                .catch(err => {
                    this.setState({
                        flag: false,
                        errors: err.response.data.errors
                    })
                });
        } else {
            Axios.put('/api/product/' + id, {
                    MaLoai: thís.state.MaLoai,
                    TenSanPham: this.state.TenSanPham,
                    Gia: this.state.Gia,
                    MoTa: this.state.MoTa,
                    HinhAnh: this.state.HinhAnh,
                    HinhCT1: this.state.HinhCT1,
                    HinhCT2: this.state.HinhCT2,
                    HangSanXuat: this.state.HangSanXuat
                })
                .then(res => {
                    this.getAll();
                    this.setState({
                        flag: true,
                        success: res.data.message
                    })
                })
                .catch(err => {
                    this.setState({
                        flag: false,
                        errors: err.response.data.errors
                    })
                });
        }
    }

    changeImage(e){
        var reader = new FileReader();
        reader.onload = function(e){
            this.setState({
              HinhAnh: reader.result
            })
        }.bind(this);
        reader.readAsDataURL(e.target.files[0]);
    }
    changeImage1(e){
        var reader = new FileReader();
        reader.onload = function(e){
            this.setState({
              HinhCT1: reader.result
            })
        }.bind(this);
        reader.readAsDataURL(e.target.files[0]);
    }
    changeImage2(e){
        var reader = new FileReader();
        reader.onload = function(e){
            this.setState({
              HinhCT2: reader.result
            })
        }.bind(this);
        reader.readAsDataURL(e.target.files[0]);
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
                                <label>Category: </label>
                                <select className='form-control' onChange={(e)=>this.setState({MaLoai: e.target.value})} value={this.state.MaLoai}>
                                    <option defaultValue> Choose </option>
                                    <option value='1'> Điện thoại </option>
                                    <option value='2'> Phụ kiện </option>
                                    <option value='3'> Tablet </option>
                                    <option value='4'> Laptop </option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <label>Name: </label>
                                <input onChange={(e)=>this.setState({TenSanPham:e.target.value})} type='text' className='form-control' value={this.state.TenSanPham}/>
                            </div>
                            <div className='form-group'>
                                <label>Price: </label>
                                <input onChange={(e)=>this.setState({Gia:e.target.value})} type='number' className='form-control' value={this.state.Gia}/>
                            </div>
                            <div className='form-group'>
                                <label>Description: </label>
                                <textarea onChange={(e)=>this.setState({MoTa:e.target.value})} rows='5' className='form-control' value={this.state.MoTa}></textarea>
                            </div>
                            <div className='form-group'>
                                <label>Main Image: </label><br/>
                                <img src={this.state.HinhAnh} width='40px' height='40px' /><br/><br/>
                                <input onChange={(e)=>this.changeImage(e)} type='file' className='form-control'/><br/>
                            </div>
                            <div className='form-group'>
                                <label>Mini Image 1: </label><br/>
                                <img src={this.state.HinhCT1} width='40px' height='40px' /><br/><br/>
                                <input onChange={(e)=>this.changeImage1(e)} type='file' className='form-control'/><br/>
                            </div>
                            <div className='form-group'>
                                <label>Mini Image 2: </label><br/>
                                <img src={this.state.HinhCT2} width='40px' height='40px' /><br/><br/>
                                <input onChange={(e)=>this.changeImage2(e)} type='file' className='form-control'/><br/>
                            </div>
                            <div className='form-group'>
                                <label>Brand: </label>
                                <input onChange={(e)=>this.setState({HangSanXuat:e.target.value})} type='text' className='form-control'  value={this.state.HangSanXuat}/>
                            </div>

                            <button type='submit' className='btn btn-primary btn-sm'>Save</button>
                        </form>
                    </div>
                </div><br/>

                <div className='row'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Image1</th>
                                <th>Image2</th>
                                <th>Brand</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.products.map(product =>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.TenSanPham}</td>
                                <td>{product.Gia}</td>
                                <td><img src={product.HinhAnh} width='40px' height='40px' /></td>
                                <td><img src={product.HinhCT1} width='40px' height='40px' /></td>
                                <td><img src={product.HinhCT2} width='40px' height='40px' /></td>
                                <td>{product.HangSanXuat}</td>
                                <td><button onClick={(e)=>this.getOne(product)} className='btn btn-outline-success btn-sm'>Edit</button></td>
                                <td><button onClick={(e)=>this.deleteOne(product.id)} className='btn btn-outline-danger btn-sm'>Delete</button></td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Products;
if(document.getElementById('products')){
  ReactDOM.render(<Products />,document.getElementById('products'));
}

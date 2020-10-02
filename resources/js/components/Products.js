import React, { Component } from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import { countBy, thru } from 'lodash';

const initialState = {
    products: [],
    id: 0,
    TenSanPham: '',
    MaLoai: 1,
    Gia: '',
    MoTa: '',
    HinhAnh: null,
    HinhCT1: null,
    HinhCT2: null,
    HangSanXuat: '',
    hasErrors: null,
    errors: {},
    success: ''
};

export default class Products extends React.Component {
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
        if (this.state.id == 0) {
            Axios.post('/api/product', {
                    MaLoai: this.state.MaLoai,
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
                        success: res.data.message
                    });
                })
                .catch(err => {
                    this.setState({
                        hasErrors: true,
                        errors: err.response.data.errors
                    });
                });
        } else {
            Axios.put('/api/product/' + id, {
                    MaLoai: this.state.MaLoai,
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
                        success: res.data.message
                    })
                })
                .catch(err => {
                    this.setState({
                        hasErrors: true,
                        errors: err.response.data.errors
                    });
                    
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

                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onClick={(e)=>this.resetForm(e)}>Add New Product</button>
                <p>&nbsp;</p>
                  <div className="modal" id="myModal">
                    <div className="modal-dialog">
                      <div className="modal-content">


                        <div className="modal-header">
                          <div className="modal-title"><button className='btn btn-danger btn-sm' onClick={(e)=>this.resetForm(e)}>Reset</button></div>
                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>


                        <form onSubmit={(e)=>this.submit(e, this.state.id)} encType="multipart/form-data">
                          <div className="modal-body">

                            {
                                this.state.hasErrors == true ? errors.map(error=>
                                    <div key={error}>
                                        { error.TenSanPham !== null ? <div className='alert alert-danger'>{error.TenSanPham}</div> : <div></div> }
                                        { error.Gia !== null ? <div className='alert alert-danger'>{error.Gia}</div> : <div></div> }
                                        { error.HinhAnh !== null ? <div className='alert alert-danger'>{error.HinhAnh}</div> : <div></div> }
                                        { error.HinhCT1 !== null ? <div className='alert alert-danger'>{error.HinhCT1}</div> : <div></div> }
                                        { error.HinhCT2 !== null ? <div className='alert alert-danger'>{error.HinhCT2}</div> : <div></div> }
                                        { error.HangSanXuat !== null ? <div className='alert alert-danger'>{error.HangSanXuat}</div> : <div></div> }
                                    </div>
                                ) : this.state.hasErrors == false ? <div className='alert alert-success'>{this.state.success}</div> : <div></div>
                            }

                            <div className='form-group row'>
                                <label className='col-sm-3 col-form-label'><b>Category: </b></label>

                                <select className='form-control col-sm-8' onChange={(e)=>this.setState({MaLoai: e.target.value})} value={this.state.MaLoai}>
                                    <option value='1' defaultValue> Điện thoại </option>
                                    <option value='2'> Phụ kiện </option>
                                    <option value='3'> Tablet </option>
                                    <option value='4'> Laptop </option>
                                </select>

                            </div>

                            <div className='form-group row'>
                                <label className='col-sm-3 col-form-label'><b>Name: </b></label>
                                <input onChange={(e)=>this.setState({TenSanPham:e.target.value})} type='text' className='form-control col-sm-8' value={this.state.TenSanPham}/>
                            </div>
                            <div className='form-group row'>
                                <label className='col-sm-3 col-form-label'><b>Price: </b></label>
                                <input onChange={(e)=>this.setState({Gia:e.target.value})} type='number' className='form-control col-sm-8' value={this.state.Gia}/>
                            </div>
                            <div className='form-group row'>
                                <label className='col-sm-3 col-form-label'><b>Description: </b></label>
                                <textarea onChange={(e)=>this.setState({MoTa:e.target.value})} rows='3' className='form-control col-sm-8' value={this.state.MoTa}></textarea>
                            </div>
                            <div className='form-group row'>
                                <label className='col-sm-3 col-form-label'><b>Main Image: </b></label>
                                <img src={this.state.HinhAnh} width='40px' height='40px' className='col-sm-2'/>
                                <input onChange={(e)=>this.changeImage(e)} type='file' className='form-control col-sm-6'/>
                            </div>
                            <div className='form-group row'>
                                <label className='col-sm-3 col-form-label'><b>Mini Image 1: </b></label>
                                <img src={this.state.HinhCT1} width='40px' height='40px' className='col-sm-2'/>
                                <input onChange={(e)=>this.changeImage1(e)} type='file' className='form-control col-sm-6'/>
                            </div>
                            <div className='form-group row'>
                                <label className='col-sm-3 col-form-label'><b>Mini Image 2: </b></label>
                                <img src={this.state.HinhCT2} width='40px' height='40px' className='col-sm-2'/>
                                <input onChange={(e)=>this.changeImage2(e)} type='file' className='form-control col-sm-6'/>
                            </div>
                            <div className='form-group row'>
                                <label className='col-sm-3 col-form-label'><b>Brand: </b></label>
                                <input onChange={(e)=>this.setState({HangSanXuat:e.target.value})} type='text' className='form-control col-sm-8'  value={this.state.HangSanXuat}/>
                            </div>

                          </div>
                          <div className="modal-footer">
                            <button type='submit' className='btn btn-primary'>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                <div className='row'>
                    <table className='table table-bordered'>
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
                                <td><button onClick={(e)=>this.getOne(product)} className='btn btn-outline-success btn-sm' data-toggle="modal" data-target="#myModal">Edit</button></td>
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

if(document.getElementById('products')){
  ReactDOM.render(<Products />,document.getElementById('products'));
}

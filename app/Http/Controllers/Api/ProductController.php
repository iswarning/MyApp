<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::orderBy('id','desc')->take(5)->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'TenSanPham' => 'required',
            'MaLoai' => 'required|numeric',
            'Gia' => 'require|numberic',
            'HinhAnh' => 'required|image|mimes:png,jpg,jpeg',
            'HinhCT1' => 'required|image|mimes:png,jpg,jpeg',
            'HinhCT2' => 'required|image|mimes:png,jpg,jpeg',
            'HangSanXuat' => 'required'
        ]);

        $fullName = '';

        if(hasFile($request->HinhAnh)){
          $file = $request->HinhAnh;
          $name = $file->getClientOriginalName();
          $extension = $file->getClientOriginalExtension();
          $fullName = 'image/'.$name.'.'.$extension;
          $public_path('/public');
          $file->move($public_path, $fullName);
        }

        $newItem = new Product();
        $newItem->TenSanPham = $request->TenSanPham;
        $newItem->MaLoai = $request->MaLoai;
        $newItem->Gia = $request->Gia;
        $newItem->HinhAnh = $fullName;
        $newItem->HinhCT1 = $request->HinhCT1;
        $newItem->HinhCT2 = $request->HinhCT2;
        $newItem->HangSanXuat = $request->HangSanXuat;
        $newItem->save();

        return response()->json(['message' => 'Add success !']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return Product::findOrFail($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Product::findOrFail($id)->delete();
    }
}

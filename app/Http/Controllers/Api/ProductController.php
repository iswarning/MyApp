<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
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
            'Gia' => 'required|numeric',
            'HangSanXuat' => 'required'
        ]);

        $img[0] = $request->HinhAnh;
        $img[1] = $request->HinhCT1;
        $img[2] = $request->HinhCT2;

        for($i = 0; $i < 3; $i++)
        {
            if($img[$i] !== null)
            {
                $image = $img[$i];
                $name = $image->getClientOriginalName();
                $name = Str::random(10);
                $fullName = $name.'.'.$image->getClientOriginalExtension();
                $destination = public_path('/image');
                $image->move($destination,$fullName);
                $img[$i] = "image/".$fullName;
            }
        }

        $newItem = new Product();
        $newItem->TenSanPham = $request->TenSanPham;
        $newItem->MaLoai = $request->MaLoai;
        $newItem->Gia = $request->Gia;
        $newItem->HinhAnh = $img[0];
        $newItem->HinhCT1 = $img[1];
        $newItem->HinhCT2 = $img[2];
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

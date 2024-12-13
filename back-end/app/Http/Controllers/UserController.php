<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $q=request()->query('q');
        $limit = request()->query('limit', 5);
        $users = User::latest();
        if($q){
            $users->where(function($query)use($q)
        {
            $query->where('name','like','%'.$q.'%');
            $query->orWhere('email','like','%'.$q.'%');
        });
        }

        return response()->json([
            'success' => true,
            'data' => $users->paginate($limit),
            'message' => 'User retrived successfully'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $user = new User;
        $user->fill($request->except('password', 'image'));
        $user->password = bcrypt($request->password);
        $imagePath = $request->file('image')->store('users', 'public');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store( );
            $user->image = $imagePath;
        }

        $user->save();

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'User created successfully'
        ], 201);}

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::find($id);
        if(!$user){
            return response()->json(
                [
                    'success' => false,
                    'message' => 'User not found'
                ],
                404
            );
        }
        return response()->json(
            [
                'success' => true,
                'data' => $user,
                'message' => 'User retrived successfully'
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        $user = User::find($id);
        if(!$user){
            return response()->json(
                [
                    'success' => false,
                    'message' => 'User not found'
                ], 
                404
            );
        }

        if($request->name){
            $user->name = $request->name;
        }
        if($request->email){
            $user->email = $request->email;
        }
        if($request->password){
            $user->password = $request->password;
        }
        if ($request->hasFile('image')) {
            // Save the file to the 'users' directory in the 'public' disk
            $path = $request->file('image')->store('users', 'public');
        
            // Extract the file name from the stored path
            $fileName = basename($path);
        
            // Update the user's image field with the file name
            $user->image = $fileName;
        }


        $user->save();

        return response()->json(
            [
                'success' => true,
                'data' => $user,
                'message' => 'User updated successfully'
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User ::find($id);
        if(!$user){
            return response()-> json(
                [
                    'success' => false,
                    'message'=>'User not found'
                ],404);
    }
    $user->delete();
    return response()->json(
        [
            'success' => true,
            'message'=>'User deleted successfully'
        ]
    );
}}
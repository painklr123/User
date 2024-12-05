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
        $q = request()->query('q');
        $limit = request()->query('limit',5);
        $users = User::latest();
        if($q){
            $users->where(function($query) use ($q){
                $query->where('name', 'like', '%' . $q . '%');
                $query->orwhere('email', 'like', '%' . $q . '%');
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
        $user->fill($request->all());
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'User created successfully'
        ], 201);
    }

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
        $user->delete();
        return response()->json(
            [
                'success' => true,
                'message' => 'User deleted succesfully'
            ]
        );
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
{
    $id = $this->route()->user;
    $emailRule = 'sometimes|email|unique:users,email';

    if ($id) {
        $emailRule .= ",{$id}";
    }

    $rules = [
        'name' => 'sometimes|required|min:4',
        'email' => $emailRule,
        'password' => 'sometimes|required|min:6',
        'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2800',
    ];

    return $rules;
}

    public function messages(){
        return [
            'required' => ':attribute bắt buộc phải nhập',
            'min' => ':attribute phải từ :min ký tự',
            'email' => ':attribute phải định dạng email',
            'unique' => ':attribute đã tồn tại',
            'image' => ':attribute phải là hình ảnh',
        ];
    }

    public function attributes(){
        return [
            'name' => 'Tên',
            'email' => 'Email',
            'password' => 'Mật khẩu',
            'image' => 'Hình ảnh',
        ];
    }
}
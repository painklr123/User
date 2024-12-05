"use client";

export default function SearchForm({ onChange }){
    return(
      <input 
        type="search" 
        className="form-control mb-3" 
        placeholder="Từ khóa..."
        onChange={onChange}
      />
    );
}
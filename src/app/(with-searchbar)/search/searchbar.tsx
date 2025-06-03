"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyPress={handleKeyPress}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={onSearch}>검색</button>
    </div>
  );
}

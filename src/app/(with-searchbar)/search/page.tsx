import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`
  );

  if (!response.ok) {
    return <div>오류 발생...</div>;
  }
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <Suspense
      key={(await searchParams).q || ""}
      fallback={<BookItemSkeleton></BookItemSkeleton>}
    >
      <SearchResult q={((await searchParams).q as string) || ""} />
    </Suspense>
  );
}

import ReviewEditor from "@/components/review-editor";
import ReviewItem from "@/components/review-item";
import { ReviewData } from "@/types";
import style from "./page.module.css";
async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    return <div>오류가 발생하였습니다...</div>;
  }
  const book = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();

  console.log(response);

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

// async function ReviewList({bookId}){

//   return <section></section>
// }

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  return (
    <div className={style.container}>
      <BookDetail bookId={String((await params).id)} />
      <ReviewEditor bookId={String((await params).id)} />
      <ReviewList bookId={String((await params).id)} />
    </div>
  );
}

import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
      { cache: "force-cache" }
    );

    const books: BookData[] = await response.json();
    const bookCount = books.length;

    return (
      <footer>
        <div>제작 서동현</div>
        <div>book count : {bookCount}</div>
      </footer>
    );
  } catch (e) {
    console.error(e);
    <div>ERROR</div>;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

/**
 * 서버 컴포넌트 (+ 비동기함수)
 *  export async function Page(){} ~~ 이런식으로 비동기 컴포넌트로 선언해줄수있음.
 *  getServerSideProps, getStaticProps등을 대체할수있음.
 *  Fetching data where it's needed ! 데이터는 필요한 곳에서 직접 불러와라
 */

/**
 * 데이터 캐시
 * fetch 메소드를 활용해 불러온 데이터를 Next서버에서 보관하는 기능
 *
 * 불필요한 데이터 요청으 ㅣ수를 줄여서 웹서버스의 성능을 향상
 *
 * const response = await fetch(``, {cache: "force-cache"})
 * 오직 fetch에서만 사용가능하다! {cache: "force-cache" "no-store" }
 * {next: {revalidate: 10}}
 *
 * 기본값은 no-store
 * {cache: "force-cache"} 설정 후 동작
 * MISS -> SET -> HIT
 *
 * {next: revalidate: 3}
 * 특정 시간을 주기로 캐시를 업데이트함. 마치 Page Router ISR방식과 비슷함.
 *
 * MISS SET HIT STALE SET
 *
 * on-Demand Revalidate
 * */

/**
 * 리퀘스트 메모이제이션
 * 한번의 랜더링에서 발생하는 중복되는 API요청을 첫번째 요청이후 캐시에 저장하고 두번쨰 요청부터는 저장된 캐시데이터로 반환한다.
 * 왜 리퀘스트 메모이제이션이라는 제공하는걸까
 * 왜냐면 서버컴포넌트의 도입때문,
 */

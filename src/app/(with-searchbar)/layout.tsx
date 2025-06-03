import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{new Date().toLocaleString()}</div>
      <Suspense>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
//클라이언트 라우트 캐시는 새로고침하면 없어진다. 페이지전환시는 기억함.
//스트리밍이라는 기술?

// 서버에서 클라이언트로 데이터를 넘겨줘야할때, 스트리밍, 스트림 === 개천
// 어떤 강물이나 계층을 통해 큰 데이터를 나눠서 보내주는 기술
// 페이지 스트리밍 오래걸리는 컴포넌트의 랜더링을 사용자가 좀더 좋은 환겨엥서 기다릴 수 있도록!

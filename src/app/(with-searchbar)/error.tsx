"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  });
  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button
        onClick={async () => {
          startTransition(() => {
            router.refresh(); //현재 페이지에 필요한 서버컴포넌트를 다시 불러옴.
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}

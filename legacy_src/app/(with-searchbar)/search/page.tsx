import ClientComponent from "../../../components/client-component";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div>
      Search params : {q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
} //함수형 컴포넌트의 어떻게 async를 붙일수있냐?

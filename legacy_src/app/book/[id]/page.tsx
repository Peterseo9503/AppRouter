export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>book[id] 페이지 입니다. params : {id}</div>;
}

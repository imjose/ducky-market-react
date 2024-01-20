
export default function CardWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col rounded-xl p-2 md:p-4 border-2 shadow-md">
        <h1 className="text-2xl px-2 text-ellipsis"> {title} </h1>
        <hr className="border mb-2 mx-2 border-slate-300" />
        {children}
      </div>
    </>
  );
}
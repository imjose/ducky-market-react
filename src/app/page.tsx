import { CardWrapper } from '@/app/ui/card-wrapper';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className="container flex flex-row flex-wrap gap-4">
        <div className="w-100 md:w-2/3">
          <CardWrapper title="Products">
            <ul>
              <li key="custom" className="container flex p-2 gap-2 bg-slate-200 rounded-xl">
                <div className="w-12 h-12 flex-shrink-0 bg-slate-500 rounded-xl" />
                <div className="flex flex-col items-start gap-1">
                  <div className="text-ellipsis line-clamp-1"> Product Example 1 </div>
                  <p className="text-sm text-ellipsis line-clamp-2"> Product Example Description </p>
                </div>
              </li>
            </ul>
          </CardWrapper>
        </div>
        <CardWrapper title="Last Transaction">
          <div></div>
        </CardWrapper>
      </div>
    </main>
  );
}

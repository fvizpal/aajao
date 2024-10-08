import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home({ searchParams }: SearchParamProps) {
  const searchText = (searchParams?.query as string) || ''
  const category = (searchParams?.category as string) || ''
  const page = Number(searchParams?.page) || 1;

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  return (
    <>
      <section className='py-5 md:py-10'>
        <div className='max-w-7xl p-5 w-full flex flex-col gap-5 md:flex-row'>
          <div className='flex flex-col justify-center gap-8 ml-20'>
            <h1 className=" font-bold text-[40px]">Organise events here with us</h1>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image
            src={'/assets/images/hero1.png'}
            alt='events'
            width={1000}
            height={1000}
            className='p-5 my-10 max-h-[50vh] rounded-xl object-contain object-center'
          />
        </div>
      </section>
      <section>
        <div className="flex w-full flex-col p-5 gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}

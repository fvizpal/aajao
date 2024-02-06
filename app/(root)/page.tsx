import CategoryFilter from '@/components/shared/CategoryFilter';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section>
        <div className='max-w-7xl p-5 w-full grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
          <div className='flex flex-col justify-center gap-8'>
            <h1 className="h1-bold">Organise events here with us</h1>
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
            className='my-10 max-h-[70vh] object-contain object-center'
          />
        </div>
      </section>
      <section>
        <div className='flex w-full flex-col gap-5 md:flex-row'>
          <Search />
          <CategoryFilter />
        </div>


      </section>
    </>
  );
}

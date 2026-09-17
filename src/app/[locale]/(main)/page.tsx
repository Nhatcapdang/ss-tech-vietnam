import Countries from '@/components/countries'

export const dynamic: 'auto' | 'force-dynamic' | 'error' | 'force-static' =
  'auto'

export default function Home() {
  return (
    <>
      <main>
        <Countries />
      </main>
    </>
  )
}

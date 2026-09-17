import { Link } from '@/i18n/navigation'

export default async function ForbiddenPage() {
  return (
    <main className="flex h-screen items-center justify-center p-4 text-center">
      <div className="mx-auto w-full max-w-2xl text-center">
        <div className="relative">
          <h1 className="inline-block bg-linear-to-r bg-[linear-gradient(7deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.2)_100%)] from-white/5 to-white/20 bg-clip-text text-[12rem] leading-none font-bold opacity-50 select-none md:text-[16rem]">
            403
          </h1>
          <h2 className="absolute bottom-5 left-0 w-full text-5xl font-medium text-gray-300">
            Access Forbidden
          </h2>
        </div>

        <p className="mx-auto mb-4 max-w-md text-sm text-gray-400 md:text-base">
          You are not authorized to access this page.
        </p>

        <Link
          href="/dashboard"
          className="mt-2 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Come Back
        </Link>
      </div>
    </main>
  )
}

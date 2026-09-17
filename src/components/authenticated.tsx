// 'use client'

// import { useRouter } from '@/i18n/navigation'
// import { useAppSelector } from '@/stores/hooks'

// const withAuthenticated = <P extends object>(
//   WrappedComponent: React.ComponentType<P>
// ) => {
//   const AuthenticatedComponent = (props: P) => {
//     const { isAuthenticated } = useAppSelector(state => state.staffSlice)
//     console.log('isAuthenticated', isAuthenticated)
//     // const isRehydrated = useAppSelector(
//     //   state =>
//     //     (state as { _persist?: { rehydrated: boolean } })._persist?.rehydrated
//     // )
//     const router = useRouter()
//     if (isAuthenticated) return <WrappedComponent {...props} />
//     return router.replace('/sign-in')
//   }
//   return AuthenticatedComponent
// }
// export default withAuthenticated

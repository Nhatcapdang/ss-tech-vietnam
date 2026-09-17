// import { useMutation } from '@tanstack/react-query'
// import axios, { AxiosError, AxiosResponse } from 'axios'
// import { toast } from 'sonner'

// export const useFeedBackMutation = () => {
//   return useMutation<
//     { id: string },
//     AxiosError<{ message: string }>,
//     { name: string; email: string; message: string }
//   >({
//     mutationFn: async params => {
//       const response = await axios.post<
//         { message: string },
//         AxiosResponse<{ id: string }>,
//         { name: string; email: string; message: string }
//       >('/api/contact', params)
//       return response.data
//     },
//     onSuccess: () => {
//       toast.success('Thank you for your feedback!')
//     },
//   })
// }

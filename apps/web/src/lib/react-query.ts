import {
  QueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'

let networkError = false

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount) {
        if (failureCount >= 3) {
          if (networkError === false) {
            networkError = true

            toast.error(
              'The application is taking no longer than expected to load. Please try again in few minutes.',
              {
                onDismiss: () => {
                  networkError = false
                },
              },
            )
          }

          return false
        }

        return true
      },
    },
  },
})
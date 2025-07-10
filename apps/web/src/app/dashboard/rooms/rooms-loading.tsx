import { Skeleton } from "@/components/ui/skeleton";

export default function RoomsLoading() {
  return (
    <div className="space-y-4 mt-4">
      {
        Array.from({ length: 10 }).map((_,key) => {
          return (
            <div key={key} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex flex-1 flex-col gap-1">
                {/* Skeleton para o nome da room */}
                <Skeleton className="h-5 w-48" />
                
                {/* Skeleton para os badges */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
              </div>
              
              {/* Skeleton para o texto "Access Room" */}
              <Skeleton className="h-4 w-20" />
            </div>
          )
        })
      }
    </div>
  )
}
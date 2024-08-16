'use client'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Error({ error, reset }) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[380px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-center">Offside Error</CardTitle>
          <p className="text-sm text-muted-foreground text-center">We've encountered an unexpected issue</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <AlertCircle className="h-12 w-12 text-yellow-500" />
          </div>
          <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-300">
            <AlertTitle className="font-semibold">Oops! Play halted!</AlertTitle>
            <AlertDescription>
              Our team is reviewing the situation. We'll be back in the game shortly.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => reset()} className="w-[45%]">
            Retry
          </Button>
          <Button variant="default" onClick={() => router.push('/')} className="w-[45%] bg-green-600 hover:bg-green-700">
            Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
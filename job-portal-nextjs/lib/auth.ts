import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function getAuthUserId() {
  const session = await auth()
  return session.userId
}

export function requireAuth(handler: (req: NextRequest, userId: string) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const session = await auth()
    const userId = session.userId

    if (!userId) {
      return NextResponse.json(
        { message: 'User not authenticated', success: false },
        { status: 401 }
      )
    }

    return handler(req, userId)
  }
}

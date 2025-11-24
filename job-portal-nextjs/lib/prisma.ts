import { PrismaClient } from '@prisma/client'
import config from '../prisma.config'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    __internal: {
      configOverride: () => config,
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  } as any)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

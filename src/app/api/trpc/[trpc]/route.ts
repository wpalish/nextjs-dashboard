import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { appRouter } from '@/server/routers/_app';
import { createTRPCContext } from '@/server/trpc';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error('tRPC error on', path, error);
          }
        : undefined,
  });

export { handler as GET, handler as POST };

import { initTRPC, TRPCError } from '@trpc/server';
import { type NextRequest } from 'next/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

interface CreateContextOptions {
  req: NextRequest;
}

export async function createTRPCContext({ req }: CreateContextOptions) {
  const session = await auth();
  return { db, session, req };
}

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { ...ctx, session: ctx.session } });
});

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session.user.role !== 'ADMIN') throw new TRPCError({ code: 'FORBIDDEN' });
  return next({ ctx });
});

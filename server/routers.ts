import { COOKIE_NAME } from "@shared/const";
import { appointmentRequestInput, forwardAppointmentRequest } from "./appointmentIntake";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: systemRouter,
  auth: router({ me: publicProcedure.query(opts => opts.ctx.user), logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions = getSessionCookieOptions(ctx.req); ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 }); return { success: true } as const; }) }),
  appointmentRequest: router({ submit: publicProcedure.input(appointmentRequestInput).mutation(async ({ input }) => forwardAppointmentRequest(input)) }),
});

export type AppRouter = typeof appRouter;

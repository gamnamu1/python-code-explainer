import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { saveCodeAnalysis, getUserCodeAnalyses, getCodeAnalysisById } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  codeExplainer: router({
    /**
     * 사용자의 코드 분석 이력을 조회합니다.
     */
    getHistory: protectedProcedure.query(async ({ ctx }) => {
      const analyses = await getUserCodeAnalyses(ctx.user.id);
      return analyses;
    }),

    /**
     * 특정 분석 결과를 ID로 조회합니다.
     */
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const analysis = await getCodeAnalysisById(input.id);
        return analysis;
      }),

    /**
     * 파이썬 코드를 분석하고 두 가지 수준의 설명을 생성합니다.
     */
    analyze: protectedProcedure
      .input(
        z.object({
          code: z.string().min(1, "코드를 입력해주세요"),
          fileName: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { code, fileName } = input;

        // 초등학생 수준 설명 생성
        const elementaryPrompt = `다음 파이썬 코드를 초등학교 고학년(12-13세) 수준에서 설명해주세요.

**중요한 원칙:**
1. 비유를 적극 활용하여 쉽게 설명하세요
2. 코드 안의 **모든 요소**를 하나하나 언급하세요 (내장/외장 모듈, 함수, 자료형, 연산자, 변수 등)
3. "(파이썬아)" 형식의 대화체로 설명하세요
4. 각 함수는 어떤 기능을 하고, 어떻게 사용하는지 괄호를 쳐서 설명하세요
5. 매우 상세하고 친절하게 설명하세요

**예시:**
import pandas as pd
pd.read_excel("Users/Downloads/around.xlsx")

설명: "(파이썬아) 판다스라는 외부 패키지를 불러와줘. 그리고 그걸 앞으로 판다스를 pd라는 이름으로 줄여서 쓸게. (파이썬아) pd(판다스) 안에 있는 'read_excel'이라는 '함수'를 사용해서, 다운로드 폴더 안에 있는 'around.xlsx'라는 이름의 엑셀 파일의 내용을 읽어줘."

파이썬 코드:
${code}

위 형식을 참고하여 코드를 상세히 설명해주세요. 마크다운 형식으로 작성하세요.`;

        const elementaryResponse = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "당신은 파이썬 코드를 초등학생에게 쉽게 설명하는 선생님입니다.",
            },
            {
              role: "user",
              content: elementaryPrompt,
            },
          ],
        });

        const elementaryExplanation = typeof elementaryResponse.choices[0].message.content === 'string' 
          ? elementaryResponse.choices[0].message.content 
          : "";

        // 대학 1학년 수준 설명 생성
        const collegePrompt = `다음 파이썬 코드를 컴퓨터 공학과 1학년 수준에서 설명해주세요.

**중요한 원칙:**
1. 정밀하고 구체적인 기술적 설명을 제공하세요
2. 전문 용어를 사용하세요 (모듈, 함수, 메서드, 객체, 라이브러리 등)
3. 코드의 동작 원리와 구조를 설명하세요
4. 각 구문의 기능과 목적을 명확히 설명하세요
5. 필요한 경우 시간 복잡도나 메모리 사용 등 기술적 세부사항도 언급하세요

파이썬 코드:
${code}

위 코드를 기술적으로 상세히 설명해주세요. 마크다운 형식으로 작성하세요.`;

        const collegeResponse = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "당신은 파이썬 코드를 기술적으로 정확하게 설명하는 전문가입니다.",
            },
            {
              role: "user",
              content: collegePrompt,
            },
          ],
        });

        const collegeExplanation = typeof collegeResponse.choices[0].message.content === 'string' 
          ? collegeResponse.choices[0].message.content 
          : "";

        // 결과 저장
        const savedAnalysis = await saveCodeAnalysis({
          userId: ctx.user.id,
          code,
          fileName,
          elementaryExplanation,
          collegeExplanation,
        });

        return savedAnalysis;
      }),
  }),
});

export type AppRouter = typeof appRouter;

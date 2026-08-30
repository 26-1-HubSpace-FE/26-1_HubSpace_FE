# React + Vite

## 로컬 UI 미리보기

`npm run dev`로 실행하면 Google 로그인을 생략하고 관리자 화면을 확인할 수 있습니다.
헤더의 사용자 정보와 대시보드 이벤트 목록은 로컬 mock 데이터를 사용합니다.

로컬 미리보기는 조회와 입력 UI 확인 전용입니다. 생성·삭제 요청은 실제 서버로 전송되지 않습니다.
`npm run build`, `npm run preview`, 배포 환경에서는 기존 Google 로그인과 실제 API를 사용합니다.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

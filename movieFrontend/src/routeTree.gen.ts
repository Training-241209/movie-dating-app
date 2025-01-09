/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ChatImport } from './routes/_chat'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()
const ProtectedMovieLazyImport = createFileRoute('/_protected/movie')()
const ProtectedDashboardLazyImport = createFileRoute('/_protected/dashboard')()
const ChatChatLazyImport = createFileRoute('/_chat/chat')()
const ProtectedTsxDashboardLazyImport = createFileRoute(
  '/_protected/tsx/dashboard',
)()
const AuthAuthRegisterLazyImport = createFileRoute('/_auth/auth/register')()
const AuthAuthLoginLazyImport = createFileRoute('/_auth/auth/login')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const ChatRoute = ChatImport.update({
  id: '/_chat',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ProtectedMovieLazyRoute = ProtectedMovieLazyImport.update({
  id: '/_protected/movie',
  path: '/movie',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/_protected/movie.lazy').then((d) => d.Route),
)

const ProtectedDashboardLazyRoute = ProtectedDashboardLazyImport.update({
  id: '/_protected/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/_protected/dashboard.lazy').then((d) => d.Route),
)

const ChatChatLazyRoute = ChatChatLazyImport.update({
  id: '/chat',
  path: '/chat',
  getParentRoute: () => ChatRoute,
} as any).lazy(() => import('./routes/_chat/chat.lazy').then((d) => d.Route))

const ProtectedTsxDashboardLazyRoute = ProtectedTsxDashboardLazyImport.update({
  id: '/_protected/tsx/dashboard',
  path: '/tsx/dashboard',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/_protected.tsx/dashboard.lazy').then((d) => d.Route),
)

const AuthAuthRegisterLazyRoute = AuthAuthRegisterLazyImport.update({
  id: '/_auth/auth/register',
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/_auth/auth/register.lazy').then((d) => d.Route),
)

const AuthAuthLoginLazyRoute = AuthAuthLoginLazyImport.update({
  id: '/_auth/auth/login',
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/_auth/auth/login.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_chat': {
      id: '/_chat'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ChatImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/_chat/chat': {
      id: '/_chat/chat'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof ChatChatLazyImport
      parentRoute: typeof ChatImport
    }
    '/_protected/dashboard': {
      id: '/_protected/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof ProtectedDashboardLazyImport
      parentRoute: typeof rootRoute
    }
    '/_protected/movie': {
      id: '/_protected/movie'
      path: '/movie'
      fullPath: '/movie'
      preLoaderRoute: typeof ProtectedMovieLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth/auth/login': {
      id: '/_auth/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthAuthLoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth/auth/register': {
      id: '/_auth/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthAuthRegisterLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface ChatRouteChildren {
  ChatChatLazyRoute: typeof ChatChatLazyRoute
}

const ChatRouteChildren: ChatRouteChildren = {
  ChatChatLazyRoute: ChatChatLazyRoute,
}

const ChatRouteWithChildren = ChatRoute._addFileChildren(ChatRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '': typeof ChatRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/chat': typeof ChatChatLazyRoute
  '/dashboard': typeof ProtectedDashboardLazyRoute
  '/movie': typeof ProtectedMovieLazyRoute
  '/auth/login': typeof AuthAuthLoginLazyRoute
  '/auth/register': typeof AuthAuthRegisterLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '': typeof ChatRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/chat': typeof ChatChatLazyRoute
  '/dashboard': typeof ProtectedDashboardLazyRoute
  '/movie': typeof ProtectedMovieLazyRoute
  '/auth/login': typeof AuthAuthLoginLazyRoute
  '/auth/register': typeof AuthAuthRegisterLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/_chat': typeof ChatRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/_chat/chat': typeof ChatChatLazyRoute
  '/_protected/dashboard': typeof ProtectedDashboardLazyRoute
  '/_protected/movie': typeof ProtectedMovieLazyRoute
  '/_auth/auth/login': typeof AuthAuthLoginLazyRoute
  '/_auth/auth/register': typeof AuthAuthRegisterLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/about'
    | '/chat'
    | '/dashboard'
    | '/movie'
    | '/auth/login'
    | '/auth/register'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/about'
    | '/chat'
    | '/dashboard'
    | '/movie'
    | '/auth/login'
    | '/auth/register'
  id:
    | '__root__'
    | '/'
    | '/_chat'
    | '/about'
    | '/_chat/chat'
    | '/_protected/dashboard'
    | '/_protected/movie'
    | '/_auth/auth/login'
    | '/_auth/auth/register'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  ChatRoute: typeof ChatRouteWithChildren
  AboutLazyRoute: typeof AboutLazyRoute
  ProtectedDashboardLazyRoute: typeof ProtectedDashboardLazyRoute
  ProtectedMovieLazyRoute: typeof ProtectedMovieLazyRoute
  AuthAuthLoginLazyRoute: typeof AuthAuthLoginLazyRoute
  AuthAuthRegisterLazyRoute: typeof AuthAuthRegisterLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  ChatRoute: ChatRouteWithChildren,
  AboutLazyRoute: AboutLazyRoute,
  ProtectedDashboardLazyRoute: ProtectedDashboardLazyRoute,
  ProtectedMovieLazyRoute: ProtectedMovieLazyRoute,
  AuthAuthLoginLazyRoute: AuthAuthLoginLazyRoute,
  AuthAuthRegisterLazyRoute: AuthAuthRegisterLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_chat",
        "/about",
        "/_protected/dashboard",
        "/_protected/movie",
        "/_auth/auth/login",
        "/_auth/auth/register"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_chat": {
      "filePath": "_chat.tsx",
      "children": [
        "/_chat/chat"
      ]
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/_chat/chat": {
      "filePath": "_chat/chat.lazy.tsx",
      "parent": "/_chat"
    },
    "/_protected/dashboard": {
      "filePath": "_protected/dashboard.lazy.tsx"
    },
    "/_protected/movie": {
      "filePath": "_protected/movie.lazy.tsx"
    },
    "/_auth/auth/login": {
      "filePath": "_auth/auth/login.lazy.tsx"
    },
    "/_auth/auth/register": {
      "filePath": "_auth/auth/register.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

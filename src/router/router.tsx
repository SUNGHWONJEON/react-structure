
import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from 'react-router-dom';

const Loading = lazy(() => import('../components/Loading'));

const Main = lazy(() => import('../pages/main'));
const MessageMain = lazy(() => import('../pages/message/message-main'));
const MessageReciever = lazy(() => import('../pages/message/message-receiver'));
const MessageWrite = lazy(() => import('../pages/message/message-write'));
const MessageEdit = lazy(() => import('../pages/message/message-edit'));
const MessagePreview = lazy(() => import('../pages/message/message-preview'));
const MessageInbox = lazy(() => import('../pages/message/message-inbox'));

const ServiceMain = lazy(() => import('../pages/service/service-main'));
const ServiceNotice = lazy(() => import('../pages/service/service-notice'));
const ServiceFaq = lazy(() => import('../pages/service/service-faq'));
const ServiceTerms = lazy(() => import('../pages/service/service-terms'));
const ServiceInfo = lazy(() => import('../pages/service/service-info'));

export const router = createBrowserRouter([ 
  {
    path: '/',
    element: <Main />
  },
  {
    path: 'message',
    element: 
    <Suspense fallback={<Loading />}>
      <MessageMain />
    </Suspense>
  },
  {
    path: 'message/receiver/:msgId?',
    element: 
    <Suspense fallback={<Loading />}>
      <MessageReciever />
    </Suspense>
  },
  {
    path: 'message/write',
    element:
    <Suspense fallback={<Loading />}>
      <MessageWrite />
    </Suspense>
  },
  {
    path: 'message/edit/:msgId?',
    element:
    <Suspense fallback={<Loading />}>
      <MessageEdit />
    </Suspense>
  },
  {
    path: 'message/preview',
    element:
    <Suspense fallback={<Loading />}>
      <MessagePreview />
    </Suspense>
  },
  {
    path: 'message/inbox/:userId?',
    element:
    <Suspense fallback={<Loading />}>
      <MessageInbox />
    </Suspense>
  },
  {
    path: 'service',
    element:
    <Suspense fallback={<Loading />}>
      <ServiceMain />
    </Suspense>
  },
  {
    path: 'service/notice',
    element:
    <Suspense fallback={<Loading />}>
      <ServiceNotice />
    </Suspense>
  },
  {
    path: 'service/faq',
    element:
    <Suspense fallback={<Loading />}>
      <ServiceFaq />
    </Suspense>
  },
  {
    path: 'service/terms',
    element:
    <Suspense fallback={<Loading />}>
      <ServiceTerms />
    </Suspense>
  },
  {
    path: 'service/info',
    element:
    <Suspense fallback={<Loading />}>
      <ServiceInfo />
    </Suspense>
  }
]);
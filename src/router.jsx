import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

import Home from "./pages/Home";
import OAuthSuccess from "./components/feedback/OAuthSuccess";
import PublicOnlyRoute from "./layouts/PublicOnlyRoute";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { FEATURES } from "../constants/features";
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const MyProfile = lazy(() => import("./features/profile/pages/MyProfile"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const ReadMore = lazy(() => import("./features/blogs/ReadMore"));
const NotFound = lazy(() => import("./components/feedback/NotFound"));

const UserProfile = lazy(() => import("./features/profile/pages/UserProfile"));
const Followers = lazy(() => import("./features/connections/pages/Followers"));
const Favorites = lazy(() => import("./features/profile/pages/Favorites"));
const AddBlog = lazy(() => import("./features/profile/pages/AddBlog"));
const EditBlog = lazy(() => import("./features/profile/pages/EditBlog"));
const Chats = lazy(() => import("./features/chat/pages/Chats"));
const Notifications = lazy(() => import("./features/profile/pages/Notifications"));
const Settings = lazy(() => import("./features/profile/pages/Settings"));
const BlockedUsers = lazy(() => import("./features/profile/pages/BlockedUsers"));
const ConnectedAccounts = lazy(
  () => import("./features/profile/pages/ConnectedAccounts"),
);

const Blogs = lazy(() => import("./features/blogs/Blogs"));
const RoadmapPage = lazy(() => import("./features/roadmap/RoadmapPage"));
const ExamPage = lazy(() => import("./features/roadmap/ExamPage"));
const LibsPage = lazy(() => import("./features/coding-libs/LibsPage"));
const BookDetailPage = lazy(
  () => import("./features/coding-libs/BookDetailPage"),
);
const CodingChallenges = lazy(
  () => import("./features/coding-challenges/CodingChallenges"),
);
const ChallengeArena = lazy(
  () => import("./features/coding-challenges/ChallengeArena"),
);
const ProposeChallenge = lazy(
  () => import("./features/coding-challenges/pages/ProposeChallenge"),
);
const ReviewProposals = lazy(
  () => import("./features/coding-challenges/pages/ReviewProposals"),
);
const AiAgent = lazy(() => import("./features/ai-agent/AiAgent"));
const CapstonePage = lazy(() => import("./features/capstone/CapstonePage"));
const CertificatePage = lazy(
  () => import("./features/capstone/CertificatePage"),
);
const TeamPage = lazy(() => import("./features/teams/TeamPage"));
const TeamAdminPage = lazy(() => import("./features/teams/TeamAdminPage"));
const AdminLibraryPage = lazy(() => import("./features/coding-libs/admin/AdminLibraryPage"));
const EvidencePage = lazy(() => import("./features/teams/EvidencePage"));
const CandidatePage = lazy(() => import("./features/recruiter/CandidatePage"));
const CandidatesPage = lazy(() => import("./features/recruiter/CandidatesPage"));
const CapstoneAdminPage = lazy(
  () => import("./features/capstone/CapstoneAdminPage"),
);
const VoiceReviewPage = lazy(
  () => import("./features/voice-review/VoiceReviewPage"),
);
const VoiceExamPage = lazy(() => import("./features/voice-exam/VoiceExamPage"));
const PricingPage = lazy(() => import("./features/billing/PricingPage"));
const BillingPage = lazy(() => import("./features/billing/BillingPage"));
const ProgressPage = lazy(() => import("./features/mastery/ProgressPage"));

const FoundationsPage = lazy(
  () => import("./features/foundations/FoundationsPage"),
);
const FoundationTopicPage = lazy(
  () => import("./features/foundations/TopicPage"),
);
const LayerLearnPage = lazy(() => import("./features/learn/LayerLearnPage"));
const LearnTopicPage = lazy(() => import("./features/learn/TopicPage"));
const LabsPage = lazy(() => import("./features/labs/LabsPage"));
const LabPage = lazy(() => import("./features/labs/LabPage"));
const LabRoomPage = lazy(() => import("./features/labs/RoomPage"));

// Exported on its own so the build-time prerender (src/entry-prerender.jsx)
// can render the same routes on the server with a static router.
export const routes = [
  {
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      // ✅ Public routes — no wrapper needed
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "pricing", element: <PricingPage /> },
      // Public on purpose: guests browse the paths with every layer locked.
      // The exam route below stays protected.
      { path: "roadmaps", element: <RoadmapPage /> },
      { path: "oauth-success", element: <OAuthSuccess /> },
      {
        path: "get-started",
        element: (
          <PublicOnlyRoute>
            <GetStarted />
          </PublicOnlyRoute>
        ),
      },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "posts/:id", element: <ReadMore /> },
      // Public on purpose: certificates must be verifiable without an account.
      { path: "verify/:publicId", element: <CertificatePage /> },
      // Public on purpose: team evidence is meant for recruiters without an account.
      { path: "evidence/:publicId", element: <EvidencePage /> },
      // Public on purpose, but only for developers who opted in (the API answers 404 otherwise).
      { path: "candidate/:username", element: <CandidatePage /> },
      { path: "foundations", element: <FoundationsPage /> },
      { path: "learn/:trackId/:layerId", element: <LayerLearnPage /> },
      { path: "learn/:trackId/:layerId/:topicSlug", element: <LearnTopicPage /> },
      // Labs: placeholders until lab stage L1 (docs/product/LAB_SYSTEM.md).
      { path: "labs", element: <LabsPage /> },
      { path: "labs/:roomId", element: <LabRoomPage /> },
      { path: "learn/:trackId/:layerId/:topicSlug/lab", element: <LabPage /> },
      { path: "foundations/:slug", element: <FoundationTopicPage /> },
      // ✅ All protected routes grouped here — one wrapper for all
      {
        element: <ProtectedLayout />,
        children: [
          { path: "blogs", element: <Blogs /> },
          { path: "roadmaps/exam/:layerId", element: <ExamPage /> },
          { path: "libs", element: <LibsPage /> },
          { path: "libs/:id", element: <BookDetailPage /> },
          { path: "coding-challenges", element: <CodingChallenges /> },
          { path: "coding-challenges/propose", element: <ProposeChallenge /> },
          { path: "coding-challenges/review", element: <ReviewProposals /> },
          { path: "coding-challenges/:id", element: <ChallengeArena /> },
          // One shell for both: "new chat" is a state of AiAgent (the hero),
          // not a separate route. /ai-agent/chat is kept as a redirect so
          // existing links and bookmarks don't 404.
          { path: "ai-agent", element: <AiAgent /> },
          {
            path: "ai-agent/chat",
            element: <Navigate to="/ai-agent" replace />,
          },
          // /capstone shows the default track (api-dev) directly, no redirect;
          // /capstone/:trackId serves other tracks once they have a brief.
          { path: "capstone", element: <CapstonePage /> },
          // Static segment wins over ":trackId" in React Router's ranking.
          { path: "capstone/admin", element: <CapstoneAdminPage /> },
          { path: "capstone/:trackId", element: <CapstonePage /> },
          { path: "team", element: <TeamPage /> },
          { path: "team/admin", element: <TeamAdminPage /> },
          { path: "admin/library", element: <AdminLibraryPage /> },
          { path: "billing", element: <BillingPage /> },
          { path: "progress", element: <ProgressPage /> },
          // Signed in only. The list holds only developers who opted in to recruiters.
          // Closed for now: without the route /candidates is the normal 404.
          ...(FEATURES.candidates ? [{ path: "candidates", element: <CandidatesPage /> }] : []),
          { path: "voice-review", element: <VoiceReviewPage /> },
          { path: "voice-exam/:layerId", element: <VoiceExamPage /> },
          { path: "users/:username", element: <UserProfile /> },
          {
            path: "my-profile",
            children: [
              { index: true, element: <MyProfile /> },
              { path: "settings", element: <Settings /> },
              { path: "followers", element: <Followers /> },
              { path: "following", element: <Followers /> },
              { path: "add-blog", element: <AddBlog /> },
              { path: "edit-blog/:id", element: <EditBlog /> },
              { path: "chats", element: <Chats /> },
              { path: "notifications", element: <Notifications /> },
              { path: "favorites", element: <Favorites /> },
              { path: "favourites", element: <Navigate to="/my-profile/favorites" replace /> },
              { path: "connected-accounts", element: <ConnectedAccounts /> },
              { path: "blocked", element: <BlockedUsers /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];

// createBrowserRouter touches window, so only create it in the browser.
const router =
  typeof window !== "undefined" ? createBrowserRouter(routes) : null;
export default router;

import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicOnlyRoute from "./layouts/PublicOnlyRoute";
import Home from "./pages/Home";
import OAuthSuccess from "./components/feedback/OAuthSuccess";
import FoundationRedirect from "./features/foundations/FoundationRedirect";
import { FEATURES } from "../constants/features";

const redirect = (to) => <Navigate to={to} replace />;

const NotFound = lazy(() => import("./components/feedback/NotFound"));

const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));

const MyProfile = lazy(() =>
  Promise.all([
    import("./features/profile/pages/MyProfile"),
    import("./stores/useProfileStore")
      .then(({ default: store }) => store.getState().fetchProfile())
      .catch(() => { }),
  ]).then(([page]) => page),
);
const UserProfile = lazy(() => import("./features/profile/pages/UserProfile"));
const Favorites = lazy(() => import("./features/profile/pages/Favorites"));
const AddBlog = lazy(() => import("./features/profile/pages/AddBlog"));
const EditBlog = lazy(() => import("./features/profile/pages/EditBlog"));
const Notifications = lazy(() => import("./features/profile/pages/Notifications"));
const Settings = lazy(() => import("./features/profile/pages/Settings"));
const BlockedUsers = lazy(() => import("./features/profile/pages/BlockedUsers"));
const ConnectedAccounts = lazy(() => import("./features/profile/pages/ConnectedAccounts"));
const Followers = lazy(() => import("./features/connections/pages/Followers"));
const Chats = lazy(() => import("./features/chat/pages/Chats"));

const Blogs = lazy(() => import("./features/blogs/Blogs"));
const ReadMore = lazy(() => import("./features/blogs/ReadMore"));

const RoadmapPage = lazy(() => import("./features/roadmap/RoadmapPage"));
const ExamPage = lazy(() => import("./features/roadmap/ExamPage"));
const LayerLearnPage = lazy(() => import("./features/learn/LayerLearnPage"));
const LearnTopicPage = lazy(() => import("./features/learn/TopicPage"));
const ProgressPage = lazy(() => import("./features/mastery/ProgressPage"));
const VoiceReviewPage = lazy(() => import("./features/voice-review/VoiceReviewPage"));
const VoiceExamPage = lazy(() => import("./features/voice-exam/VoiceExamPage"));

const LibsPage = lazy(() => import("./features/coding-libs/LibsPage"));
const BookDetailPage = lazy(() => import("./features/coding-libs/BookDetailPage"));
const AdminLibraryPage = lazy(() => import("./features/coding-libs/admin/AdminLibraryPage"));

const CodingChallenges = lazy(() => import("./features/coding-challenges/CodingChallenges"));
const ChallengeArena = lazy(() => import("./features/coding-challenges/ChallengeArena"));
const ProposeChallenge = lazy(() => import("./features/coding-challenges/pages/ProposeChallenge"));
const ReviewProposals = lazy(() => import("./features/coding-challenges/pages/ReviewProposals"));

const Mentor = lazy(() => import("./features/mentor/Mentor"));

const CapstonePage = lazy(() => import("./features/capstone/CapstonePage"));
const CapstoneAdminPage = lazy(() => import("./features/capstone/CapstoneAdminPage"));
const CertificatePage = lazy(() => import("./features/capstone/CertificatePage"));

const TeamsHubPage = lazy(() => import("./features/teams/TeamsHubPage"));
const TeamRedirect = lazy(() => import("./features/teams/TeamRedirect"));
const TeamPage = lazy(() => import("./features/teams/TeamPage"));
const TeamAdminPage = lazy(() => import("./features/teams/TeamAdminPage"));
const EvidencePage = lazy(() => import("./features/teams/EvidencePage"));

const CandidatePage = lazy(() => import("./features/recruiter/CandidatePage"));
const CandidatesPage = lazy(() => import("./features/recruiter/CandidatesPage"));

const PricingPage = lazy(() => import("./features/billing/PricingPage"));
const BillingPage = lazy(() => import("./features/billing/BillingPage"));

const LabsPage = lazy(() => import("./features/labs/LabsPage"));
const LabPage = lazy(() => import("./features/labs/LabPage"));
const LabRoomPage = lazy(() => import("./features/labs/RoomPage"));
const FoundationsPage = lazy(() => import("./features/foundations/FoundationsPage"));
const FoundationTopicPage = lazy(() => import("./features/foundations/TopicPage"));
const SystemLabPage = lazy(() => import("./features/foundations/system-lab/SystemLabPage"));
const PublicMapPage = lazy(() => import("./features/system-map/pages/PublicMapPage"));
const ProjectMapPage = lazy(() => import("./features/system-map/pages/ProjectMapPage"));

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
  { path: "privacy", element: <Privacy /> },
  { path: "terms", element: <Terms /> },
  { path: "pricing", element: <PricingPage /> },
  { path: "roadmaps", element: <RoadmapPage /> },
  { path: "posts/:id", element: <ReadMore /> },
];

const authRoutes = [
  { path: "get-started", element: <PublicOnlyRoute><GetStarted /></PublicOnlyRoute> },
  { path: "oauth-success", element: <OAuthSuccess /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "reset-password", element: <ResetPassword /> },
  { path: "unsubscribe", element: <Unsubscribe /> },
];

const shareRoutes = [
  { path: "verify/:publicId", element: <CertificatePage /> },
  { path: "evidence/:publicId", element: <EvidencePage /> },
  { path: "candidate/:username", element: <CandidatePage /> },
  { path: "map/:publicId", element: <PublicMapPage /> },
];

const learnRoutes = [
  { path: "learn/:trackId/:layerId", element: <LayerLearnPage /> },
  { path: "learn/:trackId/:layerId/:topicSlug", element: <LearnTopicPage /> },
  { path: "learn/:trackId/:layerId/:topicSlug/lab", element: <LabPage /> },
];

const labRoutes = [
  { path: "labs", element: <LabsPage /> },
  { path: "labs/foundations", element: <FoundationsPage /> },
  { path: "labs/foundations/lab/:stageId", element: <SystemLabPage /> },
  { path: "labs/foundations/:slug", element: <FoundationTopicPage /> },
  { path: "labs/:roomId", element: <LabRoomPage /> },
  { path: "foundations", element: redirect("/labs/foundations") },
  { path: "foundations/:slug", element: <FoundationRedirect /> },
  { path: "project-map", element: <ProjectMapPage /> },
  { path: "project-map/for/:ownerType/:ownerId", element: <ProjectMapPage /> },
];

const protectedRoutes = [
  { path: "blogs", element: <Blogs /> },
  { path: "roadmaps/exam/:layerId", element: <ExamPage /> },
  { path: "voice-exam/:layerId", element: <VoiceExamPage /> },
  { path: "voice-review", element: <VoiceReviewPage /> },
  { path: "progress", element: <ProgressPage /> },
  { path: "billing", element: <BillingPage /> },

  { path: "libs", element: <LibsPage /> },
  { path: "libs/:id", element: <BookDetailPage /> },
  { path: "admin/library", element: <AdminLibraryPage /> },

  { path: "coding-challenges", element: <CodingChallenges /> },
  { path: "coding-challenges/propose", element: <ProposeChallenge /> },
  { path: "coding-challenges/review", element: <ReviewProposals /> },
  { path: "coding-challenges/:id", element: <ChallengeArena /> },

  { path: "mentor", element: <Mentor />, handle: { appShell: true } },
  { path: "mentor/chat", element: redirect("/mentor") },
  { path: "ai-agent/*", element: redirect("/mentor") },

  { path: "capstone", element: <CapstonePage /> },
  { path: "capstone/admin", element: <CapstoneAdminPage /> },
  { path: "capstone/:trackId", element: <CapstonePage /> },

  { path: "teams", element: <TeamsHubPage /> },
  { path: "team", element: <TeamRedirect /> },
  { path: "team/admin", element: <TeamAdminPage /> },
  { path: "team/:teamId", element: <TeamPage /> },

  ...(FEATURES.candidates ? [{ path: "candidates", element: <CandidatesPage /> }] : []),

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
      { path: "favourites", element: redirect("/my-profile/favorites") },
      { path: "connected-accounts", element: <ConnectedAccounts /> },
      { path: "blocked", element: <BlockedUsers /> },
    ],
  },
];

export const routes = [
  {
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      ...publicRoutes,
      ...authRoutes,
      ...shareRoutes,
      ...learnRoutes,
      ...labRoutes,
      { element: <ProtectedLayout />, children: protectedRoutes },
    ],
  },
  { path: "*", element: <NotFound /> },
];

const router = typeof window !== "undefined" ? createBrowserRouter(routes) : null;

export default router;

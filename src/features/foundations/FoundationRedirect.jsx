import { Navigate, useParams } from "react-router-dom";

// Foundations moved into Labs; keeps old /foundations/<slug> links working.
export default function FoundationRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/labs/foundations/${slug}`} replace />;
}

import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import SearchResults from "../../search/SearchResults";

// Search results shared by the desktop and mobile search, with one place
// deciding where each kind of result navigates to.
export default function NavSearchResults({ query, boundaryRef }) {
  const navigate = useNavigate();

  const handleSelect = (item) => {
    if (item.type === "user") navigate(`/users/${item.username}`);
    else if (item.type === "post") navigate(`/?search=${encodeURIComponent(item.title)}`);
    else if (item.type === "category") navigate(item.path ?? `/categories/${item.slug}`);
  };

  return (
    <Suspense fallback={null}>
      <SearchResults query={query} onSelect={handleSelect} boundaryRef={boundaryRef} />
    </Suspense>
  );
}

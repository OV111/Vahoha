import React from "react";
import { Link } from "react-router-dom";
import FuzzyText from "../effects/FuzzyText";

const NotFound = () => {
  return (
    <div className="min-h-dvh bg-black flex flex-col items-center justify-center gap-3 sm:gap-5 px-4 py-10 text-center overflow-x-hidden">
      <FuzzyText
        fontSize="clamp(5rem,22vw,14rem)"
        color="#A1A1AA"
        baseIntensity={0.3}
        hoverIntensity={0.5}
        enableHover={true}
      >
        404
      </FuzzyText>
      <FuzzyText
        fontSize="clamp(2.5rem,12vw,6rem)"
        color="#A1A1AA"
        // Calmer than the 404: at phone size the full fuzz makes the words unreadable.
        baseIntensity={0.15}
        hoverIntensity={0.4}
        enableHover={true}
      >
        Not found!
      </FuzzyText>
      <p className="max-w-xs text-sm text-neutral-400 sm:max-w-sm sm:text-base">
        This page doesn't exist or was moved.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
      >
        Back to home
      </Link>
    </div>
  );
};
export default NotFound;

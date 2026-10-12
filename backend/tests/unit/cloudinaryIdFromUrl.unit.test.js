import { describe, it, expect } from "vitest";
import { cloudinaryIdFromUrl } from "../../modules/profile/services/profileService.js";

const BASE = "https://res.cloudinary.com/demo";

describe("cloudinaryIdFromUrl", () => {
  it("drops the extension for an image upload (PDFs upload as images)", () => {
    expect(cloudinaryIdFromUrl(`${BASE}/image/upload/v1712345678/devs_website/abc123.pdf`)).toEqual({
      resourceType: "image",
      publicId: "devs_website/abc123",
    });
  });

  it("keeps the extension for a raw upload", () => {
    expect(cloudinaryIdFromUrl(`${BASE}/raw/upload/v1/devs_website/cv.docx`)).toEqual({
      resourceType: "raw",
      publicId: "devs_website/cv.docx",
    });
  });

  it("works without a version segment", () => {
    expect(cloudinaryIdFromUrl(`${BASE}/image/upload/devs_website/x.png`)?.publicId).toBe("devs_website/x");
  });

  it("returns null for a missing or foreign URL", () => {
    expect(cloudinaryIdFromUrl(undefined)).toBeNull();
    expect(cloudinaryIdFromUrl("https://example.com/cv.pdf")).toBeNull();
  });
});

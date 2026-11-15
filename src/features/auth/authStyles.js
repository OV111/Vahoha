export const inputBase =
  "min-h-10 w-full px-3.5 py-2 text-base sm:text-sm text-[#30313d] dark:text-white bg-white dark:bg-zinc-800 border rounded-md placeholder:text-[#a3acb9] dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-100 dark:focus:ring-fuchsia-900/30 transition-all duration-150";
export const inputNormal =
  "border-[#e0e0e0] dark:border-zinc-700 focus:border-fuchsia-500 dark:focus:border-fuchsia-400";
export const inputError =
  "border-red-400 dark:border-red-500 focus:border-red-400 dark:focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/30";
export const labelClass = "block text-sm font-medium text-[#30313d] dark:text-zinc-300 mb-1.5";
export const errorClass = "text-red-500 dark:text-red-400 text-xs mt-1";
// Invisible 44px tap area on mobile; the visible control stays compact.
export const tapArea = "max-md:after:absolute max-md:after:-inset-y-1 max-md:after:inset-x-0";
// Spans the input's own height (inset-y-0) so the icon sits on its centre line;
// a fixed h-11 on a 40px input pushed it 2px low and past the bottom border.
// The invisible ::after keeps a 44px hit area on mobile.
export const eyeBtnClass =
  "absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-[#a3acb9] dark:text-zinc-500 hover:text-[#697386] dark:hover:text-zinc-400 focus-visible:outline-none focus-visible:text-fuchsia-500 cursor-pointer transition-colors max-md:after:absolute max-md:after:-inset-y-0.5 max-md:after:inset-x-0";

export const inputClass = (hasError, extra = "") =>
  `${inputBase} ${extra} ${hasError ? inputError : inputNormal}`;

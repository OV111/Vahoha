class Solution {
    public boolean isOriginAllowed(String origin, String[] allowList) {
        if (origin == null || origin.isEmpty()) return false;
        for (String entry : allowList) {
            if (entry.equals("*")) return true;
            int star = entry.indexOf("*.");
            if (star == -1) {
                if (entry.equals(origin)) return true;
                continue;
            }
            String prefix = entry.substring(0, star);
            String suffix = entry.substring(star + 1);
            if (origin.length() < prefix.length() + suffix.length()) continue;
            if (!origin.startsWith(prefix) || !origin.endsWith(suffix)) continue;
            String middle = origin.substring(prefix.length(), origin.length() - suffix.length());
            if (middle.matches("(?i)[a-z0-9-]+(\\.[a-z0-9-]+)*")) return true;
        }
        return false;
    }
}

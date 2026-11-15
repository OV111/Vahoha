import java.util.*;

class Solution {
    public String resolvePath(String cwd, String target, String home) {
        String path = target;
        if (path.equals("~") || path.startsWith("~/")) path = home + path.substring(1);
        if (!path.startsWith("/")) path = cwd + "/" + path;
        Deque<String> parts = new ArrayDeque<>();
        for (String segment : path.split("/")) {
            if (segment.isEmpty() || segment.equals(".")) continue;
            if (segment.equals("..")) parts.pollLast();
            else parts.addLast(segment);
        }
        return "/" + String.join("/", parts);
    }
}

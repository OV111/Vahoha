import java.util.*;
import java.util.regex.*;

class Solution {
    private static final Pattern VERSION =
        Pattern.compile("(\\d+)\\.(\\d+)\\.(\\d+)(?:-([0-9A-Za-z.-]+))?(?:\\+[0-9A-Za-z.-]+)?");

    public int compareSemver(String a, String b) {
        Matcher x = parse(a);
        Matcher y = parse(b);
        for (int i = 1; i <= 3; i++) {
            int order = Long.compare(Long.parseLong(x.group(i)), Long.parseLong(y.group(i)));
            if (order != 0) return order < 0 ? -1 : 1;
        }
        String[] p = x.group(4) == null ? new String[0] : x.group(4).split("\\.", -1);
        String[] q = y.group(4) == null ? new String[0] : y.group(4).split("\\.", -1);
        if (p.length == 0 && q.length == 0) return 0;
        if (p.length == 0) return 1;
        if (q.length == 0) return -1;
        for (int i = 0; i < Math.min(p.length, q.length); i++) {
            boolean pNum = p[i].matches("\\d+");
            boolean qNum = q[i].matches("\\d+");
            if (pNum && qNum) {
                int order = Long.compare(Long.parseLong(p[i]), Long.parseLong(q[i]));
                if (order != 0) return order < 0 ? -1 : 1;
            } else if (pNum) {
                return -1;
            } else if (qNum) {
                return 1;
            } else if (!p[i].equals(q[i])) {
                return p[i].compareTo(q[i]) < 0 ? -1 : 1;
            }
        }
        return Integer.compare(p.length, q.length);
    }

    private Matcher parse(String version) {
        Matcher m = VERSION.matcher(version);
        if (!m.matches()) throw new IllegalArgumentException("Invalid version: " + version);
        return m;
    }
}

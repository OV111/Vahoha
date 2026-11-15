<?php

function parsePartial($text) {
    $parts = explode(".", $text);
    if (count($parts) > 3) {
        throw new InvalidArgumentException("Invalid range: " . $text);
    }
    $nums = [];
    foreach ($parts as $part) {
        if (in_array($part, ["", "x", "X", "*"], true)) {
            break;
        }
        if (!preg_match('/^\d+$/D', $part)) {
            throw new InvalidArgumentException("Invalid range: " . $text);
        }
        $nums[] = (int) $part;
    }
    return $nums;
}

function compareVersions($a, $b) {
    for ($i = 0; $i < 3; $i++) {
        if ($a[$i] !== $b[$i]) {
            return $a[$i] < $b[$i] ? -1 : 1;
        }
    }
    return 0;
}

function tokenAllows($token, $v) {
    preg_match('/^(\^|~|>=|<=|>|<|=)?(.*)$/sD', $token, $m);
    $op = $m[1];
    $nums = parsePartial($m[2]);
    if (!$nums) {
        return true;
    }
    $n = count($nums);
    $lo = [$nums[0], $nums[1] ?? 0, $nums[2] ?? 0];

    if ($op === "^") {
        if ($nums[0] > 0 || $n === 1) {
            $hi = [$nums[0] + 1, 0, 0];
        } elseif ($nums[1] > 0 || $n === 2) {
            $hi = [0, $nums[1] + 1, 0];
        } else {
            $hi = [0, 0, $nums[2] + 1];
        }
        return compareVersions($v, $lo) >= 0 && compareVersions($v, $hi) < 0;
    }
    if ($op === "~" || $op === "" || $op === "=") {
        if ($n === 3 && $op !== "~") {
            return compareVersions($v, $lo) === 0;
        }
        $hi = $n === 1 ? [$nums[0] + 1, 0, 0] : [$nums[0], $nums[1] + 1, 0];
        return compareVersions($v, $lo) >= 0 && compareVersions($v, $hi) < 0;
    }
    if ($n !== 3) {
        throw new InvalidArgumentException("Operator " . $op . " needs a full version: " . $token);
    }
    $order = compareVersions($v, $lo);
    switch ($op) {
        case ">=":
            return $order >= 0;
        case "<=":
            return $order <= 0;
        case ">":
            return $order > 0;
        default:
            return $order < 0;
    }
}

function satisfies($version, $range) {
    if (!preg_match('/^(\d+)\.(\d+)\.(\d+)(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/D', $version, $m)) {
        throw new InvalidArgumentException("Invalid version: " . $version);
    }
    if (isset($m[4]) && $m[4] !== "") {
        return false;
    }
    $v = [(int) $m[1], (int) $m[2], (int) $m[3]];
    foreach (explode("||", $range) as $alternative) {
        $allow = true;
        foreach (preg_split('/\s+/', trim($alternative), -1, PREG_SPLIT_NO_EMPTY) as $token) {
            if (!tokenAllows($token, $v)) {
                $allow = false;
                break;
            }
        }
        if ($allow) {
            return true;
        }
    }
    return false;
}

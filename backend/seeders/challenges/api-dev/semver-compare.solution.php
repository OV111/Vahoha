<?php

function parseSemver($version) {
    if (!preg_match('/^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/D', $version, $m)) {
        throw new InvalidArgumentException("Invalid version: " . $version);
    }
    $pre = isset($m[4]) && $m[4] !== "" ? explode(".", $m[4]) : [];
    return [[(int) $m[1], (int) $m[2], (int) $m[3]], $pre];
}

function compareSemver($a, $b) {
    [$xNums, $xPre] = parseSemver($a);
    [$yNums, $yPre] = parseSemver($b);
    for ($i = 0; $i < 3; $i++) {
        if ($xNums[$i] !== $yNums[$i]) {
            return $xNums[$i] < $yNums[$i] ? -1 : 1;
        }
    }
    if (!$xPre && !$yPre) {
        return 0;
    }
    if (!$xPre) {
        return 1;
    }
    if (!$yPre) {
        return -1;
    }
    $shared = min(count($xPre), count($yPre));
    for ($i = 0; $i < $shared; $i++) {
        $p = $xPre[$i];
        $q = $yPre[$i];
        $pNum = preg_match('/^\d+$/D', $p) === 1;
        $qNum = preg_match('/^\d+$/D', $q) === 1;
        if ($pNum && $qNum) {
            if ((int) $p !== (int) $q) {
                return (int) $p < (int) $q ? -1 : 1;
            }
        } elseif ($pNum) {
            return -1;
        } elseif ($qNum) {
            return 1;
        } elseif ($p !== $q) {
            return strcmp($p, $q) < 0 ? -1 : 1;
        }
    }
    return count($xPre) <=> count($yPre);
}

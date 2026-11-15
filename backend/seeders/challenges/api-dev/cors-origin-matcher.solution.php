<?php

function isOriginAllowed($origin, $allowList) {
    if (!is_string($origin) || $origin === "") {
        return false;
    }
    foreach ($allowList as $entry) {
        if ($entry === "*") {
            return true;
        }
        $star = strpos($entry, "*.");
        if ($star === false) {
            if ($entry === $origin) {
                return true;
            }
            continue;
        }
        $prefix = substr($entry, 0, $star);
        $suffix = substr($entry, $star + 1);
        if (strlen($origin) < strlen($prefix) + strlen($suffix)) {
            continue;
        }
        if (strncmp($origin, $prefix, strlen($prefix)) !== 0 || substr($origin, -strlen($suffix)) !== $suffix) {
            continue;
        }
        $middle = substr($origin, strlen($prefix), strlen($origin) - strlen($prefix) - strlen($suffix));
        if (preg_match('/^[a-z0-9-]+(\.[a-z0-9-]+)*$/Di', (string) $middle)) {
            return true;
        }
    }
    return false;
}

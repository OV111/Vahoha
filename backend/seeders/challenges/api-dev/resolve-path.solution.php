<?php

function resolvePath($cwd, $target, $home = "/home/user") {
    $path = $target;
    if ($path === "~" || strpos($path, "~/") === 0) {
        $path = $home . substr($path, 1);
    }
    if (strpos($path, "/") !== 0) {
        $path = $cwd . "/" . $path;
    }
    $parts = [];
    foreach (explode("/", $path) as $segment) {
        if ($segment === "" || $segment === ".") {
            continue;
        }
        if ($segment === "..") {
            array_pop($parts);
        } else {
            $parts[] = $segment;
        }
    }
    return "/" . implode("/", $parts);
}

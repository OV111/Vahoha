<?php

function interpolate($template, $env) {
    return preg_replace_callback(
        '/\$(\$|\{([A-Za-z_][A-Za-z0-9_]*)(?:(:?[-?])([^}]*))?\})/',
        function ($m) use ($env) {
            if ($m[1] === '$') {
                return '$';
            }
            $name = $m[2];
            $op = $m[3] ?? "";
            $arg = $m[4] ?? "";
            $unset = !array_key_exists($name, $env);
            $value = $unset ? null : $env[$name];
            $empty = $unset || $value === "";
            if ($op === ":-") {
                return $empty ? $arg : $value;
            }
            if ($op === "-") {
                return $unset ? $arg : $value;
            }
            if ($op === ":?" || $op === "?") {
                if ($op === ":?" ? $empty : $unset) {
                    throw new RuntimeException($arg !== "" ? $arg : $name . " is required");
                }
                return $value;
            }
            return $unset ? "" : $value;
        },
        $template
    );
}

<?php

function splitArgs($cmd) {
    $args = [];
    $current = "";
    $inToken = false;
    $quote = null;
    $length = strlen($cmd);
    for ($i = 0; $i < $length; $i++) {
        $c = $cmd[$i];
        if ($quote !== null) {
            if ($c === $quote) {
                $quote = null;
            } elseif ($c === "\\" && $quote === '"' && $i + 1 < $length && ($cmd[$i + 1] === '"' || $cmd[$i + 1] === "\\")) {
                $current .= $cmd[++$i];
            } else {
                $current .= $c;
            }
        } elseif ($c === '"' || $c === "'") {
            $quote = $c;
            $inToken = true;
        } elseif ($c === "\\" && $i + 1 < $length) {
            $current .= $cmd[++$i];
            $inToken = true;
        } elseif (preg_match('/\s/', $c)) {
            if ($inToken) {
                $args[] = $current;
                $current = "";
                $inToken = false;
            }
        } else {
            $current .= $c;
            $inToken = true;
        }
    }
    if ($quote !== null) {
        throw new InvalidArgumentException("Unclosed quote");
    }
    if ($inToken) {
        $args[] = $current;
    }
    return $args;
}

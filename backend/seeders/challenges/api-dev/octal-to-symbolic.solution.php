<?php

function octalToSymbolic($mode) {
    $text = $mode === null ? "" : (string) $mode;
    if (!preg_match('/^[0-7]{3}$/D', $text)) {
        return null;
    }
    $result = "";
    foreach (str_split($text) as $digit) {
        $d = (int) $digit;
        $result .= ($d & 4 ? "r" : "-") . ($d & 2 ? "w" : "-") . ($d & 1 ? "x" : "-");
    }
    return $result;
}

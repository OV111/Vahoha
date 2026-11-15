<?php

function parseBearer($header) {
    if (!is_string($header)) {
        return null;
    }
    if (preg_match('/^Bearer +([A-Za-z0-9\-._~+\/]+=*)$/Di', trim($header), $m)) {
        return $m[1];
    }
    return null;
}

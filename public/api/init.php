<?php
session_start();

function get_env_var($key) {
    if (getenv($key)) return getenv($key);
    if (isset($_ENV[$key])) return $_ENV[$key];
    
    // Chercher un .env à la racine du site (ou au-dessus)
    $envPath = __DIR__ . '/../.env';
    if (!file_exists($envPath)) {
        $envPath = __DIR__ . '/../../.env';
    }
    
    if (file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            $parts = explode('=', $line, 2);
            if (count($parts) === 2 && trim($parts[0]) === $key) {
                return trim(trim($parts[1]), '"\'');
            }
        }
    }
    return null;
}
?>
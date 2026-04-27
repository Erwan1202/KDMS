<?php
// Authentification basée sur cookie sécurisé (compatible hébergement mutualisé et serverless)
// Pas de session_start() — utilise un token HMAC dans un cookie HttpOnly.

function get_env_var($key) {
    if (getenv($key)) return getenv($key);
    if (isset($_ENV[$key])) return $_ENV[$key];
    
    // Chercher un fichier d'environnement explicite pour éviter les problèmes de fichiers cachés sur FTP
    $envPath = __DIR__ . '/../kdms.env';
    if (!file_exists($envPath)) {
        $envPath = __DIR__ . '/../../kdms.env';
    }
    
    // Fallback au .env local pour l'environnement dev si besoin
    if (!file_exists($envPath)) {
        $envPath = __DIR__ . '/../.env';
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

function is_admin_logged_in() {
    // Génère le token espéré basé sur la config serveur (invisible côté client)
    $secret = get_env_var('ADMIN_PASSWORD_HASH') ?: get_env_var('ADMIN_PASSWORD');
    if (!$secret) return false;
    $expected_token = hash('sha256', 'kdms_secure_' . $secret);
    
    return isset($_COOKIE['kdms_auth_token']) && $_COOKIE['kdms_auth_token'] === $expected_token;
}

function login_admin() {
    $secret = get_env_var('ADMIN_PASSWORD_HASH') ?: get_env_var('ADMIN_PASSWORD');
    $token = hash('sha256', 'kdms_secure_' . $secret);
    // Cookie sécurisé: / (tout le site), HttpOnly (true)
    setcookie('kdms_auth_token', $token, time() + 86400, '/', '', false, true);
}

function logout_admin() {
    setcookie('kdms_auth_token', '', time() - 3600, '/', '', false, true);
}
?>

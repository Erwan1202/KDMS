<?php
require_once 'init.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';

    // Rate-limiting (OWASP mitigation)
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $limitFile = __DIR__ . '/.ratelimit.json';
    $limits = file_exists($limitFile) ? json_decode(file_get_contents($limitFile), true) : [];
    
    // Nettoyer les vieux blocages (> 15 minutes)
    $now = time();
    foreach ($limits as $k => $v) {
        if ($now - $v['time'] > 900) unset($limits[$k]);
    }
    
    if (isset($limits[$ip]) && $limits[$ip]['count'] >= 5) {
        http_response_code(429);
        echo json_encode(['error' => 'Trop de tentatives échouées. Réessayez dans 15 minutes.']);
        file_put_contents($limitFile, json_encode($limits));
        exit;
    }

    $adminHash = get_env_var('ADMIN_PASSWORD_HASH') ?: '$2b$12$7s2.oWiSD3Q1bS5HmL.4zeV59uzZyifoiQhfRDiRR9SLF/I6wpb7O';
    $adminPlain = get_env_var('ADMIN_PASSWORD');
    
    if (!$adminHash && !$adminPlain) {
        http_response_code(500);
        echo json_encode(['error' => 'Erreur configuration serveur']);
        exit;
    }

    $isValid = false;
    if ($adminHash) {
        $phpHash = str_replace('$2b$', '$2y$', $adminHash);
        if (password_verify($password, $phpHash)) {
            $isValid = true;
        }
    } else if ($adminPlain && $password === $adminPlain) {
        $isValid = true;
    }

    // Protection temporelle anti brute-force
    sleep(1);

    if ($isValid) {
        // Succès : on supprime les tentatives échouées de l'IP
        if (isset($limits[$ip])) {
            unset($limits[$ip]);
            file_put_contents($limitFile, json_encode($limits));
        }
        login_admin();
        echo json_encode(['ok' => true]);
        exit;
    }
    
    // Échec : on incrémente le compteur
    if (!isset($limits[$ip])) $limits[$ip] = ['count' => 0, 'time' => time()];
    $limits[$ip]['count']++;
    $limits[$ip]['time'] = time();
    file_put_contents($limitFile, json_encode($limits));

    http_response_code(401);
    echo json_encode(['error' => 'Mot de passe incorrect']);
    exit;
}

// Vérification de session via GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (is_admin_logged_in()) {
        echo json_encode(['ok' => true]);
        exit;
    }
    http_response_code(401);
    echo json_encode(['error' => 'Non authentifié']);
}
?>
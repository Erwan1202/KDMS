<?php
require_once 'init.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';
    
    // Le mot de passe récupéré peut être un MDP crypté ou brut, à adapter
    $adminHash = get_env_var('ADMIN_PASSWORD_HASH');
    $adminPlain = get_env_var('ADMIN_PASSWORD');
    
    if (!$adminHash && !$adminPlain) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Erreur configuration serveur (secrets introuvables)',
            'config_exists' => file_exists(__DIR__ . '/config.php'),
            'env_keys' => array_keys($_ENV)
        ]);
        exit;
    }

    $isValid = false;
    if ($adminHash) {
        // En PHP, les hash créés en Node.js ($2b$) doivent souvent être changés en $2y$ pour être lus par password_verify
        $phpHash = str_replace('$2b$', '$2y$', $adminHash);
        if (password_verify($password, $phpHash)) {
            $isValid = true;
        }
    } else if ($adminPlain && $password === $adminPlain) {
        $isValid = true;
    }

    if ($isValid) {
        login_admin();
        echo json_encode(['ok' => true]);
        exit;
    }
    
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
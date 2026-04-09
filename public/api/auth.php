<?php
require_once 'init.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';
    
    // Le mot de passe récupéré peut être un MDP crypté ou brut, à adapter
    $adminPassword = get_env_var('ADMIN_PASSWORD');
    
    if (!$adminPassword) {
        http_response_code(500);
        echo json_encode(['error' => 'Erreur configuration serveur']);
        exit;
    }

    if ($password === $adminPassword) {
        $_SESSION['admin_logged_in'] = true;
        echo json_encode(['ok' => true]);
        exit;
    }
    
    http_response_code(401);
    echo json_encode(['error' => 'Mot de passe incorrect']);
    exit;
}

// Vérification de session via GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        echo json_encode(['ok' => true]);
        exit;
    }
    http_response_code(401);
    echo json_encode(['error' => 'Non authentifié']);
}
?>
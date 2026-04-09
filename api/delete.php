<?php
require_once 'init.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method Not Allowed']));
}

if (!is_admin_logged_in()) {
    http_response_code(401);
    exit(json_encode(['error' => 'Non autorisé.']));
}

$public_id = $_POST['public_id'] ?? '';

if (empty($public_id)) {
    http_response_code(400);
    exit(json_encode(['error' => 'public_id requis']));
}

$cloud_name = get_env_var('PUBLIC_CLOUDINARY_CLOUD_NAME') ?: get_env_var('CLOUDINARY_CLOUD_NAME');
$api_key = get_env_var('PUBLIC_CLOUDINARY_API_KEY') ?: get_env_var('CLOUDINARY_API_KEY');
$api_secret = get_env_var('CLOUDINARY_API_SECRET');

if (!$cloud_name || !$api_key || !$api_secret) {
    http_response_code(500);
    exit(json_encode(['error' => 'Configuration Cloudinary manquante.']));
}

$timestamp = time();

$paramsToSign = "public_id=$public_id&timestamp=$timestamp" . $api_secret;
$signature = sha1($paramsToSign);

$url = "https://api.cloudinary.com/v1_1/$cloud_name/image/destroy";

$postData = [
    'public_id' => $public_id,
    'api_key' => $api_key,
    'timestamp' => $timestamp,
    'signature' => $signature
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code === 200) {
    $result = json_decode($response, true);
    echo json_encode(['ok' => true, 'result' => $result['result']]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la suppression.']);
}
?>
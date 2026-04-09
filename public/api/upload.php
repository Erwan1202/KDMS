<?php
require_once 'init.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method Not Allowed']));
}

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    exit(json_encode(['error' => 'Non autorisé. Veuillez vous reconnecter.']));
}

$file = $_FILES['photo'] ?? null;
$title = trim($_POST['title'] ?? '');
$category = $_POST['category'] ?? '';

if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    exit(json_encode(['error' => 'Photo requise ou image invalide']));
}

if (empty($title) || empty($category)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Titre et catégorie requis.']));
}

// Validation Mime Type basique
$allowedMime = ['image/jpeg', 'image/png', 'image/webp'];
$fileMime = mime_content_type($file['tmp_name']);
if (!in_array($fileMime, $allowedMime)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Format non supporté. JPG, PNG, WebP uniquement.']));
}

// Variables Cloudinary
$cloud_name = get_env_var('PUBLIC_CLOUDINARY_CLOUD_NAME');
$api_key = get_env_var('PUBLIC_CLOUDINARY_API_KEY');
$api_secret = get_env_var('CLOUDINARY_API_SECRET');

if (!$cloud_name || !$api_key || !$api_secret) {
    http_response_code(500);
    exit(json_encode(['error' => 'Configuration Cloudinary manquante.']));
}

$timestamp = time();
$folder = 'kdms/gallery';
$context = "title=$title|category=$category";

// Génération de la signature sécurisée Cloudinary
$paramsToSign = "context=$context&folder=$folder&timestamp=$timestamp" . $api_secret;
$signature = sha1($paramsToSign);

$url = "https://api.cloudinary.com/v1_1/$cloud_name/image/upload";

// On utilise safe curl_file_create
$cFile = curl_file_create($file['tmp_name'], $fileMime, $file['name']);

$postData = [
    'file' => $cFile,
    'api_key' => $api_key,
    'timestamp' => $timestamp,
    'signature' => $signature,
    'folder' => $folder,
    'context' => $context
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code === 200) {
    $result = json_decode($response, true);
    echo json_encode(['ok' => true, 'url' => $result['secure_url']]);
} else {
    http_response_code(500);
    error_log("Cloudinary Upload Error: " . $response);
    echo json_encode(['error' => 'Erreur lors du transfert vers le cloud.']);
}
?>
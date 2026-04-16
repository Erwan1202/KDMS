<?php
require_once 'init.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method Not Allowed']));
}

if (!is_admin_logged_in()) {
    http_response_code(401);
    exit(json_encode(['error' => 'Non autorisé. Veuillez vous reconnecter.']));
}

$public_id = $_POST['public_id'] ?? '';
$title = trim($_POST['title'] ?? '');
$category = $_POST['category'] ?? '';
$is_ia = $_POST['is_ia'] ?? 'false';
$file = $_FILES['photo'] ?? null;

if (empty($public_id)) {
    http_response_code(400);
    exit(json_encode(['error' => 'public_id requis.']));
}

if (empty($title) || empty($category)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Titre et catégorie requis.']));
}

// Variables Cloudinary
$cloud_name = get_env_var('PUBLIC_CLOUDINARY_CLOUD_NAME') ?: get_env_var('CLOUDINARY_CLOUD_NAME');
$api_key = get_env_var('PUBLIC_CLOUDINARY_API_KEY') ?: get_env_var('CLOUDINARY_API_KEY');
$api_secret = get_env_var('CLOUDINARY_API_SECRET');

if (!$cloud_name || !$api_key || !$api_secret) {
    http_response_code(500);
    exit(json_encode(['error' => 'Configuration Cloudinary manquante.']));
}

$context = "title=$title|category=$category|ia=$is_ia";

// ─── CAS 1 : Remplacement d'image (nouvelle photo envoyée) ───
if ($file && $file['error'] === UPLOAD_ERR_OK) {
    // Validation Mime Type
    $allowedMime = ['image/jpeg', 'image/png', 'image/webp'];
    $fileMime = mime_content_type($file['tmp_name']);
    if (!in_array($fileMime, $allowedMime)) {
        http_response_code(400);
        exit(json_encode(['error' => 'Format non supporté. JPG, PNG, WebP uniquement.']));
    }

    // 1) Supprimer l'ancienne image
    $timestamp_del = time();
    $paramsToSign_del = "public_id=$public_id&timestamp=$timestamp_del" . $api_secret;
    $signature_del = sha1($paramsToSign_del);

    $ch_del = curl_init("https://api.cloudinary.com/v1_1/$cloud_name/image/destroy");
    curl_setopt($ch_del, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch_del, CURLOPT_POST, true);
    curl_setopt($ch_del, CURLOPT_POSTFIELDS, http_build_query([
        'public_id' => $public_id,
        'api_key' => $api_key,
        'timestamp' => $timestamp_del,
        'signature' => $signature_del
    ]));
    $res_del = curl_exec($ch_del);
    $code_del = curl_getinfo($ch_del, CURLINFO_HTTP_CODE);
    curl_close($ch_del);

    if ($code_del !== 200) {
        error_log("Cloudinary Delete Error during update: " . $res_del);
        // On continue quand même l'upload pour ne pas perdre la nouvelle image
    }

    // 2) Upload la nouvelle image
    $timestamp_up = time();
    $folder = 'kdms/gallery';
    $paramsToSign_up = "context=$context&folder=$folder&timestamp=$timestamp_up" . $api_secret;
    $signature_up = sha1($paramsToSign_up);

    $cFile = curl_file_create($file['tmp_name'], $fileMime, $file['name']);

    $ch_up = curl_init("https://api.cloudinary.com/v1_1/$cloud_name/image/upload");
    curl_setopt($ch_up, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch_up, CURLOPT_POST, true);
    curl_setopt($ch_up, CURLOPT_POSTFIELDS, [
        'file' => $cFile,
        'api_key' => $api_key,
        'timestamp' => $timestamp_up,
        'signature' => $signature_up,
        'folder' => $folder,
        'context' => $context
    ]);

    $response = curl_exec($ch_up);
    $http_code = curl_getinfo($ch_up, CURLINFO_HTTP_CODE);
    curl_close($ch_up);

    if ($http_code === 200) {
        $result = json_decode($response, true);
        echo json_encode(['ok' => true, 'url' => $result['secure_url'], 'replaced' => true]);
    } else {
        http_response_code(500);
        error_log("Cloudinary Upload Error during update: " . $response);
        echo json_encode(['error' => 'Erreur lors du remplacement de l\'image.']);
    }

// ─── CAS 2 : Mise à jour des métadonnées seules ───
} else {
    // Utilisation de l'Admin API pour mettre à jour le context
    $encoded_public_id = rawurlencode($public_id);
    $url = "https://$api_key:$api_secret@api.cloudinary.com/v1_1/$cloud_name/resources/image/upload/$encoded_public_id";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'context' => $context
    ]));

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code === 200) {
        echo json_encode(['ok' => true, 'replaced' => false]);
    } else {
        http_response_code(500);
        error_log("Cloudinary Update Context Error: " . $response);
        echo json_encode(['error' => 'Erreur lors de la mise à jour des métadonnées.']);
    }
}
    

        
?>

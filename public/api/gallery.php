<?php
require_once 'init.php';

header('Content-Type: application/json');

// Autoriser la lecture publique de la galerie pour l'affichage dynamique


$cloud_name = get_env_var('PUBLIC_CLOUDINARY_CLOUD_NAME') ?: get_env_var('CLOUDINARY_CLOUD_NAME');
$api_key = get_env_var('PUBLIC_CLOUDINARY_API_KEY') ?: get_env_var('CLOUDINARY_API_KEY');
$api_secret = get_env_var('CLOUDINARY_API_SECRET');

if (!$cloud_name || !$api_key || !$api_secret) {
    http_response_code(500);
    exit(json_encode(['error' => 'Configuration Cloudinary manquante.']));
}

$url = "https://$api_key:$api_secret@api.cloudinary.com/v1_1/$cloud_name/resources/image/upload?prefix=kdms/gallery/&max_results=500&context=true";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Cloudinary admin API requires basic auth

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code === 200) {
    $data = json_decode($response, true);
    $images = [];
    foreach ($data['resources'] ?? [] as $res) {
        $context = $res['context']['custom'] ?? [];
        $images[] = [
            'public_id' => $res['public_id'],
            'secure_url' => $res['secure_url'],
            'title' => $context['title'] ?? 'Sans titre',
            'category' => $context['category'] ?? 'autre',
            'ia' => $context['ia'] ?? 'false',
            'created_at' => $res['created_at']
        ];
    }
    // Sort by created_at desc
    usort($images, function($a, $b) {
        return strtotime($b['created_at']) - strtotime($a['created_at']);
    });
    
    echo json_encode(['ok' => true, 'images' => $images]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur récupération galerie']);
}
?>
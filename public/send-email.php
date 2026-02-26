<?php
$to_email = "contact@k-dms.co";
$subject_prefix = "[KDMS Landing] ";

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit();
}

if (!empty($_POST['bot-field'])) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé']);
    exit();
}

$firstname = isset($_POST['firstname']) ? trim(strip_tags($_POST['firstname'])) : '';
$lastname = isset($_POST['lastname']) ? trim(strip_tags($_POST['lastname'])) : '';
$email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';

$errors = [];

if (empty($firstname)) {
    $errors[] = 'Le prénom est requis';
}

if (empty($lastname)) {
    $errors[] = 'Le nom est requis';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email invalide';
}

if (empty($phone)) {
    $errors[] = 'Le téléphone est requis';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit();
}

$subject = $subject_prefix . "Demande de rappel - $firstname $lastname";

$message = "
===========================================
   NOUVELLE DEMANDE DE CONTACT - KDMS
===========================================

Prénom : $firstname
Nom : $lastname
Email : $email
Téléphone : $phone

-------------------------------------------
Date : " . date('d/m/Y à H:i') . "
===========================================
";

$headers = [
    'From' => "KDMS Landing <noreply@k-dms.co>",
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
];

$headers_string = '';
foreach ($headers as $key => $value) {
    $headers_string .= "$key: $value\r\n";
}

$mail_sent = mail($to_email, $subject, $message, $headers_string);

if ($mail_sent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Votre demande a bien été envoyée. Nous vous recontacterons rapidement.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Erreur lors de l\'envoi. Veuillez nous contacter directement par téléphone.'
    ]);
}

<?php
require_once 'init.php';
logout_admin();
header('Content-Type: application/json');
echo json_encode(["message" => "Logged out successfully"]);
?>

<?php
$host = "localhost";
$user = "root"; // Ganti dengan user MySQL kamu
$pass = ""; // Ganti dengan password MySQL kamu
$db = "wedding_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>


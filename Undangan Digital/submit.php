<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST["name"]);
    $message = trim($_POST["message"]);
    $attendance = trim($_POST["attendance"]);

    if (!empty($name) && !empty($message) && !empty($attendance)) {
        $stmt = $conn->prepare("INSERT INTO comments (name, message, attendance) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $message, $attendance);
        $stmt->execute();
        $stmt->close();
    }
}
$conn->close();
?>


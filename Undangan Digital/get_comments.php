<?php
include 'config.php';

$sql = "SELECT * FROM comments ORDER BY created_at DESC";
$result = $conn->query($sql);

$comments = [];

while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);
?>

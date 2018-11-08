<?php
$to = 'pat.e.herlihy@gmail.com';
$subject = 'Hello from XAMPP!';
$message = 'This is a test';
$headers = "From: pat.e.herlihy@gmail.com\r\n";
if (mail($to, $subject, $message, $headers)) {
   echo "SUCCESS";
} else {
   echo "ERROR";
}
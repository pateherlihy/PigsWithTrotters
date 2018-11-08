<?php
// Checking For Blank Fields..

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$name = $request->name;
$email = $request->email;
$order = $request->order;
$totalCost = $request->totalCost;

$orderEncode = json_encode($order, JSON_PRETTY_PRINT);


if(($name=="")||($email=="")||($order=="")){
echo "Fill All Fields..";
}else{
// Sanitize E-mail Address
$email =filter_var($email, FILTER_SANITIZE_EMAIL);
// Validate E-mail Address
$email= filter_var($email, FILTER_VALIDATE_EMAIL);
if (!$email){
echo "Invalid Sender's Email";
}
else{
$subject = 'Order Form';
$message = "New order for " . $name . ", \r\n" . $orderEncode . "\r\n TotalCost: £" . $totalCost;
echo $message;
$headers = 'From:'. $email . "\r\n"; // Sender's Email
$headers .= 'Cc:'. $email . "\r\n"; // Carbon copy to Sender
// Message lines should not exceed 70 characters (PHP rule), so wrap it
//$message = wordwrap($message, 70);
// Send Mail By PHP Mail Function
mail("pat.e.herlihy@gmail.com", $subject, $message, $headers);
echo "Your order has been placed successfully. Once the team processes the order you will be provided with an order and tracking reference.";
}
}
?>
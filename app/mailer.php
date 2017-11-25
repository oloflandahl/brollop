<?php
    // Modifications to mailer script from:
    // http://blog.teamtreehouse.com/create-ajax-contact-form
    // Added input sanitizing to prevent injection

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $events = ($_POST["events"]);
        $guests = ($_POST["guests"]);
        $guestinfo = trim($_POST["guestinfo"]);
        $receptioninfo = trim($_POST["receptioninfo"]);
        $message = trim($_POST["message"]);

        $canCome = false;
        if (!empty($events) AND substr( $events, 0, 1 ) !== "0") {
            $canCome = true;
        }

        $errorMessage = NULL;
        if ( empty($name) OR empty($email) ) {
            $errorMessage = "Du måste fylla i namn och e-post";
        } else if ( empty($events) ) {
            $errorMessage = "Du måste fylla i om du/ni kommer eller ej";
        } else if ( $guests === true AND empty($guestinfo) ) {
            $errorMessage = "Du måste fylla i fler namn";
        }

        // Check that data was sent to the mailer.
        if ( !is_null($errorMessage) ) {
            // Set a 400 (bad request) response code and exit.
            //http_response_code(400);
            header("HTTP/1.0 404 Not Found?");
            //You can customise this message
            echo "Det gick inte att skicka anmälan. " . $errorMessage;
            exit;
        }

        // Set the recipient email address.
        // TODO: CHANGE THIS TO YOUR EMAIL ADDRESS!!
        $recipient = "oloflandahl@gmail.com";

        // Set the email subject.
        $subject = "Anmälan från $name";

        // Build the email content.
        $email_content = "Namn: $name <br>";
        $email_content .= "Email: $email <br><br>";
        $email_content .= "Kommer på: $events <br><br>";
        $email_content .= "Antal extra: $guests <br>";
        if (!empty($guestinfo)) {
            $email_content .= "Extra namn: $guestinfo <br><br>";
        }
        if (!empty($receptioninfo)) {
            $email_content .= "Favoritpartylåt: $receptioninfo <br><br>";
        }
        if (!empty($message)) {
            $email_content .= "Meddelande:<br> $message <br>";
        }

        // Build the email headers.
        $email_headers  = "MIME-Version: 1.0"."\r\n"; 
        $email_headers .= "Content-type: text/html; charset=utf-8" . "\r\n";
        $email_headers .= "From:" .$email."\r\n";
        $email_headers .= "Reply-To:". $email. "\r\n";
        $email_headers .= "X-Mailer: PHP/" . phpversion()."\r\n";
        $email_headers .= "X-Priority: 1"."\r\n"; 


        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            //http_response_code(200); 
            header('HTTP/1.0 200 OK');
            //You can customise this message
            echo $canCome ? "Anmälan har skickats in. Vi ser väldigt mycket fram emot att fira med er :)" : "Anmälan har skickats in. Vad tråkigt att du/ni inte kan komma :(";
        } else {
            // Set a 500 (internal server error) response code.
            //http_response_code(500);
            header('HTTP/1.0 500 Internal Server Error');
            //You can customise this message
            echo "Något gick fel. Det gick inte att skicka anmälan.";//You can customise this message
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        //http_response_code(403);
        header('HTTP/1.0 403 Forbidden');
        //You can customise this message
        echo "Det gick inte att skicka anmälan. Var god prova igen.";//You can customise this message
    }

?>

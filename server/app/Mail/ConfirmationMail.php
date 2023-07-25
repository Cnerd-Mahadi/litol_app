<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use MailerSend\LaravelDriver\MailerSendTrait;

class ConfirmationMail extends Mailable
{
    use Queueable, SerializesModels, MailerSendTrait;

    public $username;
    public $meetingData;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($username, $meetingData)
    {
        $this->username = $username;
        $this->meetingData = $meetingData;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            from: new Address('litol@app', 'LITOL_APP'),
            replyTo: [
                new Address('litol@app', 'LITOL_APP'),
            ],
            subject: 'Acceptance Mail For Your Feynman Request!',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'email',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
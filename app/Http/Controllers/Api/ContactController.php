<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\AdminMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\HelloMail;

class ContactController extends Controller
{
    public function contactPost(Request $request){
        $contact = new Contact();

        $contact-> name = $request->name;
        $contact->contact_number = $request->number;
        $contact->email = $request->email;
        $contact->subject = $request->subject;
        $contact->message = $request->message;
        $contact->save();

        Mail::to($request->email)->send(new HelloMail($contact));
        Mail::to('tazwarsaif@gmail.com')->send(new AdminMail($contact));

        return response()->json(['message' => 'Mail sent!', 'status' => 'ok']);
    }
}

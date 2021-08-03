<?php

use App\Events\MyEvent;
use App\Models\Message;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pusher-sample');
});


Route::get('/vue-apollo', function () {
    return view('vue-apollo-sample');
});


Route::get('my-event', function () {
    event(new MyEvent('Hello World!'));
    
    $Message = Message::create(['message' => 'Hi from web ...']);

    \Nuwave\Lighthouse\Execution\Utils\Subscription::broadcast('messageCreated', 'hi');

    return 'Event Sent!';
});

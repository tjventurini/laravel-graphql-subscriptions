<?php

namespace App\Console\Commands;

use App\Models\Message;
use Illuminate\Console\Command;

class CreateMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create-message';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a random message.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $random = rand(0, 4);

        $messages = [
            'Hello world!',
            'Hello again!',
            'Hi!',
            'Hey there!',
            'Good morning!',
        ];

        $message = $messages[$random];

        Message::create(['message' => $message]);

        return 0;
    }
}

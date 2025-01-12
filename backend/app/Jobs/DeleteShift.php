<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeleteShift implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public \App\Models\Shift $shift;
    /**
     * Create a new job instance.
     */
    public function __construct(
        \App\Models\Shift $shift
    ) {
        $this->shift = $shift;
    }


    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // If shift's module exists, change its attendant's status to free 
        if ($this->shift->module) {
            $this->shift->module?->currentAttendant()?->update([
                'status' => \App\Enums\AttendantStatus::Free,
            ]);
        }
        $this->shift->delete();
    }
}

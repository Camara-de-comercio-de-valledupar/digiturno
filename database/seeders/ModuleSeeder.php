<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Types
        \App\Models\ModuleType::create([
            'name' => 'Preferencial',
        ]);
        \App\Models\ModuleType::create([
            'name' => 'General',
        ]);

        // Modules
        \App\Models\Room::all()->each(function ($room) {
            \App\Models\Module::factory(3)->create([
                'room_id' => $room->id,
                'module_type_id' => 2,
            ]);
            \App\Models\Module::factory(1)->create([
                'room_id' => $room->id,
                'module_type_id' => 1,
            ]);
        });

        \App\Models\Attendant::factory(10)->create();

        \App\Models\Module::all()->each(function (\App\Models\Module $module) {
            $module->attendants()->attach(\App\Models\Attendant::inRandomOrder()->first());
        });
    }
}
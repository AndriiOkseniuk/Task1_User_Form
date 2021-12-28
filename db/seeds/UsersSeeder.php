<?php
// when installed via composer
require_once 'vendor/autoload.php';

use Phinx\Seed\AbstractSeed;

class UsersSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * https://book.cakephp.org/phinx/0/en/seeding.html
     */
    public function run()
    {
        $faker = Faker\Factory::create('ru_RU');

        for ($i = 0; $i < 5; $i++) {
            $data = [
                [
                    'first_name' => $faker->firstName(),
                    'last_name' => $faker->lastName(),
                    'station_id' => $faker->numberBetween(1, 16),
                    'is_car' => $faker->boolean,
                    'lunche' => $faker->boolean,
                    'breakfast' => $faker->boolean,
                    'message' => $faker->realText(500, 2),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => null,
                ]
            ];
            $this->table('users')->insert($data)->save();
        }
    }
}

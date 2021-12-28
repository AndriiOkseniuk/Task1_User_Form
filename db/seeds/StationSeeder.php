<?php


use Phinx\Seed\AbstractSeed;

class StationSeeder extends AbstractSeed
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
        $data = [
            ['station' => 'Сырец'],
            ['station' => 'Дорогожичи'],
            ['station' => 'Лукьяновская'],
            ['station' => 'Золотые ворота'],
            ['station' => 'Дворец спорта'],
            ['station' => 'Кловская'],
            ['station' => 'Печерская'],
            ['station' => 'Дружбы народов'],
            ['station' => 'Выдубичи'],
            ['station' => 'Славутич'],
            ['station' => 'Осокорки'],
            ['station' => 'Позняки'],
            ['station' => 'Харьковская'],
            ['station' => 'Вырлица'],
            ['station' => 'Бориспольская'],
            ['station' => 'Красный хутор'],
        ];
        $this->table('stations')->insert($data)->save();
    }
}



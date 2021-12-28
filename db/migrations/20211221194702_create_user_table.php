<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateUserTable extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change(): void
    {
        // Create a table for list of metro stations
        $table = $this->table('stations');
        $table->addColumn('station', 'string',  ['limit' => 50, 'null' => false])
            ->create();

        // Create user table
        $table = $this->table('users');
        $table->addColumn('first_name', 'string',  ['limit' => 60, 'null' => false])
            ->addColumn('last_name', 'string', ['limit' => 60, 'null' => false])
            ->addColumn('station_id', 'integer', ['null' => false])
            ->addColumn('is_car', 'boolean', ['default' => false])
            ->addColumn('lunche', 'boolean', ['default' => false])
            ->addColumn('breakfast','boolean', ['default' => false])
            ->addColumn('message', 'string', ['null' => true, 'limit' => 500])
            ->addColumn('created_at', 'datetime', ['default' => 'CURRENT_TIMESTAMP'])
            ->addColumn('updated_at', 'datetime', ['null' => true])
            ->addForeignKey('station_id', 'stations', ['id'])
            ->create();
    }
}


class CreatePalettes < ActiveRecord::Migration
  def change
    create_table :palettes do |t|
      t.string :title
      t.string :creator
      t.string :colors
      t.string :url

      t.timestamps
    end
  end
end

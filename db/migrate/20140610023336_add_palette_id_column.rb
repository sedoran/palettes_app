class AddPaletteIdColumn < ActiveRecord::Migration
  def change
    add_column :palettes, :palette_id, :string
  end
end

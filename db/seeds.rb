require 'httparty'

offset = 0;

10.times do 

  data = HTTParty.get("htpp://www.colourlovers.com/api/palettes?numResults=100&offset=#{offset}")
  palettes = data['palettes']['palette']
  palettes.each do |palette|
    Palette.create(title: palette['title'], colors: palette['colors']['hex'], creator: palette['userName'], url: palette['url'], palette_id: palette['id'])
  end  

end
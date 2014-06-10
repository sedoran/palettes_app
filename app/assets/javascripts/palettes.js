// ***** MODEL *****

function PaletteModel(data){
   this.title = data.title;
   this.creator = data.creator;
   this.url = data.url;
   this.colors = data.colors;
   this.palette_id = data.palette_id; 
};


// ***** VIEW *****

function PaletteView(model){
   this.model = model;
   this.el = undefined;
};



PaletteView.prototype.paletteDisplay = function() { // creates the colorBox with the palette panels
   var colorBox = $('<div>').addClass('color-box')
   var colorArray = this.model.colors;
   var numColumns = colorArray.length;
   var panelWidth = ((900/numColumns)/900)*100; 
   // 900 is width of colorBox in px; this calculates the width of the individual panels in percentage

   for (var i = 0; i < numColumns; i++) {
      var colorPanel = $('<div>').addClass('color-panel');
      $(colorPanel).css({width: panelWidth + '%', backgroundColor: '#' + colorArray[i]});
      $(colorBox).append(colorPanel);
   };

   // add close button...

   return colorBox;
};



PaletteView.prototype.render = function() {

   // create divs
   var $paletteWindow = $('<div>').addClass('palette-window')
   var $creatorDiv = $('<div>').addClass('creator').html("Creator: "); 
   var $titleDiv = $('<div>').addClass('title').html("Title: ");
   var $urlDiv = $('<div>').addClass('url').html("URL: ");
   var $paletteDiv = $('<div>').addClass('palette');

   // append db content to divs

   $creatorDiv.append(this.model.creator);
   $titleDiv.append(this.model.title);
   $urlDiv.append(this.model.url);

   // get paletteDisplay
   var colorBox = this.paletteDisplay();

   // append divs to palettesWindow, create el, and return this
   $paletteWindow.append($creatorDiv, $titleDiv, $urlDiv, colorBox);
   this.el = $paletteWindow;
   return this;
};


// ***** COLLECTION *****
function PaletteCollection(){
   this.models = [];
};

PaletteCollection.prototype.fetch = function() {
   var offset = this.models.length;
   var that = this;

   $.ajax({
      url: 'palettes/?offset=' + offset,
      dataType: 'json',
      success: function(data) {
         $.each(data, function(i, ele){
            var paletteModel = new PaletteModel(ele);
            that.models.push(paletteModel);
            var paletteView = new PaletteView(paletteModel);
            $('.palettes').append(paletteView.render().el);
         });
      }
   }) 
};



// ***** OTHER *****




// ***** DOCUMENT READY *****



$(function() { 
   paletteCollection = new PaletteCollection();
   paletteCollection.fetch();
})









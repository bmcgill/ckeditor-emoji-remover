/**
 * @file Remove Emoji
 * by Brian McGill
 * Remove emoji from text area
 * MySQL < 5.5 can not support utf8mb4
 * http://drupal.org/node/2043439
 * http://apps.timwhitlock.info/emoji/tables/unicode
 */

(function() {
  var regex = {}, replacements = {
    // http://stackoverflow.com/questions/22006218/replace-emoji-unicode-symbol-using-regexp-in-javascript
    // http://stackoverflow.com/questions/10992921/how-to-remove-emoji-code-using-javascript
    "([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])" : "",
    //"([\u2600-\u26ff])" : "",
    // "([\u1F68-\u1F6C])" : "", //transport and map symbols
    "([\u1F60-\u1F64])" : "", //emoticons
    "([\u2702-\u27B0])" : "", //dingbats
    "([\u1F30-\u1F70])" : ""  //misc uncategorized
  };

  for (var key in replacements) {
    regex[key] = new RegExp(key, 'g');
  }

  function doReplaceOnEvent(evt) {
    var content = evt.data.dataValue || evt.data.txt || evt.data.html;
    if (content) {
      for (var key in replacements) {
      	content = content.replace(regex[key], replacements[key]);
      }
      if (evt.data.dataValue) {
        evt.data.dataValue = content;
      }
      else if (evt.data.text) {
        evt.data.text = content;
      }
      else {
        evt.data.html = content;
      }
    }
  }

  CKEDITOR.plugins.add( 'emojiremove', {
    init : function( editor ) {
      //editor.on('paste', doReplaceOnEvent);
      editor.on('getData', doReplaceOnEvent);
      editor.on('setData', doReplaceOnEvent);
    }
  });

})();

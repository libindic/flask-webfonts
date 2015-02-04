 var font_details;
 $(function () {
     $.get('/webfonts/list', function (d) {
         var fl = $("#fontlist").html("");
         font_details = d.result;
         var repo = {
             repository: {
                 base: static_url,
                 fonts: font_details
             }
         };
         $('body').webfonts(repo);
         $wf = $('body').data("webfonts");
         for (var i in d.result) {
             var fontname = i;
             var interface = '';
             interface += '<hr/><div id="tabbable' + fontname + '" class="tabbable">';
             interface += "<h1 style='font-family:" + fontname + ",sans;'>" + font_details[fontname]['Name'] + "</h1>";
             interface += ' <ul class="nav nav-tabs">';
             interface += ' <li class="active"><a href="#pane1' + fontname + '" data-toggle="tab">Info</a></li>';
             interface += ' <li><a href="#pane2' + fontname + '" data-toggle="tab">Glyphs</a></li>';
             interface += ' <li><a href="#pane3' + fontname + '" data-toggle="tab">Preview</a></li>';
             interface += ' <li><a href="#pane4' + fontname + '" data-toggle="tab">Use</a></li>';
             interface += ' </ul>';
             interface += ' <div class="tab-content">';
             interface += ' <div id="pane1' + fontname + '" class="tab-pane active">';
             interface += '';
             interface += "<div id='" + fontname + "' >";
             interface += "<div>License: " + font_details[fontname]['License'] + "</div>";
             interface += "<div>Author: " + font_details[fontname]['Author'] + "</div>";
             interface += "<div>Scripts Supported: " + font_details[fontname]['Scripts'] + "</div>";
             interface += "<div>Family Contains: " + font_details[fontname]['Variants'] + "</div>";
             interface += "</div>";
             interface += '</div>';
             interface += ' <div id="pane2' + fontname + '" class="tab-pane ' + fontname + ' ">';
             interface += ' </div>';
             interface += ' <div id="pane3' + fontname + '" class="tab-pane ">';
             interface += ' <h4>Preview</h4>';
             interface += ' this is how it is going to look.';
             interface += ' <textarea id= rows="8" class="span12 ' + fontname + ' "></textarea> ';
             interface += ' </div>';
             interface += ' <div id="pane4' + fontname + '" class="tab-pane">';
             interface += ' <h4>To use this font</h4>';
             interface += 'add this to the head of your html file';
             interface += '<pre>&lt;link href='+api_url+'?font="' + fontname +'" type=\"stylesheet\"/&gt;></pre>';
             interface += 'Or you can also use css imports by adding this to your file';
             interface += '<pre> @import('+api_url+'?font="' + fontname +'")</pre>';
             interface += '<pre>';
             interface += '&lt;style&gt;\n';
             interface += 'body { \n';
             interface += ' font-family:"' + fontname + '",serif; \n';
             interface += ' font-size: 12px;\n';
             interface += ' font-style: regular;\n';
             interface += ' text-shadow: 2px 2px 2px #aaa;\n';
             interface += ' letter-spacing: 8em;\n';
             interface += ' word-spacing: 8em;\n';
             interface += ' line-height: 1;\n';
             interface += '} \n ';
             interface += '&lt;/style&gt;\n';
             interface += '</pre>';
             interface += 'and finally to use the imported fonts add something like this to you style sheet\n';
             interface += ' </div>';
             interface += ' </div><!-- /.tab-content -->';
             interface += '</div><!-- /.tabbable -->';
             fl.append(interface);
             glyphs(font_details[fontname]['Glyphs'], fontname, $("#pane2" + fontname));
             $wf.apply(fontname, $("." + fontname));
         }
     });
 });

 function glyphs(range, fontname, element) {
     var start = range.split(":")[0];
     var end = range.split(":")[1];
     var tablemarkup = '';
     tablemarkup = "<table class='table table-bordered " + fontname + " table-striped table-hover' id='glyphtable" + fontname + "' ><tr>";
     var cols = 0;
     start = start * 1;
     end = end * 1;
     for (var i = start; i <= end; i++) {
         cols++;
         tablemarkup += "<td>&#" + i + ";</td>";
         if (cols % 8 == 0) {
             tablemarkup += "</tr><tr>";
             cols = 0;
         }
     }
     tablemarkup += "</tr></table>";
     $("#glyphs" + fontname).html(tablemarkup);
     $("#glyphtable" + fontname).css('font-family', fontname);
     $("#glyphtable" + fontname).css('font-size', '34px');
     element.html(tablemarkup);
 }

 function getfonts(lang) {
     var fonts;
     $.ajax({
         url: '/webfonts/list',
         data: {
             language: "lang"
         },
         success: function (data) {
             fonts = data.result;
             console.log(fonts);
         }
     });
 }

'use babel';
import { CompositeDisposable } from 'atom';
var $ = jQuery = require ('jquery');
var request = require('request');
var cheerio = require('cheerio');
var google = require('google');

export default {
  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dlm:iiitahacks': () => this.iiitahacks()
    }));
  },


  iiitahacks() {
      console.log('hi this is toggle!');
      if (editor = atom.workspace.getActiveTextEditor()) {
        var half_query = editor.getSelectedText();
        if (half_query.toLowerCase() == "codechef"){
            data="http://www.codechef.com/contests";
              down(data).then(function(body){
                    console.log("inside\n");
                    getChallenge(body);
              }, function(err){
                atom.notifications.addFatalError(err.reason);
              });
        }
      }
  }
}

  function down(url) {
    return new Promise(function(resolve, reject) {
    //  request.get('172.31.1.4:').auth('iit2015124', 'Getout123', false);
      request(url , function (error, response, body) {
        if (!error && response.statusCode == 200) {
        //  console.log("Body__________________ \n"+body);
          resolve(body)
        }
        else {
          reject({reason:'Not working'});
        }
      });
    });
  }

  function getChallenge(body) {
    $ = cheerio.load(body);
    var a = $('.dataTable').eq(0).find('tbody tr').find('td');

    //console.log(a.text());
    var code;
    for (var i = 0; i < a.length; i++) {
      var s = "";
      var o = "";
      if (i % 4 == 0){
         code = a.eq(i).text();
        continue;
      }
        console.log(a.eq(i).text());

      s += a.eq(i).text();
      i++;
      o += a.eq(i).text();
      o+= "     ";
      i++;
      o+=a.eq(i).text();
      var temp = "<a href='https://www.codechef.com/"+code+  "' >" + s + "</a>";
      console.log(temp);
      atom.notifications.addInfo(temp,{dismissable:'true', detail:o});
    }
  }

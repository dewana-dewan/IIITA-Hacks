'use babel';
var $ = jQuery = require('jquery');
var FB = require('fb');
var request = require('request');


import DlmView from './dlm-view';
import { CompositeDisposable } from 'atom';


console.log($('body'));

a = document.createElement('div');
a.id = 'hili';
$('#hili').click();

var init_arr;
var final_arr;

// var fooApp = FB.extend({appId: 'foo_id', appSecret: 'secret'});

FB.options({proxy: 'http://user:pass@host:port',
            accessToken: 'user_access_token'});

function call_fb(){
  return new Promise(function(resolve, reject) {
  FB.api('me/notifications?unread&limit=10', function(res) {
      if(!res || res.error) {
       console.log(!res ? 'error occurred' : res.error);
       reject({reason:'Error encountered'});
       return;
      }
        // init_arr = res;
        console.log(init_arr);
        console.log(res);
        console.log(res['data']);
        console.log(res['data'][0]['title']);
        resolve(res);
      });
    });
  }

call_fb().then(function(reslt){
      console.log(reslt);
      init_arr = reslt['data'];
      atom.notifications.addSuccess('success!', {dismissable: 'true'});
      this_is_the_shit();
    }, function(err){
      atom.notifications.addWarning(err['reason'], {dismissable: 'true'})
    });




export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that togles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dlm:togle': () => this.togle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },


  togle() {
    console.log('Dlm was togled!');
    if( editor = atom.workspace.getActiveTextEditor() ){
      console.log('hiii');
      query = editor.getSelectedText();
      console.log(query);
      console.log(init_arr);
      atom.notifications.addSuccess("New notifications", {dismissable: 'true'})

      if(init_arr != undefined ) {
        this_is_the_shit();
      }
      // for (var i = 0; i < init_arr.length; i++) {
      //   console.log(init_arr[i]['title']);
      //   atom.notifications.addSuccess(init_arr[i]['title'], {dismissable: 'true', icon: 'none'})
      // }
    }
  }
};

function this_is_the_shit() {
  if( editor = atom.workspace.getActiveTextEditor() ){
    console.log('hiii');
    query = editor.getSelectedText();
    console.log(query);
    console.log(init_arr);
    final_arr = {};
    // atom.notifications.addSuccess("<b>asd</b>", {dismissable: 'true', icon: 'none'})
    // atom.notifications.addSuccess("asd", {dismissable: 'true', icon: 'none'})
    if( query == "" || query == undefined) {
      final_arr = init_arr;
      for (var i = 0; i < final_arr.length; i++) {
         console.log(init_arr[i]['title']);
         tot_stri = "<a "+ "href = '" + final_arr[i]['link'] + "'>" + init_arr[i]['title'] + "</a>";
         console.log(tot_stri);
         atom.notifications.addInfo( tot_stri, {dismissable: 'true'})
       }
    }
    else {
      console.log('line 110');
      for (var i = 0; i < init_arr.length; i++) {
        if(init_arr[i]['title'].search(query) >= 0) {
          // final_arr.push(init_arr[i]);
          console.log('pushed');

         tot_stri = "<a href = '" + init_arr[i]['link'] + "'>" + init_arr[i]['title'] + "</a>";
         console.log(tot_stri);
         atom.notifications.addInfo( tot_stri, {dismissable: 'true', icon: 'none'})
        }
       }
      }
    }
  };

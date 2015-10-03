var 
  MENU_KEY = 'menuOpen',
  USER_MENU_KEY = 'userMenuOpen';

Session.setDefault(MENU_KEY, false);
Session.setDefault(USER_MENU_KEY, false);

Meteor.startup(function () {
  // set up a swipe left / right handler
  $(document.body).touchwipe({
    wipeLeft: function () {
      Session.set(MENU_KEY, false);
    },
    wipeRight: function () {
      Session.set(MENU_KEY, true);
    },
    preventDefaultEvents: false
  });
});

Template.layout.helpers({
  menuOpen: function() {
    return Session.get(MENU_KEY) && 'menu-open';
  }
});

Template.layout.events({
  'click .js-user-menu': function(event) {
    Session.set(USER_MENU_KEY, ! Session.get(USER_MENU_KEY));
    // stop the menu from closing
    event.stopImmediatePropagation();
  },
  'click #menu a': function(event) {
    Session.set(MENU_KEY, false);
  },
  'click .js-logout': function() {
    Meteor.logout();

    // 切换到登录页面
    Router.go('signin');

  },
  'click .content-overlay': function(event) {
    Session.set(MENU_KEY, false);
    event.preventDefault();
  },
  'click .js-menu': function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    Session.set(MENU_KEY, ! Session.get(MENU_KEY));
  }
});

Template.menu.helpers({
  userMenuOpen: function() {
    return Session.get(USER_MENU_KEY);
  },
  username: function() {
    return Meteor.user().username;
  }
});
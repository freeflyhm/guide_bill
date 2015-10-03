Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'appNotFound',
  loadingTemplate: 'appLoading',
  waitOn: function() {
    var isAdmin = !! Meteor.user() && !! Meteor.user().admin;
    return [
      Meteor.subscribe('tasks', isAdmin),
      Meteor.subscribe('projects')
    ]; 
  }
});

Router.map(function() {
  this.route('signin'); // 登录
  this.route('join');   // 注册
  this.route('tasksList', {
    path: '/'
  });
  this.route('taskPage', {
    path: '/tasks/:_id',
    waitOn: function() {
      return Meteor.subscribe('bills', this.params._id);
    },
    data: function() {
      return Tasks.findOne(this.params._id);
    }
  });
  this.route('taskEditPage', {
    path: '/tasks/:_id/editpage',
    waitOn: function() {
      return Meteor.subscribe('bills', this.params._id);
    },
    data: function() {
      return Tasks.findOne(this.params._id);
    }
  });
  this.route('taskEditTask', {
    path: '/tasks/:_id/edittask',
    data: function() {
      return Tasks.findOne(this.params._id);
    }
  });
  this.route('taskNew', {
    path: '/tasknew'
  });

  this.route('billNew', {
    path: '/tasks/:_id/billnew',
    data: function() {
      return Tasks.findOne(this.params._id);
    }
  });

  this.route('billEdit', {
    path: '/billedit/:_id',
    waitOn: function() {
      return Meteor.subscribe('bill', this.params._id);
    },
    data: function() {
      return Bills.findOne(this.params._id);
    }
  });

  this.route('projectsList', {
    path: '/projectsList'
  });

  this.route('about');
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'taskPage'});
Router.onBeforeAction(requireLogin, {only: 'taskNew'});
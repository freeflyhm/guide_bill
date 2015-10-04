var ERRORS_KEY = 'tasknewErrors';

Template.taskNew.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.taskNew.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.taskNew.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    // Get value from form element
    var date = event.target.date.value;
    var number = event.target.number.value;
    var title = event.target.title.value;
    
    var errors = {};

    if (! date) {
      errors.date = '日期必填';
    }

    if (! number) {
      errors.number = '团队人数必填';
    }
    
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    // Insert a task into the collection
    Meteor.call("addTask", {
      date: new Date(date),
      number: Number(number),
      title: $.trim(title)
    });

    // Clear form
    event.target.date.value = "";
    event.target.number.value = "";
    event.target.title.value = "";
    
    Router.go('tasksList');
  }
});

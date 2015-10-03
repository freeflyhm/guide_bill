Template.tasksList.helpers({
  tasks: function () {
    if (Session.get("showCompleted")) {
      // If show completed is checked, filter tasks
      return Tasks.find({checked: true}, {sort: {date: -1, createdAt: -1}});
    } else {
      // Otherwise, return all of the tasks
      return Tasks.find({}, {sort: {date: -1, createdAt: -1}});
    }
  }
  /*,
  showCompleted: function () {
    return Session.get("showCompleted");
  }*/
});

/*Template.tasksList.events({
  "submit .new-task": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var date = event.target.date.value;
    var number = event.target.number.value;

    // Insert a task into the collection
    Meteor.call("addTask", {
      date: new Date(date),
      number: Number(number)
    });

    // Clear form
    event.target.date.value = "";
    event.target.number.value = "";
  },
  "change .show-completed input": function (event) {
    Session.set("showCompleted", event.target.checked);
  }
});*/
Template.projectsList.helpers({
  projects: function() {
    return Projects.find();
  }
});

Template.projectsList.events({
  'submit': function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var project = $.trim(event.target.project.value);

    if(project !== '') {
      // Insert a task into the collection
      Meteor.call("addProject", {
        project: project
      });
    }

    // Clear form
    event.target.project.value = "";
  },
  'click .edit': function (event) {
    // 阻止事件冒泡
    event.stopPropagation();

    if(confirm('确定要删除吗？')) {
      Meteor.call("deleteProject", this._id);
    }
  }
});
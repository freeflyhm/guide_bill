Template.taskPage.helpers({
  bills: function() {
    return Bills.find({ taskId: this._id }, {sort: {datetime: 1}});
  },
  billsTotal: function() {
    return Bills.find({taskId: this._id}, {fields: {project: 1, number: 1}});
  }
});

Template.taskPage.events({
  'click .center': function () {
    //console.log('click .text');
    // 阻止事件冒泡
    event.stopPropagation();

    Router.go('tasksList');
  }
});
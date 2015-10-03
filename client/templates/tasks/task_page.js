Template.taskPage.events({
  'click .center': function () {
    //console.log('click .text');
    // 阻止事件冒泡
    event.stopPropagation();

    Router.go('tasksList');
  }
});
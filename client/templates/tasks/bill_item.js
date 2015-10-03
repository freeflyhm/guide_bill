Template.billItem.events({
  'click .billedit': function(event) {
    event.preventDefault();
    // 阻止事件冒泡
    event.stopPropagation();

    Router.go('billEdit', {_id: this._id});
  }
});
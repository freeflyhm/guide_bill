if (Projects.find().count() === 0) {
  Projects.insert({project: '餐费'});
  Projects.insert({project: '车费'});
  Projects.insert({project: '门票'});
  Projects.insert({project: '酒店'});
  Projects.insert({project: '其它'});
}
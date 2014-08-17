  Meteor.publish("myBookPosts",function(){
    return Posts.find();
  });
var Posts = new Meteor.Collection("myBookPosts");

if (Meteor.isClient) {
  Template.main.helpers({
      "posts":Posts.find()
  });

  Template.main.events({
      "submit form":function(e){
        e.preventDefault();
        var post = {
            "name": $(e.target).find("[name=username]").val(),
            "text": $(e.target).find("[name=message]").val(),
            "x":$(e.target).find("[name=x]").val(),
            "y":$(e.target).find("[name=y]").val()
        };

        post._id = Posts.insert(post);
        $(e.target).find("[name=username]").val("");
        $(e.target).find("[name=message]").val("");   
        $(e.target).find("[name=x]").val("");
        $(e.target).find("[name=y]").val("");

      }
  })

}

if (Meteor.isServer) {
 
}

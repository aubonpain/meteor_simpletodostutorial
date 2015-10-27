Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

    Meteor.subscribe("tasks");

    Template.body.helpers({
        tasks: function () {
            // What about returning multiple things? E.g. date of creation etc.
            if (Session.get("hideCompleted")) {
                // If hide completed is checked, filter tasks
                return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
            } else {
                // Otherwise, return all of the tasks
                return Tasks.find({}, {sort: {createdAt: -1}});
            }
        },

        // This is used at <label class="hide-completed">
        hideCompleted: function () {
            // This statement returns true/false. You can check with a console log
            // to document.getElementById("session_data").innerHTML = Session.get("hideCompleted");
            return Session.get("hideCompleted");
        },

        incompleteTasks: function () {
            return Tasks.find({checked: {$ne: true}}).count();
        }


/*        images: [
            { image   : "/images/mercury/mercury.jpg" },
            { image   : "/images/venus/venus.jpg" }
        ]*/
    });

    Template.body.events({
        "submit .new-task": function (event) {
            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            var text = event.target.text.value;

            // Insert a task into the collection
            Meteor.call("addTask", text);


            // Clear form
            event.target.text.value = "";
        },

        "change .hide-completed input": function (event) {
            Session.set("hideCompleted", event.target.checked);
        }
    });

    Template.task.events({
        "click .toggle-checked": function () {
            // Set the checked property to the opposite of its current value
            Meteor.call("setChecked", this._id, ! this.checked);
        },
        "click .delete": function () {
            Meteor.call("deleteTask", this._id);
        }

    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

Meteor.methods ({
    addTask: function (text) {
        if (! Meteor.userId()) {
            throw new Meteor.Error("You're not authorized!");
        }

        Tasks.insert({
            text: text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },

    deleteTask: function (taskId) {
        Tasks.remove(taskId);
    },

    setChecked: function (taskId, setChecked) {
        Tasks.update(taskId, {
            $set: {checked: setChecked}
        });
    }

});


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
      Meteor.publish( "tasks", function () {
          return Tasks.find();
      })
  });
}

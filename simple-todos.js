Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

    Template.body.helpers({
        tasks: function () {
            // What about returning multiple things? E.g. date of creation etc.
            return Tasks.find({}, {sort: {createdAt: -1}});
        }

        /*tasks: [
            { text: "This is first"  },
            { text: "This is task 2" },
            { text: "This is task 3" }
        ],

        places: [
            { text: "Bombay" },
            { text: "Zurich" },
            { text: "Tunis" }
        ]*/

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
            Tasks.insert({
                text: text,
                createdAt: new Date() // current time
            });

            // Clear form
            event.target.text.value = "";
        },

        "click .delete": function () {
            // _id = "ObjectId" of that record (unique)
            Tasks.remove(this._id);
        },

        "click .toggle-selected": function () {
            Tasks.update(this._id, {
                // $set changes the value of the specified field
                // If that field doesn't exist, it'll create it.
                $set: {checked: ! this.checked}
            });
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

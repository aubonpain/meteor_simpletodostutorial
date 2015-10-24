if (Meteor.isClient) {
    Template.body.helpers({
        tasks: [
            { text: "This is task 1" },
            { text: "This is task 2" },
            { text: "This is task 3" }
        ],

        places: [
            { text: "Bombay" },
            { text: "" },
            { text: "This is task 3" }
        ],

        images: [
            { image   : "/images/mercury/mercury.jpg" },
            { image   : "/images/venus/venus.jpg" }
        ]
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

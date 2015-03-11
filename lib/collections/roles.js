SchemaPlain.roles = {
    name: {
        type: String,
        unique: true,
        index: true,
        label: "Name"
    },
    groupId: {
        type: String,
        index:true,
        optional:true
    }
};

Schemas.roles = new SimpleSchema(SchemaPlain.roles);
Meteor.roles.attachSchema(Schemas.roles);
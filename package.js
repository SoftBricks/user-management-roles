Package.describe({
  name: 'softbricks:user-management-roles',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  api.use(['aldeed:simple-schema@1.3.0']);
  api.imply('aldeed:simple-schema');
  api.use(['aldeed:collection2@2.3.2']);
  api.imply('aldeed:collection2');
  api.use('stevezhu:lodash@1.0.2');
  api.imply('stevezhu:lodash');
  api.use('softbricks:user-management@0.0.1');
  api.use('alanning:roles@1.2.12');
  api.imply('alanning:roles');

  api.addFiles(['lib/templates/manageRoles.js','lib/templates/addRole.js'], 'client');
  api.addFiles(['lib/collections/roles.js'], ['client','server']);
  api.addFiles(['server/security.js', 'server/methods.js'],'server');
  api.addFiles(['lib/collections/groups.js'],['server','client']);

  // You must load your package's package-tap.i18n before you load any
  // template

  
});

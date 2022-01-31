const AdminJS = require('adminjs');
const AdminJSMongoose = require('@adminjs/mongoose');
const AdminJSExpress = require('@adminjs/express');

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  databases: [],
  rootPath: '/admin'
});

const router = AdminJSExpress.buildRouter(adminJs);

module.exports = router;

'use strict';

module.exports = function(Todo) {
      Todo.beforeRemote('create', function(ctx, instance, next) {
        ctx.args.data.createdAt = new Date();
        ctx.args.data.ownerId = ctx.req.accessToken.userId;
        next();
      });

      Todo.beforeRemote('find', function(ctx, instance, next) {
        ctx.args.filter = Object.assign({}, ctx.args.filter)
        ctx.args.filter.where = Object.assign({}, ctx.args.filter.where, { ownerId: ctx.req.accessToken.userId })
        next();
      });
};

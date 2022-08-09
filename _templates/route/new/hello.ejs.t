---
inject: false
to: src/app/routes.ts
skip_if: <%= name %>
before: "module.exports = app"
---
console.log(hello)

app.<%= method %>('/<%= name %>', <%= name %>)




const db = require('@arangodb').db
const joi = require('joi')
require("@arangodb/aql/cache").properties({ mode: "on" })

// Sample to load an external collection as list
// var users = db._query(`
//   FOR doc in users RETURN [doc._key, doc.username]
// `).toArray()

// Tags definition sample
// var tags = db._query(`
//   LET tags = (
//     FOR doc IN posts
//       FILTER doc.tags != NULL
//       RETURN doc.tags
//   )
//   RETURN UNIQUE(FLATTEN(tags))
// `).toArray()

// { r: new_row, c: "classname", n: "name/id", t: "type", j: joi.validation(), l: "Label", d: [["data", "list"]], tr: translatable? true or false },

// { r: true, c: "1-1", n: "title", t: "string", j: joi.string().required(), l: "Title", tr: true },
// { r: true, c: "1-1", n: "color", t: "string:color", j: joi.string().required(), l: "Pick a color"},
// { r: true, c: "1-1", n: "position", t: "integer", j: joi.number().integer(), l: "Position" },
// { r: true, c: "1-1", n: "online", t: "boolean", j: joi.number().integer(), l: "Online?" },
// { r: true, c: "1-1", n: "published_at", t: "date", j: joi.date().format('YYYY-MM-DD').raw().required(), l: "Published_at" },
// { r: true, c: "1-1", n: "time", t: "time", j: joi.string(), l: "Time" },
// { r: true, c: "1-1", n: "desc", t: "text", j: joi.string(), l: "Description" },
// { r: true, c: "1-1", n: "user_key", t: "list", j: joi.string(), l: "User", d: users },
// { r: true, c: "1-1", n: "image", t: "image", j: joi.string(), l: "Pictures" },
// { r: true, c: "1-1", n: "file", t: "file", j: joi.string(), l: "Files" },
// { r: true, c: "1-1", n: "tags", t: "tags", j: joi.array(), l: "Tags", d: tags },
// { r: true, c: "1-1", n: "items", t: "multilist", j: joi.array(), l: "Multi List of tags", d: tags },
// { r: true, c: "1-1", n: "position", t: "map", j: joi.array(), l: "Coordinates" },
// { r: true, c: "1-1", n: "html", t: "code:html", j: joi.any(), l: "Some HTML" },
// { r: true, c: "1-1", n: "scss", t: "code:scss", j: joi.any(), l: "Some SCSS" },
// { r: true, c: "1-1", n: "javascript", t: "code:javascript", j: joi.any(), l: "Some JS" },
// { r: true, c: "1-1", n: "json", t: "code:json", j: joi.any(), l: "Some Json" },
// { r: true, c: "1-1", n: "wysiwyg", t: "wysiwyg", j: joi.string(), l: "Wysiwyg editor" },
// { r: true, c: "1-1", n: "content", t: "html", j: joi.string(), l: "Content Editor" },

const model = function() {
  return {
    model: [
      { r: true, c: "1-1", n: "name", t: "string", j: "joi.string().regex((/^[a-z0-9\-]+$/)).required()", l: "Mount Point" },
      { r: true, c: "1-2", n: "manifest", t: "code:json", j: "joi.string().required()", l: "Manifest.json" },
      { r: false, c: "1-2", n: "package", t: "code:javascript", j: "joi.string().required()", l: "Package.json" },
      { r: true, c: "1-1", n: "code", t: "code:javascript", j: "joi.string().required()", l: "Main.js" }
    ],
    columns: [{ name: "name" }],
    //columns: [
    //  { name: "title", tr: true, class: "uk-text-right", toggle: true,
    //    values: { true: "online", false: "offline" },
    //    truncate: 20, uppercase: true, lowercase: true
    //  }, ...
    //],
    //slug: ["title"],
    //sortable: false,
    //sort: "SORT doc.order ASC",
    //search: ["title", "barcode", "desc"],
    //includes: {
    //  conditions: "FOR c IN customers FILTER c._key == doc.customer_key",
    //  merges: ", customer: c "
    //},
    //timestamps: true,
    //
    // 1-n relations
    // Don't forget to create your collection in setup.js
    sub_models: {
      api_routes: {
        fields: [
          { r: true, c: "1-1", n: "api_id", t: "hidden", j: "joi.string().required()", l: "Post ID" },
          { r: true, c: "1-1", n: "name", t: "string", j: "joi.string().regex((/^[a-z0-9\-]+$/)).required()", l: "Name" },
          { r: true, c: "1-1", n: "javascript", t: "code:javascript", j: "joi.string().required()", l: "Code Javascript" },
        ],
        singular: "api_route",
        key: "api_id",
        columns: [{ name: "name" }]
    //    columns: [{ name: "name", tr: false, class: ""}, ...], // Displayed on listing
    //    includes: {
    //      conditions: "FOR c IN customers FILTER c._key == doc.customer_key",
    //      merges: "customer: c "
    //    },
    //    timestamps: true,
      },

      api_libs: {
        fields: [
          { r: true, c: "1-1", n: "api_id", t: "hidden", j: "joi.string().required()", l: "Post ID" },
          { r: true, c: "1-1", n: "name", t: "string", j: "joi.string().regex((/^[a-z0-9\-]+$/)).required()", l: "Name" },
          { r: true, c: "1-1", n: "javascript", t: "code:javascript", j: "joi.string().required()", l: "Code Javascript" },
        ],
        singular: "api_lib",
        key: "api_id",
        columns: [{ name: "name" }]
      },

      api_scripts: {
        fields: [
          { r: true, c: "1-1", n: "api_id", t: "hidden", j: "joi.string().required()", l: "Post ID" },
          { r: true, c: "1-1", n: "name", t: "string", j: "joi.string().regex((/^[a-z0-9\-]+$/)).required()", l: "Name" },
          { r: true, c: "1-1", n: "javascript", t: "code:javascript", j: "joi.string().required()", l: "Code Javascript" },
        ],
        singular: "api_script",
        key: "api_id",
        columns: [{ name: "name" }]
      },

      api_tests: {
        fields: [
          { r: true, c: "1-1", n: "api_id", t: "hidden", j: "joi.string().required()", l: "Post ID" },
          { r: true, c: "1-1", n: "name", t: "string", j: "joi.string().regex((/^[a-z0-9\-]+$/)).required()", l: "Name" },
          { r: true, c: "1-1", n: "javascript", t: "code:javascript", j: "joi.string().required()", l: "Code Javascript" },
        ],
        singular: "api_test",
        key: "api_id",
        columns: [{ name: "name" }]
      }
    }
  }
}
module.exports = model
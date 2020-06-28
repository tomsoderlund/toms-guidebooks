## MongoDB

Install

  brew tap mongodb/brew
  brew install mongodb-community

To have launchd start mongodb/brew/mongodb-community now and restart at login:

  brew services start mongodb/brew/mongodb-community

Or, if you don't want/need a background service you can just run:

  mongod --config /usr/local/etc/mongod.conf

http://docs.mongodb.org/v2.2/reference/mongo-shell/

mongod # server: /usr/local/Cellar/mongodb-community@3.6/3.6.12/bin/mongod
mongo # interactive client

show dbs // list all databases
db // show db
use weld-dev // set db
db.dropDatabase()

show collections // 'tables'

### Indexes

db.users.getIndexes()
db.users.dropIndex("name_1")
db.users.dropIndexes()

### Collections

db.collection.count()
db.collection.drop()


## Mongoose

  // Remove Mongoose warnings:
  mongoose.Promise = Promise
  mongoose.connect(config.db, { useMongoClient: true })

### Model

  const mongoose = require('mongoose')
  const Schema = mongoose.Schema

  // a Task consists of one or more SubSchemas
  const SubSchema = new Schema({
    name: { type: String, required: true },
    properties: {},
    elementSelector: String, // JQuery-style selector e.g. '#button-save'
    popoverClasses: String, // 'left', 'right', etc
  })

  const ThingSchema = new Schema({
    FORBIDDEN: id /_id,
    slug: String,
    name: { type: String, unique: true, required: true, sparse: true }, // sparse: The index skips over any document that is missing the indexed field
    dateCreated: { type: Date, default: Date.now },
    position: Number,
    referenceModel: { type: Schema.Types.ObjectId, ref: 'OtherModelName' },
    price: {
      monthly: Number,
      vatIncluded: Boolean,
    },
    oneSubSchema: SubSchema,
    manySubSchemas: [SubSchema],
    topicArray: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    anything: {},
  })

  mongoose.model('Thing', ThingSchema)

#### Schema Types

String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array

http://mongoosejs.com/docs/schematypes.html

#### Statics, Methods

  // Statics: On the Collection/Class
  TaskSchema.statics.getOrderedList = function (group, callback) {
    var Task = mongoose.model('Task')
    Task.find({ group: group }, null, { sort: { position: 1, name: 1 } }, callback)
  }

  // Methods: On the Object/Instance
  TaskSchema.methods.slug = function (task) {
    return this.name.trim().replace(/ /g,'-').replace(/[^\w-]+/g,'').toLowerCase()
  }

#### Virtual properties

Only synchronous - otherwise use Model.methods

  // Get
  ArticleSchema.virtual('date').get(function () {
    return this._id.getTimestamp()
  })

  // Set
  ArticleSchema.virtual('date').set(function (newDate) {
    this.otherDate = newDate
  })

#### toJSON and toObject

Override JSON output:

  // For JSON
  const MySchema = new Schema({
    ...
  },
  {
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
      },
    }
  })

Alternative way:

  UserSchema.methods.toJSON = function() {
    let obj = this.toObject()
    // do whatever
    return obj
  }

NOTE: toObject affects save too

What does this do?

  AccountSchema.set('toJSON', { getters: true, virtuals: true })

#### Middleware: pre/post hooks

doc.init
doc.validate
doc.save
doc.remove

  // also: 'save'
  MySchema.pre('validate', function (next) {
    if ('invalid' == this.name) {
      return next(new Error('#sadpanda'))
    }
    next()
  })

Collection.count
Collection.find
Collection.findOne
Collection.findOneAndRemove
Collection.findOneAndUpdate
Collection.insertMany
Collection.update

  PlanSchema.pre('find', function (next) {
    console.log('PlanSchema.pre.find', ...arguments)
    next()
  })

  PlanSchema.post('find', function (results, next) {
    console.log('PlanSchema.post.find', ...arguments)
    next()
  })

#### Validations

  required: [true, 'Why no bacon?'],
  min: [6, 'Too few eggs'],
  max: 12,
  enum: ['Coffee', 'Tea'],
  required: function() { return this.bacon > 3; }
  validate: {
    validator: function (v) {
      return /\d{3}-\d{3}-\d{4}/.test(v)
    },
    message: '{VALUE} is not a valid phone number!'
  },

### Searching

#### Lean and Exec

MyModel
  .find({ published: true })
  .sort({ date: -1 })
  .limit(20)
  //.lean()
  .exec(function (err, results) {
  })

#### findById

User.findById(req.params.id).lean().exec(function (err, user) {})

#### findOne

Restaurant.findOne( {'_id' : restaurantId }, function (err, restaurant) {
})

#### Wildcard search

db.users.find({"name": /m/})
query['locationDetails.original'] = new RegExp(req.query.city, 'ig')

Starts with:

  User.find({ username: new RegExp('^' + userName) })

Case insensitive:

  User.find( { name: { $regex: new RegExp(nameString, 'i') } } )

#### Nested

const query = {
  'positions.company': req.crudify.company._id
}

query['locationDetails.original'] = createServernew RegExp(req.query.city, 'ig')

#### Numeric values

  { quantity: { $not: { $gt: 5 } } } // qty is "not >5" (i.e. 5 or below)
  { quantity: { $ne: 20 } } // qty is "not 20" (includes undefined)
  { quantity: { $gte: 5, $lte: 15 } } // qty is >5 and <15

#### Value exists

  { locationDetails: { $exists: false }, location: { $exists: true, $ne: '' } }
  { quantity: { $exists: true, $nin: [5, 15] } } // qty exists but isn't 5 or 15
  { names: null } // find where 'names' is null or undefined

#### Field types

  { names: { $type: 4 } } // find where 'names' is an array: https://docs.mongodb.org/manual/reference/operator/query/type/#op._S_type
  { names: { $type: 10 } } // find where 'names' is null

#### And/Or

  { quantity: 5, price: 1.99 } // implicit $and statement
  { $and: [ { quantity: { $ne: 5 } }, { quantity: { $exists: true } } // qty is not 5, but exists
  { $or: [ { quantity: { $ne: 5 } }, { quantity: { $exists: true } } // qty is not 5 or exists

  {
    type: 'food',
    $or: [
      { quantity: { $gt: 100 } },
      { price: { $lt: 9.95 } }
    ]
  }

#### Date search

  if (req.query.after) filter.dateCreated = { $gte: new Date(req.query.after) }
  if (req.query.days) filter.dateCreated = { $gte: new Date((new Date()).getTime() + req.query.days*-24*60*60*1000) }

  const query = {
    dateCreated: {
      $gte: new Date(year,  month,  1),
      $lt:  new Date(year2, month2, 1)
    }
  }

#### Search in arrays

  // As favouriteFoods is a simple array of strings, you can just query that field directly:
  PersonModel.find({ favouriteFoods: "sushi" }, ...)

  { price: { $in: [5, 15] } } // price is either 5 or 15
  { price: { $nin: [5, 15] } } // price is neither 5 nor 15

Find ObjectID

  Lesson.find({ topics: mongoose.Types.ObjectId(topic._id) })

$elemMatch:

  db.users.find({ awards: { $elemMatch: { award:'National Medal', year:1975 } } })
  db.articles.find({ translations: { $elemMatch: { languageCode: 'sv', slug: 'swells-grundare-sarah' } } })

  Article.findOne().elemMatch('translations', { languageCode: req.params.languageCode, slug: req.params.slug }).exec()

### Populate: linked/referenced

populate(fieldName)

  req.crudify[modelName].populate(propertyName, '-_id -__v', (err, result) => {
    next()
  })

  BugUpdate.find(query).sort(sorting).limit(200).populate('bug').exec(function (err, bugUpdates) {
  })

### Create new

  MyModel.create(dataObj, callback)

  let notification = new Notification(data)
  notification.save(cb)

### Update/Upsert

account.markModified('subscriptions')

db.products.update( { item: "book", quantity: { $gt: 5 } }, { $set: { x: 6 }, $inc: { y: 5} } )
db.projects.update( { _id: ObjectId("52e57805d87d0e2618000003") }, { $set: { name: 'Hola Bandoola' } } )
db.projects.update( { slug: "myapp" }, { $set: { screens: [ {name: 'Nr1', data: {}}, {name: 'Nr2', data: {}} ] } } )
db.projects.update( { slug: "test-project" }, { $set: {'screens.0': 'testVal'} }, { upsert: true } )
db.projects.update( { slug: "test-project" }, { $set: {screens.0.elements.elem1: 'testVal'} }, { upsert: true } )
db.users.find( { email: "NAME@YOURWEBSITE.com" } )
db.users.update( { email: "tom+expired@weld.io" }, { $set: {'subscriptions.0.expires': ISODate("2014-01-01")} }, { upsert: true } )
db.users.update( { email: "NAME@YOURWEBSITE.com" }, { $set: {'dateLastLogin': ISODate("2014-11-20")} }, { upsert: true } )
db.users.update( { email: "NAME@YOURWEBSITE.com" }, { $set: {'role': 'admin' } } )
db.users.update( { email: "NAME@YOURWEBSITE.com" }, { $set: {'tags': ['beta2.0'] } } )

db.posts.insert({ title: "Hello World", text: "yoda yoda" })
db.projects.save() // update or insert

db.projects.remove({}) // NOTE: Removes all!

#### findOrCreate vs. Upsert vs. findOneAndUpdate

Upsert: because you probably always want to update with latest properties

  UserModel.update({ user: req.body.user }, { $set: userNewObj }, { upsert: true }, function (err, rowsUpdated) {})

https://github.com/drudge/mongoose-findorcreate

  const findOrCreate = require('mongoose-findorcreate')
  PersonSchema.plugin(findOrCreate)

  Person.findOrCreate({ name: { $regex: new RegExp(newPerson.name, 'i') } }, newPerson, function (err, result, wasCreated) {
    req.crudify = { err, result, person: result }
    next()
  })

  Person.findOrCreate({
      name: { $regex: new RegExp(newPerson.name, 'i') }
    },
    newPerson,
    function (err, result, wasCreated) {
      console.log(`wasCreated:`, { wasCreated, err, result })
      req.crudify = { err, result, person: result }
      next()
  })

// findOrCreate, then update old record
  Bug.findOrCreate({ githubIssueId: data.issue.id }, bugObj, function (err, bug, wasCreated) {
    if (wasCreated) {
      // New bug
      cb(err, data, bug)
    }
    else {
      // Update existing bug
      _.merge(bug, bugObj)
      bug.save(function (err, bug2) {
        cb(err, data, bug2)
      })
    }
  })

// Find+Update or Create:

  User.findOne({ twitterHandle: twitterUser.screen_name }, (err, foundUser) => {
    if (foundUser) {
      // Update existing
      foundUser.imageUrl = foundUser.imageUrl || userData.imageUrl
      foundUser.save(cb)
    }
    else {
      // Create new
      User.create(userData, cb)
    }
  })

#### Upsert/Update

http://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose

  var contact = new Contact({ phone: request.phone, status: request.status })

// Convert the Model instance to a simple object using Model's 'toObject' function to prevent weirdness like infinite looping

  var upsertData = contact.toObject()

// Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error

  delete upsertData._id

// Do the upsert, which works like this: If no Contact document exists with _id = contact.id, then create a new doc using upsertData. Otherwise, update the existing doc with upsertData

  Company.update({ _id: position.company._id }, position.company, { upsert: true }, cb)


#### mapReduce

  const mapReduceOperation = {
    //query: { createdByUser: _.get(req, 'user.d.uid') },
    sorting: { dateCreated: 1 },
    map: function () {
      //consolelog('MAP', this, arguments)
      emit(this.name, 1)
    },
    reduce: function (k, vals) {
      //consolelog('REDUCE', this, arguments)
      return vals.length
    },
    // finalize: function
    out: { replace: 'createdCollectionNameForResults' },
    verbose: true,
  }
  DataSource.mapReduce(mapReduceOperation, function (err, model, stats) {
    console.log('map reduce:', {err, model, stats})
    model.find().exec(function (err, result) { //.where('value').gt(10)
      console.log({ err, result })
      req.crudify = req.crudify || { err, result }
      next()
    })
  })


## MongoLab

{
  "name": {
    "$regex": "Ecwid.*",
    "$options": "si"
  }
}

### Backups: mongodump / mongorestore

mongorestore --db weld-live-20160113 heroku_app21501008/

#### Henrics: Restore one document/project

1. Download the backup from MongoLab.
2. Restore it locally into a new database:
  mongorestore -h 127.0.0.1:27017 -d <some-new-DB> <path-of-backup>
3. Extract the one document:
  mongodump -h 127.0.0.1 -d <some-new-DB> -c projects -q '{"_id":ObjectId("<project-id>")}'
4. Restore to MongoLab:
  mongorestore --host ds045481-a0.mongolab.com --port 45481 --db heroku_app21501008 -u <username> -p <password> <some-new-DB>


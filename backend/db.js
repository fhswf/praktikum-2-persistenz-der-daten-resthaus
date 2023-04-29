import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todos';
const MONGO_DB = process.env.MONGO_DB || 'todos';

let db = null;
let collection = null;
export default class DB {
    connect() {
        return MongoClient.connect(MONGO_URI)
            .then(function (client) {
                db = client.db(MONGO_DB);
                collection = db.collection('todos');
            })
    }

    queryAll() {
        return collection.find().toArray();
    }

    queryById(id) {      
        return collection.findOne({ _id: id });

    }

    update(id, order) {
        return new Promise((resolve, reject) => {
            collection.updateOne({ _id: id }, { $set: order }, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            collection.deleteOne({ _id: id }, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
    }

    insert(order) {
            collection.insertOne(order)
    }
}

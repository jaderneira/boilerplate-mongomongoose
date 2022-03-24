require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const PersonSchema = require('./schemas/personSchema');

let Person = PersonSchema

const createAndSavePerson = (done) => {
  const janeFonda = new Person({
    name: "Jane Fonda",
    age: 84,
    favoriteFoods: ["eggs", "fish", "fresh fruit"]
  });

  janeFonda.save(function(err, data){
    if(err) return console.error(err);
    done(null, data)
  });

};

const arrayOfPeople = [
  {
    name: "John Doe",
    age: 34,
    favoriteFoods: ["banana", "fish", "fresh fruit"]
  },
  {
    name: "Laura Mesa",
    age: 23,
    favoriteFoods: ["banana", "chhicken", "pig"]
  },
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people)=>{
    if(err) return console.error(people);
    done(null, people)
  }) 
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound)=>{
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data)=>{
    if (err) return console.log(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound)=>{
    if(err) return console.error(err);
    done(null, personFound)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, personFound)=>{
    if(err) return console.error(err);

    personFound.favoriteFoods.push(foodToAdd);

    personFound.save((err, updatedPerson)=>{
      if(err) return console.error(err);
      done(null, personFound)
    })    
  })  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, personUpdated)=>{
    if(err) return console.error(err);
    done(null, personUpdated)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId, 
    (err, personDeleted)=>{
      if(err) return console.error(err);
      done(null, personDeleted)
    }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove(
    {name: nameToRemove}, 
    (err, res)=>{
      if(err) return console.error(err);
      done(null, res)
    }
  );
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: food})
    .sort({name: -1})
    .limit(2)
    .select({age: 0})
    .exec((err, people)=>{
      if(err) return console.error(err);
      done(null, people)
    }) 
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

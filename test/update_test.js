const assert = require('assert');
const User = require('../src/user');

describe('Update records', ()=>{
   let joe;

   beforeEach((done) =>{
   	joe = new User({name: 'Joe', postCount: 0 });
    joe.save()
       .then(() =>done());
   });

   function assertName(operation,done){
   	operation
   	    .then(() =>User.find({})) 
         .then((users) =>{
           assert(users.length === 1);
           assert(users[0].name === 'Alex'); 
           done();
        });

   }

   it('instance type using set and save',(done)=>{
      joe.set('name', 'Alex');
       assertName(joe.save(),done);
   });


   it('A model class can update',(done) =>{
   	assertName(
      User.update({name: 'Joe'},{name: 'Alex'}),
       done
      );
   });

    it('A model class can update one record',(done) =>{
     assertName( 
      User.findOneAndUpdate({name: 'Joe'},{name: 'Alex'}),
    done
    );
   });

   it('A model class can update with an id',(done) =>{
     assertName(
      User.findByIdAndUpdate(joe._id,{name: 'Alex'}),
      done
      );
   });
    
  it('A user can have their postcount incremented by 1', ()=>{
     User.update({ name: 'Joe'}, {postCount: 1});
  });

  it('A user can have their postcount incremented by 1', (done)=>{
     User.update({ name: 'Joe'}, {$inc: {postCount: 1}})
        .then(() => User.findOne({name: 'Joe'}))
        .then((user) => {
          assert(user.postCount === 1);
          done();
        })
  });

});





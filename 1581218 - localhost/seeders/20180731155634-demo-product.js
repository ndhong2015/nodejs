'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   var products = [];
    var i = 1;

    for (i=1; i<10; i++) {
      var product = {
        name: `Book ${i}`,
        imagepath: `/images/books/book${i}.jpeg`,
        summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, vel?',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae dolor tenetur neque itaque et reprehenderit autem odit nesciunt, aut repellendus nisi sapiente nam ipsa vero excepturi perspiciatis, reiciendis ipsam, quo id consequatur. Delectus officiis explicabo sit quia, maiores nesciunt rem esse hic molestias velit illum in nulla modi quo officia.',
        price: Math.random() * 100,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      products.push(product);
    }
    console.log(products);
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Products', null, {});
  }
};

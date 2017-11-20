var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging:false});

const User = db.define('user', {
  name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
    }
})

const Pages = db.define('page',
  {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
  },
  {
    getterMethods: {
      route: function(){
        return '/wiki/' + this.urlTitle
    }
  },
  hooks: {
    beforeValidate:(page) => {
      if(page.title){
        page.urlTitle =  page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        return Math.random().toString(36).subString(2,7);
      }
    }
  }

});

  module.exports = {
    db: db,
    Pages: Pages,
    User: User
  };

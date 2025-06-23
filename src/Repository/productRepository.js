// const User  = require('../models/User');
// // const { Op, fn, col, where } = require('sequelize');

// // const findUsersByEmailStartingWith = async (letter) => {
// //   return await User.findAll({
// //     where: where(fn('LOWER', col('email')), {
// //       [Op.like]: `${letter.toLowerCase()}%`
// //     })
// //   });
// // };

// // module.exports = {
// //   findUsersByEmailStartingWith,
// // };
// const { Op } = require('sequelize');
// // const User = require('../models');

// const searchUsers = async (req) => {
//     try {
//         console.log(req)
//         const { letter } = req;

//         const where = {};
//         if (letter) {
//             where.name = { [Op.iLike]: `%${letter}%` };
//         }
//         if (letter) {
//             where.email = { [Op.iLike]: `%${letter}%` };
//         }

//         return await User.findAll({ where, logging: console.log });
//         // res.status(200).json({ message: 'Users found', data: users });
//     } catch (err) {
//         console.log(err)
//         // res.status(500).json({ message: 'Error searching users', error: err.message });
//     }
// };

// module.exports = {
//     searchUsers,
// };



// repositories/userRepository.js
const product = require('../models/product');
const User = require('../models/user');


//create
const createproduct = async (data) => {
  return await product.create(data);
};


//find by id
const getproductById = async (id) => {
  return await product.findOne({
    where: {
      id: id,
      softdelete: false
    }
  });
};

//update
const updateproduct = async (id, data) => {
  console.log("id:", id)
  const [updated] = await product.update(data, {
    where: { id },
  });
  return updated ? await product.findByPk(id) : null;
};


//delete
const softDeleteproduct = async (id) => {
  console.log("id: ", id)
  const [deleted] = await product.update({ softdelete: true }, {
    where: { id },
    returning: true
  });

  console.log("deleted: ", deleted)
  return deleted;
};
//innerjoining


const getProductsWithUsers = async (req, res) => {
  try {
    const products = await product.findAll({
      include: [
        {
          model: User,
            as: 'creator',
          required: true,
          where: { softdelete: false }, // Optional
          attributes: ['id', 'name'],
        }
      ],
      where: { softdelete: false },
      attributes: ['id', 'name', 'price'],
    });

     return(products);
  } catch (error) {
    console.error('Join error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



//pagination
const getProducts = async (req, res) => {
  try {
        const { Op } = require('sequelize');
        const { data = {}, status = {} } = req;
    const { filter, sort, page } = req || {}
    const { pageLimit = 10, pageNumber = 1 } = page || {}
    // const limit = pageLimit;
    const offset = (pageNumber - 1) * pageLimit;



    const sortBy = sort?.sortBy || 'createdAt';
    const orderBy = sort?.orderBy?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
 const {
      content = [],
     // page = {},
      totalPages = 0,
      totalItems = 0
    } = data;
      //const { pageNumber = 1, pageLimit = 10 } = currentPage;


    const whereClause = {
      softdelete: false
    };


    // const limit = parseInt(pageLimit) || 10;
    // const pageNum = parseInt(pageNumber) || 1;
    //const offset = (pageNum - 1) * limit
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    // const offset = (page - 1) * limit;
    if (filter.search) {
      whereClause.name = { [Op.iLike]: `%${filter.search}%` };
    }


    if (Array.isArray(filter.ids) && filter.ids.length > 0) {
      whereClause.id = { [Op.in]: filter.ids };
    }


    const products = await product.findAndCountAll({
      include: [
        {
           model: User,
    as: 'creator',  
    required: true,
    where: { softdelete: false },
    attributes: ['id', 'name'],
        }
      ],
      // where: { softdelete: false },
      where: whereClause,
      attributes: ['id', 'name', 'price', 'userId'],
      limit: pageLimit,
      offset,
      order: [[sortBy, orderBy]]
    });


    return ({
       // message: 'Request parsed successfully',
       Data:{
      pagination: {
        content,
        page: { pageNumber, pageLimit },
      //  totalPages: Math.ceil(products.count / pageLimit),
      totalPages:pageLimit>0?Math.ceil(result.count/pageLimit):0,
        totalItems: products.count
        // totalPages,
        // totalItems
      }
    },
      status: {
        description: 'Found successfully',
        code: 'OK, SUCCESS',
        status: 'Success'
      }
       
      // data: products.rows,
      // currentPage: page,
      // totalPages: Math.ceil(products.count / limit),
      // totalItems: products.count
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      status: {
        description: 'Something went wrong',
        code: 'ERROR',
        status: 'Fail'
      }
    });
  }
}
//filter

const filterproductByEmail = async (req) => {
  //   return await User.findAll({
  //     where: {
  //       email: {
  //         [require('sequelize').Op.like]: `${prefix}%`,
  //       },
  //     },
  //   });

  try {
    console.log(req)
    const { letter } = req;
    const { ids } = req;

    const where = {};
    if (letter) {
      where.name = { [Op.iLike]: `%${letter}%` };
    }

    //     return await User.findAll({ where, logging: console.log });
    //     // res.status(200).json({ message: 'Users found', data: users });
    // } catch (err) {
    //     console.log(err)
    //     // res.status(500).json({ message: 'Error searching users', error: err.message });
    // }
    if (ids?.length > 0) {
      where.id = { [Op.in]: ids };
    }

    const products = await product.findAll({ where });
    return products;

  } catch (err) {
    console.error('Error in filterUsers:', err);
    throw err;
  }

};

module.exports = {
  createproduct,
  getproductById,
  updateproduct,
  getProductsWithUsers,
  softDeleteproduct,
  getProducts,
  filterproductByEmail,

};

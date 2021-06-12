const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const userData = await Category.findAll({
       include: [{model: Product}],
    });
    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!category) {
      res.status(404).json({ message: "No categories found."});
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(
      {
      category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      })
      .then((updatedBook) => {
        res.json(updatedBook);
      })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!delCategory) {
      res.status(404).json({ message: "No category found."});
      return;
    }

    res.status(200).json(delCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;

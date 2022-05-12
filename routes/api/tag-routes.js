const router = require("express").Router()
const { Tag, Product, ProductTag } = require("../../models")

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["product_name"],
      },
    ],
  })
    .then((tagFindAllData) => res.json(tagFindAllData))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["product_name"],
      },
    ],
  })
    .then((tagFindOnedata) => {
      if (!tagFindOnedata) {
        res.status(404).json({ message: "No category found with this id sry" })
        return
      }
      res.json(tagFindOnedata)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tagCreateData) => res.json(tagCreateData))
    .catch((err) => {
      res.status(400).json(err)
    })
})

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  console.log(req.params)
  console.log(req.body)
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((tagUpdateData) => {
      if (!tagUpdateData) {
        res.status(404).json({ message: "no category found for this id sry" })
        return
      }
      res.json(tagUpdateData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  console.log(req.params)
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagDeleteData) => {
      if (!tagDeleteData) {
        res.status(404).json({ message: "no category found for this id sry" })
        return
      }
      res.json(tagDeleteData)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router

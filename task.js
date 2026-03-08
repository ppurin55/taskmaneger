const express = require("express")
const router = express.Router()

let tasks = []

router.get("/", (req, res) => {
  res.json(tasks)
})

router.post("/", (req, res) => {
  const task = {
    id: Date.now(),
    title: req.body.title,
    status: "TODO"
  }

  tasks.push(task)
  res.json(task)
})

router.put("/:id", (req, res) => {
  const id = Number(req.params.id)

  const task = tasks.find(t => t.id === id)
  task.status = req.body.status

  res.json(task)
})

router.delete("/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== Number(req.params.id))
  res.json({message:"deleted"})
})

module.exports = router

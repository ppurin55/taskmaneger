const express = require("express")
const app = express()
const tasks = require("./tasks")

app.use(express.json())
app.use(express.static("public"))

app.use("/api/tasks", tasks)

app.listen(3000, () => {
  console.log("Server started")
})

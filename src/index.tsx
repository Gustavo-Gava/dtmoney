import React from "react"
import ReactDOM from "react-dom"
import { createServer, Model } from "miragejs"
import { App } from "./App"

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          title: "Supermercado",
          type: "withdraw",
          category: "Compras",
          createdAt: new Date(),
          amount: 500,
        },
        {
          title: "Freelancer",
          type: "deposit",
          category: "Trabalho",
          createdAt: new Date(),
          amount: 2000,
        },
      ],
    })
  },

  routes() {
    this.namespace = "api"

    this.get("/transactions", () => {
      return this.schema.all("transaction")
    })

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody)

      console.log(data)

      data.createdAt = new Date()

      return schema.create("transaction", data)
    })

    this.delete("/transactions/:id", (schema, request) => {
      let id = request.params.id
      id = id.replace(":", "")

      this.schema.transactions.find(id).destroy()

      return this.schema.all("transaction")
    })
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

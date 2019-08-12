const express = require("express");
const Processo = require("./processo");

const processos = [];

const router = express.Router();

router.get("/", (req, res) => {
  res.json(processos);
});

router.get("/:id", (req, res) => {
  const processo = processos.find(p => p.id === id);
  if (processo) {
    res.json(processos);
  } else {
    res.status(404).end();
  }
});

// curl -v -H"content-type: application/json" --data  '{"numero":"123","advogado":"joaoa v2"}' http://localhost:3000/processos
router.post("/", (req, res) => {
  //   console.log(req.body);
  const { numero, advogado } = req.body;
  const processo = new Processo(null, numero, advogado);
  processo.id = processos.length + 1;
  processos.push(processo);
  res.location("/processos/" + processo.id);
  res.status(201).end();
});

// curl -v -XPUT  -H"content-type: application/json" --data  '{"advogado":"joaoa v2"}' http://localhost:3000/processos/1
router.put("/:id", (req, res) => {
  const { numero, advogado } = req.body;
  const id = +req.params.id;
  const processo = processos.find(p => p.id === id);
  if (processo) {
    if (numero != null) {
      processo.numero = numero;
    }
    if (advogado != null) {
      processo.advogado = advogado;
    }
    res.status(201).end();
  } else {
    res.status(404).end();
  }
});

// curl -v -XDELETE http://localhost:3000/processos/1
router.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const index = processos.findIndex(p => p.id === id);
  if (index !== -1) {
    processos.splice(index, 1);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

const app = express();

app.use(express.json());
app.use("/processos", router);
app.listen(3000);

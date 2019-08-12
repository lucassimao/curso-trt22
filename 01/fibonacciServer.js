var http = require("http");

function fibonacci(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

var server = http.createServer();
server.on("request", (req, resp) => {

    try {
        if (!req.url.startsWith("/fibonacci") || req.method != "GET")
            throw "Apenas GET /fibonacci?numero= é aceito";

        const url = require("url").parse(req.url, true);
        const numero = parseInt(url.query.numero);

        if (numero > 45)
            throw 'Apenas numeros <= 45 são aceitos';
    
        console.log(`Calculando ${numero}º fibonacci ...`);
        const fibo = fibonacci(numero);
        resp.end(String(fibo));
        console.log(`${numero}º fibonacci = ${fibo}`);

    } catch (msg) {
        resp.writeHead(400, { "Content-Type": "application/text" });
        resp.end(msg);
    }
})

server.listen(8080);

function fibonacciRemoto(numero) {
  return new Promise((resolve, reject) => {
    const url = "http://localhost:8080/fibonacci?numero=" + numero;

    http.get(url, res => {
        res.once("data", chunk => {
            res.statusCode == 200 ? resolve(String(chunk)) : reject(chunk)
        });
      })
      .on("error", e => {
        reject("Erro " + res.message);
      });
  });
}

console.log('Antes da chamada ... ');

fibonacciRemoto(43)
  .then(valor => console.log("Valor: " + valor))
  .catch(erro => console.error("Erro ao computar valor: " + erro))
  .then( _ => server.close() );

  console.log('Depois da chamada ... ');

  // exemplo em paralelo
//   const promises = [fibonacciRemoto(20),fibonacciRemoto(42)];
//   Promise.all(promises)
//     .then(valores => console.log(valores))
//     .catch(erro => console.error("Erro ao computar valor: " + erro))
//     .then( _ => server.close() );


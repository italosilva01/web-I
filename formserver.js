const http = require('http');
const url = require('url');
const qs = require('querystring');

// Crie um servidor HTTP
const server = http.createServer((req, res) => {
  // Verifique se a solicitação é do tipo POST e no caminho /enviar
  if (req.method === 'POST' && req.url === '/enviar') {
    // Obtenha os dados do corpo da solicitação
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // Processar os dados do formulário quando a solicitação estiver completa
    req.on('end', () => {
      const formData = qs.parse(body);

      // Obtenha o nome e o sobrenome dos dados do formulário
      const nome = formData.nome;
      const sobrenome = formData.sobrenome;

      // Faça o que você deseja com os dados recebidos
      console.log('Nome:', nome);
      console.log('Sobrenome:', sobrenome);

      // Envie uma resposta ao cliente
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<h1>Dados recebidos com sucesso!</h1>');
      res.end();
    });
  } else {
    // Responda com página não encontrada para outros caminhos
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>Página não encontrada</h1>');
    res.end();
  }
});

// Inicie o servidor na porta desejada
server.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

# -------------- SISTEMA PARA GARÇOM -----------------

Este sistema coleta as informações de um pedido, como "Prato" escolhido, "Bebida", "Quantidade", "Mesa Solicitante" e "Nome do Solicitante".
Tendo efetuado o pedido, a "Cozinha" visualiza a solicitação para execução do "Prato", e a "Copa" recebe a solicitação para as "Bebidas".
OBS: Não possui controle de estoque.

- Para executar o projeto, será necessário:

Visual Studio 2019
https://visualstudio.microsoft.com/pt-br/downloads/

.NET Core 3.1 SDK^ (Necessário para o backend)
https://dotnet.microsoft.com/download/dotnet-core/3.1

Banco de dados Sql Server (Necessário para o backend)
https://www.microsoft.com/pt-br/sql-server/sql-server-downloads

Sql Server Management Studio 2014^ (Necessário para o backend)
https://www.microsoft.com/pt-br/download/details.aspx?id=42299

NodeJS v12.16.1^ (Necessário para o frontend)
https://nodejs.org/pt-br/download/

- É necessário clonar o projeto do GitHub em um diretório de sua preferência:
  git clone https://github.com/Lucas-FilipeSS/SistemaGarcom

- O projeto esta dividido em 2 níveis, backend (Rumo), e o frontend (views).

- Backend Web Api Asp .Net Core que será "consumida" pelo frontend. No Visual Studio Adicione os pacotes:

Microsoft.AspNetCoreMVC.Cors

Microsoft.AspNetCoreMVC.NewtonsoftJon

Microsoft.EntityFrameworkCore

Microsoft.EntityFrameworkCore.SqlServer

Microsoft.EntityFrameworkCore.Tools

- No Package Management Console: Update-Database InitialCreate, para "gerar" o banco de dados.
  Por padrão a string de conexão será:"Data Source=.\\SQLEXPRESS;Initial Catalog=rumo_db;Integrated Security=true;" e está disponível no appsettings.json, faça as alterações se necessário. Inicie a aplicação que deve estar disponível em: 'https://localhost:44392'.

- No frontend utilizando o gerenciador de pacotes yarn ou npm no terminal do diretório views execute "npm intall" ou
  "yarn" para instalar os pacotes necessários, iniciar a aplicação o script de "start" está disponível como "npm start" ou
  "yarn start". As requisições feitas para a api serão feitas por padão para : 'https://localhost:44392', verifique se o
  backend também está disponível nesta porta.

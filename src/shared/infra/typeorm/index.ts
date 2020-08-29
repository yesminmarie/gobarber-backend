import { createConnection } from 'typeorm';

// vai procurar em toda a pasta do projeto um arquivo chamado ormconfig.json
// se ele encontrar, automaticamente ele já vai ler os dados desse arquivo
// e vai fazer a conexão com o banco de dados.
// Dentro de createConnection() também poderiam ser passadas as credenciais do BD,
// mas ao invés disso vamos usar ormconfig.json porque ele possui uma cli.
// Se executar por exemplo, yarn typeorm, ele dará alguns comandos,
// que não funcionariam se as credenciais fosse passadas diretamente por aqui
// porque a cli do typeorm não vai ler as credenciais
// de acesso ao banco de dentro do arquivo database.ts, mas ela lê por padrão,
// de dentro do ormconfig.json
createConnection();

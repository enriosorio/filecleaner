//importa a biblioteca fs-extra para operações com o sistema de arquivos
const fs = require('fs-extra');

//importa o módulo crypto para gerar hash MD5 dos arquivos
const crypto = require('crypto');

//importa o inquirer (com .default) para interação no terminal com o usuário
const inquirer = require('inquirer').default;

//importa o módulo path para manipular caminhos de arquivos de forma segura
const path = require('path');

/**
 * Gera o hash MD5 de um arquivo para comparações
 * @param {string} filePath - caminho do arquivo
 * @returns {Promise<string>} - hash MD5 gerado
 */
async function hashFile(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5'); //cria instância do hash MD5
    const stream = fs.createReadStream(filePath); //lê o arquivo em stream
    stream.on('error', reject); //captura erro na leitura
    stream.on('data', chunk => hash.update(chunk)); //atualiza o hash com os pedaços do arquivo
    stream.on('end', () => resolve(hash.digest('hex'))); //retorna o hash final em hexadecimal
  });
}

/**
 * procura arquivos duplicados dentro de uma pasta
 * @param {string} dir -caminho da pasta a ser escaneada
 * @returns {Promise<Array>} -lista de objetos com arquivos duplicados
 */
async function findDuplicates(dir) {
  const files = await fs.readdir(dir); //lê todos os arquivos da pasta
  const hashes = {}; //objeto para armazenar hashes únicos
  const duplicates = []; //lista para armazenar duplicatas encontradas

  for (const file of files) {
    const fullPath = path.join(dir, file); //gera o caminho completo do arquivo
    try {
      const stats = await fs.stat(fullPath); //verifica se é um arquivo (e não uma pasta)
      if (stats.isFile()) {
        const hash = await hashFile(fullPath); //gera o hash do arquivo
        if (hashes[hash]) {
          //se o hash já existir, é duplicata
          duplicates.push({ original: hashes[hash], duplicate: fullPath });
        } else {
          //se não, salva como original
          hashes[hash] = fullPath;
        }
      }
    } catch (err) {
      //mostra erro caso algum arquivo não possa ser lido
      console.error(`Erro ao acessar o arquivo: ${fullPath}`, err.message);
    }
  }

  return duplicates; //retorna a lista de duplicatas
}

/**
 *função principal que executa o processo de escaneamento e possível exclusão
 */
async function main() {
  //pergunta ao usuário qual pasta deseja escanear
  const { folder } = await inquirer.prompt([
    {
      type: 'input',
      name: 'folder',
      message: 'Digite o caminho da pasta para escanear:',
      default: './' // Valor padrão é a pasta atual
    }
  ]);

  try {
    const duplicates = await findDuplicates(folder); // Busca duplicatas na pasta indicada

    if (duplicates.length === 0) {
      //se não encontrou duplicatas, informa e encerra
      console.log('Nenhum arquivo duplicado encontrado.');
      return;
    }

    //lista os arquivos duplicados encontrados
    console.log('\nArquivos duplicados encontrados:');
    duplicates.forEach(({ original, duplicate }, i) => {
      console.log(`${i + 1}. Original: ${original}`);
      console.log(`   Duplicata: ${duplicate}`);
    });

    //pergunta se o usuário deseja deletar as duplicatas
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Deseja deletar os arquivos duplicados?',
        default: false
      }
    ]);

    //se o usuário confirmar, deleta os arquivos duplicados
    if (confirm) {
      for (const { duplicate } of duplicates) {
        await fs.remove(duplicate); // Remove o arquivo duplicado
      }
      console.log('Duplicatas deletadas com sucesso!');
    }
  } catch (err) {
    //caso ocorra algum erro no processo
    console.error('Erro ao processar os arquivos:', err.message);
  }
}

//executa a função principal e trata erros não capturados
main().catch(console.error);


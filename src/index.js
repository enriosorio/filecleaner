const fs = require('fs-extra');
const crypto = require('crypto');
const inquirer = require('inquirer').default;
const path = require('path');

async function hashFile(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(filePath);
    stream.on('error', reject);
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

async function findDuplicates(dir) {
  const files = await fs.readdir(dir);
  const hashes = {};
  const duplicates = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      const stats = await fs.stat(fullPath);
      if (stats.isFile()) {
        const hash = await hashFile(fullPath);
        if (hashes[hash]) {
          duplicates.push({ original: hashes[hash], duplicate: fullPath });
        } else {
          hashes[hash] = fullPath;
        }
      }
    } catch (err) {
      console.error(`Erro ao acessar o arquivo: ${fullPath}`, err.message);
    }
  }

  return duplicates;
}

async function main() {
  const { folder } = await inquirer.prompt([
    {
      type: 'input',
      name: 'folder',
      message: 'Digite o caminho da pasta para escanear:',
      default: './'
    }
  ]);

  try {
    const duplicates = await findDuplicates(folder);
    if (duplicates.length === 0) {
      console.log('Nenhum arquivo duplicado encontrado.');
      return;
    }

    console.log('\nArquivos duplicados encontrados:');
    duplicates.forEach(({ original, duplicate }, i) => {
      console.log(`${i + 1}. Original: ${original}`);
      console.log(`   Duplicata: ${duplicate}`);
    });

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Deseja deletar os arquivos duplicados?',
        default: false
      }
    ]);

    if (confirm) {
      for (const { duplicate } of duplicates) {
        await fs.remove(duplicate);
      }
      console.log('Duplicatas deletadas com sucesso!');
    }
  } catch (err) {
    console.error('Erro ao processar os arquivos:', err.message);
  }
}

main().catch(console.error);


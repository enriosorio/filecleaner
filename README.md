# 📂 FileCleaner

**FileCleaner** é uma aplicação de linha de comando desenvolvida em **Node.js** que permite identificar e remover arquivos duplicados em uma pasta selecionada pelo usuário. O projeto foi construído com o gerenciador de dependências **pnpm** e segue boas práticas de versionamento, controle de branches e uso colaborativo no GitHub.

---

## 🚀 Funcionalidades

- Escaneia uma pasta local para encontrar arquivos duplicados com base em hash MD5
- Permite visualização dos arquivos originais e duplicados
- Oferece a opção de excluir duplicatas com confirmação do usuário
- Suporte a arquivos grandes (>2GB) com leitura via stream
- Interface interativa no terminal (CLI)

---

## 🛠 Tecnologias e Dependências

| Tecnologia  | Finalidade                             |
|-------------|-----------------------------------------|
| [pnpm](https://pnpm.io)       | Gerenciador de dependências moderno e rápido |
| [fs-extra](https://www.npmjs.com/package/fs-extra) | Operações com sistema de arquivos     |
| [inquirer](https://www.npmjs.com/package/inquirer) | Interação CLI com o usuário           |
| [crypto](https://nodejs.org/api/crypto.html)       | Geração de hash dos arquivos (MD5)    |

---



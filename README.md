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

## 📦 Instalação e uso passo a passo

## 1. Pré-requisitos
Certifique-se de ter o **Node.js** instalado:

node -v

## 2. Criar a pasta do projeto e navegar até ela
mkdir filecleaner
cd filecleaner

## 3. Instalar o gerenciador de dependências pnpm (com permissão de administrador)
sudo npm install -g pnpm

## 4. Inicializar o projeto com pnpm
pnpm init

## 5. Adicionar dependências necessárias
pnpm add fs-extra inquirer

## 6. Estrutura do projeto
mkdir src
touch src/index.js .gitignore README.md
echo "node_modules/" > .gitignore


## 7. Desenvolvimento
Foi criado o script no src/index.js com a lógica para detectar arquivos duplicados por hash MD5 e, após testes, adicione suporte a leitura via stream para arquivos grandes (>2GB).

## 8. Inicialização do Git e envio ao GitHub

git init
git checkout -b main
git add .
git commit -m "feat: projeto inicial com estrutura pnpm e dependências base"
git checkout -b dev

## 9. Configuração do usuário Git
git config --global user.name "usuario"
git config --global user.email "email"

## 10. Adicionar repositório remoto e fazer push
git remote add origin https://github.com/enriosorio/filecleaner.git
git push -u origin main
git push -u origin dev

## 11. Testes realizados
Teste com diretórios sem arquivos duplicados (./, ~/Documentos) — retorno apropriado.

Teste com diretório contendo duplicatas (~/Downloads) — arquivos identificados corretamente.

## 12. Colaboração

O projeto foi desenvolvido em dupla, por: Enri Osorio e Jheniffer Akycharia.
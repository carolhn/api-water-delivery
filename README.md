# 💧 API Disk Água

Uma API RESTful desenvolvida com o objetivo de atender um serviço de delivery de água, unindo aprendizado prático com a resolução de um problema real.

<p align="center">
  <img src="https://img.shields.io/badge/status-online-brightgreen" />
  <img src="https://img.shields.io/badge/Node.js-22.x-blue" />
  <img src="https://img.shields.io/badge/license-MIT-green" />
</p>

## 🚀 Tecnologias Utilizadas

- **Node.js** com **JavaScript** e **TypeScript**
- **Express**
- **Sequelize**
- **MongoDB**
- **Npm**
- **Stripe**

## Instalação Local:

Para rodar a aplicação em sua maquina.

1. Clone o repositorio. Use o comando:</br>
   <code>git clone git@github.com:carolhn/api-water-delivery.git</code></br>

2. Entre na pasta do repositório que você acabou de clonar:</br>
   <code>cd api-water-delivery</code>

3. Instale as dependências</br>
   <code>npm install</code>

4. Comando para executar a api</br>
   <code>npm start</code>

## 📌 Endpoints Disponíveis

> **Base URL:** `https://e-commerce-tlsd.onrender.com/api/v1`

| Recurso       | Método | Endpoint           | Descrição                         |
| ------------- | ------ | ------------------ | --------------------------------- |
| 🛍️ Produtos   | GET    | `/products/list`   | Lista todos os produtos           |
|               | GET    | `/products/:id`    | Detalhes de um produto específico |
| 📂 Categorias | GET    | `/categories/list` | Lista todas as categorias         |
|               | GET    | `/categories/:id`  | Detalhes de uma categoria         |
| 🏷️ Marcas     | GET    | `/brands/list`     | Lista todas as marcas             |
|               | GET    | `/brands/:id`      | Detalhes de uma marca             |
| 📦 Pedidos    | GET    | `/orders/list`     | Lista todos os pedidos            |
|               | GET    | `/orders/:id`      | Detalhes de um pedido             |
| 🎟️ Cupons     | GET    | `/coupon/list`     | Lista todos os cupons             |
|               | GET    | `/coupon/:id`      | Detalhes de um cupom              |

---

### 🔍 Exemplo de uso

```
https://e-commerce-tlsd.onrender.com/api/v1/products/list
```

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues ou contribuir com melhorias!

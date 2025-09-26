# Arquitetura do projeto

## Fluxo básico
O usuário poderá se autenticar usando:
- Login com Google (OAuth2).
- Conta criada no próprio site (email e senha) e código de verificação recebido por email.

Após autenticação, o usuário será direcionado para a página principal (frontend React).  
Essa página utilizará rotas do React para navegação e fará requisições para a API REST no backend Django.

Para realizar uma compra, o usuário deverá:
1. Inserir informações de entrega: CEP, endereço físico, email de contato.
2. Escolher a quantidade e os produtos desejados.
3. Selecionar a forma de pagamento (PIX).
4. O backend gerará um QR Code ou código "PIX copia e cola" com o valor total + frete.
5. O usuário terá **10 minutos** para efetuar o pagamento.
   - Se o tempo expirar: a cobrança será cancelada, e o usuário será redirecionado para a página principal.
   - Se o pagamento for confirmado: o usuário receberá um email com o comprovante e o ID do pedido.

## Tecnologias utilizadas
- **Backend:** Django (Python)
- **Frontend:** React.js (HTML, CSS, JavaScript)
- **Banco de dados:** SQLite (para desenvolvimento) ou PostgreSQL (produção)

## Frontend
- Página de login / criação de conta.
- Página principal de compras.
- Página de carrinho de compras.
- Página de perfil do usuário.

## Backend
- Autenticação via JWT armazenado em cookie HTTPOnly.
- Tabelas:
  - Usuários
  - Produtos
  - Pedidos
  - Itens do pedido
  - Pagamentos
- API REST para comunicação com frontend.

## Funcionalidades futuras
- Adicionar CAPTCHA no login e registro.

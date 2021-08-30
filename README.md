# Cadastro de Carros

**RF** 
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas categorias

**RN** 
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado com disponibilidade por padrão.
* Deve ser possível realizar cadastros somente usuários adminstradores.


# Listagem de Carros

**RF**
Deve ser possível listar os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.


# Cadastro de Especificação de Carros

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro inexistente.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
Deve ser possível realizar cadastros somente usuários adminstradores.


# Cadastro de Imagens do Carro

**RF**
Deve ser possível cadastrar a imagem de um carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload de arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
Deve ser possível realizar cadastros somente usuários adminstradores.


# Aluguel

**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
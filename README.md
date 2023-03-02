
## Bandclone


![bandclone](https://user-images.githubusercontent.com/108621943/217296007-949a9fda-be63-41a9-b78c-73f44b8bbf34.png)

Bandclone é um projeto pessoal que foi inspirado originalmente no site Bandcamp, uma rede social voltada ao compartilhamento e comércio de música online.

#### Deploy do Projeto: https://orca-app-2-fvt24.ondigitalocean.app/

Projeto desenvolvido com React, Node, Express e MongoDB   
# Funções e recursos
É possível fazer login e cadastro no sistema, os usuários são guardados no banco de dados MongoDB com suas respectivas senhas criptografadas com hash SHA512.  


É possível enviar álbums para o banco de dados e reproduzí-los com um tocador de áudio embutido


![Captura de tela 2023-02-06 172217](https://user-images.githubusercontent.com/108621943/217295842-b2b270c5-95a3-4807-a089-5ab5c466c238.png)
![Captura de tela 2023-02-06 175521](https://user-images.githubusercontent.com/108621943/217295863-4ff628ff-f23e-41e6-8a09-1faa9969b712.png)


# Funcionamento e arquitetura
Este projeto foi desenvolvido de acordo com o modelo MVC (Model, View, Controller)


![backend](https://user-images.githubusercontent.com/108621943/217294719-0ca53f21-12a8-415f-bb67-41df45321cf1.png)

Model: O Model é responsável por construir a estrutura dos dados do aplicativo utilizando esquemas de banco de dados, no caso do projeto, temos dois esquemas: Users e Albums, responsáveis pela estrutura dos dados dos usuários e dos álbums respectivamente.


Controller: A camada Controller (controlador) é responsável por lidar com as requisições do usuário. Ela gerencia as ações realizadas, faz conexão direta com a camada Model para enviar e receber informações do banco de dados.

A camada View (visão) é responsável pela interação com o usuário. Nesta camada são apresentados os dados ao usuário. Toda essa parte foi projetada com o framework React.


# Futuras implementações


>>>>>>> cb2961b38f2d8198d792f3965e88f6297d75de5d

---
title: "O que é SOLID e por que você deveria se importar com isso? (Parte 1)"
date: "2025-04-22"
author: "João Fanchini"
preview: "Descubra os 3 primeiros princípios do SOLID e por que eles são fundamentais para manter seu código limpo e sustentável."
imageSrc: "https://drive.google.com/thumbnail?sz=w640&id=1A-G_S9Jn4jz5ihnmHc3MhvNXVMPAYTJu"
imageAlt: "Principíos do SOLID"
show: true
references:
  - Desenvolvimento real de software - Raoul-Gabriel Urma & Richard Warbuton
  - Arquitetura limpa - Robert C. Martin
---

**SOLID** é um conjunto de princípios bastante conhecido no mundo da **programação orientada a objetos**. Apesar de ser requisito em muitas vagas por aí, muita gente ainda sente dificuldade em definir – e, principalmente, **aplicar** – esses princípios no dia a dia do desenvolvimento.

Para marcar a estreia desse blog, resolvi começar justamente com eles. Afinal, um software considerado "bem-sucedido" vai inevitavelmente precisar ser evoluído e mantido, e é aí que o **SOLID brilha**. Este conteúdo será dividido em duas partes, e você está lendo a primeira agora.

---

## O que é SOLID?

**SOLID** é um acrônimo, onde cada letra representa um princípio de boas práticas no desenvolvimento de software:

- **S** – Single Responsibility Principle
- **O** – Open/Closed Principle
- **L** – Liskov Substitution Principle
- **I** – Interface Segregation Principle
- **D** – Dependency Inversion Principle

Nada mais do que isso. Vamos entender cada um deles com calma.

---

## Single Responsibility Principle (SRP)

O **Princípio da Responsabilidade Única** diz que uma classe deve ter **apenas um motivo para mudar** – ou seja, ela deve ter apenas uma função bem definida dentro do sistema.

Para deixar mais claro, imagine se escrevêssemos um sistema inteiro dentro de um único arquivo. Esse arquivo seria responsável por tudo: entrada de dados, regras de negócio, persistência... ou seja, ele teria **várias responsabilidades**.

Isso foge totalmente do SRP, e claro, deixaria o código bem mais difícil de manter.

> A solução aqui seria literalmente **separar esse único arquivo em arquivos menores**, com as responsabilidades mais bem definidas – onde, quando fosse necessário, **apenas aquele arquivo** (ou bloco de código) seria especificamente alterado.

---

## Open/Closed Principle (OCP)

O **Princípio Aberto/Fechado** sugere que o código deve estar:

> **Aberto para extensão, mas fechado para modificação.**

Ou seja: você deve ser capaz de **adicionar novos comportamentos ao sistema sem alterar o que já existe**. Isso é possível usando abstrações, como **interfaces**, **herança** ou até mesmo **funções de ordem superior**.

### Exemplo:

```java
public List<String> findWord(Predicate<String> filterWord) {
    return getAllWords().stream()
        .filter(filterWord)
        .toList();
}
```

Aplicar esse princípio melhora bastante a **manutenibilidade do código** e permite **maior reaproveitamento com menos retrabalho**.

---

## Liskov Substitution Principle (LSP)

O **Princípio da Substituição de Liskov** fala sobre **herança** e como ela deve ser usada corretamente.

Segundo o LSP:

> Qualquer classe filha (ou subtipo) deve poder ser usada no lugar da sua classe mãe **sem que o funcionamento do sistema seja afetado**.

Isso significa que os comportamentos esperados devem ser mantidos — incluindo validações, efeitos colaterais e imutabilidade de variáveis, por exemplo.

### Exemplo:

```java
interface Carrinho {
    double getValor();
    int getQuantidade();
}

class CarrinhoUsuario implements Carrinho {
    private double valor;
    private int quantidade;

    CarrinhoUsuario(double valor, int quantidade) {
        this.valor = valor;
        this.quantidade = quantidade;
    }

    @Override
    public double getValor() {
        return valor;
    }

    @Override
    public int getQuantidade() {
        return quantidade;
    }
}

class CarrinhoNulo implements Carrinho {
    @Override
    public double getValor() {
        return 0;
    }

    @Override
    public int getQuantidade() {
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        // Carrinho com itens
        Carrinho carrinhoComItens = new CarrinhoUsuario(150.75, 3);
        System.out.println("Valor: " + carrinhoComItens.getValor());
        System.out.println("Quantidade: " + carrinhoComItens.getQuantidade());

        // Carrinho nulo (não faz nada)
        Carrinho carrinhoNulo = new CarrinhoNulo();
        System.out.println("Valor: " + carrinhoNulo.getValor()); // Não precisa verificar null
        System.out.println("Quantidade: " + carrinhoNulo.getQuantidade()); // Não precisa verificar null
    }
}
```

Quando esse princípio é quebrado, pode ser mais interessante usar **composição** em vez de herança.

> Por exemplo: `RelatorioPDF` e `RelatorioExcel` podem ter comportamentos parecidos, mas forçar uma herança entre eles só porque "ambos são relatórios" pode gerar **mais problemas do que soluções**.

Uma abordagem melhor seria criar uma interface `Processador` e compor os comportamentos em comum, conforme necessário.

### Dica:

Se for usar herança, tente se perguntar:

> _"Essa nova classe é uma **variação** da classe base, conceitualmente falando?"_

Se a resposta for **não**, melhor repensar a abordagem (e considerar **composição**).

Algo interessante é o conceito de **subtipo**. Quando o LSP foi definido, ele era voltado apenas para **classes**, mas hoje o conceito de subtipo é mais amplo e pode ser entendido como:

> Qualquer tipo que **se encaixe no contrato esperado** de outro tipo.

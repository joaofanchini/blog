---
title: "O que é SOLID e por que você deveria se importar com isso? (Parte 2)"
date: "2025-05-22"
author: "João Fanchini"
preview: "Entenda os princípios ISP e DIP do SOLID para melhorar a modularidade, testabilidade e manutenção do seu código."
imageSrc: "https://drive.google.com/thumbnail?sz=w640&id=1x9aquxqpPkK2wIoGGayboHm1XN-dhcno"
imageAlt: "Principíos do SOLID: ISP e DIP"
show: true
references:
  - Desenvolvimento real de software - Raoul-Gabriel Urma & Richard Warbuton
  - Arquitetura limpa - Robert C. Martin
---

Ainda falando sobre SOLID, os outros dois princípios são:
**Interface Segregation Principles** e **Dependency Inversion Principle**

---

## Interface Segregation Principle (ISP)

O **Princípio da Segregação de Interface (ISP)** prega que as classes **não devem ser forçadas a depender de interfaces que não utilizam**. Ele busca reduzir o acoplamento entre classes e tornar o código mais modular e coeso, definindo **contratos bem específicos** para cada necessidade.

As interfaces devem ser **pequenas e específicas**, contendo apenas os métodos relevantes para a funcionalidade que representam. Dessa forma, as classes que as implementam **não são obrigadas a lidar com métodos que não fazem sentido** em seu contexto.

> ❗ Se uma classe precisa implementar métodos que não utiliza, isso indica que a interface está mal segmentada, violando o ISP.

O ISP está intimamente ligado à **alta coesão**. À medida que o código cresce, é comum que interfaces genéricas passem a violar também o **Princípio da Responsabilidade Única (SRP)**, ao agrupar responsabilidades distintas em um único contrato.

Quando o ISP é violado, isso representa uma **boa oportunidade para dividir interfaces** em contratos menores e mais coesos. Isso também favorece nomes de interfaces mais **significativos e alinhados ao domínio**.

> 💡 **Lembre-se**: tanto a herança quanto a implementação de interfaces devem ocorrer com base em **comportamentos e contratos necessários**, e não apenas por similaridade na implementação.

### Exemplo de violação:

```java
interface Automovel{
	void abastecer();
	void guiar();
}

class Moto implements Automovel {
	@Override
	public void abastecer(){
		// return...
	}

	@Override
	public void guiar(){
		// return...
	}
}

class Carroca implements Automovel {
	@Override
	public void abastecer() {
		throw new UnsuportedOperationException();
	}

	@Override
	public void guiar() {
		// return...
	}
}
```

No exemplo acima, a classe Carroça não poderia implementar o método abastecer, pois ele não faz sentido para esta representação. O que se poderia fazer então, neste caso, para corrigir essa violação do ISP seria:

### Exemplo de segregação:

```java
interface Guiavel {
	void guiar();
}

interface Abastecivel {
	void abastecer();
}

class Moto implements Guiavel, Abastecivel {
	@Override
	void abastecer(){
		// return...
	}

	@Override
	void guiar(){
		// return...
	}
}

class Carroca implements Guiavel {
	void guiar() {
		// return...
	}
}
```

Agora as interfaces estão mais próximas do domínio. O ISP consiste em modelar contratos mais específicos e relevantes para cada entidade.

> Lembrar que domínio se refere a ao conjunto de objetos relacionados ao negócio. Já entidade é a representação de cada objeto de valor.

---

## Dependency Inversion Principle (DIP)

O **Princípio da Inversão de Dependência** tem como objetivo tornar o código mais manutenível e testável. Ele é bastante conhecido, principalmente por causa do uso intensivo de **Injeção de Dependência** em frameworks modernos, o que é uma boa prática.

Basicamente, o DIP recomenda que módulos de alto nível **não dependam de módulos de baixo nível**, mas sim que ambos dependam de abstrações (interfaces ou classes abstratas). Isso reduz o acoplamento, pois cada classe externaliza suas dependências.

### Exemplo simples com Injeção de Dependência:

```java
interface Validador {
    void validar();
}

class Processador {
    private final Validador validador;

    public Processador(Validador validador) {
        this.validador = validador;
    }

    public void processar() {
        validador.validar();
        // continua implementação
    }
}
```

Nesse exemplo, o `Processador` recebe a dependência `Validador` externamente, o que permite, por exemplo, injetar mocks em testes e facilita a reutilização do código.

### Exemplo de teste utilizando Mockito:

```java
public class ProcessadorTest {

    @Test
    public void shouldCallValidadorMethodWhenProcess() {
        // given
        var mock = Mockito.mock(Validador.class);
        var processador = new Processador(mock);

        // when
        processador.processar();

        // then
        Mockito.verify(mock, Mockito.times(1)).validar();
    }

    public static class ValidadorImpl implements Validador {
        @Override
        public void validar() {
            // implementação real
        }
    }
}
```

> Embora a Injeção de Dependência seja a forma mais comum de aplicar o DIP, não é a única. Veja outro exemplo abaixo, utilizando um factory com Supplier:

### Exemplo alternativo usando Factory:

```java
// Classe de domínio
class Automovel {
    private final String name;

    public Automovel(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

// Factory com Supplier para inverter dependência
class AutomovelFactory {
    private static Supplier<Automovel> funcAutomovel;

    public static void defineFuncAutomovel(Supplier<Automovel> func) {
        funcAutomovel = func;
    }

    public static Automovel getAutomovel() {
        return funcAutomovel.get();
    }
}

// Classe de alto nível que depende da abstração
class Cotador {
    public void cotar() {
        Automovel automovel = AutomovelFactory.getAutomovel();
        System.out.println("Cotando automóvel: " + automovel.getName());
        // lógica adicional
    }
}

// Configuração da dependência e execução
public class Main {
    public static void main(String... args) {
        AutomovelFactory.defineFuncAutomovel(() -> new Automovel("Celta"));
        new Cotador().cotar();
    }
}
```

Nesse segundo exemplo, o DIP também está sendo respeitado, mas em vez de usar injeção direta, usamos uma Factory para fornecer a dependência, mantendo o baixo acoplamento.

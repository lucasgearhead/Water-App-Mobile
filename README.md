### Language / Idioma

[Português](#hidraquench-em-português) | [English](#hidraquench-in-english)

---

### HidraQuench em Português - Mantenha-se Hidratado, Fique Saudável!

O **HidraQuench** é um aplicativo incrível projetado para inspirar você a manter-se hidratado ao longo do dia. Com a integração inovadora de um sensor ESP32 em sua garrafa, o aplicativo rastreia automaticamente a quantidade de água que você consome. Além disso, oferece recursos poderosos para personalizar metas de hidratação, receber lembretes e até mesmo registrar manualmente a ingestão de água.

---

### Pré-requisitos

Antes de começar, certifique-se de ter o Expo CLI instalado. Se não o tiver, siga as instruções abaixo:

1. Instale o Expo CLI globalmente usando o npm (Node Package Manager):

```bash
npm install -g expo-cli
```

---

### Instalação

1. Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/lucasgearhead/Water-App.git
```

2. Navegue até o diretório do projeto:

```bash
cd water-app
```

3. Instale as dependências do projeto:

```bash
npm install
```

---

### Configuração do Projeto

Certifique-se de configurar o arquivo `app/config.js` com as informações necessárias para a conexão com o ESP32.

```javascript
// app/config.js

export const ESP32_CONFIG = {
  // Configurações de conexão com o ESP32
  ipAddress: "192.168.1.1", // Endereço IP do ESP32
  port: 3000, // Porta utilizada pelo ESP32
};
```

---

### Executando o App

Com as dependências instaladas e as configurações ajustadas, inicie o aplicativo usando o seguinte comando:

```bash
npx expo start
```

Isso iniciará o Expo Developer Tools. Escolha entre executar o aplicativo em um emulador ou em um dispositivo físico com o aplicativo Expo Go instalado.

---

### Mantenha-se Hidratado com o HidraQuench!

Agora, você está pronto para experimentar o **HidraQuench** e transformar a forma como cuida da sua hidratação diária. Caso tenha sugestões, encontrou bugs ou queira contribuir, sinta-se à vontade para abrir uma [issue](link-para-issues).

---

### Agradecimentos

A equipe do HidraQuench agradece por escolher nossa aplicação para uma vida mais saudável!

---

### HidraQuench in English - Stay Hydrated, Stay Healthy!

**HidraQuench** is an amazing app designed to inspire you to stay hydrated throughout the day. With the innovative integration of an ESP32 sensor in your bottle, the app automatically tracks the amount of water you consume. It also offers powerful features to customize hydration goals, receive reminders, and even manually log water intake.

---

### Prerequisites

Before you begin, make sure you have the Expo CLI installed. If not, follow the instructions below:

1. Install Expo CLI globally using npm (Node Package Manager):

```bash
npm install -g expo-cli
```

---

### Installation

1. Clone this repository to your local environment:

```bash
git clone https://github.com/lucasgearhead/Water-App.git
```

2. Navigate to the project directory:

```bash
cd water-app
```

3. Install project dependencies:

```bash
npm install
```

---

### Project Configuration

Make sure to configure the `app/config.js` file with the necessary information for the ESP32 connection.

```javascript
// app/config.js

export const ESP32_CONFIG = {
  // ESP32 connection settings
  ipAddress: "192.168.1.1", // ESP32 IP address
  port: 3000, // Port used by the ESP32
};
```

---

### Running the App

With the dependencies installed and configurations adjusted, start the app using the following command:

```bash
npx expo start
```

This will launch the Expo Developer Tools. Choose to run the app on an emulator or on a physical device with the Expo Go app installed.

---

### Stay Hydrated with HidraQuench!

Now you're ready to experience **HidraQuench** and transform how you take care of your daily hydration. If you have suggestions, found bugs, or want to contribute, feel free to open an [issue](link-to-issues).

---

### Acknowledgments

The HidraQuench team thanks you for choosing our app for a healthier lifestyle!

---

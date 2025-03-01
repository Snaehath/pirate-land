# Pirate Land

`Note`: This is the front end code of Pirate Land and the back end code can be found in this repository - https://github.com/Snaehath/pirate-land-backend

### Bringing Retro Battleship Excitement to Web3

### Links

Project link - https://pirateland.vercel.app/

Submission video - https://drive.google.com/file/d/1sHB28q_YpcvhKrLo_cdRVh7fplaS6x_4/view?usp=sharing

Demo video - https://drive.google.com/file/d/1w2qc3V8b3WdF_FzzfCbqMfnj_3ig7DD4/view?usp=sharing

Presentation - https://docs.google.com/presentation/d/1Sig2T12CpNw6qjJvVRw5SOwfzR4Alc7qDaGf_DPdazw/edit?usp=sharing

### Setup

Your `.env` file should look something like this.

```
VITE_PARA_API_KEY= GET FROM "https://developer.getpara.com/"
VITE_REST_API= "http://locahost:port/api" OR "https://your.backend.url.com/api"
VITE_SOCKET_API= "http://locahost:port" OR "https://your.backend.url.com"
```

### Usage

```
1. npm install
2. npm run dev
3. npm run build (to build the code)
```

### Tech stack

Front end - ReactJs, Vite, TypeScript, Para SDK, SocketIO, Tailwind Css, Neobrutalism.dev
Back end - NodeJs, ExpressJS, JavaScript, SocketIO, Cassandra (AstraDB), Google App Engine.

### About

Pirate Land is a fast-paced, real-time multiplayer arcade game inspired by the classic Battleship board game. With seamless one-click onboarding through Para, players can instantly create a Web3 account and dive into the action. The game allows users to compete in strategic battles, wager USDC, or set fun challenges for their opponents. Every move (guess) is written to the Celestia blockchain, ensuring transparency and allowing for verifiable game history. Designed to be quick and engaging, each match lasts just 5-10 minutes, making it the perfect game for busy professionals, casual gamers, and blockchain enthusiasts alike.

### Features of Pirate Land

1. Real-Time Multiplayer Battles: Enjoy seamless, live gameplay with SocketIO ensuring every move and chat is instantly updated.
2. One-Click Web3 Onboarding: Quickly create a Web3 account through [Para](https://www.getpara.com/) (formerly Capsule) with just an email—no hassle.
3. On-Chain Move Verification: Every guess is recorded on the [Celestia](https://celestia.org/) blockchain for transparent, verifiable gameplay history.
4. Quick, Engaging Matches: Each game lasts only 5-10 minutes, making it perfect for quick sessions during busy days.
5. Flexible Game Modes: Choose to play casually, wager USDC for competitive stakes, or engage in fun challenge matches.
6. Interactive Real-Time Chat: Communicate with your opponent during gameplay, adding a social element to every match.
7. Future Customization Options: Plans for subscription-based features allowing players to personalize their pirate avatars and enhance their experience.

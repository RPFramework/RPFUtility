![preview](https://i.gyazo.com/2075bcc6fe2a8f85d128d330b397ce6a.png)

# RPFUtility

[![DISCORD](https://img.shields.io/badge/Discord-Join-7289DA.svg)](https://discord.gg/JvRRuTm)
[![TRELLO](https://img.shields.io/badge/Trello-View-0079BF.svg)](https://trello.com/b/eqwxQ4hr/rpframework)
[![Website](https://img.shields.io/website-up-down-green-red/https/rpframework.github.io.svg)](https://rpframework.github.io/)
[![GitHub release](https://img.shields.io/github/release/RPFramework/RPFUtility.svg)](https://github.com/RPFramework/RPFUtility/releases/latest)
[![license](https://img.shields.io/github/license/RPFramework/RPFUtility.svg)](https://github.com/RPFramework/RPFUtility/blob/master/LICENSE)

RPFUtility is an utility tool for tasks that at least Kerkkoh needs to do way too many times. These tasks are usually related to the development of [RPFramework](https://github.com/RPFramework/RPFramework/). If you happen to develop RPFramework and find yourself wanting a faster way to kill processes, pack and build pbos, starting the server up again and seeing the logs in realtime then download this. Contributions are appreciated. Developed with electron and just plain JS & some handlebars. If Kerkkoh talks about RPFUtils, he means this repository and is lazy. [Download RPFUtility for Windows (x64) here](https://github.com/RPFramework/RPFUtility/releases/latest)

#### Note: RPFUtility should be ran with administrative rights since it needs to be able to kill processes. If you are concerned, it's fully open source right here! (look at Installing point 3 for compiling instructions)

### Contributors
* **Kerkko(h)**
* **MichaelSwissA3**

### Installing RPFUtility
1. Just [download](https://github.com/RPFramework/RPFUtility/releases/latest) the archive and extract it somewhere and lauch the executable.
2. Change the preferences to your own ones and save them
3. OR you can download the source, [download electron](https://github.com/electron/electron/releases/latest) and [asar](https://github.com/electron/asar/) and pack the source into an asar archive and place it into the resources folder as app.asar

### Contributing
1. Fork the repository
2. Install node.js
3. Go to your fork in cmd and run "npm install && npm start"
4. Optional: Pack it with asar, get one of the electron releases, throw the asar in resources as app.asar and run the executable, edit the executable with rcedit

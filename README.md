# UaWebChallengeVII task for Middle/Senior frontend dev. Верстка

## Contents
* [Пару слів про проект](#%D0%9F%D0%B0%D1%80%D1%83-%D1%81%D0%BB%D1%96%D0%B2-%D0%BF%D1%80%D0%BE-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82)
* [Demo](#demo)
* [Test screenshots](#test-screenshots)
* [Folder structure](#folder-sctructure)

###### Technologies: Html5, Jade, Css3, JS, jQuery, Sass, Grunt, Bower.
###### Compatible browsers: IE8+, Firefox, Chrome, Opera, Safari, Yandex.browser
![template](test_screenshots/pic.jpg)

---

## Пару слів про проект
Макет крутий, багато чого сподобалось, багато що реалізував, а дещо таки не встиг зробити. Оскільки є бажання у вільний час порефакторити і допиляти деякі штуки я поступлю наступним чином:

Я зафіксував тегами офіційну точку здачі роботи

[Розробницька версія](https://github.com/orlovmax/uawebchallengeVII/tree/dev-contest-end)

[Згенерований сайт](https://github.com/orlovmax/uawebchallengeVII/tree/build-contest-end)

Тут з моменту здачі ніяких допилювань, "as is". Наступні ж коміти - виключно бажання пофіксити дещо і реалізувати нереалізоване. (А також закинути скріншоти і навіть апдейтнути цей рідмі). Звісно жива демка буде оновлюватись відповідно до фіксів - гітхаб деплоїть останній коміт наче. Такі от справи.

---

## Demo
Live demo: [http://orlovmax.github.io/uawebchallengeVII](http://orlovmax.github.io/uawebchallengeVII "Check the result for UaWebChallenge task")

## Test screenshots
**Browser screenshots [here](https://github.com/orlovmax/uawebchallengeVII/tree/master/test_screenshots/)**

##Folder-structure
```
.
├── Gruntfile.js
├── package.json
├── bower.json
├── README.md
├── Rakefile
├── archives                               result *.zip archive
|   └── project.zip
├── grunt                                  grunt tasks
|   ├── task.js
│   └── aliases.yml 
└── dev
    ├── css                                compiled css
    │   └── screen.css
    ├── img                                image sources
    │   └── *.png, *.jpg, *.gif
    ├── templates                          jade templates
    │   ├── pages                          main pages templates
    │   │   └── index.jade
    │   ├── components                     page components
    │   │   ├── meta.jade, parked
    │   │   └── common                     common page blocks
    │   │       ├── body_src.jade
    │   │       └── head_src.jade
    │   └── helpers                        mixins and vars
    │       └── mixins.jadee
    ├── js                                 scripts
    │   ├── assembled.js
    │   ├── custom.js
    │   ├── head                           head scripts
    │   │   └── head.js
    │   └── vendor                         vendor scripts
    │       └── vendor.js
    ├── styles                             preprocessor styles
    │   ├── screen.sass
    │   └── components                     stylesheet components
    │       ├── _reset.sass
    │       ├── _fonts.sass
    │       └── _block.sass
    ├── html                               compiled html files
    │   └── index.html                     
    ├── helpers                            robots.txt, favicon, etc
    │   └── *.*                            
    ├── fonts                              font sources
    └── devtools                           some developer tools

```  

( function($){

	var FA5 = {
		"fa-glass":					[ "fas", "glass-martini" ],
		"fa-meetup":				[ "fab", "meetup" ],
		"fa-star-o":				[ "far", "star" ],
		"fa-remove":				[ "fas", "times" ],
		"fa-close":					[ "fas", "times" ],
		"fa-gear":					[ "fas", "cog" ],
		"fa-trash-o":				[ "far", "trash-alt" ],
		"fa-file-o":				[ "far", "file" ],
		"fa-clock-o":				[ "far", "clock" ],
		"fa-arrow-circle-o-down":	[ "far", "arrow-alt-circle-down" ],
		"fa-arrow-circle-o-up":		[ "far", "arrow-alt-circle-up" ],
		"fa-play-circle-o":			[ "far", "play-circle" ],
		"fa-repeat":				[ "fas", "redo" ],
		"fa-rotate-right":			[ "fas", "redo" ],
		"fa-refresh":				[ "fas", "sync" ],
		"fa-list-alt":				[ "far", "list-alt" ],
		"fa-dedent":				[ "fas", "outdent" ],
		"fa-video-camera":			[ "fas", "video" ],
		"fa-picture-o":				[ "far", "image" ],
		"fa-photo":					[ "far", "image" ],
		"fa-image":					[ "far", "image" ],
		//"fa-pencil":				[ "fas", "pencil-alt" ],
		"fa-map-marker":			[ "fas", "map-marker-alt" ],
		"fa-pencil-square-o":		[ "far", "edit" ],
		"fa-share-square-o":		[ "far", "share-square" ],
		"fa-check-square-o":		[ "far", "check-square" ],
		"fa-arrows":				[ "fas", "arrows-alt" ],
		"fa-times-circle-o":		[ "far", "times-circle" ],
		"fa-check-circle-o":		[ "far", "check-circle" ],
		"fa-mail-forward":			[ "fas", "share" ],
		"fa-eye-slash":				[ "far", "eye-slash" ],
		"fa-warning":				[ "fas", "exclamation-triangle" ],
		//"fa-calendar":				[ "fas", "calendar-alt" ],
		"fa-arrows-v":				[ "fas", "arrows-alt-v" ],
		"fa-arrows-h":				[ "fas", "arrows-alt-h" ],
		"fa-bar-chart":				[ "far", "chart-bar" ],
		"fa-bar-chart-o":			[ "far", "chart-bar" ],
		"fa-twitter-square":		[ "fab", "twitter-square" ],
		"fa-facebook-square":		[ "fab", "facebook-square" ],
		"fa-gears":					[ "fas", "cogs" ],
		"fa-thumbs-o-up":			[ "far", "thumbs-up" ],
		"fa-thumbs-o-down":			[ "far", "thumbs-down" ],
		"fa-heart-o":				[ "far", "heart" ],
		//"fa-sign-out":				[ "fas", "sign-out-alt" ],
		"fa-linkedin-square":		[ "fab", "linkedin" ],
		"fa-thumb-tack":			[ "fas", "thumbtack" ],
		"fa-external-link":			[ "fas", "external-link-alt" ],
		//"fa-sign-in":				[ "fas", "sign-in-alt" ],
		"fa-github-square":			[ "fab", "github-square" ],
		"fa-lemon-o":				[ "far", "lemon" ],
		"fa-square-o":				[ "far", "square" ],
		"fa-bookmark-o":			[ "far", "bookmark" ],
		"fa-twitter":				[ "fab", "twitter" ],
		"fa-facebook":				[ "fab", "facebook-f" ],
		"fa-facebook-f":			[ "fab", "facebook-f" ],
		"fa-github":				[ "fab", "github" ],
		"fa-credit-card":			[ "far", "credit-card" ],
		"fa-feed":					[ "fas", "rss" ],
		"fa-hdd-o":					[ "far", "hdd" ],
		"fa-hand-o-right":			[ "far", "hand-point-right" ],
		"fa-hand-o-left":			[ "far", "hand-point-left" ],
		"fa-hand-o-up":				[ "far", "hand-point-up" ],
		"fa-hand-o-down":			[ "far", "hand-point-down" ],
		"fa-arrows-alt":			[ "fas", "expand-arrows-alt" ],
		"fa-group":					[ "fas", "users" ],
		"fa-chain":					[ "fas", "link" ],
		"fa-scissors":				[ "fas", "cut" ],
		"fa-files-o":				[ "far", "copy" ],
		"fa-floppy-o":				[ "far", "save" ],
		"fa-navicon":				[ "fas", "bars" ],
		"fa-reorder":				[ "fas", "bars" ],
		"fa-pinterest":				[ "fab", "pinterest" ],
		"fa-pinterest-square":		[ "fab", "pinterest-square" ],
		"fa-google-plus-square":	[ "fab", "google-plus-square" ],
		"fa-google-plus":			[ "fab", "google-plus-g" ],
		"fa-money":					[ "far", "money-bill-alt" ],
		"fa-unsorted":				[ "fas", "sort" ],
		"fa-sort-desc":				[ "fas", "sort-down" ],
		"fa-sort-asc":				[ "fas", "sort-up" ],
		"fa-linkedin":				[ "fab", "linkedin-in" ],
		"fa-rotate-left":			[ "fas", "undo" ],
		"fa-legal":					[ "fas", "gavel" ],
		"fa-tachometer":			[ "fas", "tachometer-alt" ],
		"fa-dashboard":				[ "fas", "tachometer-alt" ],
		"fa-comment-o":				[ "far", "comment" ],
		"fa-comments-o":			[ "far", "comments" ],
		"fa-flash":					[ "fas", "bolt" ],
		"fa-clipboard":				[ "far", "clipboard" ],
		"fa-paste":					[ "far", "clipboard" ],
		"fa-lightbulb-o":			[ "far", "lightbulb" ],
		"fa-exchange":				[ "fas", "exchange-alt" ],
		"fa-cloud-download":		[ "fas", "cloud-download-alt" ],
		"fa-cloud-upload":			[ "fas", "cloud-upload-alt" ],
		"fa-bell-o":				[ "far", "bell" ],
		"fa-cutlery":				[ "fas", "utensils" ],
		"fa-file-text-o":			[ "far", "file-alt" ],
		"fa-building-o":			[ "far", "building" ],
		"fa-hospital-o":			[ "far", "hospital" ],
		"fa-tablet":				[ "fas", "tablet-alt" ],
		"fa-mobile":				[ "fas", "mobile-alt" ],
		"fa-mobile-phone":			[ "fas", "mobile-alt" ],
		"fa-circle-o":				[ "far", "circle" ],
		"fa-mail-reply":			[ "fas", "reply" ],
		"fa-github-alt":			[ "fab", "github-alt" ],
		"fa-folder-o":				[ "far", "folder" ],
		"fa-folder-open-o":			[ "far", "folder-open" ],
		"fa-smile-o":				[ "far", "smile" ],
		"fa-frown-o":				[ "far", "frown" ],
		"fa-meh-o":					[ "far", "meh" ],
		"fa-keyboard-o":			[ "far", "keyboard" ],
		"fa-flag-o":				[ "far", "flag" ],
		"fa-mail-reply-all":		[ "fas", "reply-all" ],
		"fa-star-half-o":			[ "far", "star-half" ],
		"fa-star-half-empty":		[ "far", "star-half" ],
		"fa-star-half-full":		[ "far", "star-half" ],
		"fa-code-fork":				[ "fas", "code-branch" ],
		"fa-chain-broken":			[ "fas", "unlink" ],
		"fa-shield":				[ "fas", "shield-alt" ],
		//"fa-calendar-o":			[ "far", "calendar-alt" ],
		"fa-maxcdn":				[ "fab", "maxcdn" ],
		"fa-html5":					[ "fab", "html5" ],
		"fa-css3":					[ "fab", "css3" ],
		"fa-ticket":				[ "fas", "ticket-alt" ],
		"fa-minus-square-o":		[ "far", "minus-square" ],
		"fa-level-up":				[ "fas", "level-up-alt" ],
		"fa-level-down":			[ "fas", "level-down-alt" ],
		"fa-pencil-square":			[ "fas", "pen-square" ],
		"fa-external-link-square":	[ "fas", "external-link-square-alt" ],
		"fa-compass":				[ "far", "compass" ],
		"fa-caret-square-o-down":	[ "far", "caret-square-down" ],
		"fa-toggle-down":			[ "far", "caret-square-down" ],
		"fa-caret-square-o-up":		[ "far", "caret-square-up" ],
		"fa-toggle-up":				[ "far", "caret-square-up" ],
		"fa-caret-square-o-right":	[ "far", "caret-square-right" ],
		"fa-toggle-right":			[ "far", "caret-square-right" ],
		"fa-eur":					[ "fas", "euro-sign" ],
		"fa-euro":					[ "fas", "euro-sign" ],
		"fa-gbp":					[ "fas", "pound-sign" ],
		"fa-usd":					[ "fas", "dollar-sign" ],
		"fa-dollar":				[ "fas", "dollar-sign" ],
		"fa-inr":					[ "fas", "rupee-sign" ],
		"fa-rupee":					[ "fas", "rupee-sign" ],
		"fa-jpy":					[ "fas", "yen-sign" ],
		"fa-cny":					[ "fas", "yen-sign" ],
		"fa-rmb":					[ "fas", "yen-sign" ],
		"fa-yen":					[ "fas", "yen-sign" ],
		"fa-rub":					[ "fas", "ruble-sign" ],
		"fa-ruble":					[ "fas", "ruble-sign" ],
		"fa-rouble":				[ "fas", "ruble-sign" ],
		"fa-krw":					[ "fas", "won-sign" ],
		"fa-won":					[ "fas", "won-sign" ],
		"fa-btc":					[ "fab", "btc" ],
		"fa-bitcoin":				[ "fab", "btc" ],
		"fa-file-text":				[ "fas", "file-alt" ],
		"fa-sort-alpha-asc":		[ "fas", "sort-alpha-down" ],
		"fa-sort-alpha-desc":		[ "fas", "sort-alpha-up" ],
		"fa-sort-amount-asc":		[ "fas", "sort-amount-down" ],
		"fa-sort-amount-desc":		[ "fas", "sort-amount-up" ],
		"fa-sort-numeric-asc":		[ "fas", "sort-numeric-down" ],
		"fa-sort-numeric-desc":		[ "fas", "sort-numeric-up" ],
		"fa-youtube-square":		[ "fab", "youtube" ],
		"fa-youtube":				[ "fab", "youtube" ],
		"fa-xing":					[ "fab", "xing" ],
		"fa-xing-square":			[ "fab", "xing-square" ],
		"fa-youtube-play":			[ "fab", "youtube" ],
		"fa-dropbox":				[ "fab", "dropbox" ],
		"fa-stack-overflow":		[ "fab", "stack-overflow" ],
		"fa-instagram":				[ "fab", "instagram" ],
		"fa-flickr":				[ "fab", "flickr" ],
		"fa-adn":					[ "fab", "adn" ],
		"fa-bitbucket":				[ "fab", "bitbucket" ],
		"fa-bitbucket-square":		[ "fab", "bitbucket" ],
		"fa-tumblr":				[ "fab", "tumblr" ],
		"fa-tumblr-square":			[ "fab", "tumblr-square" ],
		"fa-long-arrow-down":		[ "fas", "long-arrow-alt-down" ],
		"fa-long-arrow-up":			[ "fas", "long-arrow-alt-up" ],
		"fa-long-arrow-left":		[ "fas", "long-arrow-alt-left" ],
		"fa-long-arrow-right":		[ "fas", "long-arrow-alt-right" ],
		"fa-apple":					[ "fab", "apple" ],
		"fa-windows":				[ "fab", "windows" ],
		"fa-android":				[ "fab", "android" ],
		"fa-linux":					[ "fab", "linux" ],
		"fa-dribbble":				[ "fab", "dribbble" ],
		"fa-skype":					[ "fab", "skype" ],
		"fa-foursquare":			[ "fab", "foursquare" ],
		"fa-trello":				[ "fab", "trello" ],
		"fa-gratipay":				[ "fab", "gratipay" ],
		"fa-gittip":				[ "fab", "gratipay" ],
		"fa-sun-o":					[ "far", "sun" ],
		"fa-moon-o":				[ "far", "moon" ],
		"fa-vk":					[ "fab", "vk" ],
		"fa-weibo":					[ "fab", "weibo" ],
		"fa-renren":				[ "fab", "renren" ],
		"fa-pagelines":				[ "fab", "pagelines" ],
		"fa-stack-exchange":		[ "fab", "stack-exchange" ],
		"fa-arrow-circle-o-right":	[ "far", "arrow-alt-circle-right" ],
		"fa-arrow-circle-o-left":	[ "far", "arrow-alt-circle-left" ],
		"fa-caret-square-o-left":	[ "far", "caret-square-left" ],
		"fa-toggle-left":			[ "far", "caret-square-left" ],
		"fa-dot-circle-o":			[ "far", "dot-circle" ],
		"fa-vimeo-square":			[ "fab", "vimeo-square" ],
		"fa-try":					[ "fas", "lira-sign" ],
		"fa-turkish-lira":			[ "fas", "lira-sign" ],
		"fa-plus-square-o":			[ "far", "plus-square" ],
		"fa-slack":					[ "fab", "slack" ],
		"fa-wordpress":				[ "fab", "wordpress" ],
		"fa-openid":				[ "fab", "openid" ],
		"fa-institution":			[ "fas", "university" ],
		"fa-bank":					[ "fas", "university" ],
		"fa-mortar-board":			[ "fas", "graduation-cap" ],
		"fa-yahoo":					[ "fab", "yahoo" ],
		"fa-google":				[ "fab", "google" ],
		"fa-reddit":				[ "fab", "reddit" ],
		"fa-reddit-square":			[ "fab", "reddit-square" ],
		"fa-stumbleupon-circle":	[ "fab", "stumbleupon-circle" ],
		"fa-stumbleupon":			[ "fab", "stumbleupon" ],
		"fa-delicious":				[ "fab", "delicious" ],
		"fa-digg":					[ "fab", "digg" ],
		"fa-pied-piper-pp":			[ "fab", "pied-piper-pp" ],
		"fa-pied-piper-alt":		[ "fab", "pied-piper-alt" ],
		"fa-drupal":				[ "fab", "drupal" ],
		"fa-joomla":				[ "fab", "joomla" ],
		"fa-spoon":					[ "fas", "utensil-spoon" ],
		"fa-behance":				[ "fab", "behance" ],
		"fa-behance-square":		[ "fab", "behance-square" ],
		"fa-steam":					[ "fab", "steam" ],
		"fa-steam-square":			[ "fab", "steam-square" ],
		"fa-automobile":			[ "fas", "car" ],
		"fa-cab":					[ "fas", "taxi" ],
		"fa-spotify":				[ "fab", "spotify" ],
		"fa-envelope-o":			[ "far", "envelope" ],
		"fa-soundcloud":			[ "fab", "soundcloud" ],
		"fa-file-pdf-o":			[ "far", "file-pdf" ],
		"fa-file-word-o":			[ "far", "file-word" ],
		"fa-file-excel-o":			[ "far", "file-excel" ],
		"fa-file-powerpoint-o":		[ "far", "file-powerpoint" ],
		"fa-file-image-o":			[ "far", "file-image" ],
		"fa-file-photo-o":			[ "far", "file-image" ],
		"fa-file-picture-o":		[ "far", "file-image" ],
		"fa-file-archive-o":		[ "far", "file-archive" ],
		"fa-file-zip-o":			[ "far", "file-archive" ],
		"fa-file-audio-o":			[ "far", "file-audio" ],
		"fa-file-sound-o":			[ "far", "file-audio" ],
		"fa-file-video-o":			[ "far", "file-video" ],
		"fa-file-movie-o":			[ "far", "file-video" ],
		"fa-file-code-o":			[ "far", "file-code" ],
		"fa-vine":					[ "fab", "vine" ],
		"fa-codepen":				[ "fab", "codepen" ],
		"fa-jsfiddle":				[ "fab", "jsfiddle" ],
		"fa-life-ring":				[ "far", "life-ring" ],
		"fa-life-bouy":				[ "far", "life-ring" ],
		"fa-life-buoy":				[ "far", "life-ring" ],
		"fa-life-saver":			[ "far", "life-ring" ],
		"fa-support":				[ "far", "life-ring" ],
		"fa-circle-o-notch":		[ "fas", "circle-notch" ],
		"fa-rebel":					[ "fab", "rebel" ],
		"fa-ra":					[ "fab", "rebel" ],
		"fa-resistance":			[ "fab", "rebel" ],
		"fa-empire":				[ "fab", "empire" ],
		"fa-ge":					[ "fab", "empire" ],
		"fa-git-square":			[ "fab", "git-square" ],
		"fa-git":					[ "fab", "git" ],
		"fa-hacker-news":			[ "fab", "hacker-news" ],
		"fa-y-combinator-square":	[ "fab", "hacker-news" ],
		"fa-yc-square":				[ "fab", "hacker-news" ],
		"fa-tencent-weibo":			[ "fab", "tencent-weibo" ],
		"fa-qq":					[ "fab", "qq" ],
		"fa-weixin":				[ "fab", "weixin" ],
		"fa-wechat":				[ "fab", "weixin" ],
		"fa-send":					[ "fas", "paper-plane" ],
		"fa-paper-plane-o":			[ "far", "paper-plane" ],
		"fa-send-o":				[ "far", "paper-plane" ],
		"fa-circle-thin":			[ "far", "circle" ],
		"fa-header":				[ "fas", "heading" ],
		"fa-sliders":				[ "fas", "sliders-h" ],
		"fa-futbol-o":				[ "far", "futbol" ],
		"fa-soccer-ball-o":			[ "far", "futbol" ],
		"fa-slideshare":			[ "fab", "slideshare" ],
		"fa-twitch":				[ "fab", "twitch" ],
		"fa-yelp":					[ "fab", "yelp" ],
		"fa-newspaper-o":			[ "far", "newspaper" ],
		"fa-paypal":				[ "fab", "paypal" ],
		"fa-google-wallet":			[ "fab", "google-wallet" ],
		"fa-cc-visa":				[ "fab", "cc-visa" ],
		"fa-cc-mastercard":			[ "fab", "cc-mastercard" ],
		"fa-cc-discover":			[ "fab", "cc-discover" ],
		"fa-cc-amex":				[ "fab", "cc-amex" ],
		"fa-cc-paypal":				[ "fab", "cc-paypal" ],
		"fa-cc-stripe":				[ "fab", "cc-stripe" ],
		"fa-bell-slash-o":			[ "far", "bell-slash" ],
		//"fa-trash":					[ "fas", "trash-alt" ],
		"fa-copyright":				[ "far", "copyright" ],
		"fa-eyedropper":			[ "fas", "eye-dropper" ],
		"fa-area-chart":			[ "fas", "chart-area" ],
		"fa-pie-chart":				[ "fas", "chart-pie" ],
		"fa-line-chart":			[ "fas", "chart-line" ],
		"fa-lastfm":				[ "fab", "lastfm" ],
		"fa-lastfm-square":			[ "fab", "lastfm-square" ],
		"fa-ioxhost":				[ "fab", "ioxhost" ],
		"fa-angellist":				[ "fab", "angellist" ],
		"fa-cc":					[ "far", "closed-captioning" ],
		"fa-ils":					[ "fas", "shekel-sign" ],
		"fa-shekel":				[ "fas", "shekel-sign" ],
		"fa-sheqel":				[ "fas", "shekel-sign" ],
		"fa-meanpath":				[ "fab", "font-awesome" ],
		"fa-buysellads":			[ "fab", "buysellads" ],
		"fa-connectdevelop":		[ "fab", "connectdevelop" ],
		"fa-dashcube":				[ "fab", "dashcube" ],
		"fa-forumbee":				[ "fab", "forumbee" ],
		"fa-leanpub":				[ "fab", "leanpub" ],
		"fa-sellsy":				[ "fab", "sellsy" ],
		"fa-shirtsinbulk":			[ "fab", "shirtsinbulk" ],
		"fa-simplybuilt":			[ "fab", "simplybuilt" ],
		"fa-skyatlas":				[ "fab", "skyatlas" ],
		"fa-diamond":				[ "far", "gem" ],
		"fa-intersex":				[ "fas", "transgender" ],
		"fa-facebook-official":		[ "fab", "facebook" ],
		"fa-pinterest-p":			[ "fab", "pinterest-p" ],
		"fa-whatsapp":				[ "fab", "whatsapp" ],
		//"fa-hotel":					[ "fas", "bed" ],
		"fa-viacoin":				[ "fab", "viacoin" ],
		"fa-medium":				[ "fab", "medium" ],
		"fa-y-combinator":			[ "fab", "y-combinator" ],
		"fa-yc":					[ "fab", "y-combinator" ],
		"fa-optin-monster":			[ "fab", "optin-monster" ],
		"fa-opencart":				[ "fab", "opencart" ],
		"fa-expeditedssl":			[ "fab", "expeditedssl" ],
		"fa-battery-4":				[ "fas", "battery-full" ],
		"fa-battery":				[ "fas", "battery-full" ],
		"fa-battery-3":				[ "fas", "battery-three-quarters" ],
		"fa-battery-2":				[ "fas", "battery-half" ],
		"fa-battery-1":				[ "fas", "battery-quarter" ],
		"fa-battery-0":				[ "fas", "battery-empty" ],
		"fa-object-group":			[ "far", "object-group" ],
		"fa-object-ungroup":		[ "far", "object-ungroup" ],
		"fa-sticky-note-o":			[ "far", "sticky-note" ],
		"fa-cc-jcb":				[ "fab", "cc-jcb" ],
		"fa-cc-diners-club":		[ "fab", "cc-diners-club" ],
		"fa-clone":					[ "far", "clone" ],
		"fa-hourglass-o":			[ "far", "hourglass" ],
		"fa-hourglass-1":			[ "fas", "hourglass-start" ],
		"fa-hourglass-2":			[ "fas", "hourglass-half" ],
		"fa-hourglass-3":			[ "fas", "hourglass-end" ],
		"fa-hand-rock-o":			[ "far", "hand-rock" ],
		"fa-hand-grab-o":			[ "far", "hand-rock" ],
		"fa-hand-paper-o":			[ "far", "hand-paper" ],
		"fa-hand-stop-o":			[ "far", "hand-paper" ],
		"fa-hand-scissors-o":		[ "far", "hand-scissors" ],
		"fa-hand-lizard-o":			[ "far", "hand-lizard" ],
		"fa-hand-spock-o":			[ "far", "hand-spock" ],
		"fa-hand-pointer-o":		[ "far", "hand-pointer" ],
		"fa-hand-peace-o":			[ "far", "hand-peace" ],
		"fa-registered":			[ "far", "registered" ],
		"fa-creative-commons":		[ "fab", "creative-commons" ],
		"fa-gg":					[ "fab", "gg" ],
		"fa-gg-circle":				[ "fab", "gg-circle" ],
		"fa-tripadvisor":			[ "fab", "tripadvisor" ],
		"fa-odnoklassniki":			[ "fab", "odnoklassniki" ],
		"fa-odnoklassniki-square":	[ "fab", "odnoklassniki-square" ],
		"fa-get-pocket":			[ "fab", "get-pocket" ],
		"fa-wikipedia-w":			[ "fab", "wikipedia-w" ],
		"fa-safari":				[ "fab", "safari" ],
		"fa-chrome":				[ "fab", "chrome" ],
		"fa-firefox":				[ "fab", "firefox" ],
		"fa-opera":					[ "fab", "opera" ],
		"fa-internet-explorer":		[ "fab", "internet-explorer" ],
		"fa-television":			[ "fas", "tv" ],
		"fa-contao":				[ "fab", "contao" ],
		"fa-500px":					[ "fab", "500px" ],
		"fa-amazon":				[ "fab", "amazon" ],
		"fa-calendar-plus-o":		[ "far", "calendar-plus" ],
		"fa-calendar-minus-o":		[ "far", "calendar-minus" ],
		"fa-calendar-times-o":		[ "far", "calendar-times" ],
		"fa-calendar-check-o":		[ "far", "calendar-check" ],
		"fa-map-o":					[ "far", "map" ],
		"fa-commenting":			[ "fas", "comment-alt" ],
		"fa-commenting-o":			[ "far", "comment-alt" ],
		"fa-houzz":					[ "fab", "houzz" ],
		"fa-vimeo":					[ "fab", "vimeo-v" ],
		"fa-black-tie":				[ "fab", "black-tie" ],
		"fa-fonticons":				[ "fab", "fonticons" ],
		"fa-reddit-alien":			[ "fab", "reddit-alien" ],
		"fa-edge":					[ "fab", "edge" ],
		"fa-credit-card-alt":		[ "fas", "credit-card" ],
		"fa-codiepie":				[ "fab", "codiepie" ],
		"fa-modx":					[ "fab", "modx" ],
		"fa-fort-awesome":			[ "fab", "fort-awesome" ],
		"fa-usb":					[ "fab", "usb" ],
		"fa-product-hunt":			[ "fab", "product-hunt" ],
		"fa-mixcloud":				[ "fab", "mixcloud" ],
		"fa-scribd":				[ "fab", "scribd" ],
		"fa-pause-circle-o":		[ "far", "pause-circle" ],
		"fa-stop-circle-o":			[ "far", "stop-circle" ],
		"fa-bluetooth":				[ "fab", "bluetooth" ],
		"fa-bluetooth-b":			[ "fab", "bluetooth-b" ],
		"fa-gitlab":				[ "fab", "gitlab" ],
		"fa-wpbeginner":			[ "fab", "wpbeginner" ],
		"fa-wpforms":				[ "fab", "wpforms" ],
		"fa-envira":				[ "fab", "envira" ],
		"fa-wheelchair-alt":		[ "fab", "accessible-icon" ],
		"fa-question-circle-o":		[ "far", "question-circle" ],
		"fa-volume-control-phone":	[ "fas", "phone-volume" ],
		"fa-asl-interpreting":		[ "fas", "american-sign-language-interpreting" ],
		"fa-deafness":				[ "fas", "deaf" ],
		"fa-hard-of-hearing":		[ "fas", "deaf" ],
		"fa-glide":					[ "fab", "glide" ],
		"fa-glide-g":				[ "fab", "glide-g" ],
		"fa-signing":				[ "fas", "sign-language" ],
		"fa-viadeo":				[ "fab", "viadeo" ],
		"fa-viadeo-square":			[ "fab", "viadeo-square" ],
		"fa-snapchat":				[ "fab", "snapchat" ],
		"fa-snapchat-ghost":		[ "fab", "snapchat-ghost" ],
		"fa-snapchat-square":		[ "fab", "snapchat-square" ],
		"fa-pied-piper":			[ "fab", "pied-piper" ],
		"fa-first-order":			[ "fab", "first-order" ],
		"fa-yoast":					[ "fab", "yoast" ],
		"fa-themeisle":				[ "fab", "themeisle" ],
		"fa-google-plus-official":	[ "fab", "google-plus" ],
		"fa-google-plus-circle":	[ "fab", "google-plus" ],
		"fa-font-awesome":			[ "fab", "font-awesome" ],
		"fa-fa":					[ "fab", "font-awesome" ],
		"fa-handshake-o":			[ "far", "handshake" ],
		"fa-envelope-open-o":		[ "far", "envelope-open" ],
		"fa-linode":				[ "fab", "linode" ],
		"fa-address-book-o":		[ "far", "address-book" ],
		"fa-vcard":					[ "fas", "address-card" ],
		"fa-address-card-o":		[ "far", "address-card" ],
		"fa-vcard-o":				[ "far", "address-card" ],
		"fa-user-circle-o":			[ "far", "user-circle" ],
		"fa-user-o":				[ "far", "user" ],
		"fa-id-badge":				[ "far", "id-badge" ],
		"fa-drivers-license":		[ "fas", "id-card" ],
		"fa-id-card-o":				[ "far", "id-card" ],
		"fa-drivers-license-o":		[ "far", "id-card" ],
		"fa-quora":					[ "fab", "quora" ],
		"fa-free-code-camp":		[ "fab", "free-code-camp" ],
		"fa-telegram":				[ "fab", "telegram" ],
		"fa-thermometer-4":			[ "fas", "thermometer-full" ],
		"fa-thermometer":			[ "fas", "thermometer-full" ],
		"fa-thermometer-3":			[ "fas", "thermometer-three-quarters" ],
		"fa-thermometer-2":			[ "fas", "thermometer-half" ],
		"fa-thermometer-1":			[ "fas", "thermometer-quarter" ],
		"fa-thermometer-0":			[ "fas", "thermometer-empty" ],
		"fa-bathtub":				[ "fas", "bath" ],
		"fa-s15":					[ "fas", "bath" ],
		//"fa-window-maximize":		[ "far", "window-maximize" ],
		//"fa-window-restore":		[ "far", "window-restore" ],
		"fa-times-rectangle":		[ "fas", "times-square" ],
		"fa-window-close-o":		[ "far", "times-square" ],
		"fa-times-rectangle-o":		[ "far", "times-square" ],
		"fa-bandcamp":				[ "fab", "bandcamp" ],
		"fa-grav":					[ "fab", "grav" ],
		"fa-etsy":					[ "fab", "etsy" ],
		"fa-imdb":					[ "fab", "imdb" ],
		"fa-ravelry":				[ "fab", "ravelry" ],
		"fa-eercast":				[ "fab", "sellcast" ],
		"fa-snowflake-o":			[ "far", "snowflake" ],
		"fa-superpowers":			[ "fab", "superpowers" ],
		"fa-wpexplorer":			[ "fab", "wpexplorer" ],
		"fa-deviantart":			[ "fab", "deviantart" ]
	};

	jQuery.FAFIX_DEBUG = function( c, el ){
		if( undefined !== FA5[c] ){
			console.log( '[#] FAFIX: ' + c + ' > ' + 'fa-' + FA5[c][1] );
			console.log( el );
			console.log( '[#################]' );
			return [ FA5[c][0], 'fa-' + FA5[c][1] ];
		}
		return [ 'fas', c ];
	}
	jQuery.fn.FAFIX = function(){
		var $icons = this.find( '.fa' ).andSelf().filter( '.fa' ).not( '.text' ).addClass( 'faicon' );

		jQuery.each( $icons, function(){
			var $this = jQuery(this);
			var cls = $this.attr('class').split(/\s+/);
			var fa = '';
			var type = '';

			for( var i in cls ){

				if( !cls[i].startsWith( 'fa-' ) ||
					cls[i] == 'fa-spin' ||
					cls[i].startsWith( 'fa-stack' ) )
					continue;

				fa = cls[i];
				
				$this
					.removeClass( 'fa' )
					.removeClass( cls[i] );

				if( fa.lastIndexOf( '-r' ) == fa.length-2 ){
					fa = fa.substr( 0, fa.length-2 );
					type = 'far';
				}else if( fa.lastIndexOf( '-l' ) == fa.length-2 ){
					fa = fa.substr( 0, fa.length-2 );
					type = 'fal';
				}else if( fa.lastIndexOf( '-s' ) == fa.length-2 ){
					fa = fa.substr( 0, fa.length-2 );
					type = 'fas';
				}else if( fa.lastIndexOf( '-b' ) == fa.length-2 ){
					fa = fa.substr( 0, fa.length-2 );
					type = 'fab';
				}

				var fix = ( type == 'fab' ? ['fab',fa] : [type || 'fas',fa] /*$.FAFIX_DEBUG( fa, $icon )*/ );
				fa = ( type || fix[0] ) + ' ' + fix[1];

			}
			$this.addClass( fa );
		} );
		return this;
	}

	var $body = jQuery( 'body' );
	var is_advanced = $body.hasClass( 'scm-advanced' );
	var is_edit = $body.hasClass( 'scm-edit' );

	// ADMIN MENU

	if( is_edit ){

		jQuery( jQuery( '#adminmenu > .wp-has-current-submenu' ).prevAll('.scm-separator')[0] ).addClass('current').addClass('active').nextUntil( '.scm-separator' ).addClass('active');

		jQuery( '#adminmenu' ).on( 'click', '.scm-separator', function(e){
			var $this = jQuery( this );
			//if( $this.hasClass('acf-fc-layout-handle') ){
			if( $this.hasClass( 'active' ) ){
				$this.removeClass( 'active' );
				$this.nextUntil( '.scm-separator' ).removeClass( 'active' );
			}else{
				$this.siblings().removeClass( 'active' );
				$this.addClass('active');
				$this.nextUntil( '.scm-separator' ).addClass('active');
			}
		} );
	}

	// EMPTY LABELS

	jQuery('.acf-field .acf-label label:empty').addClass('empty');
	jQuery('.acf-flexible-content .layout' ).addClass( '-collapsed' );


	// CONTROL MENU

	var $publish = jQuery( '#publishing-action, #edittag p.submit' );
	$publish.prepend( '<i class="fa fa-save-r"></i>' );
	$publish.prepend( '<i class="fa fa-spin fa-cog-s"></i>' );

	jQuery( '#major-publishing-actions' ).append( '<div id="options-action" style="cursor:pointer;"><i class="fa fa-bars"></i><div>' );
	jQuery( 'body:not(.post-new-php):not(.post-php) #options-action' ).css( 'display', 'none' );
	jQuery( 'body.post-php #save-action' ).css( 'display', 'none' );
	
	var $stuff = jQuery( '#poststuff' );

	var $options = jQuery( '#options-action' );
	$options.on( 'click', function(e){
		if( $stuff.hasClass( 'options' ) ){
			$stuff.removeClass( 'options' );
			$options.find( '.fa' ).addClass( 'fa-bars' ).removeClass( 'fa-times' );
		}else{
			$stuff.addClass( 'options' );
			$options.find( '.fa' ).addClass( 'fa-times' ).removeClass( 'fa-bars' );
		}
	} );


	jQuery( '#delete-action a' ).prepend( '<i class="fa fa-trash-r"></i>' );
	jQuery( '#delete-action a' ).prepend( '<i class="fa fa-spin fa-cog-s"></i>' );


	function htmlEntities(str) {
	    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}


	var $save = jQuery( '#save-action' );
	if( $save.find( '.button' ).length > 0 ){
		$save.prepend( '<i class="fa fa-file-r"></i>' );
		$save.prepend( '<i class="fa fa-spin fa-cog-s"></i>' );
	}

	jQuery( '#preview-action a' ).prepend( '<i class="fa fa-search"></i>' );


	jQuery( '#delete-action .deletion, #save-action input, #publishing-action input, #edittag p.submit input' ).on( 'click', function(e){
		jQuery( 'div' ).remove( '.acf-error-message' );
		$body.addClass( 'loading' );
		checkDOMChange();
	});

	function checkDOMChange( cdc ){
	    
	    var $error = jQuery( '.acf-error-message' );
	    
	    if( !$error.length ){
		    setTimeout( checkDOMChange, 500 );
		    return;
		}

		$body.removeClass( 'loading' );

	}

	
	// TEMPLATES

	var $open_post = jQuery( '.posts-repeater .acf-row .order' );
	$open_post.on( 'click', function(e){
		var $this = jQuery( this );
		var $next = $this.next( '.acf-fields' );
		var id = $next.find( '[data-name="id"] input' ).val();
		window.location.href = 'post.php?post=' + id + '&action=edit';
	} );

	// ONLY ADVANCED ADMIN

	if( is_edit ){

		// ADVANCED FIELDS
	
		var $adv = jQuery( '.scm-advanced-options' );
		var advanced = false;

		var $opt = jQuery( '.acf-field.-option' );
		var options = false;

		var activate = false;

		$body.on( 'keydown', function(e){
			if( e.key == 'Control' ){
				activate = true;
			}
			if( e.key == 'Alt' && activate ){
				$opt = jQuery( '.acf-field.-option' );
			}else if( is_advanced && e.key == 'Meta' && activate ){
				$adv = jQuery( '.scm-advanced-options' );
			}
		} );

		$body.on( 'keyup', function(e){
			if( e.key == 'Control' ){
				activate = false;
			}
			if( e.key == 'Alt' && activate ){
				if( options ){
					options = false;
					$opt.addClass( 'hidden' );
				}else{
					options = true;
					$opt.removeClass( 'hidden' );
				}
			}else if( is_advanced && e.key == 'Meta' && activate ){
				if( advanced ){
					advanced = false;
					$adv.addClass( 'hidden' );
				}else{
					advanced = true;
					$adv.removeClass( 'hidden' );
				}
			}
		} );

		// SHOW FIELD KEY

		if( is_advanced ){
			$body.on( 'mouseenter', '.acf-field', function(e){
				var $this = jQuery(this);

				if( $this.hasClass( 'acf-field' ) ){
					jQuery( '.show-field-key' ).remove();
					if ( e.altKey ){
						e.stopPropagation();
						$this.append( '<div class="show-field-key">' + $this.attr( 'data-name' ) + '</div>' );
					}else if ( e.shiftKey){
						e.stopPropagation();
						$this.append( '<div class="show-field-key">' + $this.attr( 'data-key' ) + '</div>' );
					}
				}
			} );

			$body.on( 'mouseleave', '.acf-field', function(e){
				var $this = jQuery(this);
				if( $this.hasClass( 'acf-field' ) ){
					jQuery( '.show-field-key' ).remove();
				}
			} );

		    $body.on('click', function(e){
		    	var $this = jQuery( e.target );
		    	if( !e.target.className.indexOf ) return;
				if( e.target.className.indexOf( 'show-field-key' ) > -1 ){
					if ( e.altKey || e.shiftKey ){
						e.stopPropagation();
						e.preventDefault();
				        var path = $this.html();
				        path = path.replace(/ &amp;gt; /g,".");
				        $path.val(path);
				        $wrap.addClass( 'opened' );
				        $path.focus();
				        $path.select();
			    	}else{
			    		$wrap.removeClass( 'opened' );
				    }
				}else{
					if( $this.attr('id') !== 'copypath' )
						$wrap.removeClass( 'opened' );
				}
		    });
			
			var $path = jQuery('<textarea id="copypath"></textarea>'),
				$wrap = jQuery('<div id="toppathwrap"></div>'),
				$fields = jQuery( '.acf-field' );

			$wrap.append( $path );
			$body.append( $wrap );
		}

	}		

	// LOADED

	jQuery(window).load(function() {
		$body.FAFIX();
		/*jQuery( '.fa-select2' ).on( 'change', function(){
			jQuery(this).FAFIX();
		});*/
		$body.addClass( 'loaded' );
	});


} )( jQuery );
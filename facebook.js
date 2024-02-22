const GetArticles = class {
    constructor() {
        this.list = Array.apply(null, document.querySelectorAll("div[role=article]"));
        this.links = [];
        this.currentLink = null;
        this.node = null;
        this.scrollCount = 0;
        window.scrollTo(0, document.body.scrollHeight * 2);
        setTimeout(this.getMore.bind(this), 5000);
    }

    getMore() {
        this.scrollCount++;
        console.log(this.list, this.list.length, Array.apply(null, document.querySelectorAll("div[role=article]")));
        if (this.list.length != Array.apply(null, document.querySelectorAll("div[role=article]")).length || this.scrollCount < 50) {
            this.list = Array.apply(null, document.querySelectorAll("div[role=article]"));

            window.scrollTo(0, document.body.scrollHeight * this.scrollCount);
            setTimeout(this.getMore.bind(this), 5000);
        } else {

            this.fetchData();
        }

    }

    fetchData() {

        let i = this.list.pop();
        this.node = i;
        this.node.scrollIntoView();

        setTimeout(this.checkLink.bind(this), 4000);

    }

    checkLink() {
        while (this.node.querySelectorAll("a").length < 4 && this.list.length > 0) {
            this.node = this.list.pop();
            console.log("node", this.node.querySelectorAll("a"));
        }
        console.log(this.node, this.node.querySelectorAll("a").length, this.list.length);

        if (this.node.querySelectorAll("a").length < 4 && this.list.length == 0) {
            this.getContent();
        } else {
            this.currentLink = this.node.querySelectorAll("a")[3];

            var event = new FocusEvent('focusin', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            this.currentLink.dispatchEvent(event);
            setTimeout(this.getLink.bind(this), 4000);
        }

    }

    getLink() {
        this.links.push(this.currentLink.href);
        console.log(this.links, this.list.length);

        if (this.list.length != 0) {
            setTimeout(this.fetchData.bind(this), 4000);
        } else {
            this.getContent();
        }

    }

    getContent() {
        console.log(this.links);
        if (this.links.length > 0) {

            var url = this.links.pop();
            console.log(url);
            if (url.includes("posts") || url.includes("perment")) {
                var theWindow = window.open(url);
                console.log("start");
                setTimeout(function() {
                    let data = theWindow.document.querySelector("div[role=article]").innerHTML;
                    let type = "text/html";
                    let filename = theWindow.location.href + ".html";

                    var file = new Blob([data], {
                        type: type
                    });
                    if (window.navigator.msSaveOrOpenBlob) // IE10+
                        window.navigator.msSaveOrOpenBlob(file, filename);
                    else { // Others
                        var a = document.createElement("a"),
                        url = URL.createObjectURL(file);
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(function() {
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(url);
                        }, 0);
                    }
                    console.log('close');
                    theWindow.close();
                }, 10000);



                setTimeout(this.getContent.bind(this), 4000);

            } else {

                this.getContent();
            }

        }

    }

}

var p = new GetArticles();
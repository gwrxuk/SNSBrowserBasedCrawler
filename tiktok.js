const GetInfo = class {
    constructor(element) {
        this.ele = element.children[0].children[0].children[0].children[0];
        this.ele.click()

        setTimeout(this.clickReplies.bind(this), 5000);
    }

    clickReplies() {
        Array.apply(null, document.querySelectorAll("p[data-e2e=view-more-1]")).map(x => x.click());
        setTimeout(this.downloadFile.bind(this), 5000);

    }

    downloadFile() {
        this.download(document.querySelector('[data-e2e="search-comment-container"]').innerText, window.location.href + ".txt", "text/plain");
        this.download(document.querySelector('[data-e2e="search-comment-container"]').innerHTML, window.location.href + ".html", "text/html");
        setTimeout(function() {
            if (document.querySelector('button[data-e2e="browse-close"]')) {
                document.querySelector('button[data-e2e="browse-close"]').click();
            }
        }, 5000);
    }

    download(data, filename, type) {
        let file = new Blob([data], {
            type: type
        });
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, filename);
        else {
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
    }

}

var list = document.querySelector('[data-e2e="search_top-item-list"]');
var count = 0;

var queue = [];
setInterval(function() {
    if (!document.querySelector('button[data-e2e="browse-close"]')) {

        window.scrollTo(0, document.body.scrollHeight);
        list = document.querySelector('[data-e2e="search_top-item-list"]');
        let p = new GetInfo(list.children[count]);
        count++;
    }
}, 4000);
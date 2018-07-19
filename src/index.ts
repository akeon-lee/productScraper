import './style.css';

// Grabbing the process button.
const processBtn: HTMLElement = document.getElementById('processBtn');
// Proxy link
const proxy = 'https://cors-anywhere.herokuapp.com/'
const outputArea: HTMLElement = document.getElementById('outputArea');
let urlPageResponse: string;

// Function to fetch from a link.
function fetchWebPage(url: string, proxy?: string): Promise<string> {
    return new Promise<string>((resolve: any, reject: any) => {
        fetch(proxy + url, {
            method: 'GET'
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                urlPageResponse = data;
                resolve(urlPageResponse);
        })
        .catch(err => reject(err));
    });
}

// When process button is clicked return void.
processBtn.addEventListener('click', () => {
    // Get the value of what is inputed on inputLink element.
    const inputLinkValue: any = (<HTMLInputElement>document.getElementById('inputLink')).value;

    fetchWebPage(inputLinkValue, proxy)
        .then(() => {
            // console.log(urlPageResponse);

            const productTitleRegExp: RegExp = /MainContent_M_ProductDetail2_s2">(.*)<\/span>/;
            const productTitle: string = urlPageResponse.match(productTitleRegExp).pop();

            // console.log(productTitle);

            outputArea.innerHTML += `<li>${productTitle}</li>`;
        })
    .catch(err => console.log(err));

});

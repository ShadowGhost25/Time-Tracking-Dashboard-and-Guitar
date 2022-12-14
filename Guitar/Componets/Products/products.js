
class Products {
    constructor() {
        this.classNameActive = 'products__btn_active';
        this.labelAdd = 'Добавить в корзинку';
        this.labelRemove = 'Добавить в корзинку';
    }

    handleSetLocationStorage(element, id) {
        const  { pushProduct, products } = localStorageUtil.putProducts(id);
        if (pushProduct) {
            element.classList.add(this.classNameActive)
            element.innerHTML = this.labelRemove;
        } else{
            element.classList.remove(this.classNameActive)
            element.innerHTML = this.labelRemove;
        }

        headerPage.render(products.length);
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';
        
        CATALOG.forEach(({id, name, price, img}) => {
            let activeClass = '';
            let activeText = '';

            if(productsStore.indexOf(id) === -1){
                activeText = this.labelAdd;
            } else {
                activeClass = ' '+ this.classNameActive;
                activeText = this.labelRemove;
            }
            htmlCatalog += `
                <li class = "products-element">
                    <span class = "products__name">${name}</span>
                    <img class = "products__img" src = "${img}" />
                    <span class = "products__price"> ⭐️ ${price.toLocaleString()} USD</span>
                    <button class = "products__btn ${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}')">
                        ${activeText}
                    </button>
                </li>
            `;
        });

        const html = `
            <ul class = "products-container">
                ${htmlCatalog}
            </ul>
        `;
        Root_Products.innerHTML = html;
    }
}

const productsPage = new Products();

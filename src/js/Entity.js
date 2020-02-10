export class SVGEntity {

    constructor(x, y, svgElTitle) {
        let svgNS = "http://www.w3.org/2000/svg";
        this.svg = document.createElementNS(svgNS, svgElTitle);
        this.x = x;
        this.y = y;
        this.listeners = [];
    }

    set x(x) {
        this._x = x;
        this.svg.setAttributeNS(null, "x", x);
    }

    get x() {
        return this._x;
    }

    set y(y) {
        this._y = y;
        this.svg.setAttributeNS(null, "y", y);
    }

    get y() {
        return this._y;
    }

    addListener(event, cb) {
        this.listeners.push({
            event: event,
            cb: cb,
        });
        this.svg.addEventListener(event, cb);
    }

    removeListeners() {
        this.listeners.forEach(l => {
            this.svg.removeEventListener(l.event, l.cb);
        });
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export class SpriteEntity extends SVGEntity {

    constructor(x, y, width, height, imagePath) {
        super(x, y, "image");
        this.width = width;
        this.height = height;
        this.image = imagePath;
    }

    set width(width) {
        this._width = width;
        this.svg.setAttributeNS(null, "width", width);
    }

    set height(height) {
        this._height = height;
        this.svg.setAttributeNS(null, "height", height);
    }

    set image(img) {
        this._imagePath = img;
        this.svg.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", img);
    }
}

export class Element extends SpriteEntity {

    constructor(x, y, width, height, imagePath, type) {
        super(x, y, width, height, imagePath);
        this.type = type;
    }
}

export class CompositeEntity extends SVGEntity {

    constructor(x, y, elements) {
        super(x, y, "svg");
        elements.forEach(el => {
            this.svg.appendChild(el);
        })
        this.x = x;
    }
}

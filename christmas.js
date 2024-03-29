specialDates.define('christmas', [], function(){
    var canvas = Sinco.createElem('canvas', { 'style': 'z-index: 99; height: 100%; left: 0; position: absolute; top: 0; width: 100%; pointer-events: none;' });
    canvas.insert.call(document.body, canvas, 0);

    var ctx = canvas.getContext('2d');

    var width, height, lastNow;
    var snowflakes;
    var maxSnowflakes = 500;

    var init = function () {
        snowflakes = [];
        resize();
        render(lastNow = performance.now());
    };

    var render = function (now) {
        requestAnimationFrame(render);
        var hatSize = 100;
        var less = { top: 45, left: 40 };
        var zIndex = 8;
        var hatTarget = document.getElementById('iconoSvg');
        if (document.getElementById('dvMenuSalir')) {
            hatSize = 25;
            less.top = 10;
            less.left = 10;
            zIndex = 10;
        }
        showHat(hatSize, hatTarget, less, zIndex);
        
        var elapsed = now - lastNow;
        lastNow = now;
        
        ctx.clearRect(0, 0, width, height);
        if (snowflakes.length < maxSnowflakes)
            snowflakes.push(new Snowflake());
        
        ctx.fillStyle = ctx.strokeStyle = '#fff';

        snowflakes.forEach(function(snowflake) { snowflake.update(elapsed, now); });
    };

    var pause = function () {
        cancelAnimationFrame(render);
    };

    var resume = function () {
        lastNow = performance.now();
        requestAnimationFrame(render);
    };

    function Snowflake () {
        this.spawn = function (anyY) {
            anyY = anyY === undefined || anyY === null ? false : anyY;

            this.x = rand(0, width)
            this.y = anyY === true
                ? rand(-50, height + 50)
                : rand(-50, -10);
            this.xVel = rand(-.05, .05);
            this.yVel = rand(.02, .1);
            this.angle = rand(0, Math.PI * 2);
            this.angleVel = rand(-.001, .001);
            this.size = rand(7, 12);
            this.sizeOsc = rand(.01, .5);
        };

        this.update = function (elapsed, now) {
            var xForce = rand(-.001, .001);

            if (Math.abs(this.xVel + xForce) < .075) {
                this.xVel += xForce;
            }
            
            this.x += this.xVel * elapsed;
            this.y += this.yVel * elapsed;
            this.angle += this.xVel * 0.05 * elapsed; //this.angleVel * elapsed
            
            if (
                this.y - this.size > height ||
                this.x + this.size < 0 ||
                this.x - this.size > width
            ) {
                this.spawn();
            }
            
            this.render();
        };

        this.render = function () {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 0.2, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();
        };

        this.spawn();
    }

    // Utils
    var rand = function (min, max) { return min + Math.random() * (max - min); };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        if (width <= 650) {
            maxSnowflakes = 50;
        }
        else{
            maxSnowflakes = 500;
        }
    }

    function showHat(size, target, less, zIndex) {
        if (target) {
            var pos = target.getBoundingClientRect();
            var hat = document.getElementById('hat');
            if (!hat){
                zIndex = zIndex || 8;
                var aside = Sinco.createElem('aside', { 'style': 'z-index: ' + zIndex + '; pointer-events: none; position: absolute; transform: scaleX(-1) rotate(30deg); top: ' + (pos.top-less.top) + 'px; left: ' + (pos.left-less.left) + 'px;', 'id': 'hat' });
                aside.innerHTML = ' \
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + size + 'px" height="' + size + 'px" version="1.1" x="0px" y="0px" viewBox="0 0 511.861 511.861" xml:space="preserve"> \
                    <path style="fill:#E14B4B;" d="M53.86,253.519c0,0,26.064-101.856,130.336-144.528c0,0,41.072-59.248,169.04-22.912  c0,0,37.92,25.28,44.24,39.488c0,0,56.08,9.488,56.08,74.256c0,0,11.056,16.592,7.904,57.664l8.688,87.68l-41.872,32.384  l-2.368-15.792c0,0-40.288-60.832-42.656-79.776c0,0-11.056-8.688-11.056,12.64l11.056,33.168l-307.28-23.808L53.86,253.519z"/> \
                    <path style="fill:#D03F3E;" d="M399.636,206.895c-9.008-39.904-22.176-78.864-39.44-116.032   c8.064,5.776,21.424,15.824,29.952,24.832C395.94,145.743,399.06,176.271,399.636,206.895z"/> \
                    <path style="fill:#D03F3E;" d="M283.316,119.487c3.504-0.192,6.544,1.232,9.2,3.504   C289.492,121.759,286.356,120.623,283.316,119.487z"/> \
                    <path style="fill:#D03F3E;" d="M383.14,281.871c-1.136-0.768-10.8-7.296-10.896,12.512c-4.272-5.68-7.872-12.128-11.952-17.92   c-11.376-16.304-27.872-28.336-43.984-40.096c-30.816-22.464-62.56-45.312-99.152-56.112c18.016-0.944,35.552,5.504,52.32,12.032   c33.184,12.896,67.392,27.776,89.296,55.744c-0.096-18.768-10.144-35.84-19.904-51.856c-12.8-21.04-25.6-42.096-38.4-63.136   c-2.176-3.6-4.832-7.488-7.968-10.048c14.224,5.408,27.968,12.032,38.672,22.656c14.224,14.128,21.328,33.648,27.584,52.704   C367.78,225.855,375.94,253.807,383.14,281.871z"/> \
                    <path style="fill:#DAE5EF;" d="M0.34,359.407c0-12.336-0.112,1.824-0.224-3.344c-0.448,13.872-0.16-62.56,11.648-70.624   c8.448-8.496,16.176-34.256,22.944-24.384c5.776-4.816,9.808,2.288,13.056-6.208c3.248-1.696,5.712-9.36,8.336-1.2   c2.624-1.888,5.424,5.52,9.344,3.248c3.92,5.856,8.944,2.272,16.064,7.12c0,5.552,2.64-6.672,6.624-0.768   c4,5.088,9.344,1.056,14.784-2.224c5.44-5.696,10.976-8.912,15.312-3.536c3.264,3.824,7.808,4.784,12.816-0.816   c4.992-4.64,10.448-2.992,15.472,2.224c5.04,7.008,9.664,7.536,13.04,3.008c3.376,4.96,5.472-1.616,5.472,1.504   c0,0.224,1.28,4.768,3.584-0.144c2.304-1.264,5.6,2.576,9.648-0.224c4.048,5.84,8.832-1.04,14.064,0.016   c5.248-5.312,10.944-9.6,16.832,0.56c5.888-4.416,11.952-2.976,17.936,1.424c5.984-1.904,11.872-0.496,17.408,2.608   c5.52-1.264,10.688,7.808,15.2,4.08c4.528-4.416,8.4-8.304,11.36,5.888c0-2.944,1.392,4.064,3.888,0.928   c2.496,1.568,6.08-1.52,10.464,2.608c4.384-0.336,9.552,2,15.232,4.016c5.664-6.08,11.824,4.032,18.176,5.184   c6.352,3.248,12.896,11.072,19.312,6.064c6.432-6.256,12.736,3.056,18.64,6.688c5.904,11.312,11.392,2.56,16.16,7.056   c4.768,2.352,8.832,0.784,11.856,7.152c0,0.144,2.576,8.416,3.024,8.816c0.832,1.28,1.744,11.008,2.624,10.304   c3.568,9.616,5.648,52.752-0.304,69.744c0-0.048-0.704-2.976-2.144,2.496c-1.44,0.992-3.616-2.208-6.528,5.296   c-2.912,4.08-6.592,1.728-11.024,4.752c-4.432,7.472-9.648,4.192-15.632,0.88c-5.984-3.344-12.768-5.952-20.352-6.32   c0-7.568-0.448-2.336-1.312-0.448c-0.864,3.968-2.16-3.792-3.856-1.248c-1.696-9.664-3.792,1.072-6.256-1.92   c-2.48-2.64-5.328,0.112-8.544-2.432c-3.216,7.92-6.784-3.184-10.688-2.816c-3.904-5.696-8.16-10.208-12.72-3.072   c-4.56,0.784-9.44-8.992-14.608-3.168c-5.168-5.2-10.64,5.248-16.384-3.136c-5.744,2.32-11.76-4.624-18.016-2.96   c-6.272-2.4-12.784,1.328-19.536-2.64c-6.752,0.48-13.728,1.776-20.912-2.192c-7.184-0.848-14.592-5.84-22.176-1.584   c-7.584-3.136-15.36-0.864-23.296-0.848c-7.936-2.8-16.048-1.008-24.304,0.016c-14.416-3.632-27.072-0.896-38.16,0.208   c-11.088,1.248-20.608-0.992-28.784-1.088c-8.176-1.968-15.008-2.8-20.72-1.952c-5.712,6.8-10.304-2.944-13.984-2.432   c-3.68-1.056-6.464-7.216-8.56-2.544c-2.096-0.208-3.52-6.016-4.48-2.288c-0.96-1.12-1.456,0.88-1.712-1.648   c-0.256,3.28-0.272,7.824-0.272-0.64c0,10.048-2.816,2.304-6.064-2.736C5.828,370.383,2.116,375.663,0.34,359.407z"/> \
                    <path style="fill:#DAE5EF;" d="M505.476,359.663c14.112,22.32,3.504,56.384-18.816,70.496s-51.856,7.44-65.968-14.88   s-7.44-51.856,14.88-65.968C457.876,335.199,491.364,337.327,505.476,359.663z"/> \
                    <path style="fill:#CBD6E0;" d="M503.716,411.695c-4.16,7.52-10.08,13.92-17.12,18.4c-22.24,14.24-51.84,7.52-65.92-14.88   c-14.08-22.24-7.52-51.84,14.88-65.92c1.12-0.64,2.08-1.28,3.2-1.76c-7.68,14.56-7.52,32.8,1.92,47.68   C454.116,416.655,481.956,423.695,503.716,411.695z"/> \
                    <path style="fill:#CBD6E0;" d="M440.948,348.511c0.192-0.64,0.096-1.296-0.112-1.92c-0.08,0.032-0.144,0.08-0.224,0.112   L440.948,348.511z"/> \
                </svg> \
                ';

                aside.insert.call(document.body, aside, 0);
            }
            else {
                hat.style.setProperty('top', (pos.top-less.top) + 'px');
                hat.style.setProperty('left', (pos.left-less.left) + 'px');
            }
        }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('blur', pause);
    window.addEventListener('focus', resume);

    return {
        start: init
    }
});
document.body.insertAdjacentHTML('afterbegin', `<div id="fangda"></div>`)
document.body.insertAdjacentHTML('afterbegin', `<div id="shadow"></div>`)

var fangda = document.getElementById("fangda");
var shadow1 = document.getElementById("shadow")
var target_img;
var img_height, img_width, img_url, x1, x2, y1, y2; //为了不被shadow阻挡

document.addEventListener("mousemove", (e1) => {
    if (e1.target.dataset.fangdajing == "1") { //只在移入图片的时候获取一次
        x1 = e1.target.getBoundingClientRect().left + window.pageXOffset; //元素左边相对html的x坐标
        x2 = e1.target.getBoundingClientRect().right + window.pageXOffset; //元素右边相对html的x坐标
        y1 = e1.target.getBoundingClientRect().top + window.pageYOffset; //元素上边相对html的坐标
        y2 = e1.target.getBoundingClientRect().bottom + window.pageYOffset; //元素下边相对html的坐标
        target_img = e1.target;
        img_url = e1.target.getAttribute('src'); //获得目标的图片，并且不被shadow阻挡
        img_width = parseInt(getComputedStyle(e1.target).width); //不被shadow阻挡
        img_height = parseInt(getComputedStyle(e1.target).height); //不被shadow阻挡
    }
    if (e1.target.dataset.fangdajing == "1" || e1.target == shadow1) { //如果目标具有data-fangdajing="1"
        //alert("移入目标")
        // x1 = e1.target.getBoundingClientRect().left + window.pageXOffset; //元素左边相对html的x坐标
        // x2 = e1.target.getBoundingClientRect().right + window.pageXOffset; //元素右边相对html的x坐标
        // y1 = e1.target.getBoundingClientRect().top + window.pageYOffset; //元素上边相对html的坐标
        // y2 = e1.target.getBoundingClientRect().bottom + window.pageYOffset; //元素下边相对html的坐标

        if (e1.target.dataset.fangdajing == "1") { //移入目标放大图片的时候，更新目标放大图片
            // target_img = e1.target;
            // img_url = e1.target.getAttribute('src'); //获得目标的图片，并且不被shadow阻挡
            // img_width = parseInt(getComputedStyle(e1.target).width); //不被shadow阻挡
            // img_height = parseInt(getComputedStyle(e1.target).height); //不被shadow阻挡
        }
        var background_position_x = -1.5 * e1.pageX + (x2 + 5 * x1) / 4;
        var background_position_y = -1.5 * e1.pageY + (y2 + 5 * y1) / 4;
        var style1 = `position:absolute;top:${y1}px;left:${x1+img_width}px;height:${img_height}px;width:${img_width}px;
        background-image:url(${img_url});background-repeat:no-repeat;background-size:${2*img_width}px;background-color:white;
        z-index:100;border:1px solid black;
        background-position-x:${background_position_x}px;
        background-position-y:${background_position_y}px; overflow:hidden;
        `
        fangda.style.cssText = style1;

        var shadow_top = e1.pageY - (y2 - y1) / 6;
        var shadow_left = e1.pageX - (x2 - x1) / 6;

        //TODO 为什么这里打印出来的元素，页面并没有渲染css样式、打印出来的元素和输出的元素的样式不一样
        shadow.style.cssText = `position:absolute;z-index:100;
                      width:${(x2-x1)/3}px;height:${(y2-y1)/3}px;top:${shadow_top}px;
                      left:${shadow_left-(x2-x1)/6-100}px;
                      box-shadow:${(x2-x1)/6+100}px 0 0 0 rgba(0,255,0,0.2);
                      `
        //console.log(shadow) 
        // e1.target.addEventListener("mouseleave", function mouse_leave() {
        //     fangda.style.cssText = '';
        //     shadow.style.cssText = '';
        //     // e1.target.removeEventListener('mouseleave', mouse_leave);
        // })
        e1.target.onmouseleave = () => {
            fangda.style.cssText = '';
            shadow.style.cssText = '';
        }

    }


})
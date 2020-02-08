// 在地图上绘制点 -- 一个点一个点画
function drawPoint(data, t) {
    //console.log(data);
    if (cycloneNumber < data.length) {	//一个个气旋的循环(绘制)

        if (cycloneData < data[cycloneNumber].feature.length) {	//循环每个气旋的所有记录数据

            var point = new BMap.Point(data[cycloneNumber].feature[cycloneData].long,
                data[cycloneNumber].feature[cycloneData].lat);	//经纬度点坐标

            var radius = (data[cycloneNumber].feature[cycloneData].pres - 889) * 800;  // 中心气压，采用半径来表示

            // 气旋细节信息
            var cyclonedetail = "Date:" + data[cycloneNumber].feature[cycloneData].date +
                                "<br>Long:" + data[cycloneNumber].feature[cycloneData].long +
                                "<br>Lat:" + data[cycloneNumber].feature[cycloneData].lat +
                                "<br>PRES:" + data[cycloneNumber].feature[cycloneData].pres +
                                "<br>WND:" + data[cycloneNumber].feature[cycloneData].wnd;


            var pointcolor; // 根据气旋强度，不同颜色

            // 主要是因为省份的数据中属性少几条
            if (data[cycloneNumber].feature[cycloneData].intensity != -1) {

                pointcolor = color[data[cycloneNumber].feature[cycloneData].intensity];  // 强度颜色渐变
                cyclonedetail += "<br>I:" + data[cycloneNumber].feature[cycloneData].intensity + 
                                 "<br>F:" + data[cycloneNumber].feature[cycloneData].finality + 
                                 "<br>Name:" + data[cycloneNumber].name;

            } else {    // 按省份的数据中没有强度记录
                pointcolor = "rgb(255, 99, 71)";
            }

            var cyclonepoint = new BMap.Circle(point, radius,
                {
                    fillColor: pointcolor,   // 按气旋强度不同，进行颜色渐变着色
                    strokeWeight: 1, fillOpacity: 0.5, strokeOpacity: 0.1
                });

            map.addOverlay(cyclonepoint);		// 添加标记

            // 设置浮窗窗口属性
            var opts = {
                width: 200,     // 信息窗口尺寸
                hight: 100,
                title: "Cyclone Data",  // 信息窗口标题
            };            

            var infoWindow = new BMap.InfoWindow(cyclonedetail, opts);  // 创建信息窗口对象                         

            // 为点添加鼠标悬浮事件
            cyclonepoint.addEventListener("click", function () {
                map.openInfoWindow(infoWindow, point); //开启信息窗口
            });            

            cycloneData++;	//迭代到下一条记录数据

        } else { // 一条气旋的记录数据绘制完毕

            //map.clearOverlays(); // 绘制完一个完整的轨迹清除所有Overlay
            cycloneData = 0; // 气旋数据记录索引复位
            cycloneNumber++; // 迭代到下一条气旋

        }

    } else {	// 绘制完毕，结束周期调用

        clearInterval(t); // 终止循环调用绘制点的方法

    }

}
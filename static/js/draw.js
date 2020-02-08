// 绘制饼图
function drawpie(dataset) {

    
    if (dataset.length == 0) {
        alert("当前时间范围内没有数据！");
        return;
    }

    var dom = document.getElementById("pie");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        color: ["rgba(222, 0, 0, 0.5)", "rgb(70, 163, 255)", "rgb(255, 88, 9)", "rgb(111, 183, 183)", "rgb(238, 130, 238)",
            "rgb(115, 115, 185)", "rgb(174, 87, 167)", "rgb(213, 75, 0)", "rgb(222, 55, 0)", "rgb(232, 36, 0)"], // 气旋颜色数组

        title: {
            text: '气旋强度数量统计图',
            // subtext: '',
            x: 170,
            y: 25
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            //orient: 'vertical',
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            data: ['TD or None', 'TD', 'TS', 'STS', 'TY', 'STY', 'SuperTY']
        },
        calculable: true,
        series: [
            {
                name: '',
                type: 'pie',
                radius: [30, 110],
                center: ['50%', '50%'],
                roseType: 'area',
                data: dataset
            }
        ]
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

}

// 绘制气压柱状图
function drawbar_press(dataset) {

    var dom = document.getElementById("bar_press");
    var myChart = echarts.init(dom);
    var app = {};

    var labelOption = {
        normal: {
            show: false,
            //rotate: 90,
            //align: 'left',
            //verticalAlign: 'middle',
            //position: 'insideBottom',
            //distance: 25,
            formatter: '{c}  {name|{a}}',
            fontSize: 12,
            rich: {
                name: {
                    textBorderColor: '#fff'
                }
            }
        }
    };

    option = {
        color: ["rgba(222, 0, 0, 0.5)", "rgb(70, 163, 255)", "rgb(255, 88, 9)", "rgb(111, 183, 183)", "rgb(238, 130, 238)",
            "rgb(115, 115, 185)", "rgb(174, 87, 167)", "rgb(213, 75, 0)", "rgb(222, 55, 0)", "rgb(232, 36, 0)"], // 气旋颜色数组
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['TD or None', 'TD', 'TS', 'STS', 'TY', 'STY', 'Super TY']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center'
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: ['<940', '<960', '<980', '<1100']
            }
        ],
        series: [
            {
                name: 'TD or None',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                data: dataset[0]
            },
            {
                name: 'TD',
                type: 'bar',
                label: labelOption,
                data: dataset[1]
            },
            {
                name: 'TS',
                type: 'bar',
                label: labelOption,
                data: dataset[2]
            },
            {
                name: 'STS',
                type: 'bar',
                label: labelOption,
                data: dataset[3]
            },
            {
                name: 'TY',
                type: 'bar',
                label: labelOption,
                data: dataset[4]
            },
            {
                name: 'STY',
                type: 'bar',
                label: labelOption,
                data: dataset[5]
            },
            {
                name: 'SuperTY',
                type: 'bar',
                label: labelOption,
                data: dataset[6]
            }
        ]
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}


// 绘制速度柱状图
function drawbar_speed(dataset) {

    var dom = document.getElementById("bar_speed");
    var myChart = echarts.init(dom);
    var app = {};

    var labelOption = {
        normal: {
            show: false,
            //rotate: 90,
            //align: 'left',
            //verticalAlign: 'middle',
            //position: 'insideBottom',
            //distance: 25,
            formatter: '{c}  {name|{a}}',
            fontSize: 12,
            rich: {
                name: {
                    textBorderColor: '#fff'
                }
            }
        }
    };

    option = {
        color: ["rgba(222, 0, 0, 0.5)", "rgb(70, 163, 255)", "rgb(255, 88, 9)", "rgb(111, 183, 183)", "rgb(238, 130, 238)",
            "rgb(115, 115, 185)", "rgb(174, 87, 167)", "rgb(213, 75, 0)", "rgb(222, 55, 0)", "rgb(232, 36, 0)"], // 气旋颜色数组

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['TD or None', 'TD', 'TS', 'STS', 'TY', 'STY', 'Super TY']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center'
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: ['<25m/s', '<45m/s', '<65m/s', '<85m/s']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'TD or None',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                data: dataset[0]
            },
            {
                name: 'TD',
                type: 'bar',
                label: labelOption,
                data: dataset[1]
            },
            {
                name: 'TS',
                type: 'bar',
                label: labelOption,
                data: dataset[2]
            },
            {
                name: 'STS',
                type: 'bar',
                label: labelOption,
                data: dataset[3]
            },
            {
                name: 'TY',
                type: 'bar',
                label: labelOption,
                data: dataset[4]
            },
            {
                name: 'STY',
                type: 'bar',
                label: labelOption,
                data: dataset[5]
            },
            {
                name: 'SuperTY',
                type: 'bar',
                label: labelOption,
                data: dataset[6]
            }
        ]
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}



// 绘制折线图
function drawline(dataset) {
    var dom = document.getElementById("line_1");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['TD or None', 'TD', 'TS', 'STS', 'TY', 'STY', 'Super TY']
        },
        //toolbox: {
        //    show: true,
        //    feature: {
        //        mark: { show: true },
        //        dataView: { show: true, readOnly: false },
        //        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
        //        restore: { show: true },
        //        saveAsImage: { show: true }
        //    }
        //},
        //calculable: true,
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 10
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 10
            }
        ],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: { onZero: false },
                data: dataset[0].TimeList.map(function (str) {
                    return str.replace(' ', '\n')
                })
            }
        ],
        yAxis:
        {
            type: 'value',
            scale: true
        },
        series: function (dataset){

            sj = [];

            namelist = ['TD or None', 'TD', 'TS', 'STS', 'TY', 'STY', 'Super TY'];
            for (var i = 0; i < 7; i++) {
                if (dataset[1].dataset[1].IntenTimeList[i] != 0) {

                    temp = {
                        name: namelist[i],
                        type: 'line',
                        data: dataset[1].IntenTimeList[i]
                    }
                }

                sj.push(temp);

            }

            console.log(sj);
            return sj;

    }


        //    [

        //    {
        //        name: 'TD or None',
        //        type: 'line',
                
        //        data: dataset[1].IntenTimeList[0]
        //    },
        //    {
        //        name: 'TD',
        //        type: 'line',
                
        //        data: dataset[1].IntenTimeList[1]
        //    },
        //    {
        //        name: 'TS',
        //        type: 'line',
                
        //        data: dataset[1].IntenTimeList[2]
        //    },
        //    {
        //        name: 'STS',
        //        type: 'line',
                
        //        data: dataset[1].IntenTimeList[3]
        //    },
        //    {
        //        name: 'TY',
        //        type: 'line',
                
        //        data: dataset[1].IntenTimeList[4]
        //    },
        //    {
        //        name: 'STY',
        //        type: 'line',
                
        //        data: dataset[1].IntenTimeList[5]
        //    },
        //    {
        //        name: 'Super TY',
        //        type: 'line',
               
        //        data: dataset[1].IntenTimeList[6]
        //    }
        //]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

}
//// 绘制地图中选中的气旋信息
//function draw1(data, t) {

//    if (cyclonePointNum1 < data.length) {

//        //创建点对象
//        var point = new BMap.Point(data[cycloneNum].Feature[cyclonePointNum].Long,
//            data[cycloneNum].Feature[cyclonePointNum].Lat);

//        var radius = (data[cycloneNum].Feature[cyclonePointNum].Pres - 889) * 800;  // 中心气压，采用半径来表示
//    }
//}

// 画点函数
function drawpoint(data, t) {
    // data 为数据   t 为控制绘画暂停继续


    if (cycloneNum < data.length) {
        // 由服务器返回的节点中气旋还没有绘制完成，继续绘制

        if (cyclonePointNum < data[cycloneNum].Feature.length) {

            //创建点对象
            var point = new BMap.Point(data[cycloneNum].Feature[cyclonePointNum].Long,
                data[cycloneNum].Feature[cyclonePointNum].Lat);

            var radius = (data[cycloneNum].Feature[cyclonePointNum].Pres - 889) * 800;  // 中心气压，采用半径来表示


            name_zxl = data[cycloneNum].Name;
            date_zxl = data[cycloneNum].Feature[cyclonePointNum].Date;


            // 气旋细节信息
            var cyclonedetail = "Date:" + data[cycloneNum].Feature[cyclonePointNum].Date +
                "<br>Long:" + data[cycloneNum].Feature[cyclonePointNum].Long +
                "<br>Lat:" + data[cycloneNum].Feature[cyclonePointNum].Lat +
                "<br>PRES:" + data[cycloneNum].Feature[cyclonePointNum].Pres +
                "<br>WND:" + data[cycloneNum].Feature[cyclonePointNum].Wnd +
                "<br>I:" + data[cycloneNum].Feature[cyclonePointNum].I +
                "<br>OWD:" + data[cycloneNum].Feature[cyclonePointNum].Owd +
                "<br>Name:" + data[cycloneNum].Name;


            var pointcolor = color[data[cycloneNum].Feature[cyclonePointNum].I];


            var cyclonepoint = new BMap.Circle(point, radius,
                {
                    fillColor: pointcolor,   // 按气旋强度不同，进行颜色渐变着色
                    strokeWeight: 1, fillOpacity: 0.5, strokeOpacity: 0.1
                });


            // 绘制点
            map.addOverlay(cyclonepoint);

            // 设置浮窗窗口属性
            var opts = {
                width: 200,     // 信息窗口尺寸
                hight: 100,
                title: "CycloneNode Information",  // 信息窗口标题
            };

            var infoWindow = new BMap.InfoWindow(cyclonedetail, opts);  // 创建信息窗口对象                         


            // 为气旋点添加鼠标悬停事件
            cyclonepoint.addEventListener("mouseover", function () {
                map.openInfoWindow(infoWindow, point); //开启信息窗口
            });

            // 为气旋点添加鼠标点击事件
            cyclonepoint.addEventListener("click", function () {
                //map.openInfoWindow(infoWindow, point); //开启信息窗口

                // 获取信息
                nodeInfo = cyclonedetail.split("<br>");
                namelist = nodeInfo[7].split(":");
                name = namelist[1];
                datelist = nodeInfo[0].split(":");
                datelist = datelist[1].split("/");
                year = datelist[2];

                console.log(name);
                console.log(year);

                // 绘制气旋点
                $.ajax({

                    type: "post",
                    url: "/cycloneyear",
                    data: { "year": year },
                    dataType: "json",
                    success: function (data) {

                        dataset = null;
                        cycloneNum = 0; // 节点中的气旋数量
                        cyclonePointNum = 0; // 当前这条气旋的点数
                        clearInterval(t); //停止调用

                        if (data.length <= 0) {
                            alert("此时间范围内不存在数据！");

                        }
                        else {
                            console.log(data);
                            // 清除地图上存在的轨迹点
                            map.clearOverlays();
                            
                            for (var m = 0; m < data.length; m++) {

                                if (data[m].Name == name) {

                                    dataset = [data[m]];
                                    console.log(dataset);
                                    break;
                                }
                            }
                            // 开始绘制节点信息
                            t = setInterval(function () { drawpoint(dataset, t) }, 150);

                        }
                        
                    },
                    error: function (error) {

                        console.log(error);
                        alert("数据请求错误！");
                    }

                });


            });
            cyclonePointNum = cyclonePointNum + 1; // 当前这条气旋的下一个点的坐标
        }
        else {  // 第一层循环走完了 绘制完了当前的这一条气旋

            cycloneNum = cycloneNum + 1; // 进入下一个气旋
            cyclonePointNum = 0; // 复位成零
            points = []; // 清空点

        }
    }
    else {  //绘制完了所有的气旋

        clearInterval(t); //停止调用

    }

}


// 绘制年份范围的气旋点
function drawyear(dataset1, t) {



    if (cycloneaYearNum < dataset1.length) // 还没有绘制所有年份的气旋
    {
        data = dataset1[cycloneaYearNum].Data;

        if (cycloneNum < data.length) {
            // 当前年份中的气旋还没有绘制完成，继续绘制

            if (cyclonePointNum < data[cycloneNum].Feature.length) {

                //创建点对象
                var point = new BMap.Point(data[cycloneNum].Feature[cyclonePointNum].Long,
                    data[cycloneNum].Feature[cyclonePointNum].Lat);

                var radius = (data[cycloneNum].Feature[cyclonePointNum].Pres - 889) * 800;  // 中心气压，采用半径来表示


                name_zxl = data[cycloneNum].Name;
                date_zxl = data[cycloneNum].Feature[cyclonePointNum].Date;


                // 气旋细节信息
                var cyclonedetail = "Date:" + data[cycloneNum].Feature[cyclonePointNum].Date +
                    "<br>Long:" + data[cycloneNum].Feature[cyclonePointNum].Long +
                    "<br>Lat:" + data[cycloneNum].Feature[cyclonePointNum].Lat +
                    "<br>PRES:" + data[cycloneNum].Feature[cyclonePointNum].Pres +
                    "<br>WND:" + data[cycloneNum].Feature[cyclonePointNum].Wnd +
                    "<br>I:" + data[cycloneNum].Feature[cyclonePointNum].I +
                    "<br>OWD:" + data[cycloneNum].Feature[cyclonePointNum].Owd +
                    "<br>Name:" + data[cycloneNum].Name;


                var pointcolor = color[data[cycloneNum].Feature[cyclonePointNum].I];


                var cyclonepoint = new BMap.Circle(point, radius,
                    {
                        fillColor: pointcolor,   // 按气旋强度不同，进行颜色渐变着色
                        strokeWeight: 1, fillOpacity: 0.5, strokeOpacity: 0.1
                    });


                // 绘制点
                map.addOverlay(cyclonepoint);


                // 设置浮窗窗口属性
                var opts = {
                    width: 200,     // 信息窗口尺寸
                    hight: 100,
                    title: "CycloneNode Information" // 信息窗口标题
                };

                var infoWindow = new BMap.InfoWindow(cyclonedetail, opts);  // 创建信息窗口对象                         

                // 为气旋点添加鼠标悬停事件
                cyclonepoint.addEventListener("mouseover", function () {
                    map.openInfoWindow(infoWindow, point); //开启信息窗口
                });

                // 为气旋点添加鼠标点击事件
                cyclonepoint.addEventListener("click", function () {
                    //map.openInfoWindow(infoWindow, point); //开启信息窗口

                    // 获取信息
                    nodeInfo = cyclonedetail.split("<br>");
                    namelist = nodeInfo[7].split(":");
                    name = namelist[1];
                    datelist = nodeInfo[0].split(":");
                    datelist = datelist[1].split("/");
                    year = datelist[2];

                    console.log(name);
                    console.log(year);

                    // 绘制气旋点
                    $.ajax({

                        type: "post",
                        url: "/cycloneyear",
                        data: { "year": year },
                        dataType: "json",
                        success: function (data) {

                            dataset = null;
                            cycloneNum = 0; // 节点中的气旋数量
                            cyclonePointNum = 0; // 当前这条气旋的点数
                            clearInterval(t); //停止调用

                            if (data.length <= 0) {
                                alert("此时间范围内不存在数据！");

                            }
                            else {


                                console.log(data);
                                // 清除地图上存在的轨迹点
                                map.clearOverlays();


                                for (var m = 0; m < data.length; m++) {

                                    if (data[m].Name == name) {

                                        dataset = [data[m]];
                                        console.log(dataset);
                                        break;
                                    }
                                }
                                // 开始绘制节点信息
                                t = setInterval(function () { drawpoint(dataset, t) }, 150);

                            }



                        },
                        error: function (error) {

                            console.log(error);
                            alert("数据请求错误！");
                        }

                    });


                });

                cyclonePointNum = cyclonePointNum + 1; // 当前这条气旋的下一个点的坐标
            }
            else {  // 第一层循环走完了 绘制完了当前的这一条气旋

                cycloneNum = cycloneNum + 1; // 进入下一个气旋
                cyclonePointNum = 0; // 复位成零
                points = []; // 清空点

            }
        }
        else {  //绘制完了当前年份的气旋信息

            // 清除地图上存在的轨迹点
            map.clearOverlays();

            // 年份数据+1 
            cycloneaYearNum = cycloneaYearNum + 1;

            // 讲所有数据重置
            cycloneNum = 0;
            cyclonePointNum = 0;


        }
    }
    else {// 绘制了所有年份的数据

        clearInterval(t); //停止调用
    }


}



//function openHeatmap() {
//    heatmapOverlay.show();
//    alert("openHeatmap");
//}
//function closeHeatmap() {
//    heatmapOverlay.hide();
//}

//function setGradient() {
//    /*格式如下所示:
//  {
//          0:'rgb(102, 255, 0)',
//            .5:'rgb(255, 170, 0)',
//          1:'rgb(255, 0, 0)'
//  }*/
//    var gradient = {};
//    var colors = document.querySelectorAll("input[type='color']");
//    colors = [].slice.call(colors, 0);
//    colors.forEach(function (ele) {
//        gradient[ele.getAttribute("data-key")] = ele.value;
//    });
//    heatmapOverlay.setOptions({ "gradient": gradient });
//}
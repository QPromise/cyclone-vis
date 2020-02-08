// 画点函数




function drawpoint1(data) {
// data 为数据   t 为控制绘画暂停继续

    console.log("data.Name:" + data[0].Name);
    console.log("data.fature:" + data[0].Feature);
    console.log("data[0].feature[0][Date]:" + data[0].Feature[0]["Date"])

     if (cyclonenum < data.length) {
         // 由服务器返回的节点中气旋还没有绘制完成，继续绘制

    
         if (cyclonepointnum < data[cyclonenum].feature.length) {
    
             //创建点对象
             var point = new bmap.point(data[cyclonenum].feature[cyclonepointnum].long,
                 data[cyclonenum].fea
     ture[cyclonepointnum].lat);
    
             var radius = (data[cyclonenum].feature[cyclonepointnum].pres - 889) * 800;  // 中心气压，采用半径来表示
    
             var pointcolor = color[data[cyclonenum].feature[cyclonepointnum].intensity];
    
             console.log(data[cyclonenum].feature[cyclonepointnum].intensity);
    
             var cyclonepoint = new bmap.circle(point, radius,
                 {
                     fillcolor: pointcolor,   // 按气旋强度不同，进行颜色渐变着色
                     strokeweight: 1, fillopacity: 0.5, strokeopacity: 0.1
                 });
    
    
             // 绘制点
             map.addoverlay(cyclonepoint);
    
    
             cyclonepointnum = cyclonepointnum + 1; // 当前这条气旋的下一个点的坐标
         }
         else {  // 第一层循环走完了 绘制完了当前的这一条气旋
    
             cyclonenum = cyclonenum + 1; // 进入下一个气旋
             cyclonepointnum = 0; // 复位成零
             points = []; // 清空点
    
         }
     }
     else {  //绘制完了所有的气旋
    
         clearinterval(t); //停止调用
    
     }
}
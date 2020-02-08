// �ڵ�ͼ�ϻ��Ƶ� -- һ����һ���㻭
function drawPoint(data, t) {
    //console.log(data);
    if (cycloneNumber < data.length) {	//һ����������ѭ��(����)

        if (cycloneData < data[cycloneNumber].feature.length) {	//ѭ��ÿ�����������м�¼����

            var point = new BMap.Point(data[cycloneNumber].feature[cycloneData].long,
                data[cycloneNumber].feature[cycloneData].lat);	//��γ�ȵ�����

            var radius = (data[cycloneNumber].feature[cycloneData].pres - 889) * 800;  // ������ѹ�����ð뾶����ʾ

            // ����ϸ����Ϣ
            var cyclonedetail = "Date:" + data[cycloneNumber].feature[cycloneData].date +
                                "<br>Long:" + data[cycloneNumber].feature[cycloneData].long +
                                "<br>Lat:" + data[cycloneNumber].feature[cycloneData].lat +
                                "<br>PRES:" + data[cycloneNumber].feature[cycloneData].pres +
                                "<br>WND:" + data[cycloneNumber].feature[cycloneData].wnd;


            var pointcolor; // ��������ǿ�ȣ���ͬ��ɫ

            // ��Ҫ����Ϊʡ�ݵ������������ټ���
            if (data[cycloneNumber].feature[cycloneData].intensity != -1) {

                pointcolor = color[data[cycloneNumber].feature[cycloneData].intensity];  // ǿ����ɫ����
                cyclonedetail += "<br>I:" + data[cycloneNumber].feature[cycloneData].intensity + 
                                 "<br>F:" + data[cycloneNumber].feature[cycloneData].finality + 
                                 "<br>Name:" + data[cycloneNumber].name;

            } else {    // ��ʡ�ݵ�������û��ǿ�ȼ�¼
                pointcolor = "rgb(255, 99, 71)";
            }

            var cyclonepoint = new BMap.Circle(point, radius,
                {
                    fillColor: pointcolor,   // ������ǿ�Ȳ�ͬ��������ɫ������ɫ
                    strokeWeight: 1, fillOpacity: 0.5, strokeOpacity: 0.1
                });

            map.addOverlay(cyclonepoint);		// ��ӱ��

            // ���ø�����������
            var opts = {
                width: 200,     // ��Ϣ���ڳߴ�
                hight: 100,
                title: "Cyclone Data",  // ��Ϣ���ڱ���
            };            

            var infoWindow = new BMap.InfoWindow(cyclonedetail, opts);  // ������Ϣ���ڶ���                         

            // Ϊ�������������¼�
            cyclonepoint.addEventListener("click", function () {
                map.openInfoWindow(infoWindow, point); //������Ϣ����
            });            

            cycloneData++;	//��������һ����¼����

        } else { // һ�������ļ�¼���ݻ������

            //map.clearOverlays(); // ������һ�������Ĺ켣�������Overlay
            cycloneData = 0; // �������ݼ�¼������λ
            cycloneNumber++; // ��������һ������

        }

    } else {	// ������ϣ��������ڵ���

        clearInterval(t); // ��ֹѭ�����û��Ƶ�ķ���

    }

}
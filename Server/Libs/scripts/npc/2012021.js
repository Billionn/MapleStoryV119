/* 
	NPC Name: 		Ramini
	Map(s): 		Orbis: Cabin<To Leafre> (200000131)
	Description: 		Orbis Ticketing Usher
*/
var status = 0;

function start() {
    status = -1;
    flight = cm.getEventManager("Flight");
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if(mode == 0) {
	cm.sendNext("�A�������@�ǨƱ��ӷ��U�o�A��a�H");
	cm.dispose();
	return;
    }
    if (status == 0) {
	if(flight == null) {
	    cm.sendNext("�ƥ���~�A�Э��s�ҰʪA�Ⱦ��H����ѨM���");
	    cm.dispose();
	} else if(flight.getProperty("entry").equals("true")) {
	    cm.sendYesNo("���F�A�аݧA�O�_�n�W��?");
	} else if(flight.getProperty("entry").equals("false") && flight.getProperty("docked").equals("true")) {
	    cm.sendNext("����ǳư_���C �藍�_�A�A�����U�@���C �����ɶ���i�q�L�b�Ⲽ�F���}���C");
	    cm.dispose();
	} else {
	    cm.sendNext("�ڭ̱N�b�}��e1�����}�l�W��C �Э@�ߵ��ݴX�����C�ѩ󭸲���H�A�ҥH�зǮɨ�");
	    cm.dispose();
	}
    } else if(status == 1) {
	if(!cm.haveItem(4031331)) {
	    cm.sendNext("�@��!�A�ʤ֤F�q�����������F�A�A�i�H�^��Ⲽ�B�h�ʶR��A�A�ӧ��");
	} else {
	    cm.gainItem(4031331, -1);
	    cm.warp(200000132, 0);
	}
	cm.dispose();
    }
}
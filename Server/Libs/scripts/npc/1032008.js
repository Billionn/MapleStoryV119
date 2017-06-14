/* 
	NPC Name: 		Cherry
	Map(s): 		Victoria Road : Ellinia Station (101000300)
	Description: 		Ellinia Ticketing Usher
*/
var status = 0;

function start() {
    status = -1;
    boat = cm.getEventManager("Boats");
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
	if(boat == null) {
	    cm.sendNext("�ƥ���~�A�Э��s�ҰʪA�Ⱦ��H����ѨM���");
	    cm.dispose();
	} else if(boat.getProperty("entry").equals("true")) {
	    cm.sendYesNo("���ݰ_�Ӧ��ܦh���Ŷ��A�ǳƤW��C �бN�A�����ǳƦn�A�A�Q�����o����ܡH");
	} else if(boat.getProperty("entry").equals("false") && boat.getProperty("docked").equals("true")) {
	    cm.sendNext("��ǳư_���C �藍�_�A���A�����U�@���C ����ɶ���i�q�L�b�Ⲽ�F���}���C");
	    cm.dispose();
	} else {
	    cm.sendNext("�ڭ̱N�b�_���e1�����}�l�n���A�Э@�ߵ��ݴX�����C�Ъ`�N�A����N�Ǯɰ_���A�ڭ̱N�b1�����e����������A�]���аȥ��b���B �ɶ��C");
	    cm.dispose();
	}
    } else if(status == 1) {
	if(!cm.haveItem(4031045)) {
	    cm.sendNext("�@���A�A���W�èS���q���ѪŤ�������C �ڤ������A����i�h�C �Ш�e����Ⲽ���R���C");
	} else {
	    cm.gainItem(4031045, -1);
	    cm.warp(101000301, 0);
	}
	cm.dispose();
    }
}
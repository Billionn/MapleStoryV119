var mapid = new Array(200000110,200000120,200000130,200000140,200000150);
var platform = new Array("�]�k�˪L","���㫰","�����","�Z�����","�ǧƨF�z");
var flight = new Array("��","��","��","Hak","Geenie");
var menu;
var select;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == 0 && status == 0) {
	cm.dispose();
	return;
    }
    if(mode == 0) {
	cm.sendOk("�нT�{�A�n�h���̡A�M���I�ګe�����x�C");
	cm.dispose();
	return;
    }
    if(mode == 1)
	status++;
    else
	status--;
    if(status == 0) {
	menu = "Hi �п�ܧA�Q�e�������x";
	for(var i=0; i < platform.length; i++) {
	    menu += "\r\n#L"+i+"##b�e��"+platform[i]+"#k#l";
	}
	cm.sendSimple(menu);
    } else if(status == 1) {
	select = selection;
	cm.sendYesNo("�Y�ϧA����F���x�A�]�i�H�^��o�̧�ڭ��s��ܥ��x�A �A�T�w�n���ʨ�#b�q��"+platform[select]+"�����x#k?");
    } else if(status == 2) {
	cm.warp(mapid[select], 0);
	cm.dispose();
    }
}
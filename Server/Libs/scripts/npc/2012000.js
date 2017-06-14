/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Agatha - Orbis Ticketing Booth(200000100)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.2 - Price as GMS [sadiq]
	1.1 - Text fix [Information]
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var ticket = new Array(4031047, 4031074, 4031331, 4031576);
var cost = new Array(5000, 6000, 30000, 6000);
var tmsg = new Array(15, 10, 10, 10);
var mapNames = new Array("�]�k�˪L(�����h�Q�Ȯq)", "���㫰", "�����", "�ǧƨF�z");
var mapName2 = new Array("�]�k�˪L(�����h�Q�Ȯq)", "���㫰", "�����", "�ǧƨF�z");
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
	cm.sendNext("�A�������@�ǨƱ��ӷ��U�o�A��a�H");
	cm.dispose();
	return;
    }
    if(mode == 1) {
	status++;
    }
    if(status == 0) {
	var where = "Hi�A�n�A�ڭt�d���C�ӥت��a�X���C �z�Q�ʶR�q�����̪����O�H";
	for (var i = 0; i < ticket.length; i++) {
	    where += "\r\n#L" + i + "##b" + mapNames[i] + "#k#l";
	}
	cm.sendSimple(where);
    } else if(status == 1) {
	select = selection;
	cm.sendYesNo("�q�� #b"+mapName2[select]+"�C�Z���"+tmsg[select]+" ���� �C�i������"+cost[select]+" ����#k.�A�T�w�n�ʶR#b#t"+ticket[select]+"##k?");
    } else if(status == 2) {
	if(cm.getMeso() < cost[select] || !cm.canHold(ticket[select])) {
	    cm.sendOk("�нT�{�A�������� #b"+cost[select]+" ����#k? ");
	    cm.dispose();
	} else {
	    cm.gainMeso(-cost[select]);
	    cm.gainItem(ticket[select],1);
	    cm.dispose();
	}
    }
}
/*
Bell - KC/NLC Subway Station(103000100/600010001), Waiting Room(600010002/600010004)
 */

var section;
var msg = new Array("�s����", "�Z������", "�Z�������a�K��", "�s����");
var ticket = new Array(4031711, 4031713);
var cost = 5000;
var returnMap = new Array(103000100, 600010001);

function start() {
	status = -1;
	sw = cm.getEventManager("Subway");
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 0 && status == 0) {
		cm.dispose();
	} else {
		status++;
		if (mode == 0) {
			cm.dispose();
			return;
		}
		if (status == 0) {
			switch (cm.getMapId()) {
			case 103000100:
				section = 0;
				break;
			case 600010001:
				section = 1;
				break;
			case 600010004:
				section = 2;
				break;
			case 600010002:
				section = 3;
				break;
			default:
				cm.sendNext("���~~");
				cm.dispose();
				break;
			}
			if (section < 2) {
				cm.sendSimple("�� �A�n�R���f�a�K��?\r\n#L0##b" + msg[section] + "#l");
			} else {
				cm.sendYesNo("�A�O�_�n�^�h " + msg[section] + " ?");
			}
		} else if (status == 1) {
			if (section < 2) {
				cm.sendYesNo("�e�� " + msg[section] + " ���a�K�C10�����@�Z, �ݭn��O #b" + cost + " ��#k. �аݬO�_�n�ʶR #b#t" + ticket[section] + "##k?");
			} else {
				section -= 2;
				cm.warp(returnMap[section]);
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getMeso() < cost || !cm.canHold(ticket[section])) {
				cm.sendNext("���W�ܤֻݭn #b" + cost + " ����#k, �άO���W�ˬd�I�]�Ŧ�O�_����.");
			} else {
				cm.gainItem(ticket[section], 1);
				cm.gainMeso(-cost);
			}
			cm.dispose();
		}
	}
}
